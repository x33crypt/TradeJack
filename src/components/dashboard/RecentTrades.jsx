import React from "react";
import TradeCard from "../cards/Both/TradeCard";
import { RiArrowRightFill } from "react-icons/ri";

const RecentTrades = () => {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          RECENT TRADES
        </p>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
          {[...Array(5)].map((_, index, array) => (
            <div
              key={index}
              className={`${
                index !== array.length - 1
                  ? "md:border-b border-tradeAshLight"
                  : ""
              }`}
            >
              <TradeCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTrades;
