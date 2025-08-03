import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiEye2Fill } from "react-icons/ri";
import { GiTopHat } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import image from "../../../assets/landingImg4.JPG";
import { FaUserFriends } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";

const HeroEdit = ({ profile }) => {
  return (
    <div className="flex p-[15px] h-max border-b border-neutral-800">
      <div className="flex flex-1 md:flex-row flex-col  justify-between items-center gap-[5px] p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
        <div className="flex flex-col md:flex-row gap-[15px] items-center">
          <div className="relative flex md:w-[180px] w-[150px] shrink-0 justify-center cursor-pointer">
            <img className="rounded-full w-full h-auto" src={image} alt="" />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <TbCameraPlus className="text-white text-[40px]" />
            </div>
          </div>

          <div className="flex  flex-col justify-center items-center md:items-start gap-3">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <p className="mt-0 text-white lg:text-[40px] md:text-[40px] text-[25px] font-[900] leading-none ">
                <span className="text-tradeFadeWhite">@</span>
                {profile?.userName}
              </p>
              <div className="flex gap-[4px] items-center w-max px-[6px] py-[1px] bg-tradeOrange/10 rounded-[10px]">
                <GiTopHat className="text-[14px] text-tradeOrange" />
                <p className="text-xs text-tradeOrange font-semibold">5x</p>
                <p className="text-xs font-semibold text-white">
                  Master Trader
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex  gap-1 items-center ">
                <FaLocationDot className=" flex text-tradeOrange text-xs leading-none" />
                <p className=" text-[13px] font-[600] text-white">
                  {profile?.kycDetails?.address?.country}
                </p>
              </div>

              <div className="flex  gap-1 items-center ">
                <RiEye2Fill className=" flex text-tradeGreen text-xs leading-none" />
                <p className="mt-0 text-tradeGreen text-[13px]  font-[600]">
                  {profile?.status}
                </p>
              </div>

              <div className="flex  gap-1 items-center ">
                <p className=" text-[13px] font-[600] text-tradeFadeWhite">
                  Joined{" "}
                  <span className="font-[700] text-white">
                    {profile?.accAgeInMonths} Months
                  </span>{" "}
                  ago
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] p-[15px]">
          <div className="flex items-center text-black text-[25px]  gap-2 p-2  bg-tradeGreen rounded-full ">
            <IoLink className=" " />
          </div>

          <div className="flex items-center text-black text-[25px]  gap-2 p-2  bg-tradeGreen rounded-full ">
            <FiMoreHorizontal className=" " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEdit;
