import React from "react";
import TradeCard from "../cards/Both/TradeCard";
import { RiArrowRightFill } from "react-icons/ri";

const RecentTrades = () => {
  return (
    <div className="h-max md:border border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center md:p-[15px] px-[15px] py-[12px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Trades</p>


        <div
          // onClick={() => navigateTo("/wallet/transactions")}
          className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <RiArrowRightFill />
          </div>
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-[13px] font-semibold">See More</p>
          </div>
        </div>
      </div>

      <div className="p-[15px]">
        <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
          {[...Array(8)].map((_, index, array) => (
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
