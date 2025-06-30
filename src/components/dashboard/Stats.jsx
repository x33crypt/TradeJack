import React from "react";
import { RiProgress3Line } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Stats = ({ dashboard }) => {
  return (
    <div className=" grid grid-cols-2 gap-[10px] rounded-[16px]">
      <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
        <div className="flex gap-[5px]">
          <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <GrStatusGood className="text-tradeGreen text-[13px]" />
          </div>
          <p className=" text-[12px] font-semibold text-tradeFadeWhite">
            Successful Trades
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-white text-[23px] font-[700]">
            {dashboard?.activitySummary?.successful_trades
              ? dashboard?.activitySummary?.successful_trades
              : "0"}
          </p>
          <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
        </div>
      </div>
      <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
        <div className="flex gap-[5px]">
          <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <IoClose className="text-red-600 text-[13px]" />
          </div>
          <p className=" text-[12px] font-semibold text-tradeFadeWhite">
            UnSuccessful Trades
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-white text-[23px] font-[700]">
            {dashboard?.activitySummary?.successful_trades
              ? dashboard?.activitySummary?.successful_trades
              : "0"}
          </p>
          <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
        </div>
      </div>
      <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
        <div className="flex gap-[5px]">
          <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <MdOutlinePending className="text-tradeOrange text-[13px]" />
          </div>
          <p className=" text-[12px] font-semibold text-tradeFadeWhite">
            Pending Trades
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-white text-[23px] font-[700]">
            {dashboard?.activitySummary?.pending_trades
              ? dashboard?.activitySummary?.pending_trades
              : "0"}
          </p>
          <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
        </div>
      </div>
      <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
        <div className="flex gap-[5px]">
          <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <IoExtensionPuzzleOutline className="text-tradePurple text-[13px]" />
          </div>
          <p className=" text-[12px] font-semibold text-tradeFadeWhite">
            Disputed Trades
          </p>
        </div>

        <div className="flex justify-between items-baseline">
          <p className="text-white text-[23px] font-[700]">
            {dashboard?.openDisputes ? dashboard?.openDisputes : "0"}
          </p>
          <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
        </div>
      </div>
    </div>
  );
};

export default Stats;
