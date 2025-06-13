import React, { useState, useEffect, useContext } from "react";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import { signin } from "@/utils/auth/signin";

const SigninUser = () => {
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const { toast, setToast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

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
    setIsSigningIn(true);

    try {
      const result = await signin(signinDetails);

      if (result.success) {
        console.log("Signin successful:", result.data);
        navigateTo("/dashboard");
        setToast({
          ...toast,
          success: true,
          successMessage: result.message,
        });
      } else {
        console.error("Signin error:", result.error);
        setToast({
          ...toast,
          error: true,
          errorMessage: result.error,
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
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex min-h-svh justify-center items-center  bg-black">
      <div className="h-max w-[300px] flex flex-col justify-center gap-[20px] ">
        <div className="flex flex-col items-center gap-[30px]">
          <div className="bg-white p-[10px] rounded-[12px]">
            <PiSignInBold className="text-black text-[30px]" />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-white text-[24px] font-semibold">
              Sign in with email
            </p>
            <p className="text-[13px] font-[500] text-tradeFadeWhite">
              Enter your details to access your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSignin}>
          <div className="flex flex-col p-[15px] gap-[20px] bg-tradeAsh border border-tradeAshLight rounded-[10px]">
            <div className="flex flex-col gap-[20px]">
              <div className="w-full">
                <p className="text-[13px] text-white font-[600]">
                  Email address
                </p>
                <input
                  className={`${
                    signinDetails.email
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="email"
                  placeholder="eg. johndoe@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-white font-[600]">Password</p>
                  <p className="text-[13px] text-tradeGreen font-[500]">
                    Forgot password ?
                  </p>
                </div>

                <input
                  className={`${
                    signinDetails.password
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-[15px]">
              <button className="bg-tradeGreen text-black w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300 active:bg-opacity-55">
                <p className="text-[14px] font-[700]">
                  {isSigningIn ? "Signing in..." : "Sign in"}
                </p>
              </button>
            </div>
          </div>
        </form>

        <div className="w-full flex justify-center">
          <p className="text-tradeFadeWhite text-[13px] font-[500]">
            Don't have an account?{" "}
            <small
              onClick={() => navigateTo("/signup")}
              className="text-[13px] text-white font-[600] ml-[5px] cursor-pointer"
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
