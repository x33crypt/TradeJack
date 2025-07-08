import React from "react";
import TransactionCard from "@/components/cards/TransactionCard";

const RecentTransfer = () => {
  return (
    <div className="h-max md:border lg:border-0 border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center p-[15px] lg:px-0  border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Transfer</p>
        <p className="text-[13px] font-semibold text-tradeOrange hover:text-tradeOrange/50 transition-all duration-300 underline-offset-4 hover:underline cursor-pointer">
          View all
        </p>
      </div>

      <div className="p-[15px] lg:px-0">
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
              <TransactionCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransfer;
