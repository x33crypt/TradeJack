import React from "react";
import TransactionCard from "../cards/TransactionCard";

const RecentTransaction = () => {
  return (
    <div className="flex flex-col h-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Recent Transaction</p>

        <p className="text-[13px] font-semibold text-tradeOrange hover:text-tradeOrange/50 transition-all duration-300 underline-offset-4 hover:underline cursor-pointer">
          View all
        </p>
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
              <TransactionCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
