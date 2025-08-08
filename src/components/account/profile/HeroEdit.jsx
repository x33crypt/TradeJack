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

const HeroEdit = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  return (
    <div className="flex p-[15px] h-max border-neutral-800">
      <div className="flex flex-1  p-[12px] bg-tradeAs borde border-tradeAshLight rounded-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {profile === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-row justify-between items- gap-[5px]">
                <div className="text-white text-[18px] p-2 w-max h-max bg-tradeAshLight rounded-[10px]">
                  <RiShare2Fill />
                </div>

                <div className="flex flex-col md:flex-row gap-[15px] items-center justify-center">
                  <div className="relative flex md:w-[180px] w-[100px] shrink-0 justify-center items-center cursor-pointer">
                    <img
                      className="rounded-full w-full h-auto"
                      src={image}
                      alt=""
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                      <TbCameraPlus className="text-white text-[40px]" />
                    </div>
                  </div>

                  <div className="flex  flex-col justify-center items-center md:items-start gap-3">
                    <div className="flex flex-col gap-3 items-center md:items-start">
                      <p className="mt-0 text-white lg:text-[40px] md:text-[40px] text-[25px] font-[900] leading-none ">
                        <span className="text-tradeFadeWhite">@</span>
                        {profile?.userName}
                      </p>
                      <div className="flex gap-[4px] items-center w-max px-[6px] py-[1px] bg-tradeOrange/10 border border-tradeOrange rounded-[10px]">
                        <GiTopHat className="text-[14px] text-tradeOrange" />
                        <p className="text-xs text-tradeOrange font-semibold">
                          5x
                        </p>
                        <p className="text-xs font-semibold text-white">
                          Master Trader
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex  gap-1 items-center ">
                        <FaLocationDot className=" flex text-tradeOrange text-xs leading-none" />
                        <p className=" text-[13px] font-semibold text-white">
                          {profile?.kycDetails?.address?.country}
                        </p>
                      </div>

                      <div className="flex  gap-1 items-center ">
                        <FaCircle className=" flex text-tradeGreen text-xs leading-none" />
                        <p className="mt-0 text-white text-[13px] font-semibold">
                          {capitalizeFirst(profile?.status)}
                        </p>
                      </div>

                      {/* <div className="flex  gap-1 items-center ">
                        <FaCalendarCheck className=" flex text-tradeAshExtraLight text-sm leading-none" />
                        <p className=" text-[13px] font-medium text-tradeFadeWhite">
                          Joined{" "}
                          <span className="font-semibold text-white">
                            {profile?.accAgeInMonths} month
                          </span>{" "}
                          ago
                        </p>
                      </div> */}
                    </div>

                    {/* <div className="flex gap-1 items-center ">
                      <FaEdit className=" flex text-tradeAshExtraLight text-sm leading-none" />
                      <p className=" text-[13px] font-semibold text-tradeFadeWhite">
                        16th May, 2025 - 14:20:25
                      </p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-white text-[18px]  p-2 bg-tradeAshLight rounded-[10px]">
                    <IoSettingsSharp />
                  </div>
                  <div className="text-tradeOrange text-[18px]  p-2 bg-tradeAshLight rounded-[10px]">
                    <IoSettingsSharp />
                  </div>
                </div>

                {/* <div className="flex gap-[10px] md:p-[15px]">
                  <div className="flex items-center text-black text-[25px]  gap-2 p-2  bg-tradeGreen rounded-full ">
                    <IoLink className=" " />
                  </div>

                  <div className="flex items-center text-black text-[25px]  gap-2 p-2  bg-tradeGreen rounded-full ">
                    <FiMoreHorizontal className=" " />
                  </div>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroEdit;
