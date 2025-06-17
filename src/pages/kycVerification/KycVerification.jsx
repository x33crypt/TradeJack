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

  return (
    <>
      <InAppNav />
      <div className="md:pt-[63px] pt-[60px] flex flex-col gap-[15px] lg:px-[2%] md:px-[2.5%] p-[2.5%] min-h-svh bg-black">
        <div className="z-20 fixed lg:right-[2.5%] md:right[2%] right-[2.5%]  lg:left-[2.5%] md:left[2%] left-[2.5%] bg-black flex items-center gap-4 border-b  py-[15px] border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <IoMdArrowRoundBack
              onClick={() => navigateTo("/account/profile")}
              className="text-tradeFadeWhite text-[20px] cursor-pointer"
            />
            <p className="  text-base text-white font-[700]">
              KYC Verification
            </p>
          </div>
        </div>
        <div className="flex-1 mt-[70px] flex flex-col md:justify-center items-center">
          <div className="flex flex-col justify-between md:w-[400px] w-full h-full gap-[30px] ">
            <div className=" flex flex-col w-full items-center gap-[20px]">
              <div className="w-[180px] ">
                <img src={img} alt="" />
              </div>

              <div className="flex flex-col gap-2 items-center">
                <p className="text-white text-xl font-bold">
                  Identity Verification
                </p>
                <p className="text-white text-[13px] text-center">
                  To help keep your account secure and meet regulatory
                  requirements, we need to verify your identity.{" "}
                  <span className="font-bold">It only takes 5 minutes!</span>
                </p>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-[20px]">
              <button
                onClick={() =>
                  navigateTo("/account/settings/kycVerification/step1")
                }
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

export default KycVerification;
