import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiEye2Fill } from "react-icons/ri";
import { GiTopHat } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import image from "../../assets/landingImg4.JPG";

const Hero = () => {
  return (
    <div className="flex-1 bg-tradeGree flex flex-col md:flex-row md:gap-[20px] gap-[20px] items-center ">
      <div className="flex lg:w-[200px] md:w-[170px] w-[150px] shrink-0 justify-center cursor-pointer">
        <img className="rounded-full w-full h-auto" src={image} alt="" />
      </div>

      <div className="flex w-full flex-col justify-center lg:gap-4 md:gap-[10px] gap-4 lg:border-r border-tradeAshLight">
        <div className="flex flex-col gap-1 ">
          <div className="flex gap-1 items-center text-tradeOrange">
            <p className=" text-[13px] font-bold">Master Trader</p>
            <GiTopHat />
          </div>

          <p className="mt-0 text-white lg:text-[40px] md:text-[40px] text-[25px] font-[900] leading-none ">
            <span className="text-tradeFadeWhite">@</span>Saneghxst
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex  gap-1 items-center ">
            <FaLocationDot className=" flex text-tradeFadeWhite text-[13px] leading-none" />
            <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-white">
              Nigeria
            </p>
          </div>

          <div className="flex  gap-1 items-center ">
            <RiEye2Fill className=" flex text-tradeGreen text-[13px] leading-none" />
            <p className="mt-0 text-tradeGreen text-[14px] font-[600]">
              Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
