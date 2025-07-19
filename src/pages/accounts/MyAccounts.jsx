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

const MyAccounts = () => {
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();

  console.log(linkedAccounts);

  useEffect(() => {
    if (linkedAccounts.length) {
      console.log("Linked accounts:", linkedAccounts);
    }
  }, [linkedAccounts]);

  const navigateTo = useNavigate();

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 h-max flex flex-col md:flex-row gap-[5px]">
          {/* Already Linked Account */}
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">My Accounts</p>
            </div>

            <div className="w-full h-full">
              {linkedAccounts?.length && linkedAccounts?.length !== 0 ? (
                <div className="h-full flex flex-col justify-between p-[15px] gap-[25px]">
                  <div className="">
                    <p className="text-xs text-tradeFadeWhite font-medium">
                      Manage your linked accounts, update details when needed,
                      and set your preferred account hassle-free withdrawals
                    </p>
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] p-[12px bg-tradeAs rounded-[15px borde border-tradeAshLight">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <div className="px-[6px] py-0.5 bg-tradeOrange/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeOrange text-xs font-medium ">
                            Default Account
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        {linkedAccounts?.map((account, index) => (
                          <AccountCard account={account} index={index} />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px] p-[12px bg-tradeAs rounded-[15px borde border-tradeAshLight">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <div className="px-[6px] py-0.5 bg-tradeAshExtraLight/40 borde border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeFadeWhite text-xs font-medium ">
                            Alternative Account
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[10px]">
                        {linkedAccounts?.map((account, index) => (
                          <AccountCard account={account} index={index} />
                        ))}
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
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="md:flex hidden md:w-[350px] min-h-[530px]">
            <AddNew />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccounts;
