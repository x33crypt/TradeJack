import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiEye2Fill } from "react-icons/ri";
import { GiTopHat } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import image from "../../../assets/landingImg4.JPG";
import { FaUserFriends } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaCalendarCheck } from "react-icons/fa";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";
import { RiShare2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineUpdate } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

const HeroEdit = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

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
                  {profile?.userName ? (
                    <img
                      className="rounded-[10px] w-full h-auto"
                      src={image}
                      alt=""
                    />
                  ) : (
                    <FaUserCircle className="text-tradeAshLight lg:text-[170px] md:text-[160px] text-[120px]" />
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
                  {profile?.userName ? profile?.userName : "username"}
                </p>

                {profile && (
                  <div className="flex gap-[4px] items-center w-max px-[6px] py-[1px] bg-tradeOrange/10 border border-tradeOrange rounded-[10px]">
                    <GiTopHat className="text-[14px] text-tradeOrange" />
                    <p className="text-xs text-tradeOrange font-semibold">5x</p>
                    <p className="text-xs font-semibold text-white">
                      Master Trader
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-1 flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <div className="flex  gap-1 items-center ">
                    <HiLocationMarker className=" flex text-tradeFadeWhite text-[14px] leading-none" />
                    <p className=" text-[13px] font-semibold text-white">
                      {profile ? "Nigeria" : "Clouds"}
                    </p>
                  </div>

                  <div className="flex  gap-1 items-center ">
                    <FaCircle
                      className={`${
                        profile?.status === "online"
                          ? "text-tradeGreen"
                          : profile?.status === "offline"
                          ? "text-tradeAshExtraLight"
                          : profile?.status === "last seen"
                          ? "text-tradeOrange"
                          : "text-tradeAshExtraLight"
                      } flex  text-[11px] leading-none`}
                    />
                    <p className="mt-0 text-white text-[13px] font-semibold">
                      {profile?.status
                        ? capitalizeFirst(profile?.status)
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 items-center ">
                  <FaCalendarCheck className=" lg:flex hidden text-tradeFadeWhite text-[12px] leading-none" />
                  <p className=" text-[13px] font-medium text-tradeFadeWhite">
                    Joined{" "}
                    <span className="font-semibold text-white">
                      {profile?.accAgeInMonths ? profile?.accAgeInMonths : "0"}{" "}
                      month
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
            <div className="text-tradeOrange border border-tradeOrange text-[20px] p-2 bg-tradeOrange/20 rounded-[10px]">
              <MdOutlineUpdate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEdit;
