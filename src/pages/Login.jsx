import React, { useState, useEffect, useContext } from "react";
import signupImg from "../assets/signupImg.webp";
import { IoWarning } from "react-icons/io5";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const Login = () => {
  const [loginDetails, setLoginpDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, setUser } = useUserContext();

  const handleEmailChange = (e) => {
    setLoginpDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setLoginpDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const sanitizeInput = (input) => {
    const cleaned = DOMPurify.sanitize(input);
    return cleaned.replace(/\s+/g, "").trim();
  };

  const validatePassword = (password) => {
    // At least 8 characters, including uppercase, lowercase, number, and special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateUsername = (username) => {
    const regex = /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  const navigateTo = useNavigate();

  const showFieldError = (field, message) => {
    setFieldError((prev) => ({
      ...prev,
      [field]: { error: true, message },
    }));
  };

  const closeFieldError = (field) => {
    setFieldError((prev) => ({
      ...prev,
      [field]: { error: false, message: "" },
    }));
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage("");

    // Sanitizing all input fields
    const sanitizedDetails = {
      email: sanitizeInput(loginDetails.email),
      password: sanitizeInput(loginDetails.password),
    };

    console.log(sanitizedDetails);

    setTimeout(async () => {
      const requiredFields = ["email", "password"];

      for (let field of requiredFields) {
        if (!sanitizedDetails[field]) {
          showFieldError(field, "Input field is required");
          setIsLoggingIn(false);
          return;
        } else {
          closeFieldError(field);
        }
      }

      if (!validateEmail(sanitizedDetails.email)) {
        showFieldError("email", "Invalid email format");
        setIsLoggingIn(false);
        return;
      } else {
        closeFieldError("email");
      }

      if (!validatePassword(sanitizedDetails.password)) {
        showFieldError("password", "Password doesn't meet the requirements.");
        setIsLoggingIn(false);
        return;
      } else {
        closeFieldError("password");
      }

      const payload = {
        email: sanitizedDetails.email,
        password: sanitizedDetails.password,
      };

      try {
        const response = await axios.post(`${baseUrl}/auth/login`, payload);
        console.log("Signin successful:", response.data);
        setUser(response?.data?.user);
        setIsLoggingIn(false);
        setUser((prev) => ({
          ...prev,
          id: response?.data?.user?.id,
        }));

        navigateTo("/dashboard");
      } catch (err) {
        setIsLoggingIn(false);
        console.error("Signin error:", err);

        const errMessage =
          err?.response?.data?.error?.message ||
          "Something went wrong. Please try again.";

        setErrorMessage(errMessage);
      }
    }, 1000); // <-- runs once after 1 seconds
  };

  return (
    <div className="flex min-h-svh  bg-black">
      <div className="flex-1 lg:flex hidden bg-tradeGreen overflow-hidden">
        <img className="object-cover" src={signupImg} alt="" />
      </div>
      <div className="flex-1 w-full bg-black">
        <div className="lg:px-[100px] lg:py-[40px] md:px-[50px] p-[20px] flex flex-col gap-[40px]">
          <div className="flex flex-col items-cente gap-[5px] mt-[30px]">
            <p className="flex gap-[5px] text-[28px] text-white font-[800]">
              Welcome Back
            </p>
            <p className="text-[13px] font-[500] text-tradeFadeWhite">
              Enter your details to access your account.
            </p>
          </div>
          <div
            className={` ${
              errorMessage ? "flex" : "hidden"
            } p-[12px] text-red-500 gap-[4px] items-center border  border-red-500 rounded-[10px]`}
          >
            <IoWarning className="text-[14px]" />
            <p className="text-[13px]">{errorMessage}</p>
          </div>
          <form onSubmit={handleSubmitDetails}>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[30px]">
                <div className="w-full">
                  <p className="text-[14px] text-white font-[600]">
                    Email address
                  </p>
                  <input
                    className={`${
                      loginDetails.email
                        ? "border-tradeGreen"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="email"
                    placeholder="eg. johndoe@gmail.com"
                    onChange={handleEmailChange}
                  />
                  <div
                    className={`${
                      fieldError.email.error ? "flex" : "hidden"
                    } gap-[4px] items-center text-red-500 my-[4px]`}
                  >
                    <IoWarning className="text-[14px]" />
                    <p className="text-[12px]">{fieldError.email.message}</p>
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
                    onChange={handlePasswordChange}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
