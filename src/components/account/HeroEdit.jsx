import React from "react";
import { TbCameraPlus } from "react-icons/tb";
import image from "../../assets/landingImg4.JPG";
import { FaCalendarCheck } from "react-icons/fa";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { RiShare2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { TbClockEdit } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const HeroEdit = ({ account }) => {
  console.log(account);

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Account</p>
      </div>
      <div className="flex p-[15px] border-neutral-800">
        <div className="flex flex-1  flex-row justify-between gap-[5px">
          <div className="md:hidden text-white text-[20px] p-2 w-max h-max bg-tradeAshLight border border-tradeAshExtraLight rounded-[10px]">
            <RiShare2Fill />
          </div>

          <div className="flex flex-col md:flex-row gap-[15px] items-center justify-center">
            <div className="">
              <div className="relative flex md:w-[150px] md:h-[145px]  w-[120px] h-[115px] border-[2px] border-tradeAshExtraLight rounded-[20px] overflow-hidden shrink-0 justify-center items-center cursor-pointer">
                <div>
                  {account?.username ? (
                    <img
                      className="rounded-[10px] w-full h-auto"
                      src={image}
                      alt=""
                    />
                  ) : (
                    <FaUser className="text-tradeAshLight  md:text-[120px] text-[100px]" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[20px]">
                  <TbCameraPlus className="text-white text-[40px]" />
                </div>
              </div>
            </div>

            <div className="flex  flex-col justify-center items-center md:items-start gap-3">
              <div className="flex flex-col gap-3 items-center md:items-start">
                <p className="mt-0 text-white lg:text-[35px] md:text-[30px] text-[25px] font-[900] leading-none ">
                  <span className="text-tradeFadeWhite">@</span>
                  {account?.username ?? "username"}
                </p>
              </div>

              <div className="flex gap-1 flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <div className="flex  gap-1 items-center ">
                    <HiLocationMarker className=" flex text-tradeFadeWhite text-[14px] leading-none" />
                    <p className=" text-[13px] font-semibold text-white">
                      {account?.country ?? "Clouds"}
                    </p>
                  </div>

                  <div className="flex  gap-1 items-center ">
                    <FaCircle
                      className={`${
                        account?.status === "online"
                          ? "text-tradeGreen"
                          : account?.status === "offline"
                          ? "text-tradeAshExtraLight"
                          : account?.status === "last seen"
                          ? "text-tradeOrange"
                          : "text-tradeAshExtraLight"
                      } flex  text-[11px] leading-none`}
                    />
                    <p className="mt-0 text-white text-[13px] font-semibold">
                      {account?.status
                        ? capitalizeFirst(account?.status)
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 items-center ">
                  <FaCalendarCheck className=" lg:flex hidden text-tradeFadeWhite text-[12px] leading-none" />
                  <p className=" text-[13px] font-medium text-tradeFadeWhite">
                    Joined{" "}
                    <span className="font-semibold text-white">
                      {account?.memberSinceMonths ?? "0"} month(s)
                    </span>{" "}
                    ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:justify-center justify-start">
            <div className="md:flex hidden text-white border border-tradeAshExtraLight text-[20px] p-2 w-max h-max bg-tradeAshLight rounded-[10px]">
              <RiShare2Fill />
            </div>
            <div className="flex items-center text-tradeGreen border border-tradeAshExtraLight text-[20px] p-2 w-max h-max bg-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaUserCheck />
            </div>
            <div className="flex text-white border border-tradeAshExtraLight text-[20px] p-2 w-max h-max bg-tradeAshLight rounded-[10px]">
              <TbClockEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEdit;
