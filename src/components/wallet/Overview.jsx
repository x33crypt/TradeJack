import React from "react";
import { PiArrowUpRightFill } from "react-icons/pi";
import { PiArrowDownLeftFill } from "react-icons/pi";

const Overview = () => {
  return (
    <div className="flex flex-col h-full lg:w-[350px] lg:h-[350px]  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Overview</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[30px] h-full">
        <div className="flex flex-col p-[12px] gap-[30px] bg-tradeAsh rounded-[15px] border border-tradeAshLight h-full">
          <div className="flex justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default Overview;
