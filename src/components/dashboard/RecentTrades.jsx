import React from "react";
import TradeCard from "../cards/Both/TradeCard";
import { RiArrowRightFill } from "react-icons/ri";

const RecentTrades = () => {
  return (
    <div className="flex-1 md:border border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Trades</p>

        <div
          // onClick={() => navigateTo("/wallet/transactions")}
          className="flex items-center gap-1 bg-transparent text-[14px] text-tradeFadeWhite hover:text-white  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max cursor-pointer duration-300 transition-all"
        >
          <p className="text-[13px] font-semibold">See More</p>
        </div>
      </div>

      <div className="p-[15px]">
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
