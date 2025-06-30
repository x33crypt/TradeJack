import React from "react";
import TradeCard from "../cards/TradeCard";

const RecentTrades = () => {
  return (
    <div className="h-max md:border border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Trades</p>
        <p className="text-[13px] font-semibold text-tradeOrange hover:text-tradeOrange/50 transition-all duration-300 underline-offset-4 hover:underline cursor-pointer">
          View all
        </p>
      </div>

      <div className="p-[15px]">
        <div className="w-full overflow-hidden bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          {[...Array(3)].map((_, index, array) => (
            <div
              key={index}
              className={`${
                index !== array.length - 1
                  ? "border-b border-tradeAshLight"
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
