import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import InAppNav from "@/components/InAppNav";

const Kyc = () => {
  const navigateTo = useNavigate();

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
            <p className="  text-base text-white font-[700]">KYC Level</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kyc;
