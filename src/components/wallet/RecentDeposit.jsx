import React, { useEffect } from "react";
import { RiArrowRightFill } from "react-icons/ri";
import TransactionCard from "../cards/Mobile/TransactionCard";
import { useNavigate } from "react-router-dom";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { useTransaction } from "@/context/wallet/TransactionContext";
import Loading from "../Loading";
import Info from "../alerts/Info";

const RecentDeposit = () => {
  const { loading, refetchTransactions } = useFetchTransactions();
  const { transactions, setFilter } = useTransaction();
  const navigateTo = useNavigate();

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      type: "Deposit",
      status: null,
    });

    refetchTransactions();
  }, []);

  console.log("resent deposits", transactions);

  return (
    <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Deposit</p>
        <div
          onClick={() => navigateTo("/wallet/transactions")}
          className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
        >
          <div className="flex items-center gap-1 bg-tradeAsh px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-[13px] font-semibold">See More</p>
          </div>
        </div>
      </div>

      <div className="min-h-[100px] p-[15px] h-full">
        {loading ? (
          <Loading />
        ) : (
          <div className="h-full">
            {transactions === null ? (
              <div className="flex-1 flex items-center justify-center ">
                <div className="">
                  <Info text="Unable to load your transactions history. Please check your internet connection or refresh the page to try again." />
                </div>
              </div>
            ) : (
              <div className="h-full">
                {Array.isArray(transactions?.data) &&
                transactions?.data.length > 0 ? (
                  <div className="flex flex-col gap-[5px] w-full">
                    {transactions?.data
                      ?.filter((transaction) => transaction.type === "deposit")
                      ?.slice(0, 6)
                      ?.map((transaction, index) => (
                        <div key={transaction.id || index}>
                          <TransactionCard transaction={transaction} />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center">
                    <Info text="No active offers yet. Create your first offer to start trading and grow your activity." />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentDeposit;
