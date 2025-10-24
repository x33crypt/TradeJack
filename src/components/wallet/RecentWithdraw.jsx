import React, { useEffect } from "react";
import TransactionCard from "../cards/Mobile/TransactionCard";
import { useNavigate } from "react-router-dom";
import Loading from "../others/Loading";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../others/NetworkError";
import SmallButton from "../buttons/SmallButton";
import { useFetchWithdrawTxt } from "@/hooks/userHooks/useFetchWithdrawTxt";
import { useWithdrawContext } from "@/context/userContext/WithdrawContext";
import { BiFileBlank } from "react-icons/bi";

const RecentWithdraw = () => {
  const { loading } = useFetchWithdrawTxt();
  const { withdraw } = useWithdrawContext();
  const { recentWithdraw } = withdraw;
  const navigateTo = useNavigate();

  console.log("recent Withdraws", recentWithdraw);

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          RECENT WITHDRAWS
        </p>
      </div>

      <div className="flex h-full ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {recentWithdraw === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px]">
                <div className="flex flex-1">
                  {Array.isArray(recentWithdraw?.data) &&
                  recentWithdraw?.data.length > 0 ? (
                    <div className="flex flex-col gap-[10px] w-full">
                      {recentWithdraw?.data
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
                        No recent withdrawals.
                      </p>

                      <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                        No recent withdrawals found in our system.
                      </p>

                      <BiFileBlank className="md:text-[22px] text-tradeFadeWhite" />
                    </div>
                  )}
                </div>

                <div className=" w-full flex items-center pt-[10px]">
                  <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                    <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                      <SmallButton variant="outline">
                        <p>
                          {recentWithdraw?.pagination?.totalItems
                            ? recentWithdraw?.pagination?.totalItems &&
                              recentWithdraw?.pagination?.totalItems >= 5
                              ? "5"
                              : recentWithdraw?.pagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>of</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>
                          {recentWithdraw?.pagination?.totalItems
                            ? recentWithdraw?.pagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                    </div>

                    <div className="flex gap-[5px] py-[1px]">
                      <SmallButton
                        variant="outline"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <p>Scroll to Top</p>
                      </SmallButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentWithdraw;
