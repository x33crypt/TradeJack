import React, { useState } from "react";
import google from "../../assets/GoogleLogo.png";
import { GiCardExchange } from "react-icons/gi";
import axios from "axios";
import DOMPurify from "dompurify";

const Signupwithmail = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  console.log(signupDetails);

  const handleFirstnameChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleConfirmPasswordChange = (e) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const validatePassword = (password) => {
    // At least 8 characters, including uppercase, lowercase, number, and special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  const submitSignupDetails = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    // Sanitizing all input fields
    const sanitizedDetails = {
      name: sanitizeInput(signupDetails.name),
      username: sanitizeInput(signupDetails.username),
      email: sanitizeInput(signupDetails.email),
      password: sanitizeInput(signupDetails.password),
      acceptPolicy: signupDetails.acceptPolicy,
    };

    console.log(sanitizedDetails);

    // Checking required fields
    if (
      !sanitizedDetails.name ||
      !sanitizedDetails.username ||
      !sanitizedDetails.email ||
      !sanitizedDetails.password
    ) {
      setIsSigningUp(false);
      return toast.error("Please fill out all fields.");
    }

    // Validating email format
    if (!validateEmail(sanitizedDetails.email)) {
      setIsSigningUp(false);
      return toast.error("Invalid email format.");
    }

    // Validatating password strength
    if (!validatePassword(sanitizedDetails.password)) {
      setIsSigningUp(false);
      return toast.error(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, a number, and a special character."
      );
    }

    // Checking if terms are accepted
    if (!sanitizedDetails.acceptPolicy) {
      setIsSigningUp(false);
      return toast.error("Please accept the terms and conditions.");
    }

    try {
      const response = await axios.post(`${baseUrl}/signup`, sanitizedDetails);
      toast.success("Signup successful");
      // Navigate to another page or show a success message
    } catch (err) {
      setIsSigningUp(false);
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="lg:w-[600px] w-full bg-black pb-[40px] ">
      <div className="lg:p-[80px] md:p-[50px] p-[20px] flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[40px]">
          <div className="lg:hidden flex items-center justify-center gap-[8px] mt-[20px] ">
            {/* <GiCardExchange className=" flex lg:text-[19px] md:text-[19px] text-[26px] text-tradeGreen" />
            <p className=" lg:text-[19px] md:text-[22px] text-[26px] font-[700] text-tradeGreen">
              Trade
              <small className="lg:text-[19px] md:text-[19px] text-[26px] font-[700] text-white">
                Jack
              </small>
            </p> */}
            <p className="text-[15px] font-[500] text-white">Welcome</p>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <p className="text-[26px] text-white font-[700]">
              Sign Up to TradeJack
            </p>
            <p className="text-[14px] font-[500] text-tradeFadeWhite">
              Enter your personal data to create your account.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[25px]">
            <div className=" flex items-center w-full gap-[12px] justify-center hover:bg-tradeAshLight text-white border-[1px] border-tradeAshLight p-[12px] rounded-[10px] cursor-pointer transition-all duration-300">
              <img className="w-[18px]" src={google} alt="" />
              <p className="text-[15px] font-semibold ">Sign up with Google</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="border-t border-tradeAshLight w-full"></div>
              <div className="w-[100px] flex justify-center">
                <p className="text-tradeFadeWhite text-[13px]">Or</p>
              </div>
              <div className="border-t border-tradeAshLight w-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-[25px]">
            <div className="flex lg:flex-row flex-col w-full gap-[25px] ">
              <div className="w-full">
                <p className="text-[14px] font-[600] text-white">First Name</p>
                <input
                  className={`${
                    signupDetails.firstname
                      ? "border-tradeGreen"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="firstname"
                  placeholder="eg. John"
                  onChange={handleFirstnameChange}
                />
              </div>
              <div className="w-full">
                <p className="text-[14px] text-white font-[600]">Last Name</p>
                <input
                  className={`${
                    signupDetails.lastname
                      ? "border-tradeGreen"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  type="text"
                  name="lastname"
                  placeholder="eg. Doe"
                  onChange={handleLastnameChange}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Email</p>
              <input
                className={`${
                  signupDetails.email
                    ? "border-tradeGreen"
                    : "border-tradeAshLight"
                } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="email"
                name="email"
                placeholder="eg. johndoe@gmail.com"
                onChange={handleEmailChange}
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Username</p>
              <input
                className={`${
                  signupDetails.username
                    ? "border-tradeGreen"
                    : "border-tradeAshLight"
                } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="text"
                name="username"
                placeholder="e.g. johndoe"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Country</p>
              <input
                className="mt-[5px] text-[14px] placeholder:text-neutral-500 font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full p-[12px] rounded-[10px]"
                type="text"
                name="lastname"
              />
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Password</p>
              <input
                className={`${
                  signupDetails.password
                    ? "border-tradeGreen"
                    : "border-tradeAshLight"
                } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="text"
                name="password"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
              />
              <p className="text-[13px] text-tradeFadeWhite mt-[5px]">
                Passwords must be at least 8 characters long.
              </p>
            </div>
            <div className="w-full">
              <p className="text-[14px] text-white font-[600]">
                Confirm Password
              </p>
              <input
                className={`${
                  signupDetails.confirmPassword
                    ? "border-tradeGreen"
                    : "border-tradeAshLight"
                } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                type="text"
                name="confirmPassword"
                placeholder="Enter your password"
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[25px]">
            <div className="w-full bg-white p-[12px] rounded-[10px] flex justify-center">
              <p className="text-[14px] font-[700]">
                {isSigningUp ? "Signing up..." : "Sign up"}
              </p>
            </div>
            <p className="text-tradeFadeWhite text-[14px] font-[500]">
              Already have an account?{" "}
              <small className="text-[14px] text-white font-[700]">
                Log in
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupwithmail;
