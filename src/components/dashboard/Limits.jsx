import React from "react";
import { LuPlus } from "react-icons/lu";
import { HiArrowNarrowUp } from "react-icons/hi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { FaAward } from "react-icons/fa6";
import { TiEqualsOutline } from "react-icons/ti";
import Info from "../alerts/Info";

const Limits = ({ dashboard }) => {
  return (
    <div className="h-max md:border border-tradeAshLight flex flex-col">
      <div className="flex  p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Purchase Limits</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col gap-[10px] p-[12px] rounded-[15px] bg-tradeAsh border border-tradeAshLight">
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Minimum
              </p>
            </div>

            <div className="flex-1 flex gap-[15px] items-center">
              <p className=" text-white text-xl font-bold ">$50.00</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Maximum
              </p>
            </div>

            <div className="flex-1 flex gap-[15px] items-center">
              <p className=" text-white text-xl font-bold ">$5,000.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limits;
