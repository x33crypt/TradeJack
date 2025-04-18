import React, { useState, useEffect } from "react";
import signupImg from "../assets/signupImg.webp";
import { IoWarning } from "react-icons/io5";

const Login = () => {
  const [loginDetails, setLoginpDetails] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [fieldError, setFieldError] = useState({
    email: { error: false, message: "" },
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <div className="flex gap-[15px] bg-black lg:p-[10px]">
      <div className="flex-1 w-full bg-black pb-[40px] ">
        <div className="lg:px-[80px] lg:py-[40px] md:px-[50px] p-[20px] flex flex-col gap-[40px]">
          <div className="flex flex-col items-cente gap-[5px] mt-[30px]">
            <p className="flex gap-[5px] text-[28px] text-white font-[800]">
              Welcome Back
            </p>
            <p className="text-[13px] font-[500] text-tradeFadeWhite">
              Enter your details to access your account.
            </p>
          </div>
          <form>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[30px]">
                <div className="w-full">
                  <p className="text-[14px] text-white font-[600]">
                    Email address
                  </p>
                  <input
                    className={`${
                      loginDetails.username
                        ? "border-tradeGreen"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="username"
                    placeholder="Choose username"
                    // onChange={handleUsernameChange}
                  />
                  <div
                    className={`${
                      fieldError.username.error ? "flex" : "hidden"
                    } gap-[4px] items-center text-red-500 my-[4px]`}
                  >
                    <IoWarning className="text-[14px]" />
                    <p className="text-[12px]">{fieldError.username.message}</p>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-[14px] text-white font-[600]">Password</p>
                  <input
                    className={`${
                      loginDetails.password
                        ? "border-tradeGreen"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    // onChange={handlePasswordChange}
                  />
                  <div
                    className={`${
                      fieldError.password.error ? "flex" : "hidden"
                    } gap-[4px] items-center text-red-500 my-[4px]`}
                  >
                    <IoWarning className="text-[14px]" />
                    <p className="text-[12px]">{fieldError.password.message}</p>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <p className="text-[13px] text-tradeGreen underline font-[500]">
                    Forgot Password ?
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-[25px]">
                <button className="w-full bg-white p-[12px] rounded-[10px] flex justify-center cursor-pointer">
                  <p className="text-[14px] font-[700]">
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 lg:flex hidden bg-tradeGreen rounded-[20px] overflow-hidden">
        <img className="object-cover" src={signupImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
