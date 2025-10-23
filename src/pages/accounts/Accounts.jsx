import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import Button from "@/components/buttons/Button";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";
// import AccountCard from "@/components/account/AccountCard";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/others/Loading";
import LockByScroll from "@/components/others/LockByScroll";
import { IoClose } from "react-icons/io5";
import { useToast } from "@/context/otherContext/ToastContext";
import api from "@/utils/http/api";
import AccountMenu from "@/components/settings/SettingMenu";
import NetworkError from "@/components/others/NetworkError";
import { RiAddCircleFill } from "react-icons/ri";

const Accounts = () => {
  const { loading, refetchLinkedBanks } = useFetchLinkedBanks();
  const { linkedAccounts, manageAccount, setManageAccount } =
    useLinkedAccount();
  const { isDelete, isDefault, success } = manageAccount;
  const { setToast } = useToast();

  useEffect(() => {
    refetchLinkedBanks();
  }, []);

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

        refetchLinkedBanks();

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

        refetchLinkedBanks();

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

  // useEffect(() => {
  //   if (success === true) return;
  //   refetchLinkedBanks();
  // }, [success]);

  const navigateTo = useNavigate();

  console.log(manageAccount);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <AccountMenu />

          <div className="flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                ACCOUNTS
              </p>
            </div>
            <div className="flex-1 flex">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {linkedAccounts === null ? (
                    <NetworkError />
                  ) : (
                    <div className="flex flex-1">
                      {Array.isArray(linkedAccounts) &&
                      linkedAccounts?.length > 0 ? (
                        <div className="h-full flex flex-col gap-[20px]">
                          <div
                            onClick={() => navigateTo("/settings/accounts/new")}
                            className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeOrange p-1 text-black w-max rounded-sm transition-all duration-300 cursor-pointer"
                          >
                            <RiAddCircleFill className="text-sm" />
                            <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                              ADD NEW
                            </p>
                          </div>

                          <p className="text-xs text-tradeFadeWhite font-medium">
                            Effortlessly manage your linked accounts. Update
                            details, connect or disconnect accounts, and
                            withdraw funds without hassle.
                          </p>

                          <div className="flex-1 flex flex-col gap-[20px]">
                            <div className="flex flex-col md:flex-row md:gap-[10px] gap-[30px]">
                              {/* Default Account */}
                              <div className="flex-1">
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

                              {/* Aternative Account */}
                              <div className="flex-1">
                                {linkedAccounts
                                  .filter(
                                    (account) => account?.isDefault === false
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

                            <div>
                              {manageAccount.state ? (
                                <Button variant="outline" onClick={closeEdit}>
                                  CANCEL
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  onClick={handleManageAccount}
                                >
                                  EDIT ACCOUNTS
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col gap-[20px]">
                          <div
                            onClick={() => navigateTo("/settings/accounts/new")}
                            className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeOrange p-1 text-black w-max rounded-sm transition-all duration-300 cursor-pointer"
                          >
                            <RiAddCircleFill className="text-sm" />
                            <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                              ADD NEW
                            </p>
                          </div>

                          <div className="">
                            <p className="text-xs text-tradeFadeWhite font-medium">
                              You don’t have any linked accounts yet. Link one
                              now for quick, secure withdrawals.
                            </p>
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
      </div>
      <Footer />

      {isDelete ? (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Deletion
                </p>

                <div
                  onClick={closeDelete}
                  className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-cente text-tradeFadeWhite">
                      Are you sure you want to unlink and remove this bank
                      account ?
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[10px]">
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT :{" "}
                        <span className="text-xs text-white font-semibold">
                          {manageAccount?.bank}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT NO :{" "}
                        <span className="text-xs text-white font-semibold">
                          {manageAccount?.last4digits}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="danger"
                  disabled={manageAccount?.loading}
                  onClick={deleteAccount}
                >
                  DELETE ACCOUNT
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isDefault ? (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Default
                </p>

                <div
                  onClick={closeEdit}
                  className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12.3px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-cente text-tradeFadeWhite">
                      Are you sure you want to set this bank account as your
                      default account ?
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[10px]">
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT :{" "}
                        <span className="text-xs text-white font-semibold">
                          {manageAccount?.bank}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-normal">
                        ACCOUNT NO :{" "}
                        <span className="text-xs text-white font-semibold">
                          {manageAccount?.last4digits}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  disabled={manageAccount?.loading}
                  onClick={setDefaultAccount}
                >
                  SET AS DEFAULT
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Accounts;
