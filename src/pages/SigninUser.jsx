import React, { useState, useEffect, useContext } from "react";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import { signin } from "@/utils/auth/signin";
import { useDashboard } from "@/context/DashboardContext";
import { useSearchParams } from "react-router-dom";
import Button from "@/components/buttons/Button";

const SigninUser = () => {
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const { toast, setToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setDashboard } = useDashboard();

  const searchParams = new URLSearchParams(window.location.search);
  const sessionExpired = searchParams.get("sessionExpired") === "true";

  const handleEmailChange = (e) => {
    setSigninDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlePasswordChange = (e) => {
    setSigninDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigateTo = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signin(signinDetails, setDashboard);

      if (result.success) {
        console.log("Signin successful:", result);
        navigateTo("/dashboard");
      } else {
        console.error("Signin error:", result.error);
        setToast({
          ...toast,
          error: true,
          errorMessage: result?.error,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err.message || err);
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh justify-center pt-16 bg-black">
      <div className="h-max w-[300px] flex flex-col  gap-[20px] ">
        <div className="flex flex-col items-center gap-[30px]">
          <div className="bg-white p-[10px] rounded-[12px]">
            <PiSignInBold className="text-black text-[30px]" />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-white text-2xl font-semibold">
              Sign in to your account
            </p>

            {sessionExpired ? (
              <p className="text-xs font-medium text-red-500 w-[260px] text-center">
                Your session has expired. Please sign in again to continue.
              </p>
            ) : (
              <p className="md:text-xs text-[13px] font-[500] text-tradeFadeWhite">
                Enter your details to access your account.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col p-[15px] gap-[20px] bg-tradeAsh border border-tradeAshLight rounded-[10px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-1">
              <p className="md:text-xs text-[13px] text-white font-[700]">
                Email address
              </p>
              <input
                className={`${
                  signinDetails.email
                    ? "border-tradeAshExtraLight"
                    : "border-tradeAshLight"
                } mt-[5px] md:text-xs text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="text"
                name="email"
                placeholder="eg. johndoe@gmail.com"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="md:text-xs text-[13px] text-white font-[700]">
                  Password
                </p>
                <p className="md:text-xs text-[13px] text-tradeGreen font-[700]">
                  Forgot password ?
                </p>
              </div>

              <input
                className={`${
                  signinDetails.password
                    ? "border-tradeAshExtraLight"
                    : "border-tradeAshLight"
                } mt-[5px] md:text-xs text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="text"
                name="password"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[15px]">
            <Button onClick={handleSignin} variant="primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <p className="text-tradeFadeWhite md:text-xs text-[13px] font-[500] flex gap-1">
            Don't have an account?{" "}
            <small
              onClick={() => navigateTo("/signup")}
              className="md:text-xs text-[13px] text-tradeOrange font-[900] cursor-pointer"
            >
              Sign up
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninUser;
