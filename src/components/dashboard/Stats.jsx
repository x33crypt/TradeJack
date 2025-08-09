import React from "react";
import { RiProgress3Line } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { LuFileCheck2 } from "react-icons/lu";
import { LuFileX2 } from "react-icons/lu";
import { LuFileClock } from "react-icons/lu";
import { LuFileSearch } from "react-icons/lu";

const Stats = ({ dashboard }) => {
  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Trade Stats</p>
      </div>

      <div className=" grid grid-cols-2 gap-[10px] rounded-[16px] p-[15px]">
        <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-2xl cursor-pointer hover:bg-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2">
            <LuFileCheck2 className="text-base text-tradeGreen" />

            <p className="text-xs font-semibold text-tradeFadeWhite">
              Successful Trades
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold leading-tight">
              {dashboard?.activitySummary?.successful_trades ?? "0"}
            </p>
            <span className="text-xs text-tradeGreen bg-tradeGreen/10 px-2 py-[2px] rounded-md font-medium">
              Great job!
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-2xl cursor-pointer hover:bg-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2">
            <LuFileX2 className="text-base text-red-600" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              Unsuccessful Trades
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold leading-tight">
              {dashboard?.activitySummary?.successful_trades
                ? dashboard?.activitySummary?.successful_trades
                : "0"}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-2xl cursor-pointer hover:bg-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2">
            <LuFileClock className="text-base text-tradeOrange" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              Pending Trades
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-[13px] font-semiboldleading-tight">
              {dashboard?.activitySummary?.pending_trades
                ? dashboard?.activitySummary?.pending_trades
                : "0"}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-2xl cursor-pointer hover:bg-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2">
            <LuFileSearch className="text-base text-tradeFadeWhite" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              Disputed Trades
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold leading-tight">
              {dashboard?.openDisputes ? dashboard?.openDisputes : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
