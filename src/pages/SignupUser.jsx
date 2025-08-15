import React, { useState } from "react";
import signupImg from "../assets/signupImg.webp";
import { useNavigate } from "react-router-dom";
import { signup } from "@/utils/auth/signup";
import { useToast } from "@/context/otherContext/ToastContext";

const SignupUser = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { toast, setToast } = useToast();

  const handleUsernameChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const navigateTo = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    try {
      const result = await signup(signupDetails);

      if (result.success) {
        navigateTo("/signup/success");
        setToast({
          ...toast,
          success: true,
          errorSuccess: result.data,
        });
      } else {
        setToast({
          ...toast,
          error: true,
          errorMessage: result.error,
        });
      }
    } catch (err) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="flex bg-black ">
      <div className="flex-1 lg:flex hidden bg-tradeGreen overflow-hidden">
        <img className="object-cover" src={signupImg} alt="" />
      </div>
      <div className="flex-1 w-full bg-black min-h-svh">
        <div className="lg:px-[100px] lg:py-[40px] md:px-[50px] p-[20px] flex flex-col gap-[40px]">
          <div className="flex flex-col items-cente gap-[5px] mt-[30px]">
            <p className="flex gap-[5px] text-[28px] text-white font-[800]">
              Create Account
            </p>
            <p className="text-[13px] font-[500] text-tradeFadeWhite">
              Enter your personal data to create your account.
            </p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[30px]">
                <div className="w-full">
                  <p className="text-[13px] text-white font-[600]">Username</p>
                  <input
                    className={`${
                      signupDetails.username
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="username"
                    placeholder="Choose username"
                    onChange={handleUsernameChange}
                  />
                  <p className="text-[13px] text-tradeFadeWhite mt-[5px]">
                    Username can only have letters, numbers, or one hyphen ( -
                    ). It cannot begin or end with a hyphen.
                  </p>
                </div>

                <div className="w-full">
                  <p className="text-[13px] text-white font-[600]">
                    Email Address
                  </p>
                  <input
                    className={`${
                      signupDetails.email
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
                  <p className="text-[13px] text-white font-[600]">Password</p>
                  <input
                    className={`${
                      signupDetails.password
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handlePasswordChange}
                  />
                  <p className="text-[13px] text-tradeFadeWhite mt-[5px]">
                    Password must be at least 8 characters with a mix of
                    uppercase, lowercase, number, and a special character.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[25px]">
                <button className="w-full bg-white p-[12px] rounded-[10px] flex justify-center cursor-pointer">
                  <p className="text-[14px] font-[700]">
                    {isSigningUp ? "Signing up..." : "Sign up"}
                  </p>
                </button>

                <p className="text-tradeFadeWhite text-[13px] font-[500]">
                  Already have an account?{" "}
                  <small
                    onClick={() => navigateTo("/signin")}
                    className="text-[13px] text-white font-[600] ml-[5px] cursor-pointer"
                  >
                    Sign in
                  </small>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;
