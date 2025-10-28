import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

const LevelZero = ({ upgrade }) => {
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

      <div className="flex flex-col gap-1">
        <div className="flex gap-3 items-center ">
          <div className=" border-t border-tradeAshLight flex-1 "></div>
          <p className="text-white font-bold text-sm">KYC LEVEL BENEFIT</p>
          <div className=" border-t border-tradeAshLight flex-1"></div>
        </div>
        <div className="flex-1 flex flex-col gap-1 items-center justify-center">
          <p className="text-tradeFadeWhite font-medium text-xs text-center">
            The higher the level, the higher the transaction limit
          </p>

          {/* <p className="text-tradeFadeWhite font-medium text-xs text-center">
            The higher the level, the higher the transaction limit
          </p> */}
        </div>
      </div>

      <div className=" flex flex-col bg-tradeAshLight border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 1
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
              #2,000,000.00
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
                Full Name
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Date of Birth
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Gender
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Verified Phone
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col bg-tradeAshLight border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 2
            </p>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
              Daily Transaction Limit
            </p>

            <p className="text-lg font-bold text-white leading-none">
              #5,000,000.00
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
                Verified BVN
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Verified NIN
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col bg-tradeAshLight border border-tradeAshLight rounded-[15px] p-[10px] gap-[15px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[15px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 3
            </p>
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
                Verified NIN Photo
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button variant="secondary" onClick={() => navigateTo("/kyc/tier/1")}>
        UPGRADE LEVEL
      </Button>
    </div>
  );
};

export default LevelZero;
