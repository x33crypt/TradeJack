import React, { useEffect } from "react";
import TransactionCard from "../cards/Both/TransactionCard";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { useNavigate } from "react-router-dom";
import { RiArrowRightFill } from "react-icons/ri";
import { useFetchAllTransactions } from "@/hooks/Transaction/useFetchAllTransactions";
import Loading from "../Loading";
import Info from "../alerts/Info";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../NetworkError";
import SmallButton from "../buttons/SmallButton";
import { BiFileBlank } from "react-icons/bi";

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

        <SmallButton
          variant="fadeout"
          onClick={() => navigateTo("/wallet/transactions")}
        >
          <p>See More</p>
        </SmallButton>
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
                  <div className="flex-1 flex flex-col items-center justify-center gap-[10px] bg-transparent">
                    <p className="text-[13px] font-semibold text-white leading-none">
                      No recent transaction.
                    </p>

                    <p className="text-xs font-medium text-tradeFadeWhite text-center">
                      No recent transaction found in our system.
                    </p>

                    <BiFileBlank className="md:text-[22px] text-tradeFadeWhite" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className=" h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
        <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
          <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
            <SmallButton variant="outline">
              <p>
                {transactions?.pagination?.totalItems
                  ? transactions?.pagination?.totalItems &&
                    transactions?.pagination?.totalItems >= 5
                    ? "5"
                    : transactions?.pagination?.totalItems
                  : "0"}
              </p>
            </SmallButton>
            <SmallButton variant="outline">
              <p>of</p>
            </SmallButton>
            <SmallButton variant="outline">
              <p>
                {transactions?.pagination?.totalItems
                  ? transactions?.pagination?.totalItems
                  : "0"}
              </p>
            </SmallButton>
          </div>

          <div className="flex gap-[5px] py-[1px]">
            <SmallButton
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <p>Scroll to Top</p>
            </SmallButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
