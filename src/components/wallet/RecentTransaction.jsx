import React from "react";
import TransactionCard from "../cards/Both/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useNavigate } from "react-router-dom";
import { RiArrowRightFill } from "react-icons/ri";

const RecentTransaction = ({ transactions }) => {
  console.log("transactions value:", transactions);

  const navigateTo = useNavigate();

  return (
    <div className="flex flex-col h-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Recent Transaction</p>

        <div
          onClick={() => navigateTo("/wallet/transactions")}
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
        <div
          className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border
         border-tradeAshLight"
        >
          {transactions?.data?.map((transaction, index) => (
            <div
              key={transaction.id || index}
              className={`${
                index !== transactions?.data?.length - 1
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

export default RecentTransaction;
