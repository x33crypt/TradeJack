import React, { useEffect } from "react";
import TransactionCard from "../cards/Both/TransactionCard";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useNavigate } from "react-router-dom";
import { RiArrowRightFill } from "react-icons/ri";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import Loading from "../Loading";
import Info from "../alerts/Info";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../NetworkError";

const RecentTransaction = () => {
  const { loading, refetchTransactions } = useFetchTransactions();
  const { transactions, setFilter } = useTransaction();
  const navigateTo = useNavigate();

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: null,
      status: null,
    });

    refetchTransactions();
  }, []);

  console.log("recent transactions", transactions);

  return (
    <div className="flex flex-col h-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Recent Transaction</p>

        <div
          onClick={() => navigateTo("/wallet/transactions")}
          className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-[13px] font-semibold">See More</p>
          </div>
        </div>
      </div>

      <div className="flex h-full min-h-[300px] p-[15px]">
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
                  <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden  md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
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
                  // <div className="flex-1 flex flex-col">
                  //   <div>
                  //     <p className="text-xs font-medium text-tradeFadeWhite">
                  //       You haven’t made any transactions yet. When you do, your
                  //       recent deposits activity will be shown here for easy
                  //       tracking.
                  //     </p>
                  //   </div>
                  //   <div className="flex-1 flex justify-center items-center text-[55px] text-tradeGreen">
                  //     <LuFileX2 />
                  //   </div>
                  // </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransaction;
