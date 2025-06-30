import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";

const Performance = () => {
  return (
    <div className="flex-1 h-full md:border border-tradeAshLight flex flex-col">
      <div className="flex  p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Performance</p>
      </div>

      <div className="flex h-[300px] p-[15px] flex-col gap-[20px]">
        <div className="flex-1 flex flex-col gap-[10px] p-[12px]  bg-tradeAsh hover:bg-tradeAshLight rounded-[10px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
          <div className="flex items-center justify-between">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Average Monthly Purchase
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
          <div className="flex">
            <p className="md:md:text-3xl text-2xl text-white font-[800] leading-none"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
