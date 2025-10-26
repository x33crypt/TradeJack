import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

const LevelTwo = ({ upgrade }) => {
  const [showOneDetails, setShowOneDetails] = useState(false);
  const [showTwoDetails, setShowTwoDetails] = useState(false);

  const navigateTo = useNavigate();

  return (
    <div className="flex flex-col gap-[30px]">
      <div className={`${upgrade === null ? "hidden" : "flex"}`}>
        {upgrade?.status === "processing" ? (
          <div className="flex flex-1 p-2 rounded-[5px] items-center justify-between bg-tradeAshLight">
            <div className="flex gap-2 items-center">
              <LuScanText className="text-base text-tradeOrange" />
              <p className="text-xs font-medium text-tradeOrange">
               {upgrade?.comment}
              </p>
            </div>
            <MdOutlineKeyboardArrowRight className="text-lg text-tradeOrange cursor-pointer" />
          </div>
        ) : upgrade?.status === "failed" ? (
          <div className="flex flex-1 p-2 rounded-[5px] items-center justify-between bg-red-600">
            <div className="flex gap-2 items-center">
              <IoCloseCircle className="text-base text-white" />
              <p className="text-xs font-semibold text-white">
                {upgrade?.comment}
              </p>
            </div>
            <MdOutlineKeyboardArrowRight className="text-lg text-white cursor-pointer" />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className=" flex flex-col bg-tradeOrange border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-black text-base font-bold  flex items-center gap-1">
              Tier 2
            </p>

            <div className="bg-black text-tradeOrange p-1 rounded-[5px] ">
              <p className="text-xs font-semibold">Current</p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-xs text-tradeFadeblack font-semibold leading-none w-max">
              Daily Transaction Limit
            </p>

            <p className="text-lg font-bold text-black leading-none">
              #5,000,000.00
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <p className="text-xs text-tradeFadeblack font-semibold leading-none w-max">
            Requirements
          </p>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-[10px]">
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeblack" />
              <p className="text-[13px] text-black font-semibold leading-none">
                Verified BVN
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeblack" />
              <p className="text-[13px] text-black font-semibold leading-none">
                Verified NIN
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[10px] pt-[5px]">
          <p className="text-[13px] text-tradeFadeblack font-semibold leading-none w-max">
            KYC Details
          </p>

          <div
            onClick={() => setShowTwoDetails(!showTwoDetails)}
            className={`${
              showTwoDetails ? "rotate-180" : ""
            } flex p-1 border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
          >
            <FaArrowAltCircleDown className="text-xs text-tradeFadeblack" />
          </div>
        </div>

        <div
          className={`${
            showTwoDetails
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 mt-0"
          }  transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden pb-[5px]`}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between">
              <p className="text-xs text-black font-semibold">BVN</p>
              <p className="text-xs text-black font-semibold">**** *** 0000</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-black font-semibold">NIN</p>
              <p className="text-xs text-black font-semibold">**** *** 0000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-3 items-center ">
          <div className=" border-t border-tradeAshLight flex-1 "></div>
          <p className="text-white font-bold text-sm">KYC LEVEL BENEFIT</p>
          <div className=" border-t border-tradeAshLight flex-1"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-tradeFadeWhite font-medium text-xs text-center">
            The higher the level, the higher the transaction limit
          </p>
        </div>
      </div>

      <div className=" flex flex-col bg-tradeAshLight border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 3
            </p>

            <div className="bg-white text-black p-1 rounded-[5px] ">
              <p className="text-xs font-semibold">Next Level</p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
              Daily Transaction Limit
            </p>

            <p className="text-lg font-bold text-white leading-none">
              Unlimited
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
            Requirements
          </p>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-[10px]">
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Face Recognition
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Proof of Address
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col bg-tradeAshLight border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 1
            </p>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
              Daily Transaction Limit
            </p>

            <p className="text-lg font-bold text-tradeOrange leading-none">
              #2,000,000.00
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
            Requirements
          </p>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-[10px]">
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Full Name
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Date of Birth
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Gender
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaCheckDouble className="text-xs text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Verified Phone
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[10px] pt-[5px]">
          <p className="text-[13px] text-tradeFadeWhite font-semibold leading-none w-max">
            KYC Details
          </p>

          <div
            onClick={() => setShowOneDetails(!showOneDetails)}
            className={`${
              showOneDetails ? "rotate-180" : ""
            } flex p-1 border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
          >
            <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
          </div>
        </div>

        <div
          className={`${
            showOneDetails
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 mt-0"
          }  transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden pb-[5px]`}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between">
              <p className="text-xs text-white font-semibold">Full Name</p>
              <p className="text-xs text-white font-semibold">
                LUKMAN ADEKUNLE ADELEKE
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-white font-semibold">Gender</p>
              <p className="text-xs text-white font-semibold">Male</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-white font-semibold">Date of Birth</p>
              <p className="text-xs text-white font-semibold">Feb **,**</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-white font-semibold">Phone Number</p>
              <p className="text-xs text-white font-semibold">08039921211</p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="secondary" onClick={() => navigateTo("/kyc/tier/3")}>
        UPGRADE LEVEL
      </Button>
    </div>
  );
};

export default LevelTwo;
