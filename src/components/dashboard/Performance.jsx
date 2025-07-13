import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";

const Performance = () => {
  return (
    <div className="flex-1 h-full md:border border-tradeAshLight flex flex-col">
      <div className="flex  md:p-[15px] px-[15px] py-[12px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Performance</p>
      </div>

      <div className="flex h-[350px] lg:h-full p-[15px] flex-col gap-[20px]">
        <div className="flex-1 flex flex-col gap-[10px] p-[12px]  bg-tradeAsh rounded-[10px] border border-tradeAshLight transition-all duration-300 ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Average Weekly Purchase
              </p>

              <div className="flex gap-2">
                <p className="text-[13px] font-semibold text-white">23.5%</p>
                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-red-600 text-sm font-medium">
                    <PiArrowUpRightFill />
                  </p>
                </div>
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

export default Performance;
