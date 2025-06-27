import React from "react";
import TransactionCard from "../cards/TransactionCard";

const RecentTransaction = () => {
  return (
    <div className="flex flex-col h-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Recent Transaction</p>
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
              <TransactionCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
