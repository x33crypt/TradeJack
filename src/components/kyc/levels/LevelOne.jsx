import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaArrowAltCircleDown } from "react-icons/fa";

const LevelOne = ({ level }) => {
  return (
    <div
      className={` ${
        level === 1 ? "bg-tradeOrange" : "bg-tradeAsh"
      } flex flex-col bg-tradeOrange border border-tradeAshLight rounded-[15px] p-[10px] gap-[10px]`}
    >
      <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
        <div className="flex items-center  gap-2">
          <p
            className={`text-black text-base font-bold  flex items-center gap-1`}
          >
            Tier 1 - Basic KYC
          </p>

          <div className={`bg-black text-tradeOrange p-1 rounded-[5px] `}>
            <p className={`text-xs font-semibold`}>Current</p>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-xs text-black font-semibold leading-none w-max">
            Daily Transaction Limit
          </p>

          <p className="text-lg font-bold text-black leading-none">
            #500,000.00
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
        <p className="text-xs text-black font-semibold leading-none w-max">
          Requirements
        </p>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-[10px]">
          <div className="flex items-center gap-1">
            <GoDotFill className="text-sm text-black" />
            <p className="text-[13px] text-black font-semibold leading-none">
              Full Name
            </p>
          </div>
          <div className="flex items-center gap-1">
            <GoDotFill className="text-sm text-black" />
            <p className="text-[13px] text-black font-semibold leading-none">
              Date of Birth
            </p>
          </div>
          <div className="flex items-center gap-1">
            <GoDotFill className="text-sm text-black" />
            <p className="text-[13px] text-black font-semibold leading-none">
              Address
            </p>
          </div>
          <div className="flex items-center gap-1">
            <GoDotFill className="text-sm text-black" />
            <p className="text-[13px] text-black font-semibold leading-none">
              Verified Phone
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-[10px] pb-[10px]">
        <p className="text-xs text-black font-semibold leading-none w-max">
          KYC Details
        </p>

        <div className="flex p-1 border border-tradeAshExtraLight rounded-full  items-center gap-1">
          <FaArrowAltCircleDown className="text-xs text-black" />
        </div>
      </div>
    </div>
  );
};

export default LevelOne;
