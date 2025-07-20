import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import React, { useEffect } from "react";
import Button from "@/components/buttons/Button";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";
import AccountCard from "@/components/myAccounts/AccountCard";
import AddNew from "@/components/myAccounts/AddNew";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { LuFileX2 } from "react-icons/lu";

const MyAccounts = () => {
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkAccount, linkedAccounts } = useLinkedAccount();

  console.log(linkedAccounts);

  useEffect(() => {
    if (linkedAccounts.length) {
      console.log("Linked accounts:", linkedAccounts);
    }
  }, [linkedAccounts]);

  // Refetch linked accounts after linking
  useEffect(() => {
    if (linkAccount?.success === true) {
      try {
        refetch();
      } catch (err) {
        console.error("Refetch failed:", err);
      }
    }
  }, [linkAccount?.success]);

  console.log("Showing Link Account Details :", linkAccount);

  const navigateTo = useNavigate();

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col md:flex-row gap-[5px]">
          {/*Linked Account */}
          <div className="flex flex-col md:flex-1 h-full md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">My Accounts</p>
            </div>

            <div className="h-full">
              {loading ? (
                <Loading />
              ) : (
                <div className="w-full h-full">
                  {linkedAccounts?.length && linkedAccounts?.length !== 0 ? (
                    <div className="h-full flex flex-col p-[15px] gap-[25px]">
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Manage your linked accounts with ease. You can keep up
                          to two accounts, one as your default and another as an
                          alternative. To update details, simply remove an
                          account and add a new one for hassle-free withdrawals.
                        </p>
                      </div>

                      <div className="flex flex-col gap-[30px] h-full justify-between ">
                        <div className="flex flex-col gap-[30px]">
                          {/* Default Account */}
                          <div className="flex flex-col gap-[10px] p-[12px bg-tradeAs rounded-[15px borde border-tradeAshLight">
                            <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                              <div className="px-[6px] py-0.5 bg-tradeOrange/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                                <p className="text-tradeOrange text-xs font-medium ">
                                  Default Account
                                </p>
                              </div>
                            </div>
                            <div>
                              {linkedAccounts
                                ?.filter(
                                  (account) => account?.isDefault === true
                                )
                                .map((account, index) => (
                                  <AccountCard
                                    key={index}
                                    account={account}
                                    index={index}
                                  />
                                ))}
                            </div>
                          </div>

                          {/* Aternative Account */}
                          <div className="flex flex-col gap-[10px] p-[12px bg-tradeAs rounded-[15px borde border-tradeAshLight">
                            <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                              <div className="px-[6px] py-0.5 bg-tradeAshExtraLight/40 borde border-tradeAshExtraLight rounded-[4px] w-max">
                                <p className="text-tradeFadeWhite text-xs font-medium ">
                                  Alternative Account
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-[10px]">
                              {linkedAccounts?.some(
                                (account) => account?.isDefault == false
                              ) ? (
                                linkedAccounts
                                  .filter(
                                    (account) => account?.isDefault === false
                                  )
                                  .map((account, index) => (
                                    <AccountCard
                                      key={index}
                                      account={account}
                                      index={index}
                                    />
                                  ))
                              ) : (
                                <div className="">
                                  <p className="text-xs text-tradeFadeWhite font-medium">
                                    You currently don’t have an alternative
                                    account linked. Adding one provides a
                                    reliable backup option in case your primary
                                    account is unavailable.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[10px] items-cente w-full">
                          <div>
                            <Button
                              variant="outline"
                              // disabled={linkAccount?.loading}
                              // onClick={handleVerifyBank}
                            >
                              Manage Accounts
                            </Button>
                          </div>

                          <div className="md:hidden flex w-full">
                            <Button
                              variant="primary"
                              onClick={() => navigateTo("/wallet/accounts/new")}
                            >
                              Add New Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col p-[15px] gap-[25px]">
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Your linked accounts will show up here once added. You
                          don’t have any yet, so add one now to start making
                          secure and seamless withdrawals.
                        </p>
                      </div>
                      <div className="flex-1 h-full flex items-center justify-center">
                        <LuFileX2 className="text-5xl text-tradeGreen" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/*Add New Account */}
          <div className="sticky top-[64px] md:flex hidden md:w-[350px] min-h-[600px] ">
            <AddNew />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccounts;
