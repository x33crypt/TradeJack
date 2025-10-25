import React from "react";
import image from "../../../assets/landingImg4.JPG";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import Loading from "@/components/others/Loading";
import { RiShare2Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineShareLocation } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { BsPatchCheckFill } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";

const Hero = ({ loading, account }) => {
  console.log(account);

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          ABOUT
        </p>
      </div>

      <div className="flex border-neutral-800">
        <div className="flex flex-1  flex-row justify-between gap-[5px">
          <div className="md:hidden text-white text-[20px] p-1 w-max h-max bg-tradeAshLight border border-tradeAshExtraLight rounded-[10px]">
            <RiShare2Fill />
          </div>

          <div className="flex flex-col md:flex-row gap-[15px] items-center justify-center">
            <div className="relative flex overflow-hidden shrink-0 justify-center items-center cursor-pointer">
              <div>
                {account?.profilePhotoUrl ? (
                  <div className="md:w-[140px] w-[120px] rounded-full overflow-hidden cursor-pointer">
                    <img src={image} alt="" className="" />
                  </div>
                ) : (
                  <div className="md:w-[140px] w-[120px] rounded-full overflow-hidden cursor-pointer">
                    <img src={image} alt="" className="" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[20px]">
                <TbCameraPlus className="text-white text-[40px]" />
              </div>
            </div>

            <div className="flex  flex-col justify-center items-center md:items-start gap-3">
              <div className="flex flex-col gap-3 items-center md:items-start">
                <p className="mt-0 text-white lg:text-[35px] md:text-[30px] text-[25px] font-[900] leading-none ">
                  {/* <span className="text-tradeFadeWhite">@</span> */}
                  {account?.username ?? "username"}
                </p>
              </div>

              <div className="flex gap-1 flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <div className="flex  gap-1 items-center ">
                    <MdOutlineShareLocation className=" flex text-tradeFadeWhite text-[16px] leading-none" />
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
                          ? "text-tradeFadeWhite"
                          : account?.status === "last seen"
                          ? "text-tradeFadeWhite"
                          : "text-tradeFadeWhite"
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
                  <LuCalendarClock className=" lg:flex hidden text-tradeFadeWhite text-[14px] leading-none" />
                  <p className=" text-[13px] font-medium text-tradeFadeWhite">
                    Joined{" "}
                    <span className="font-semibold text-white">
                      {account?.memberSinceMonths ?? "0"} month
                    </span>{" "}
                    ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:justify-cente justify-start">
            <div className="md:flex hidden text-white text-[20px] p-1 w-max h-max bg-tradeAshLight border border-tradeAshExtraLight rounded-[10px]">
              <RiShare2Fill />
            </div>
            <div className="flex items-center text-tradeGreen border border-tradeAshExtraLight text-[20px] p-1 w-max h-max bg-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <BsPatchCheckFill />
            </div>
            <div className="flex lg:hidden text-white border border-tradeAshExtraLight text-[20px] p-1 w-max h-max bg-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FiMoreVertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
