import React, { useRef } from "react";
import TransactionCard from "../cards/Mobile/TransactionCard";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NetworkError from "../NetworkError";
import { LuFileX2 } from "react-icons/lu";
import { useFetchTransferTxt } from "@/hooks/Transaction/useFetchTransferTxt";
import { useTransferContext } from "@/context/wallet/TransferContext";

const RecentTransfer = () => {
  const topRef = useRef(null);
  const { loading } = useFetchTransferTxt();
  const { transfer } = useTransferContext();
  const { recentTransfer } = transfer;
  const navigateTo = useNavigate();

  console.log("recent transfers", recentTransfer);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Transfer</p>

        <div
          onClick={() => navigateTo("/wallet/transactions")}
          className="flex items-center gap-1 bg-transparent text-[14px] text-tradeFadeWhite hover:text-white  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max cursor-pointer duration-300 transition-all"
        >
          <p className="text-[13px] font-semibold">See More</p>
        </div>
      </div>

      <div className="flex md:h-full min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {recentTransfer === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1">
                {Array.isArray(recentTransfer?.data) &&
                recentTransfer?.data.length > 0 ? (
                  <div className="flex flex-col gap-[5px] w-full">
                    {recentTransfer?.data
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
                      No Recent transfers
                    </p>

                    <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                      You haven’t made any transfers yet. When you do, your
                      recent transfers activity will be shown here for easy
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
        <div className="flex gap-[5px]">
          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">Data</p>
          </div>
          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">
              {recentTransfer?.pagination?.totalItems ? "5" : "0"}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">of</p>
          </div>

          <div className="flex items-center gap-1 bg-transparent text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
            <p className="text-[13px] font-semibold">
              {recentTransfer?.pagination?.totalItems
                ? recentTransfer?.pagination?.totalItems
                : "0"}
            </p>
          </div>
        </div>
        <div className="flex gap-[5px] transition-all duration-300">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 bg-transparent text-[14px] text-tradeFadeWhite hover:text-white  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max cursor-pointer duration-300 transition-all"
          >
            <p className="text-[13px] font-semibold">Scroll to Top</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransfer;
