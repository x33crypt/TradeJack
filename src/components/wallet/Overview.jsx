import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";
import { PiArrowDownLeftFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";

const Overview = () => {
  return (
    <div className="flex flex-col lg:w-[350px] flex-1 md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Overview</p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px] h-full">
        <div className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Profit this week
            </p>

            <div className="flex items-center gap-1 text-tradeFadeWhite border border-tradeAshExtraLight bg-transparent  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              <p className="text-xs font-semibold">NGN</p>
            </div>
          </div>
          <div className="w-full">
            <p className="text-white text-sm font-semibold">#300,987.00</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Transaction report
            </p>

            <div className="flex items-center gap-1 text-tradeFadeWhite border border-tradeAshExtraLight bg-transparent  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              <p className="text-xs font-semibold">NGN</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Incoming
              </p>
              <p className="text-white text-[13px]  font-semibold">
                #300,987.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Outgoing
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

export default Overview;
