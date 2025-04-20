import React, { useState, useEffect } from "react";
import google from "../../assets/GoogleLogo.png";
import { GiCardExchange } from "react-icons/gi";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoWarning } from "react-icons/io5";

const Signupwithmail = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [countries, setCountries] = useState([]);
  const [fieldError, setFieldError] = useState({
    firstname: { error: false, message: "" },
    lastname: { error: false, message: "" },
    email: { error: false, message: "" },
    country: { error: false, message: "" },
    username: { error: false, message: "" },
    password: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [signupDetails, setSignupDetails] = useState({
    // firstname: "",
    // lastname: "",
    email: "",
    username: "",
    // country: "",
    password: "",
    // confirmPassword: "",
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

  const handleCountryChange = (e) => {
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

  const getAllCountries = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );

      const data = response?.data;
      const countryNames = data
        .map((country) => country.name.common)
        .sort((a, b) => a.localeCompare(b));
      // console.log(countryNames);
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

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
    const regex = /^(?!-)(?!.*--)[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?$/;
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
    setIsSigningUp(true);
    setErrorMessage("");

    // Sanitizing all input fields
    const sanitizedDetails = {
      // firstname: sanitizeInput(signupDetails.firstname),
      // lastname: sanitizeInput(signupDetails.lastname),
      email: sanitizeInput(signupDetails.email),
      username: sanitizeInput(signupDetails.username),
      // country: sanitizeInput(signupDetails.country),
      password: sanitizeInput(signupDetails.password),
      // confirmPassword: sanitizeInput(signupDetails.confirmPassword),
    };

    console.log(sanitizedDetails);

    setTimeout(async () => {
      const requiredFields = [
        // "firstname",
        // "lastname",
        "username",
        "email",
        // "country",
        "password",
        // "confirmPassword",
      ];

      for (let field of requiredFields) {
        if (!sanitizedDetails[field]) {
          showFieldError(field, "Input field is required");
          setIsSigningUp(false);
          return;
        } else {
          closeFieldError(field);
        }
      }

      if (!validateUsername(sanitizedDetails.username)) {
        showFieldError("username", "Username doesn't meet the requirements.");
        setIsSigningUp(false);
        return;
      } else {
        closeFieldError("username");
      }

      // if (sanitizedDetails.password !== sanitizedDetails.confirmPassword) {
      //   showFieldError("confirmPassword", "Passwords do not match.");
      //   setIsSigningUp(false);
      //   return;
      // } else {
      //   closeFieldError("confirmPassword");
      // }

      if (!validateEmail(sanitizedDetails.email)) {
        showFieldError("email", "Invalid email format");
        setIsSigningUp(false);
        return;
      } else {
        closeFieldError("email");
      }

      if (!validatePassword(sanitizedDetails.password)) {
        showFieldError("password", "Password doesn't meet the requirements.");
        setIsSigningUp(false);
        return;
      } else {
        closeFieldError("password");
      }

      const payload = {
        // fullname: `${sanitizedDetails.firstname} ${sanitizedDetails.lastname}`,
        userName: sanitizedDetails.username,
        email: signupDetails.email,
        // country: signupDetails.country,
        password: signupDetails.password,
      };

      try {
        const response = await axios.post(`${baseUrl}/auth/signup`, payload);
        console.log("Signup successful:", response.data);
        setIsSigningUp(false);
        // Optionally show a toast or redirect
        // toast.success("Signup successful!");
        navigateTo("/signup/completed");
      } catch (err) {
        setIsSigningUp(false);

        console.error("Signup error:", err);

        const errMessage =
          err?.response?.data?.error?.message ||
          "Something went wrong. Please try again.";

        setErrorMessage(errMessage);
      }
    }, 1000);
  };

  return (
    <div className="flex-1 w-full bg-black pb-[40px] ">
      <div className="lg:px-[80px] lg:py-[40px] md:px-[50px] p-[20px] flex flex-col gap-[40px]">
        <div className="flex flex-col items-cente gap-[5px] mt-[30px]">
          <p className="flex gap-[5px] text-[28px] text-white font-[800]">
            Create Account
          </p>
          <p className="text-[13px] font-[500] text-tradeFadeWhite">
            Enter your personal data to create your account.
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
            {/* <div className="flex flex-col gap-[25px]">
            <div className=" flex items-center w-full gap-[12px] justify-center hover:bg-tradeAshLight text-white border-[1px] border-tradeAshLight p-[12px] rounded-[10px] cursor-pointer transition-all duration-300">
              <img className="w-[18px]" src={google} alt="" />
              <p className="text-[15px] font-semibold ">
                Sign up with Google
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="border-t border-tradeAshLight w-full"></div>
              <div className="w-[100px] flex justify-center">
                <p className="text-tradeFadeWhite text-[13px]">Or</p>
              </div>
              <div className="border-t border-tradeAshLight w-full"></div>
            </div>
          </div> */}

            <div className="flex flex-col gap-[30px]">
              {/* <div className="flex lg:flex-row flex-col w-full gap-[25px] ">
              <div className="w-full">
                <p className="text-[14px] font-[600] text-white">
                  First Name
                </p>
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
                <div
                  className={`${
                    fieldError.firstname.error ? "flex" : "hidden"
                  } gap-[4px] items-center text-red-500 mt-[4px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[12px]">
                    {fieldError.firstname.message}
                  </p>
                </div>
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
                <div
                  className={`${
                    fieldError.lastname.error ? "flex" : "hidden"
                  } gap-[4px] items-center text-red-500 mt-[4px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[12px]">{fieldError.lastname.message}</p>
                </div>
              </div>
            </div> */}
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
                  placeholder="Choose username"
                  onChange={handleUsernameChange}
                />
                <div
                  className={`${
                    fieldError.username.error ? "flex" : "hidden"
                  } gap-[4px] items-center text-red-500 my-[4px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[12px]">{fieldError.username.message}</p>
                </div>
                <p className="text-[13px] text-tradeFadeWhite mt-[5px]">
                  Username can only have letters, numbers, or one hyphen ( - ).
                  It cannot begin or end with a hyphen.
                </p>
              </div>
              <div className="w-full">
                <p className="text-[14px] text-white font-[600]">Email</p>
                <input
                  className={`${
                    signupDetails.email
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
                  } gap-[4px] items-center text-red-500 mt-[4px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[12px]">{fieldError.email.message}</p>
                </div>
              </div>

              {/* <div className="w-full">
              <p className="text-[14px] text-white font-[600]">Country</p>
              <div className="relative w-full">
                <select
                  className={`${
                    signupDetails.country
                      ? "border-tradeGreen"
                      : "border-tradeAshLight"
                  } appearance-none mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]  scrollbar-thin scrollbar-thumb-tradeGreen scrollbar-track-tradeAsh`}
                  // size="10"
                  name="country"
                  onChange={handleCountryChange}
                >
                  <option value="">-- Choose a country --</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
              <div
                className={`${
                  fieldError.country.error ? "flex" : "hidden"
                } gap-[4px] items-center text-red-500 mt-[4px]`}
              >
                <IoWarning className="text-[14px]" />
                <p className="text-[12px]">{fieldError.country.message}</p>
              </div>
            </div> */}

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
                <div
                  className={`${
                    fieldError.password.error ? "flex" : "hidden"
                  } gap-[4px] items-center text-red-500 my-[4px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[12px]">{fieldError.password.message}</p>
                </div>
                <p className="text-[13px] text-tradeFadeWhite mt-[5px]">
                  Password must be at least 8 characters with a mix of
                  uppercase, lowercase, number, and a special character.
                </p>
              </div>

              {/* <div className="w-full">
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
              <div
                className={`${
                  fieldError.confirmPassword.error ? "flex" : "hidden"
                } gap-[4px] items-center text-red-500 mt-[4px]`}
              >
                <IoWarning className="text-[14px]" />
                <p className="text-[12px]">
                  {fieldError.confirmPassword.message}
                </p>
              </div>
            </div> */}
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
                  onClick={() => navigateTo("/login")}
                  className="text-[13px] text-white font-[600] ml-[5px] cursor-pointer"
                >
                  Log in
                </small>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signupwithmail;
