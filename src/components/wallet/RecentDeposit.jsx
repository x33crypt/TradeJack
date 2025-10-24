import React, { useEffect } from "react";
import TransactionCard from "../cards/TransactionCard";
import { useNavigate } from "react-router-dom";
import { useFetchDepositTxt } from "@/hooks/userHooks/useFetchDepositsTxt";
import { useDepositContext } from "@/context/userContext/DepositContext";
import Loading from "../others/Loading";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../others/NetworkError";
import SmallButton from "../buttons/SmallButton";
import { BiFileBlank } from "react-icons/bi";

const RecentDeposit = () => {
  const { loading } = useFetchDepositTxt();
  const { deposit } = useDepositContext();
  const { recentDeposit } = deposit;
  const navigateTo = useNavigate();

  console.log("recent deposits", recentDeposit);

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          RECENT DEPOSIT
        </p>
      </div>

      <div className="flex h-full ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {recentDeposit === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px]">
                <div className="flex flex-1 min-h-[125px]">
                  {Array.isArray(recentDeposit?.data) &&
                  recentDeposit?.data.length > 0 ? (
                    <div className="flex flex-col gap-[10px] w-full">
                      {recentDeposit?.data
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
                        NO RECENT DEPOSITS
                      </p>
                    </div>
                  )}
                </div>

                <div className=" w-full flex items-center pt-[10px]">
                  <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                    <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                      <SmallButton variant="outline">
                        <p>
                          {recentDeposit?.pagination?.totalItems
                            ? recentDeposit?.pagination?.totalItems &&
                              recentDeposit?.pagination?.totalItems >= 5
                              ? "5"
                              : recentDeposit?.pagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>of</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>
                          {recentDeposit?.pagination?.totalItems
                            ? recentDeposit?.pagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                    </div>

                    <div className="flex gap-[5px] py-[1px]">
                      <SmallButton variant="outline">
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

export default RecentDeposit;
