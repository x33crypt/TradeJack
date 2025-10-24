import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";

const LevelOne = ({ level }) => {
  return (
    <div
      className={` ${
        level === 1 ? "bg-tradeOrange" : "bg-tradeAsh"
      } flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[10px] gap-[10px]`}
    >
      <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
        <div className="flex items-center  gap-2">
          <p
            className={`text-white text-base font-bold  flex items-center gap-1`}
          >
            Tier 1 - Basic KYC
          </p>

          <div className={`bg-tradeOrange text-black p-1 rounded-[5px] `}>
            <p className={`text-xs font-semibold`}>Current</p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
            Daily Transaction Limit
          </p>

          <p className="text-lg font-bold text-tradeOrange leading-none">
            #500,000.00
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
        <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
          Requirements
        </p>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-[10px]">
          <div className="flex items-center gap-1">
            <FaCheckDouble className="text-sm text-tradeFadeWhite" />
            <p className="text-[13px] text-white font-semibold leading-none">
              Full Name
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaCheckDouble className="text-sm text-tradeFadeWhite" />
            <p className="text-[13px] text-white font-semibold leading-none">
              Date of Birth
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaCheckDouble className="text-sm text-tradeFadeWhite" />
            <p className="text-[13px] text-white font-semibold leading-none">
              Address
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaCheckDouble className="text-sm text-tradeFadeWhite" />
            <p className="text-[13px] text-white font-semibold leading-none">
              Verified Phone
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-[10px] pb-[10px]">
        <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
          KYC Details
        </p>

        <div className="flex p-1 border border-tradeAshExtraLight rounded-full  items-center gap-1">
          <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
        </div>
      </div>
    </div>
  );
};

export default LevelOne;
