import React, { useEffect } from "react";
import { RiArrowRightFill } from "react-icons/ri";
import TransactionCard from "../cards/Mobile/TransactionCard";
import { useNavigate } from "react-router-dom";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { useTransaction } from "@/context/wallet/TransactionContext";
import Loading from "../Loading";
import Info from "../alerts/Info";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../NetworkError";

const RecentDeposit = () => {
  const { loading, refetchTransactions } = useFetchTransactions();
  const { transactions, setFilter } = useTransaction();
  const navigateTo = useNavigate();

  console.log("recent deposits", transactions);

  return (
    <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Deposit</p>
      </div>

      <div className="flex md:h-full min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {transactions === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1">
                {Array.isArray(transactions?.data) &&
                transactions?.data.length > 0 ? (
                  <div className="flex flex-col gap-[5px] w-full">
                    {transactions?.data
                      ?.slice(0, 4)
                      ?.map((transaction, index) => (
                        <div key={transaction.id || index}>
                          <TransactionCard transaction={transaction} />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex-1 min-h-[150px] flex flex-col gap-[15px] items-center justify-center">
                    <div className=" flex justify-center items-center text-[55px] text-tradeAshLight">
                      <LuFileX2 />
                    </div>

                    <p className="text-lg font-semibold text-white leading-none">
                      No Recent deposits
                    </p>

                    <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                      You haven’t made any deposits yet. When you do, your
                      recent deposits activity will be shown here for easy
                      tracking.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="custom-x-scrollbar flex p-[15px] gap-[5px] justify-between w-full items-center overflow-x-auto border-t border-dashed border-tradeAshLight">
        <div className="flex gap-[5px] transition-all duration-300 py-[1px">
          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">5</p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">of</p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">
              {transactions?.pagination?.totalItems}
            </p>
          </div>
        </div>

        <div className="flex gap-[5px] py-[1px]">
          <div
            onClick={() => navigateTo("/wallet/transactions")}
            className="flex cursor-pointer items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max"
          >
            <p className="text-[13px] font-semibold">Load more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDeposit;
