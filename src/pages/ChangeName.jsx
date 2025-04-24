import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { IoWarning } from "react-icons/io5";
import useSafeNavigate from "@/components/SafeNavigation";
import { useAuth } from "../context/AuthContext";

const ChangeName = () => {
  const { isVerified, setIsVerified } = useAuth();
  const [changeDetails, setChangeDetails] = useState({
    firstname: "",
    lastname: "",
  });

  const [fieldError, setFieldError] = useState({
    firstname: { error: false, message: "" },
    lastname: { error: false, message: "" },
  });

  const [updating, setUpdating] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  console.log(changeDetails);

  const navigateTo = useSafeNavigate();

  useEffect(() => {
    if (!isVerified) {
      navigateTo("/account/auth/verify", {
        state: { from: "/account/update/email" },
      });
    }
  }, [isVerified, navigateTo]);

  const handleFirstnameChange = (e) => {
    setChangeDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setChangeDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
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
      firstname: sanitizeInput(changeDetails.firstname),
      lastname: sanitizeInput(changeDetails.lastname),
    };

    setTimeout(async () => {
      const requiredFields = ["firstname", "lastname"];

      for (let field of requiredFields) {
        if (!sanitizedDetails[field]) {
          showFieldError(field, "Input field is required");
          setUpdating(false);
          return;
        } else {
          closeFieldError(field);
        }
      }

      const payload = {
        fullname: `${sanitizedDetails.firstname} ${sanitizedDetails.lastname}`,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/auth/update/fullname`,
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
            <p className="  text-[17px] text-white font-[700]">Profile Name</p>
          </div>
          <form className="h-full" onSubmit={handleSubmitChange}>
            <div className="w-full h-full flex flex-col lg:py-[50px] md:py-[50px] p-[15px] md:justify-center md:items-center">
              <div className="flex flex-col justify-between md:w-[400px] w-full h-full md:gap-[30px] gap-[30px]">
                <div className=" flex flex-col w-full gap-[30px]">
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
                          First Name
                        </p>
                        <input
                          className={`${
                            changeDetails.firstname
                              ? "border-tradeGreen"
                              : "border-tradeAshLight"
                          } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                          type="text"
                          name="firstname"
                          placeholder="eg. John"
                          onChange={handleFirstnameChange}
                        />
                      </div>
                      
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

                    <div className="w-full flex flex-col gap-[2px]">
                      <div className="flex flex-col">
                        <p className="text-[14px] text-white font-[600]">
                          Last Name
                        </p>
                        <input
                          className={`${
                            changeDetails.lastname
                              ? "border-tradeGreen"
                              : "border-tradeAshLight"
                          } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                          type="text"
                          name="lastname"
                          placeholder="eg. Doe"
                          onChange={handleLastnameChange}
                        />
                      </div>
                      <div
                        className={`${
                          fieldError.lastname.error ? "flex" : "hidden"
                        } gap-[4px] items-center text-red-500 mt-[4px]`}
                      >
                        <IoWarning className="text-[14px]" />
                        <p className="text-[12px]">
                          {fieldError.lastname.message}
                        </p>
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
                </div>

                <div className="flex md:flex-row flex-col gap-[20px]">
                  <div
                    className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
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

export default ChangeName;
