import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import Button from "@/components/buttons/Button";

const LevelOne = ({ level }) => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className=" flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 1 - Basic KYC
            </p>

            <div className="bg-tradeOrange text-black p-1 rounded-[5px] ">
              <p className="text-xs font-semibold">Current</p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
              Daily Transaction Limit
            </p>

            <p className="text-lg font-bold text-tradeOrange leading-none">
              #900,000.00
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

        <div className="flex justify-between gap-[10px] py-[5px]">
          <p className="text-xs text-tradeFadeWhite font-semibold leading-none w-max">
            KYC Details
          </p>

          <div className="flex p-1 border border-tradeAshExtraLight rounded-full  items-center gap-1">
            <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
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

      <div className=" flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[10px] gap-[10px]">
        <div className="flex flex-col gap-[15px] border-b border-tradeAshExtraLight border-dashed pb-[10px]">
          <div className="flex items-center  gap-2">
            <p className="text-white text-base font-bold  flex items-center gap-1">
              Tier 2
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

        <div className="flex flex-col gap-[10px]  pb-[10px]">
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
            {/* <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Address
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill className="text-sm text-tradeFadeWhite" />
              <p className="text-[13px] text-white font-semibold leading-none">
                Verified Phone
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <Button variant="secondary">UPGRADE LEVEL</Button>
    </div>
  );
};

export default LevelOne;
