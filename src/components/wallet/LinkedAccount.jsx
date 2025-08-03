import React from "react";
import { RiBankLine } from "react-icons/ri";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { SiHdfcbank } from "react-icons/si";
import { IoMdArrowDropright } from "react-icons/io";
import Info from "../alerts/Info";
import { LuCrown } from "react-icons/lu";
import { LuFileX2 } from "react-icons/lu";
import NetworkError from "../NetworkError";

const LinkedAccount = () => {
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();

  const navigateTo = useNavigate();

  console.log("linked accounts", linkedAccounts);

  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>

      <div className="flex flex-col p-[15px] gap-[10px]">
        <div className="flex min-h-[150px] w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {linkedAccounts === null ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1">
                  {linkedAccounts?.length && linkedAccounts?.length !== 0 ? (
                    <div className="flex flex-1 flex-col gap-[15px] justify-between">
                      <div className="flex flex-col gap-[10px] h-full">
                        {linkedAccounts.map((account, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[15px] px-[12px] py-[10px] bg-tradeAsh border border-tradeAshLight rounded-[12px]"
                          >
                            <div className="p-[10px] bg-tradeAshLight rounded-[10px]">
                              <img
                                className="w-[25px]"
                                src={account?.logo}
                                alt=""
                              />
                            </div>

                            <div className="flex w-full justify-between items-center">
                              <div className="flex flex-col gap-1">
                                <p className="text-[15px] font-semibold text-white leading-relaxed">
                                  {account?.bank_name}
                                </p>

                                <div className="flex items-center gap-1">
                                  <p className="text-[13px] font-semibold text-tradeFadeWhite">
                                    {account?.account_number}
                                  </p>

                                  <div className="bg-transparent px-[4px] py-0.2 border border-tradeAshExtraLight rounded-[4px] w-max">
                                    <p className="text-white text-xs font-medium">
                                      Verified Bank
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {account?.isDefault && (
                                <div className="bg-transparent px-[5px] py-1 border border-tradeAshExtraLight rounded-[8px] w-max">
                                  <div className="text-[22px] text-tradeOrange">
                                    <LuCrown />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => navigateTo("/wallet/accounts")}
                      >
                        Manage Accounts
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 min-h-[150px] flex flex-col gap-[15px] items-center justify-center">
                      <div className=" flex justify-center items-center text-[55px] text-tradeAshLight">
                        <RiBankLine />
                      </div>

                      <p className="text-lg font-semibold text-white leading-none">
                        No Linked Account{" "}
                      </p>

                      <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                        You haven't linked any bank account yet. Add one to
                        enable secure and seamless withdraw to your bank.
                      </p>

                      <div className="w-full">
                        <div className="md:flex hidden">
                          <Button
                            variant="primary"
                            onClick={() => navigateTo("/wallet/accounts")}
                          >
                            Add New Account
                          </Button>
                        </div>

                        <div className="md:hidden flex">
                          <Button
                            variant="primary"
                            onClick={() => navigateTo("/wallet/accounts/new")}
                          >
                            Add New Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedAccount;
