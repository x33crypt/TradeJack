import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import Stepper from "@/components/Steppers";
import { useKyc } from "@/context/KycContext";
import { useSelectElement } from "@/context/SelectElementContext";

const KycVerificationStep1 = () => {
  const { select, setSelect } = useSelectElement();
  const { kycDetails, setKycDetails } = useKyc();
  const { toast, setToast } = useToast();

  const handleFirstnameChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setKycDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-");

    setKycDetails((prev) => ({
      ...prev,
      dateOfBirth: {
        year,
        month,
        date: day,
      },
    }));
  };

  // handleGenderChange
  useEffect(() => {
    if (
      select?.page !== "kyc verification" ||
      select?.element !== "gender" ||
      !select?.pick
    )
      return;

    setKycDetails((prevDetails) => ({
      ...prevDetails,
      gender: select.pick,
    }));
  }, [select]);

  console.log(kycDetails);

  const gender = ["Male", "Female"];

  const navigateTo = useNavigate();

  const handleToStep2 = () => {
    const { firstname, lastname, email, dateOfBirth, gender } = kycDetails;

    if (!firstname) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: First Name",
      });
      return;
    }

    if (!lastname) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Last Name",
      });
      return;
    }

    if (!email) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Email Address",
      });
      return;
    }

    if (!dateOfBirth?.year || !dateOfBirth?.month || !dateOfBirth?.date) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Date of Birth",
      });
      return;
    }

    if (!gender) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Gender",
      });
      return;
    }

    return navigateTo("/account/settings/kycVerification/step2");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[2.5%] min-h-svh bg-black">
        <div className="z-20 fixed lg:right-[2.5%] md:right[2%] right-[2.5%]  lg:left-[2.5%] md:left[2%] left-[2.5%] bg-black flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <IoMdArrowRoundBack
              onClick={() => navigateTo(location?.state?.from || -1)}
              className="text-tradeFadeWhite text-[20px] cursor-pointer"
            />
            <p className="  text-base text-white font-[700]">
              KYC Verification
            </p>
          </div>
        </div>
        <div className="flex-1 mt-[70px] flex flex-col md:justify-center md:items-center">
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px]">
              <div className="flex flex-col gap-5">
                <p className="text-2xl text-white font-[700] ">Step 1.</p>
                <Stepper totalSteps={3} currentStep={1} />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <p className="  text-xl text-white font-[700]">
                  Personal Information
                </p>
                <p className="text-xs text-white">
                  Please provide your accurate information
                </p>
              </div>
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-[600] text-white">First Name</p>
                  <input
                    className={`${
                      kycDetails.firstname
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="firstname"
                    placeholder="eg. John"
                    value={kycDetails.firstname}
                    onChange={handleFirstnameChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Last Name</p>
                  <input
                    className={`${
                      kycDetails.lastname
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="lastname"
                    placeholder="eg. Doe"
                    value={kycDetails.lastname}
                    onChange={handleLastnameChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Email Address</p>
                  <input
                    className={`${
                      kycDetails.email
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                    type="text"
                    name="email"
                    placeholder="eg. Johndoe@gmail.com"
                    value={kycDetails.email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Date of Birth</p>
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Select your birth date"
                    value={
                      kycDetails.dateOfBirth.year &&
                      kycDetails.dateOfBirth.month &&
                      kycDetails.dateOfBirth.date
                        ? `${kycDetails.dateOfBirth.year}-${kycDetails.dateOfBirth.month}-${kycDetails.dateOfBirth.date}`
                        : ""
                    }
                    onChange={handleDateChange}
                    className={`${
                      kycDetails.dateOfBirth.year
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    }  appearance-none mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-white font-[600]">Gender</p>
                  <div className="relative w-full cursor-pointer ">
                    <input
                      className={`${
                        kycDetails?.gender
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select gender"
                      value={kycDetails?.gender}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "gender",
                          options: gender,
                          pick: "",
                          page: "kyc verification",
                        })
                      }
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-[20px]">
              <div
                className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={() => navigateTo("/account/settings/kycVerification")}
              >
                <p className="text-sm font-[700] ">Cancel</p>
              </div>

              <button
                onClick={() => handleToStep2()}
                className="bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300"
              >
                <p className="text-sm font-[700]">Continue</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerificationStep1;
