import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import axios from "axios";
import DOMPurify from "dompurify";
import { IoWarning } from "react-icons/io5";
import UserProfileNav from "@/components/UserProfileNav";
import useSafeNavigate from "../components/SafeNavigation";
import { useAuth } from "../context/AuthContext";

const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState({
    password: { error: false, message: "" },
  });
  const [confirming, setConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsVerified } = useAuth();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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

  const navigateTo = useSafeNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";
  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    setConfirming(true);
    setErrorMessage("");

    // Sanitizing all input fields
    const sanitizedDetails = {
      password: sanitizeInput(password),
    };

    console.log(sanitizedDetails);

    setTimeout(async () => {
      if (!sanitizedDetails.password) {
        showFieldError("password", "Input field is required");
        setConfirming(false);
        return;
      }
      closeFieldError("password");

      if (!validatePassword(sanitizedDetails.password)) {
        showFieldError("password", "Password doesn't meet the requirements.");
        setConfirming(false);
        return;
      } else {
        closeFieldError("password");
      }

      const payload = {
        password: sanitizedDetails?.password,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/auth/verifyPassword`,
          payload
        );
        console.log(response.data);
        setConfirming(false);
        setIsVerified(true);
        navigateTo(redirectTo);
      } catch (err) {
        setConfirming(false);
        console.error("Signup error:", err);
        const errMessage =
          err?.response?.data?.error?.message ||
          "Something went wrong. Please try again.";

        setErrorMessage(errMessage);
      }
    }, 1000); // <-- runs once after 1 seconds
  };

  return (
    <>
      <InAppNav />
      <div className=" lg:pt-[75px] md:pt-[75px] pt-[60px] flex min-h-screen bg-black lg:p-[2%] md:p-[2.5%] ">
        <div className="bg-tradeGree flex w-full flex-col gap-[1px] md:borde border-neutral-800 md:rounded-[14px]">
          <div className="flex md:hidden justify-cente border-b p-[15px] border-tradeAshLight">
            <p className=" text-[17px] text-white font-[700]">
              Confirm your password
            </p>
          </div>
          <form
            onSubmit={handleConfirmPassword}
            className="h-full flex justify-center items-center"
          >
            <div className="h-full w-full flex flex-col lg:py-[5px] md:py-[50px] p-[15px] md:justify-center md:items-center">
              <div className="flex flex-col md:w-[300px] w-full md:gap-[30px] gap-[30px]">
                <div className="w-full md:flex hidden items-center flex-col gap-[5px]">
                  <p className="md:flex hidden text-[22px] text-white font-[600]">
                    Confirm your password
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] text-center font-[500]">
                    We just need to confirm it’s you. Enter your password to
                    continue.
                  </p>
                </div>

                <div
                  className={` ${
                    errorMessage ? "flex" : "hidden"
                  } w-full p-[12px] text-red-500 gap-[4px] items-center border  border-red-500 rounded-[10px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[13px]">{errorMessage}</p>
                </div>

                <div className="flex flex-col gap-[30px]">
                  <div className="w-full flex flex-col  gap-[2px]">
                    <div className="flex flex-col ">
                      <p className="text-[14px] font-[600] text-white">
                        Password
                      </p>
                      <input
                        className={`${
                          password
                            ? "border-tradeGreen"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                        type="text"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div
                      className={`${
                        fieldError.password.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">
                        {fieldError.password.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex  flex-col gap-[20px]">
                  <div
                    className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/account/profile")}
                  >
                    <p className="text-[14px] font-[700] ">Cancel</p>
                  </div>
                  <button
                    className={` ${
                      confirming
                        ? "bg-tradeAsh text-tradeGreen"
                        : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                    } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                  >
                    <p className="text-[14px] font-[700] ">
                      {confirming ? "Confirming..." : "Confirm"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmPassword;
