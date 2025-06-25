import React from "react";
import { GiTopHat } from "react-icons/gi";
import { RiEye2Fill } from "react-icons/ri";
import { MdThumbUpAlt, MdOutlineGppGood } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdThumbDownAlt } from "react-icons/md";
import image from "../../../assets/landingImg4.JPG";
import { FaCircleCheck } from "react-icons/fa6";

const AboutVendor = () => {
  return (
    <div className="flex-1 flex flex-col h-full md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">About Vendor</p>
      </div>

      <div className="flex-1 flex flex-col  bg-tradeAs">
        <div className="flex p-[15px] gap-[10px] bg-tradeAshLigh">
          <div className="flex-shrink-0 relative flex lg:w-[80px] md:w-[80px] w-[80px]">
            <img className="rounded-full" src={image} alt="" />
          </div>
          <div className="flex w-full flex-col justify-center gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center text-tradeOrange">
                <p className=" text-xs font-bold">Master Trader</p>
                <GiTopHat />
              </div>

              <p className="mt-0 text-white lg:text-[20px] md:text-[25px] text-[20px] font-[900] leading-none ">
                <span className="text-tradeFadeWhite">@</span>Saneghxst
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex  gap-1 items-center ">
                <FaLocationDot className=" flex text-tradeOrange text-xs leading-none" />
                <p className=" text-xs font-[600] text-white">Nigeria</p>
              </div>

              <div className="flex  gap-1 items-center ">
                <RiEye2Fill className=" flex text-tradeGreen text-xs leading-none" />
                <p className="mt-0 text-tradeGreen text-xs  font-[600]">
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid md:grid-cols-4 grid-cols-2  flex-wrap items-center md:border-t border-tradeAshLight">
          <div className="flex flex-1 px-[15px] py-[12px] flex-col gap-2 md:border-r border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Positive Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-[#00de82]/30 ">
                <MdThumbUpAlt className="text-tradeGreen text-xs leading-none" />
              </div>

              <p
                id="positive"
                className="text-[18px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className="flex flex-1 px-[15px] py-[12px] flex-col gap-2 md:border-r border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Negative Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-red-600/30">
                <MdThumbDownAlt className="text-red-600 text-xs leading-none" />
              </div>

              <p
                id="negative"
                className="text-[18px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className="flex flex-1 px-[15px] py-[12px] flex-col gap-2 md:border-r border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-bold">Trust Score</p>
            <div className="flex gap-2">
              <div className="p-1  rounded-full bg-tradeOrange/30">
                <MdOutlineGppGood className="text-tradeOrange text-xs leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] text-white font-[900] leading-none"
              >
                0%
              </p>
            </div>
          </div>

          <div className="flex flex-1 px-[15px] py-[12px] flex-col gap-2 ">
            <p className="text-tradeFadeWhite text-xs font-bold">KYC Status</p>
            <div className="flex gap-2">
              <div className="px-1 py-1 rounded-full bg-[#00de82]/30 ">
                <FaCircleCheck className="text-tradeGreen text-xs leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] text-white font-[900] leading-none"
              >
                Verified
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVendor;
