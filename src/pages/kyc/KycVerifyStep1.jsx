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
import SideNav from "@/components/account/nav/SideNav";
import Footer from "@/components/Footer";

const KycVerifyStep1 = () => {
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
    const { firstname, lastname, email, gender } = kycDetails;

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

    if (!gender) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Gender",
      });
      return;
    }

    return navigateTo("/account/settings/kycVerify/step2");
  };

  const cancelButton = () => {
    navigateTo("/account/settings/kycStatus");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <SideNav />

        <div className="flex flex-col flex-1  md:border-x md:border-b md:border-t border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-[700]">KYC Verification</p>
          </div>

          <div className="flex flex-col h-full gap-[10px] p-[15px] items-center justify-between bg-tradePurpl">
            <div className="flex flex-col gap-[30px] w-full lg:w-max">
              <div className="flex flex-col gap-5 lg:w-[550px] w-full">
                <Stepper totalSteps={3} currentStep={1} />
              </div>
              <div className="flex flex-col lg:w-[550px] w-full gap-[30px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                <div className="flex flex-col gap-1 w-full">
                  <p className="  text-xl text-white font-[700]">
                    Personal Information
                  </p>
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    Please provide your accurate information
                  </p>
                </div>

                <div className="flex md:grid grid-cols-2 flex-col gap-[15px] bg-tradeAsh  ">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-tradeFadeWhite">
                      First Name
                    </p>
                    <input
                      className={`${
                        kycDetails.firstname
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="firstname"
                      placeholder="eg. John"
                      value={kycDetails.firstname}
                      onChange={handleFirstnameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      Last Name
                    </p>
                    <input
                      className={`${
                        kycDetails.lastname
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="lastname"
                      placeholder="eg. Doe"
                      value={kycDetails.lastname}
                      onChange={handleLastnameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      Email Address
                    </p>
                    <input
                      className={`${
                        kycDetails.lastname
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px]`}
                      type="text"
                      name="email"
                      placeholder="e.g. john.doe@example.com"
                      value={kycDetails.email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      Gender
                    </p>
                    <div className="relative w-full cursor-pointer ">
                      <input
                        className={`${
                          kycDetails?.gender
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[13px] text-white placeholder:text-tradeFadeWhite font-medium bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
            </div>

            <div className="lg:w-[550px] w-full flex md:flex-row flex-col-reverse gap-[10px] justify-center items-center bg-tradeAs p-[12px rounded-[15px]">
              <Button onClick={cancelButton} variant="Fadeout">
                Cancel
              </Button>

              <Button onClick={nextButton} variant="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default KycVerifyStep1;
