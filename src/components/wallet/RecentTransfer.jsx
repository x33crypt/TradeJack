import React, { useRef } from "react";
import TransactionCard from "../cards/TransactionCard";
import { useNavigate } from "react-router-dom";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import { LuFileX2 } from "react-icons/lu";
import { useFetchTransferTxt } from "@/hooks/userHooks/useFetchTransferTxt";
import { useTransferContext } from "@/context/userContext/TransferContext";
import SmallButton from "../buttons/SmallButton";
import { BiFileBlank } from "react-icons/bi";
import { groupByDate } from "@/utils/groupByDate";

const RecentTransfer = () => {
  const topRef = useRef(null);
  const { loading } = useFetchTransferTxt();
  const { transfer } = useTransferContext();
  const { recentTransfer } = transfer;

  console.log("recent transfers", recentTransfer);

  const grouped = groupByDate(recentTransfer?.data, "createdAt", 5);

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          RECENT TRANSFER
        </p>
      </div>

      <div className="flex h-full ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {recentTransfer === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px]">
                <div className="flex flex-1 min-h-[125px]">
                  {Array.isArray(recentTransfer?.data) &&
                  recentTransfer?.data.length > 0 ? (
                    <div className="flex flex-col gap-[10px] w-full">
                      {grouped.map((group) => (
                        <div
                          key={group.dateKey}
                          className="bg-tradeDark rounded-lg pb-[10px]"
                        >
                          {/* Date Label */}
                          <div>
                            <p className="text-xs text-tradeFadeWhite/80 font-semibold mb-2">
                              {group.label}
                            </p>
                          </div>

                          {/* Transaction List */}
                          <div className="flex flex-col gap-[10px]">
                            {group.items?.slice(0, 5).map((transaction) => (
                              <TransactionCard
                                key={transaction.id}
                                transaction={transaction}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-[10px] bg-transparent">
                      <p className="text-[13px] font-semibold text-white leading-none">
                        NO RECENT TRANSFERS
                      </p>
                    </div>
                  )}
                </div>

                <div className=" w-full flex items-center pt-[10px]">
                  <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                    <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                      <SmallButton variant="outline">
                        <p>
                          {recentTransfer?.pagination?.totalItems
                            ? recentTransfer?.pagination?.totalItems &&
                              recentTransfer?.pagination?.totalItems >= 5
                              ? "5"
                              : recentTransfer?.pagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>of</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>
                          {recentTransfer?.pagination?.totalItems
                            ? recentTransfer?.pagination?.totalItems
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

export default RecentTransfer;
