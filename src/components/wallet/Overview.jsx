import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";
import { PiArrowDownLeftFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";

const Overview = () => {
  return (
    <div className="flex flex-col h-full lg:w-[350px] lg:h-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Overview</p>
      </div>

      <div className="flex h-[300px] lg:h-full p-[15px] flex-col gap-[20px]">
        <div className="flex-1 flex flex-col gap-[10px] p-[12px]  bg-tradeAsh rounded-[10px] border border-tradeAshLight transition-all duration-300 ">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-tradeGreen text-sm font-medium">
                    <PiArrowDownLeftFill />
                  </p>
                </div>
                <p className="text-white text-[13px] font-semibold">
                  + # 874,352.00{" "}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-red-600 text-sm font-medium">
                    <PiArrowUpRightFill />
                  </p>
                </div>
                <p className="text-white text-[13px] font-semibold">
                  - # 505,352.00{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[5px] p-[10px] border border-tradeAshLight rounded-[10px]">
              <p className="text-white text-[13px] font-medium">This week</p>
              <MdKeyboardArrowDown className="text-tradeFadeWhite" />
            </div>
          </div>
          <div className="flex">
            <p className="md:md:text-3xl text-2xl text-white font-[800] leading-none"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
