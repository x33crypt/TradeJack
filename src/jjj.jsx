 // Login
const login = [
  loginValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        createErrorResponse({
          message: 'Validation failed',
          statusCode: 400,
          errorCode: 'VALIDATION_ERROR',
          details: errors.array(),
        })
      );
    }

    const { email, password } = req.body;
    const requestLogger = createRequestLogger(req);

    try {
      const user = await User.findOne({ email }).select('userName email hashedPassword role trustScore status last_seen _id');
      if (!user) {
        requestLogger.warn('Invalid credentials during login');
        return res.status(401).json(
          createErrorResponse({
            message: 'Invalid credentials',
            statusCode: 401,
            errorCode: 'INVALID_CREDENTIALS',
          })
        );
      }

      const { attempts } = await Login.checkLoginAttempts(user._id);
      if (attempts >= 5) {
        requestLogger.warn('Too many failed login attempts');
        return res.status(429).json(
          createErrorResponse({
            message: 'Too many failed attempts. Account locked for 24 hours',
            statusCode: 429,
            errorCode: 'TOO_MANY_ATTEMPTS',
          })
        );
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        await Login.logFailedAttempt(user._id);
        await logEvent(user._id, 'login_failed', req.ip, req.get('User-Agent'), { message: 'Invalid password' });
        requestLogger.warn('Invalid password during login');
        return res.status(401).json(
          createErrorResponse({
            message: 'Invalid credentials',
            statusCode: 401,
            errorCode: 'INVALID_CREDENTIALS',
          })
        );
      }

      const { accessToken, refreshToken } = await generateTokenPair(user);
      await storeRefreshToken(user._id, refreshToken, req.ip, req.get('User-Agent'));
      setAuthCookies(res, accessToken, refreshToken);
      await Login.resetLoginAttempts(user._id);
     // await logEvent(user._id, 'login', req.ip, req.get('User-Agent'), { message: 'User logged in' });

      // Calculate user-level metrics
      const userTransactions = await Transaction.find({
        $or: [
          { user_id: user._id, status: { $in: ['successful', 'resolved'] } },
          { service_provider_id: user._id, status: { $in: ['successful', 'resolved'] } },
        ],
      });

      const userTransactionCount = userTransactions.lenght;

      res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        userName: user.userName,
        email: user.email,
        trustScore: user.trustScore || 0,
        status: 'online',
        lastSeen: new Date().toLocaleString('en-US', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', // Fallback to UTC if timezone detection fails
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }),
        userTransactionCount,
        feedback: {
          totalRatings: user.positiveFeedbackCount + user.negativeFeedbackCount || 0,
          positive: user.positiveFeedbackCount || 0,
          negative: user.negativeFeedbackCount || 0,
        },
      },
    },
  });
    } catch (error) {
      logError(error, req);
      res.status(500).json(
        createErrorResponse({
          message: 'Server error during login',
          statusCode: 500,
          errorCode: 'INTERNAL_SERVER_ERROR',
        })
      );
    }
  }),
];