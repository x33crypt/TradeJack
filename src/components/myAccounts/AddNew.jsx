import React, { useEffect } from "react";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";
import { useSelectElement } from "@/context/SelectElementContext";
import { useFetchBanks } from "@/hooks/useFetchBanks";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";
import { useToast } from "@/context/ToastContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import Info from "../alerts/Info";
import { verifyBankHolder } from "@/utils/wallet/verifyBankHolder";
import { FaCheckCircle } from "react-icons/fa";
import { linkBankAccount } from "@/utils/wallet/linkBank";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const { linkAccount, setLinkAccount, linkedAccounts } = useLinkedAccount();
  const { refetch } = useFetchLinkedBanks();
  const { select, setSelect } = useSelectElement();
  const { banks } = useFetchBanks();
  const { toast, setToast } = useToast();

  // handling bank change
  useEffect(() => {
    if (select?.page !== "Link Bank Account" || !select?.pick) return;

    if (select.element === "bank") {
      console.log("bank selected:", select.pick);
      const selectedBank = select.pick;

      setLinkAccount((prev) => ({
        ...prev,
        bank: selectedBank,
      }));
    }
  }, [select]);

  // Handle bank account input change
  const handleBankAccountChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setLinkAccount((prev) => ({
      ...prev,
      bankAccount: rawValue,
    }));
  };

  // Handle bank verification
  const handleVerifyBank = async () => {
    setLinkAccount((prev) => ({
      ...prev,
      loading: true,
    }));

    const { data, error } = await verifyBankHolder({
      bankAccount: linkAccount?.bankAccount,
      bank: linkAccount?.bank,
    });

    if (error) {
      setLinkAccount((prev) => ({
        ...prev,
        loading: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: error,
      });
    } else {
      const cleanedHolderName = data?.account_name?.replace(/,/g, "").trim();

      setLinkAccount((prev) => ({
        ...prev,
        loading: false,
        details: false,
        verified: true,
        success: false,
        data: data,
        holdersName: cleanedHolderName,
      }));
    }
  };

  // Handle linking account
  const handleLinkAccount = async () => {
    setLinkAccount((prev) => ({
      ...prev,
      loading: true,
    }));

    const { data, error } = await linkBankAccount({
      bankAccount: linkAccount?.bankAccount,
      bank: linkAccount?.bank,
      holdersName: linkAccount?.holdersName,
    });

    console.log("Linking result", data);

    if (error) {
      setLinkAccount((prev) => ({
        ...prev,
        loading: false,
      }));

      setToast({
        ...toast,
        error: true,
        errorMessage: error,
      });
      return;
    }

    if (data) {
      console.log("Bank holder verified:", data);

      setToast({
        ...toast,
        success: true,
        successMessage: "Bank account successfully linked",
      });

      setLinkAccount({
        loading: false,
        details: false,
        verified: false,
        success: true,
        bank: "",
        bankAccount: "",
        holdersName: null,
      });
    }
  };

  // Handle edit details
  const handleEditDetails = () => {
    setLinkAccount((prev) => ({
      ...prev,
      loading: false,
      details: true,
      verified: false,
      success: false,
    }));
  };

  // Reset Add New Account form after Success
  // useEffect(() => {
  //   if (linkAccount?.success === true) {
  //     const timer = setTimeout(() => {
  //       setLinkAccount({
  //         loading: false,
  //         details: true,
  //         verified: false,
  //         success: false,
  //         bank: "",
  //         bankAccount: "",
  //         holdersName: null,
  //       });
  //     }, 20000); // 50 seconds

  //     return () => clearTimeout(timer);
  //   }
  // }, [linkAccount?.success]);

  const navigateTo = useNavigate();

  return (
    <div className=" flex flex-col md:border border-neutral-800 w-full">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Add New Account</p>
      </div>

      <div className=" h-full w-full">
        {/* Form Page */}
        <div
          className={` ${
            linkAccount?.details ? "flex" : "hidden"
          } flex-col justify-between p-[15px] gap-[15px] h-full w-full`}
        >
          <div className="">
            <p className="text-xs text-tradeFadeWhite font-medium">
              To ensure the security of your funds, only bank accounts bearing
              the same credentials as your verified KYC information can be
              linked.
            </p>
          </div>

          <div className="flex flex-col gap-[15px] h-full justify-between">
            <div className="flex flex-col gap-[10px]">
              <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Select your Bank
                  </p>
                  <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                      type="text"
                      placeholder={`Select Bank`}
                      readOnly
                      value={linkAccount?.bank}
                      onClick={() =>
                        setSelect({
                          ...select,
                          state: true,
                          selectOne: true,
                          selectTwo: false,
                          element: "bank",
                          options: banks,
                          pick: "",
                          page: "Link Bank Account",
                        })
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>

                  <p className="text-xs font-medium text-tradeFadeWhite">
                    We support all major banks in Nigeria.
                  </p>
                </div>
              </div>
              <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Bank Account
                  </p>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder={`Enter 10-digit account number`}
                      onChange={handleBankAccountChange}
                      value={linkAccount?.bankAccount || ""}
                    />
                  </div>
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    Ensure the account is valid and in your name.
                  </p>
                </div>
              </div>

              <div className="mt-20px]">
                <Info
                  text={
                    "We never store your bank credentials. Your data is protected with end-to-end encryption to ensure it stays private and secure."
                  }
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-[10px]">
              <Button
                variant="primary"
                disabled={linkAccount?.loading}
                onClick={handleVerifyBank}
              >
                Verify Account
              </Button>
            </div>
          </div>
        </div>

        {/* Verification Page */}
        <div
          className={` ${
            linkAccount?.verified ? "flex" : "hidden"
          } flex-col justify-between p-[15px] gap-[15px] h-full w-full`}
        >
          <div className="">
            <p className="text-xs text-tradeFadeWhite font-medium">
              We found a match. Please review and confirm the verified details
              before linking this account.
            </p>
          </div>

          <div className="flex flex-col gap-[15px] h-full justify-between">
            <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[10px] w-full">
                <p className="text-tradeFadeWhite text-xs font-medium">
                  Holder’s Name
                </p>
                <p className="text-white text-sm font-semibold leading-none">
                  {linkAccount?.data?.account_name}
                </p>
              </div>

              <div className="flex flex-col gap-[10px] w-full">
                <p className="text-tradeFadeWhite text-xs font-medium">Bank</p>
                <p className="text-white text-sm font-semibold leading-none">
                  {linkAccount?.data?.bank_name}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Account Number
                  </p>
                  <p className="text-white text-sm font-semibold leading-none">
                    {linkAccount?.data?.account_number}
                  </p>
                </div>

                <div className="text-base text-tradeGreen">
                  <FaCheckCircle />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[10px]">
              <Button
                variant="primary"
                disabled={linkAccount?.loading}
                onClick={handleLinkAccount}
              >
                Confirm & Link Account
              </Button>
              <Button variant="outline" onClick={handleEditDetails}>
                Edit Details
              </Button>
            </div>
          </div>
        </div>

        {/* Success Page */}
        <div
          className={` ${
            linkAccount?.success ? "flex" : "hidden"
          } flex-col justify-between items-center p-[15px] gap-[15px] h-full w-full`}
        >
          <div className="flex-1 flex flex-col gap-[15px]">
            <div className="flex justify-center mt-[15px]">
              <FaRegCircleCheck className="text-5xl text-tradeGreen" />
            </div>
            <div className=" justify-center flex flex-col gap-2">
              <div className="w-full flex flex-col items-center">
                <p className="text-white text-lg font-semibold w-[220px] text-center">
                  Connection successful, you're ready to go.
                </p>
              </div>

              <p className="text-[13px] text-tradeFadeWhite font-medium max-w-[280px] text-center">
                Your account is now securely linked and ready to use for
                seamless withdrawals and transactions
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between w-full">
            <div>
              {linkedAccounts?.length < 2 ? (
                <Info text="You might want to add an alternative account as a backup for smoother withdrawals and flexibility." />
              ) : (
                <Info text="You’ve reached the maximum number of linked accounts. To add a new one, please unlink one of your existing accounts first." />
              )}
            </div>

            <div>
              {linkedAccounts?.length < 2 ? (
                <Button
                  variant="primary"
                  disabled={linkAccount?.loading}
                  onClick={handleLinkAccount}
                >
                  Add New Account
                </Button>
              ) : (
                <div>
                  <div className="md:hidden flex">
                    <Button
                      variant="primary"
                      disabled={linkAccount?.loading}
                      onClick={() => navigateTo("/wallet/accounts")}
                    >
                      View My Accounts
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
