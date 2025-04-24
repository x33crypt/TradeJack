import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { IoWarning } from "react-icons/io5";
import useSafeNavigate from "@/components/SafeNavigation";
import { useAuth } from "../context/AuthContext";

const ChangeEmail = () => {
  const { isVerified, setIsVerified } = useAuth();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState({
    email: { error: false, message: "" },
  });
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(email);

  const navigateTo = useSafeNavigate();

  useEffect(() => {
    if (!isVerified) {
      navigateTo("/account/auth/verify", {
        state: { from: "/account/update/email" },
      });
    }
  }, [isVerified, navigateTo]);

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input) => {
    const cleaned = DOMPurify.sanitize(input);
    return cleaned.replace(/\s+/g, "").trim();
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

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setErrorMessage("");

    // Sanitizing all input fields
    const sanitizedDetails = {
      email: sanitizeInput(email),
    };

    setTimeout(async () => {
      if (!sanitizedDetails.email) {
        showFieldError("email", "Input field is required");
        setUpdating(false);
        return;
      } else {
        closeFieldError("email");
      }

      if (!validateEmail(sanitizedDetails.email)) {
        showFieldError("email", "Invalid email format");
        setUpdating(false);
        return;
      } else {
        closeFieldError("email");
      }

      const payload = {
        email: `${sanitizedDetails.email}`,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/auth/update/password`,
          payload
        );
        console.log("Update successful:", response.data);
        setUpdating(false);
        navigateTo("/update/completed");
      } catch (err) {
        setUpdating(false);

        console.error("update error:", err);

        const errMessage =
          err?.response?.data?.error?.message ||
          "We couldn't process your request at the moment. Please try again shortly.";

        setErrorMessage(errMessage);
      }
    }, 1000);
  };

  return (
    <>
      <div className="flex gap-[15px] min-h-svh bg-black">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex border-b lg:px-[2%] md:px-[2.5%] p-[15px] border-tradeAshLight">
            <p className="  text-[17px] text-white font-[700]">
              Update Email Address
            </p>
          </div>
          <form onSubmit={handleSubmitChange}>
            <div className="w-full h-full flex flex-col  lg:py-[50px] md:py-[50px] p-[15px] md:justify-center md:items-center">
              <div className="flex flex-col md:w-[400px] w-full md:gap-[30px] gap-[30px]">
                <div
                  className={` ${
                    errorMessage ? "flex" : "hidden"
                  } w-full p-[12px] text-red-500 gap-[4px] items-center border  border-red-500 rounded-[10px]`}
                >
                  <IoWarning className="text-[14px]" />
                  <p className="text-[13px]">{errorMessage}</p>
                </div>
                <div className="flex flex-col gap-[30px]">
                  <div className="w-full flex flex-col gap-[2px]">
                    <div className="flex flex-col">
                      <p className="text-[14px] font-[600] text-white">
                        Email Address
                      </p>
                      <input
                        className={`${
                          email ? "border-tradeGreen" : "border-tradeAshLight"
                        } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                        type="text"
                        name="username"
                        placeholder="eg. John"
                        onChange={handleUsernameChange}
                      />
                    </div>
                    <div
                      className={`${
                        fieldError.email.error ? "flex" : "hidden"
                      } gap-[4px] items-center text-red-500 mt-[4px]`}
                    >
                      <IoWarning className="text-[14px]" />
                      <p className="text-[12px]">{fieldError.email.message}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-tradeFadeWhite text-[14px] font-semibold">
                    Please note:
                  </p>
                  <ul className="list-disc list-inside text-tradeFadeWhite text-[13px] space-y-1 mt-1">
                    <li>You can only change your name once.</li>
                    <li>Ensure the new name matches your legal identity.</li>
                    <li>Once changed, this action cannot be undone.</li>
                    <li>
                      A password confirmation will be required to proceed.
                    </li>
                  </ul>
                </div>

                <div className="flex md:flex-row flex-col gap-[20px]">
                  <div
                    className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[10px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo(location?.state?.from || -1)}
                  >
                    <p className="text-[14px] font-[700] ">Cancel</p>
                  </div>
                  <button
                    className={` ${
                      updating
                        ? "bg-tradeAsh text-tradeGreen"
                        : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                    } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
                  >
                    <p className="text-[14px] font-[700]">
                      {updating ? "Updating..." : "Update"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
