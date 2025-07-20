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
import LockByScroll from "@/components/LockByScroll";
import { IoClose } from "react-icons/io5";
import { useToast } from "@/context/ToastContext";
import api from "@/utils/http/api";

const MyAccounts = () => {
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkAccount, linkedAccounts, manageAccount, setManageAccount } =
    useLinkedAccount();
  const { state, accountId, success } = manageAccount;
  const { toast, setToast } = useToast();

  console.log(linkedAccounts);

  useEffect(() => {
    if (linkedAccounts.length) {
      console.log("Linked accounts:", linkedAccounts);
    }
  }, [linkedAccounts]);

  const handleManageAccount = () => {
    setManageAccount({
      state: true,
    });
  };

  const handleCancelManageAccount = () => {
    setManageAccount({
      state: false,
    });
  };

  const closeConfrimDeleteAccount = () => {
    setManageAccount({
      state: false,
      accountId: null,
    });
  };

  const deleteAccount = async () => {
    try {
      setManageAccount((prev) => ({
        ...prev,
        loading: true,
      }));

      const accountId = manageAccount.accountId;

      const res = await api.delete(`/payment/remove-bank-account/${accountId}`);

      if (res?.data?.success) {
        setManageAccount({
          state: false,
          accountId: null,
          loading: false,
          success: true,
        });

        setToast({
          success: true,
          successMessage: "Account successfully removed.",
        });
      } else {
        setToast({
          error: true,
          errorMessage: res?.data?.message || "Failed to remove account.",
        });
      }
    } catch (err) {
      setToast({
        error: true,
        errorMessage:
          err?.response?.data?.errorMessage ||
          err.message ||
          "An unknown error occurred.",
      });
    } finally {
      setManageAccount((prev) => ({
        ...prev,
        loading: true,
      }));
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setManageAccount({
          state: false,
          accountId: null,
          loading: false,
          success: false,
        });
        refetch();
      }, 3000);
    }
  }, [success]);

  console.log("Showing Link Account Details :", linkAccount);
  console.log("Showing manage account details :", manageAccount);

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
                          Manage your linked accounts with ease. To update
                          details, simply remove an account and add a new one
                          for hassle-free withdrawals.
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

                        <div className="flex flex-col gap-[10px] items-cente w-full mt-[100px]">
                          <div>
                            {manageAccount.state ? (
                              <Button
                                variant="outline"
                                // disabled={linkAccount?.loading}
                                onClick={handleCancelManageAccount}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                onClick={handleManageAccount}
                              >
                                Manage Accounts
                              </Button>
                            )}
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
                        <LuFileX2 className="text-6xl text-tradeGreen" />
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

      {accountId ? (
        <div>
          <LockByScroll />
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col justify-between gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-[350px] w-full">
              <div className="flex justify-between items-start gap-[15px] pb-[15px] md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-semibold text-white leading-none">
                    Delete Account
                  </p>
                </div>

                <div onClick={closeConfrimDeleteAccount}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex flex-col gap-[30px]">
                <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed">
                  Are you sure you want to delete this account? This action
                  can’t be undone, and you'll need to link it again if required.
                </p>

                <Button
                  variant="danger"
                  disabled={manageAccount?.loading}
                  onClick={deleteAccount}
                >
                  Yes, Unlink & Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyAccounts;
