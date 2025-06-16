import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiEye2Fill } from "react-icons/ri";
import { GiTopHat } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import image from "../../assets/landingImg4.JPG";

const HeroEdit = () => {
  return (
    <div className="flex-1 bg-tradeGree flex-shrink-0 flex flex-col md:flex-row md:gap-[20px] gap-[20px] items-center md:pr-[15px] ">
      <div className="relative flex lg:w-[200px] md:w-[170px] w-[150px] shrink-0 justify-center cursor-pointer">
        <img className="rounded-full w-full h-auto" src={image} alt="" />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          <TbCameraPlus className="text-white text-[40px]" />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-4 flex-shrink-0">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center text-tradeOrange">
            <p className=" text-sm font-bold">Master Trader</p>
            <GiTopHat />
          </div>

          <p className="mt-0 text-white lg:text-[40px] md:text-[40px] text-[25px] font-[900] leading-none ">
            <span className="text-tradeFadeWhite">@</span>Saneghxst
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex  gap-1 items-center ">
            <p className=" text-sm font-[600] text-tradeFadeWhite">
              Joined <span className="font-[700] text-white">4 Months</span> ago
            </p>
          </div>

          <div className="flex  gap-1 items-center ">
            <FaLocationDot className=" flex text-tradeOrange text-xs leading-none" />
            <p className=" text-sm font-[600] text-white">Nigeria</p>
          </div>

          <div className="flex  gap-1 items-center ">
            <RiEye2Fill className=" flex text-tradeGreen text-xs leading-none" />
            <p className="mt-0 text-tradeGreen text-sm  font-[600]">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEdit;
