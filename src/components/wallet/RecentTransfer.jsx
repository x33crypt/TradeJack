import React, { useRef } from "react";
import TransactionCard from "../cards/Mobile/TransactionCard";
import { useNavigate } from "react-router-dom";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import { LuFileX2 } from "react-icons/lu";
import { useFetchTransferTxt } from "@/hooks/userHooks/useFetchTransferTxt";
import { useTransferContext } from "@/context/userContext/TransferContext";
import SmallButton from "../buttons/SmallButton";
import { BiFileBlank } from "react-icons/bi";

const RecentTransfer = () => {
  const topRef = useRef(null);
  const { loading } = useFetchTransferTxt();
  const { transfer } = useTransferContext();
  const { recentTransfer } = transfer;
  const navigateTo = useNavigate();

  console.log("recent transfers", recentTransfer);

  return (
    <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Recent Transfer</p>

        <SmallButton
          variant="fadeout"
          onClick={() => navigateTo("/wallet/transactions")}
        >
          <p>See More</p>
        </SmallButton>
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
                  <div className="flex flex-col gap-[10px] w-full">
                    {recentTransfer?.data
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
                      No recent transfers.
                    </p>

                    <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                      No recent transfers found in our system.
                    </p>

                    <BiFileBlank className="md:text-[22px] text-tradeFadeWhite" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
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

export default RecentTransfer;
