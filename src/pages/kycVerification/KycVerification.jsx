import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import { GoDotFill } from "react-icons/go";
import Stepper from "@/components/Steppers";
import { useKyc } from "@/context/KycContext";
import img from "../../../public/Fingerprint-bro.svg";
import Button from "@/components/buttons/Button";

const KycVerification = () => {
  const { kycDetails, setKycDetails } = useKyc();

  const handleFirstnameChange = (e) => {
    setNameDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLastnameChange = (e) => {
    setNameDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setNameDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const navigateTo = useNavigate();

  const nextButton = () => {
    navigateTo("/account/settings/kycVerification/step1");
  };

  const cancelButton = () => {
    // setKycDetails((prevDetails) => ({
    //   ...prevDetails,
    //   gender: select.pick,
    // }));

    navigateTo("/account/profile");
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[2.5%] min-h-svh bg-black">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-between md:w-[400px] w-full h-full gap-[30px]">
            <div className=" flex flex-col w-full items-center gap-[20px]">
              <div className="w-[150px] ">
                <img src={img} alt="" />
              </div>

              <div className="flex flex-col gap-2 items-center max-w-[300px]">
                <p className="text-white text-xl font-bold">
                  Identity Verification
                </p>
                <p className="text-white text-[13px] text-center ">
                  To help keep your account secure and meet regulatory
                  requirements, we need to verify your identity.{" "}
                  <span className="font-bold">It only takes 5 minutes!</span>
                </p>
              </div>
            </div>

            <div className=" flex md:flex-row flex-col-reverse gap-[15px] justify-center items-center">
              <Button
                onClick={cancelButton}
                variant="outline"
                maxWidth="max-w-[250px]"
              >
                Cancel
              </Button>

              <Button
                onClick={nextButton}
                variant="primary"
                maxWidth="max-w-[250px]"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerification;
