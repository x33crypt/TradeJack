import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import Stepper from "@/components/Steppers";
import { useKyc } from "@/context/KycContext";
import { useSelectElement } from "@/context/SelectElementContext";
import Button from "@/components/buttons/Button";

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

  const nextButton = () => {
    const { firstname, lastname, dateOfBirth, gender } = kycDetails;

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

  const cancelButton = () => {
    navigateTo("/account/settings/kycVerification");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-svh bg-black">
        <div className="z-20 fixed  right-0  left-0 lg:px-[2%] md:px-[2.5%] px-[15px] py-[15px] top-[60px] md:top-[65px] bg-black flex items-center gap-4 border-b border-tradeAshLight">
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
          <div className="flex-1 md:flex-none flex flex-col justify-between md:justify-normal md:w-[600px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full gap-[30px] ]">
              <div className="flex flex-col gap-5">
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

              <div className="flex md:grid grid-cols-2 flex-col gap-[30px] items-center">
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
            <div className=" flex md:flex-row flex-col-reverse gap-[15px] justify-center items-center">
              <Button onClick={cancelButton} variant="outline">
                Go Back
              </Button>

              <Button onClick={nextButton} variant="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerificationStep1;
