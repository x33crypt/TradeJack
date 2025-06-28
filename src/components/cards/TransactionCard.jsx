import React from "react";
import { MdDateRange } from "react-icons/md";
import { MdGrid3X3 } from "react-icons/md";
import { IoMdArrowRoundUp } from "react-icons/io";

const TransactionCard = () => {
  return (
    <>
      <div className="md:flex hidden p-[15px] gap-10 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">123456789</p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">
              14, Feb, 2024{" "}
              <span className="text-tradeFadeWhite">12:56:09</span>
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 items-center">
          <div className="lg:flex hidden text-tradeGreen p-3 text-base rounded-full bg-tradeAshLight">
            <IoMdArrowRoundUp />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Transfer To
              </p>
            </div>
            <p className="text-white text-[13px] font-semibold">0xSanityy</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Amount</p>
          </div>
          <p className="text-white text-[13px] font-semibold">- #109,023.00 </p>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Status</p>
          </div>
          <p className="text-tradeGreen text-[13px] font-semibold">Completed</p>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
