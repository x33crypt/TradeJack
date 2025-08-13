import React, { useEffect } from "react";
import { RiBankLine } from "react-icons/ri";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NetworkError from "../NetworkError";
import { FaCheckDouble } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import SmallButton from "../buttons/SmallButton";

const LinkedAccount = () => {
  const { loading, refetchLinkedBanks } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();

  const navigateTo = useNavigate();

  useEffect(() => {
    refetchLinkedBanks();
  }, []);

  console.log("linked accounts", linkedAccounts);

  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Accounts</p>
      </div>

      <div className="flex flex-col p-[15px] gap-[10px]">
        <div className="flex min-h-[120px] w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {linkedAccounts === null ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1">
                  {linkedAccounts?.length && linkedAccounts?.length !== 0 ? (
                    <div className="flex flex-1 flex-col gap-[10px] justify-between ">
                      <div className="flex flex-col gap-[10px] h-full">
                        {linkedAccounts.map((account, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[15px] p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]"
                          >
                            <div className="p-[10px] bg-tradeAshLight rounded-[10px]  border border-tradeAshExtraLight">
                              <img
                                className="w-[30px]"
                                src={account?.logo}
                                alt=""
                              />
                            </div>

                            <div className="flex w-full justify-between items-center">
                              <div className="flex flex-col gap-1">
                                <div className="flex gap-1 items-center">
                                  <FaCheckDouble className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                                  <p className="text-xs font-medium text-tradeFadeWhite">
                                    Verified Account
                                  </p>
                                </div>

                                <p className="text-[13px] font-semibold text-white leading-relaxed">
                                  {account?.bank_name}
                                </p>
                              </div>

                              {account?.isDefault && (
                                <div className="w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                                  <TiPin className="text-[16px] text-tradeFadeWhite" />
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
                    <div className="flex-1 min-h-[150px] flex flex-col gap-[15px] items-center justify-between">
                      <p className="text-[13px] font-semibold text-white leading-none">
                        No linked accounts
                      </p>

                      <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                        Connect one to enable secure and seamless withdraw to
                        your bank.
                      </p>

                      <div className="w-full">
                        <div className="md:flex hidden">
                          <SmallButton
                            variant="primary"
                            onClick={() => navigateTo("/wallet/accounts")}
                          >
                            <p> Link Account</p>
                          </SmallButton>
                        </div>

                        <div className="md:hidden flex">
                          <SmallButton
                            variant="primary"
                            onClick={() => navigateTo("/wallet/accounts/new")}
                          >
                            <p> Add New Account</p>
                          </SmallButton>
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
