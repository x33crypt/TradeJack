import React from "react";
import TransactionCard from "@/components/cards/TransactionCard";
import { RiArrowRightFill } from "react-icons/ri";

const RecentDeposit = ({ transactions }) => {
  return (
    <div className="h-max md:border lg:border-0 border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center p-[15px] lg:px-0  border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Deposit</p>

        <div className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <RiArrowRightFill />
          </div>
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-[13px] font-semibold">See More</p>
          </div>
        </div>
      </div>

      <div className="p-[15px] lg:px-0">
        <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
          {transactions?.data
            ?.filter((transaction) => transaction.type === "deposit")
            ?.map((transaction, index) => (
              <div
                key={transaction.id || index}
                className={`${
                  index !==
                  transactions.data.filter((t) => t.type === "deposit").length -
                    1
                    ? "md:border-b border-tradeAshLight"
                    : ""
                }`}
              >
                <TransactionCard transaction={transaction} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentDeposit;
