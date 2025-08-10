import React, { useEffect } from "react";
import TransactionCard from "../cards/Both/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useNavigate } from "react-router-dom";
import { RiArrowRightFill } from "react-icons/ri";
import { useFetchAllTransactions } from "@/hooks/Transaction/useFetchAllTransactions";
import Loading from "../Loading";
import Info from "../alerts/Info";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../NetworkError";

const RecentTransaction = ({ scrollToTop }) => {
  const { loading, refetchAllTransactions } = useFetchAllTransactions();
  const { transactions, setFilter } = useTransaction();
  const navigateTo = useNavigate();

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    });

    refetchAllTransactions();
  }, []);

  console.log("recent transactions", transactions);

  return (
    <div className="flex flex-col h-full md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Recent Transaction</p>

        <div
          onClick={() => navigateTo("/wallet/transactions")}
          className="flex items-center gap-1 bg-transparent text-[14px] text-tradeFadeWhite hover:text-white  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max cursor-pointer duration-300 transition-all"
        >
          <p className="text-[13px] font-semibold">See More</p>
        </div>
      </div>

      <div className="flex h-full min-h-[125px] p-[15px]">
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
                  <div className="flex flex-col gap-[10px] w-full">
                    {transactions?.data
                      ?.slice(0, 5)
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
                      No Recent Transaction
                    </p>

                    <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                      You haven’t made any transactions yet. When you do, your
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
        <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold ">Data</p>
          </div>
          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">
              {transactions?.pagination?.totalItems ? "5" : "0"}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">of</p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">
              {transactions?.pagination?.totalItems
                ? transactions?.pagination?.totalItems
                : "0"}
            </p>
          </div>
        </div>

        <div className="flex gap-[5px] py-[1px]">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
          >
            <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">Scroll to Top</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
