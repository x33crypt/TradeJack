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
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          Trade Stats
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] rounded-[16px] p-[15px]">
        <div className="flex w-full flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
          <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
            <LuFileCheck2 className="text-lg text-tradeGreen" />
          </div>

          <div className="flex flex-col gap-1 items-start">
            <p className="text-xs font-medium text-tradeFadeWhite">Completed</p>
            <p className="text-white text-lg font-bold leading-none">
              {dashboard?.activitySummary?.successful_trades ?? "5,790"}
            </p>
          </div>
        </div>

        <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
          <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
            <LuFileX2 className="text-lg text-red-600" />
          </div>

          <div className="flex flex-col gap-1 items-start">
            <p className="text-xs font-medium text-tradeFadeWhite">Declined</p>
            <p className="text-white text-lg font-bold leading-none">
              {dashboard?.activitySummary?.successful_trades
                ? dashboard?.activitySummary?.successful_trades
                : "0"}
            </p>
          </div>
        </div>

        <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
          <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
            <LuFileClock className="text-lg text-tradeOrange" />
          </div>

          <div className="flex flex-col gap-1 items-start">
            <p className="text-xs font-medium text-tradeFadeWhite">
              In Progress
            </p>
            <p className="text-white text-lg font-bold leading-none">
              {dashboard?.activitySummary?.pending_trades
                ? dashboard?.activitySummary?.pending_trades
                : "0"}
            </p>
          </div>
        </div>

        <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
          <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
            <LuFileSearch className="text-lg text-tradeFadeWhite" />
          </div>

          <div className="flex flex-col gap-1 items-start">
            <p className="text-xs font-medium text-tradeFadeWhite">
              Under Review
            </p>
            <p className="text-white text-lg font-bold leading-none">
              {dashboard?.activitySummary?.pending_trades
                ? dashboard?.activitySummary?.pending_trades
                : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
