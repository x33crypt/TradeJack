import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

const Performance = () => {
  return (
    <div className="flex-1 h-full md:border border-tradeAshLight flex flex-col">
      <div className="flex px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Overview</p>
      </div>

      <div className="flex h-full p-[15px] flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Purchase Limits
            </p>

            <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              <FaQuestionCircle className="text-sm text-tradeOrange" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Minimum
              </p>
              <p className="text-white text-[13px]  font-semibold">
                #300,987.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Maximum
              </p>
              <p className="text-white text-[13px] font-semibold">
                #300,987.00
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Average Trade
            </p>

            <div className="flex items-center gap-1 text-tradeFadeWhite border border-tradeAshExtraLight bg-transparent  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              <p className="text-xs font-semibold">USD</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                This week
              </p>
              <p className="text-white text-[13px]  font-semibold">
                #300,987.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Last Week
              </p>
              <p className="text-white text-[13px] font-semibold">
                #300,987.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
