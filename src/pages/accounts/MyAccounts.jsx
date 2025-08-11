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
  const { refetchLinkedBanks } = useFetchLinkedBanks();
  const { loading } = useFetchLinkedBanks();
  const { linkedAccounts, manageAccount, setManageAccount } =
    useLinkedAccount();
  const { isDelete, isDefault, success } = manageAccount;
  const { setToast } = useToast();

  const handleManageAccount = () => {
    setManageAccount({
      state: true,
    });
  };

  const closeEdit = () => {
    setManageAccount({
      state: false,
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
          isDefault: false,
          isDelete: false,
          accountId: null,
          bank: null,
          last4digits: null,
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
        loading: false,
      }));
    }
  };

  const setDefaultAccount = async () => {
    try {
      setManageAccount((prev) => ({
        ...prev,
        loading: true,
      }));

      const accountId = manageAccount.accountId;

      const res = await api.patch(
        `/payment/bank-accounts/${accountId}/set-default`
      );

      if (res?.data?.success) {
        setManageAccount({
          state: false,
          isDefault: false,
          isDelete: false,
          accountId: null,
          bank: null,
          last4digits: null,
          loading: false,
          success: true,
        });

        setToast({
          success: true,
          successMessage: "Account has been set as default.",
        });
      } else {
        setToast({
          error: true,
          errorMessage: res?.data?.message || "Failed to set default account.",
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
        loading: false,
      }));
    }
  };

  const closeDelete = () => {
    setManageAccount({
      state: false,
      isDefault: false,
      isDelete: false,
      accountId: null,
      bank: null,
      last4digits: null,
      loading: false,
      success: false,
    });
  };

  useEffect(() => {
    if (success === true) {
      refetchLinkedBanks();
    }
  }, [success]);

  const navigateTo = useNavigate();

  console.log(manageAccount);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col md:flex-row gap-[5px]">
          {/*Linked Account */}
          <div className="flex flex-col md:flex-1 h-full md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">Manage Accounts</p>
            </div>

            <div className="flex flex-1">
              {loading ? (
                <Loading />
              ) : (
                <div className="w-full h-full">
                  {linkedAccounts?.length > 0 ? (
                    <div className="h-full flex flex-col p-[15px] gap-[25px]">
                      <div className="">
                        <p className="text-xs text-tradeFadeWhite font-medium">
                          Manage your linked accounts with ease. To update
                          details, simply remove an account and add a new one
                          for hassle-free withdrawals.
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col justify-between ">
                        <div className="flex flex-col gap-[10px]">
                          {/* Default Account */}
                          <div>
                            {linkedAccounts
                              ?.filter((account) => account?.isDefault === true)
                              .map((account, index) => (
                                <AccountCard
                                  key={index}
                                  account={account}
                                  index={index}
                                />
                              ))}
                          </div>

                          {/* Aternative Account */}
                          <div>
                            {linkedAccounts
                              .filter((account) => account?.isDefault === false)
                              .map((account, index) => (
                                <AccountCard
                                  key={index}
                                  account={account}
                                  index={index}
                                />
                              ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-[10px] items-cente w-full mt-[0px]">
                          <div>
                            {manageAccount.state ? (
                              <Button
                                variant="outline"
                                onClick={closeEdit}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                onClick={handleManageAccount}
                              >
                                Edit Accounts
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
                        <LuFileX2 className="text-[55px] text-tradeGreen" />
                      </div>
                      <div className="md:hidden flex w-full">
                        <Button
                          variant="primary"
                          onClick={() => navigateTo("/wallet/accounts/new")}
                        >
                          Add New Bank
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

      {/* <Footer big={"flex"} small={"hidden"} /> */}

      {isDelete ? (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Deletion
                </p>

                <div onClick={closeDelete}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-cente text-tradeFadeWhite">
                      Are you sure you want to unlink and remove this bank
                      account ?
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Account
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {manageAccount?.bank}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Account Number
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {manageAccount?.last4digits}
                      </p>
                    </div>
                  </div>
                </div>

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

      {isDefault ? (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Default
                </p>

                <div onClick={closeEdit}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-cente text-tradeFadeWhite">
                      Are you sure you want to set this bank account as your
                      default account ?
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Account
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {manageAccount?.bank}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Account Number
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        {manageAccount?.last4digits}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  disabled={manageAccount?.loading}
                  onClick={setDefaultAccount}
                >
                  Yes, Set as Default
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
