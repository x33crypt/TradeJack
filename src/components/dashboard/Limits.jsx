import React from "react";
import { PiArrowDownFill } from "react-icons/pi";
import { PiArrowUpFill } from "react-icons/pi";

const Limits = ({ dashboard }) => {
  return (
    <div className="h-max md:border border-tradeAshLight flex flex-col">
      <div className="flex px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Purchase Limits</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col gap-[12.5px] ">
          <div className="flex flex-col gap-[10px] p-[12px] rounded-[15px] bg-tradeAsh border border-tradeAshLight">
            <div className="flex gap-1">
              <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <PiArrowDownFill className="text-tradeGreen text-sm" />
              </div>
              <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-semibold">Min</p>
              </div>
            </div>

            <div className="flex-1 flex gap-[15px] items-center">
              <p className=" text-white text-2xl font-semibold ">$50.00</p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] p-[12px] rounded-[15px] bg-tradeAsh border border-tradeAshLight ">
            <div className="flex gap-1">
              <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <PiArrowUpFill className="text-tradeGreen text-sm" />
              </div>
              <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-semibold">Max</p>
              </div>
            </div>

            <div className="flex-1 flex gap-[15px] items-center">
              <p className=" text-white text-2xl font-semibold ">$50.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limits;
