import api from "../http/api";
import DOMPurify from "dompurify";
import { dashboard } from "../dashboard/dashboard";

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.trim();
};

// Password must include uppercase, lowercase, number, special char, and be 8+ chars
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate basic email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ MAIN FUNCTION
export async function signin(signinDetails, setDashboard) {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!signinDetails) {
    return { success: false, error: "No sign-in details provided." };
  }

  const { email, password } = signinDetails;

  if (!email) {
    return { success: false, error: "Missing required field: Email Address" };
  }

  if (!password) {
    return { success: false, error: "Missing required field: Password" };
  }

  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  if (!validateEmail(sanitizedEmail)) {
    return { success: false, error: "Invalid email format." };
  }

  if (!validatePassword(sanitizedPassword)) {
    return {
      success: false,
      error:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    };
  }

  const payload = {
    email: sanitizedEmail,
    password: sanitizedPassword,
  };

  try {
    const response = await api.post(`${baseUrl}/auth/login`, payload);

    // ✅ success path: login succeeded, fetch dashboard
    if (response?.data?.success) {
      const getDashboard = await dashboard();
      if (getDashboard?.success && setDashboard) {
        setDashboard(getDashboard?.data?.data);
      }

      return {
        success: true,
        message: response?.data?.message,
        user: response?.data?.user,
      };
    } else {
      return {
        success: false,
        error: response?.data?.errorMessage || "Unexpected error during login.",
      };
    }
  } catch (err) {
    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
}
