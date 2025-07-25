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

const LinkedAccount = () => {
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();

  const navigateTo = useNavigate();

  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>

      <div className="flex flex-col p-[15px] gap-[10px]">
        <div className="min-h-[100px]">
          {loading ? (
            <Loading />
          ) : (
            <div className="h-full">
              {linkedAccounts === null ? (
                <div className="h-full flex items-center justify-center ">
                  <div>
                    <Info text="Can't load linked accounts. Check your connection or refresh." />
                  </div>
                </div>
              ) : (
                // <div className="h-full flex items-center ">
                //   <Info text="Unable to load your linked accounts at the moment. Please check your internet connection or refresh the page to try again." />
                // </div>
                <div className="h-full">
                  {linkedAccounts?.length && linkedAccounts?.length !== 0 ? (
                    <div className="flex flex-col gap-[15px] justify-between h-full">
                      <div className="flex flex-col gap-[10px] h-full">
                        {linkedAccounts.map((account, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[15px] px-[12px] py-[10px] bg-tradeAsh border border-tradeAshLight rounded-[12px]"
                          >
                            <div>
                              <img
                                className="w-[30px]"
                                src={account?.logo}
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-semibold text-white leading-relaxed">
                                {account?.bank_name}
                              </p>
                              <p className="text-[13px] font-semibold text-tradeFadeWhite">
                                {account?.account_number}
                              </p>
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
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex flex-col  items-center text-center gap-3 px-4 py-5 rounded-2xl bg-tradeAsh border border-tradeAshLight w-full ">
                        <RiBankLine className="text-[32px] text-tradeFadeWhite" />

                        <h3 className="text-white text-base font-semibold">
                          Link Your Bank Account
                        </h3>

                        <p className="text-tradeFadeWhite text-[13px] font-medium md:max-w-[320px]">
                          Securely connect your bank to withdraw funds.
                          Bank-level security and encryption applied.
                        </p>
                      </div>

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
