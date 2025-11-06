import React, { useEffect } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import DasHboardMenu from "@/components/dashboard/DashboardMenu";
import RecentWithdraw from "@/components/wallet/RecentWithdraw";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { useToast } from "@/context/otherContext/ToastContext";
import { toDecimal } from "@/utils/toDecimal";
import { useWithdrawContext } from "@/context/userContext/WithdrawContext";
import { IoWalletOutline } from "react-icons/io5";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchLinkedBanks } from "@/hooks/userHooks/useFetchLinkedBanks";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { RiBankLine } from "react-icons/ri";
import { useFetchWithdrawTxt } from "@/hooks/userHooks/useFetchWithdrawTxt";
import WalletBalance from "@/components/wallet/WalletBalance";
import Info from "@/components/alerts/Info";
import WalletMenu from "@/components/wallet/WalletMenu";

const Withdraw = () => {
  const { refetchWithdrawTxt } = useFetchWithdrawTxt();
  const { balance } = useBalance();
  const { withdraw, setWithdraw } = useWithdrawContext();
  const { loading, error, refetchLinkedBanks } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();
  const { setToast } = useToast();

  console.log("Withdraw Context:", withdraw);
  console.log("Balance in Withdraw:", balance?.available_balance);
  console.log("Linked Accounts:", linkedAccounts);

  useEffect(() => {
    refetchLinkedBanks();
  }, []);

  const selectDefaultAccount = () => {
    setWithdraw((prev) => ({
      ...prev,
      account: "Default",
    }));
  };

  useEffect(() => {
    if (withdraw?.account === "Default") {
      setWithdraw((prev) => ({
        ...prev,
        bank: linkedAccounts?.find((account) => account?.isDefault === true),
      }));
    } else if (withdraw?.account === "Alternative") {
      setWithdraw((prev) => ({
        ...prev,
        bank: linkedAccounts?.find((account) => account?.isDefault === false),
      }));
    }
  }, [withdraw?.account, linkedAccounts]);

  const selectAlternativeAccount = () => {
    setWithdraw((prev) => ({
      ...prev,
      account: "Alternative",
    }));
  };

  const selectUSD = () => {
    setWithdraw((prev) => ({
      ...prev,

      currency: "USD",
      amount: { NGN: null, USD: null },
    }));
  };

  const selectNGN = () => {
    setWithdraw((prev) => ({
      ...prev,
      currency: "NGN",
      amount: { NGN: null, USD: null },
    }));
  };

  const handleUSDAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers & dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }

    setWithdraw((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        USD: rawValue,
      },
    }));
  };

  const handleNGNAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers & dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }

    setWithdraw((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        NGN: rawValue,
      },
    }));
  };

  const formatWithCommas = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  // update NGN amount if user input USD
  useEffect(() => {
    if (!withdraw?.amount?.USD || withdraw?.currency !== "USD") return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const result = await toNGN(withdraw?.amount?.USD);

        if (result && result.amount) {
          console.log("Converted NGN Value:", result.amount);

          setWithdraw((prev) => ({
            ...prev,
            amount: {
              ...prev.amount,
              NGN: result.amount,
            },
          }));
        } else {
          console.error("Conversion to NGN failed: Invalid response", result);
        }
      } catch (error) {
        console.error("Conversion to NGN failed:", error);
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(debounceTimeout); // Clear previous timeout on new input
  }, [withdraw?.amount?.USD, withdraw?.currency]);

  // update USD amount if user input NGN
  useEffect(() => {
    if (!withdraw?.amount?.NGN || withdraw?.currency !== "NGN") return;

    console.log("Converting NGN to USD:", withdraw?.amount?.NGN);

    const debounceTimeout = setTimeout(async () => {
      try {
        const result = await toUSD(withdraw?.amount?.NGN);

        if (result && result.amount) {
          console.log("Converted USD Value:", result.amount);

          setWithdraw((prev) => ({
            ...prev,
            amount: {
              ...prev.amount,
              USD: result.amount,
            },
          }));
        } else {
          console.error("Conversion to USD failed: Invalid response", result);
        }
      } catch (error) {
        console.error("Conversion to USD failed:", error);
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(debounceTimeout); // Clear on new keystroke
  }, [withdraw?.amount?.NGN, withdraw?.currency]);

  const handleProceed = () => {
    const { currency, amount, bank } = withdraw;

    // Validate amount in NGN
    if (currency === "NGN") {
      const value = Number(amount?.NGN);

      if (!value || isNaN(value)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      // Validate minimum amount
      if (value < 15000) {
        setToast({
          error: true,
          success: false,
          errorMessage: `The minimum transfer amount is NGN ${toDecimal(
            15000
          )}.`,
        });
        return;
      }

      // Validate balance
      if (
        Number(toDecimal(amount?.NGN) || 0) >
        Number(toDecimal(balance?.available_balance?.NGN) || 0)
      ) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Insufficient balance for this transfer.",
        });
        return;
      }
    }

    // Validate amount in USD
    if (currency === "USD") {
      const UsdAmount = Number(amount?.USD);
      const NgnAmount = Number(amount?.NGN);

      if (!UsdAmount || isNaN(UsdAmount)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      if (!NgnAmount || isNaN(NgnAmount)) {
        setToast({
          error: true,
          success: false,
          errorMessage: "Missing required field: Amount",
        });
        return;
      }

      if (UsdAmount < 10) {
        setToast({
          error: true,
          success: false,
          errorMessage: `The minimum transfer amount is USD ${toDecimal(10)}.`,
        });
        return;
      }
    }

    if (!bank?.bankId) {
      setToast({
        error: true,
        errorMessage: "Missing required field: Recipient Wallet",
      });
      return;
    }

    // Proceed
    setWithdraw((prev) => ({
      ...prev,
      proceed: true,
      confirm: true,
    }));
  };

  // Refetch transactions after a successfull transfer
  useEffect(() => {
    if (withdraw?.success) {
      refetchWithdrawTxt();
    }
  }, [withdraw?.success]);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px]">
          {/* <WalletMenu /> */}
          <div className="flex flex-1 flex-col gap-[40px] lg:mx-[22.8%] p-[15px]">
            <div className="flex flex-1 flex-col gap-[20px]">
              <div className="flex  items-center justify-between ">
                <p className="text-lg font-semibold text-white flex items-center gap-1">
                  WITHDRAW
                </p>
              </div>

              <div className="flex flex-col  gap-[10px]">
                {/* Wallet Balance */}
                <WalletBalance />

                {/* Account */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Select Account
                    </p>

                    <div className="flex gap-1">
                      {linkedAccounts?.length && (
                        <p
                          onClick={selectDefaultAccount}
                          className={`${
                            withdraw?.account === "Default"
                              ? "bg-tradeOrange text-black"
                              : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                          } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                          Default
                        </p>
                      )}

                      {linkedAccounts?.length > 1 && (
                        <p
                          onClick={selectAlternativeAccount}
                          className={`${
                            withdraw?.account === "Alternative"
                              ? "bg-tradeOrange text-black"
                              : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                          } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                          Alternative
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-[10px] w-full ">
                    <div className="p-2.5 bg-tradeAshLight border border-tradeAshExtraLight rounded-xl">
                      {withdraw?.bank?.logo ? (
                        <img
                          className="w-[20px] h-[20px] object-contain"
                          src={
                            withdraw?.bank?.logo ||
                            "/images/default-bank-logo.png"
                          }
                          alt=""
                        />
                      ) : (
                        <RiBankLine className="text-[15px] text-tradeWhite" />
                      )}
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <p className="text-white text-[13px] font-semibold">
                        {withdraw?.bank?.bank_name || "Bank Name"}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-medium tracking-wide">
                        {withdraw?.bank?.account_number || "Account Number"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Enter Amount
                    </p>

                    <div className="flex items-center gap-2">
                      <p
                        onClick={selectNGN}
                        className={`${
                          withdraw?.currency === "NGN"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        NGN
                      </p>

                      <p
                        onClick={selectUSD}
                        className={`${
                          withdraw?.currency === "USD"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        USD
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    {withdraw?.currency === "NGN" ? (
                      // NGN
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                          <input
                            className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                            type="text"
                            placeholder={`15,000.000 - 30,000,000.00`}
                            value={formatWithCommas(withdraw?.amount?.NGN)}
                            onChange={handleNGNAmountChange}
                            onFocus={(e) =>
                              (e.target.value = withdraw?.amount?.NGN || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                withdraw?.amount?.NGN
                              ))
                            } // format on blur
                          />
                        </div>

                        <div>
                          <p className="text-tradeFadeWhite text-xs font-semibold">
                            You're about to deposit the equivalent of{" "}
                            <span className="text-tradeOrange">
                              USD {""}
                              {withdraw?.amount?.USD
                                ? toDecimal(withdraw?.amount?.USD)
                                : "0.00"}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      // USD
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                          <input
                            className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                            type="text"
                            placeholder={`10.00 - 20,000.00`}
                            value={formatWithCommas(withdraw?.amount?.USD)}
                            onChange={handleUSDAmountChange}
                            onFocus={(e) =>
                              (e.target.value = withdraw?.amount?.USD || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                withdraw?.amount?.USD
                              ))
                            } // format on blur
                          />
                        </div>

                        <div>
                          <p className="text-tradeFadeWhite text-xs font-semibold">
                            You're about to deposit the equivalent of{" "}
                            <span className="text-tradeOrange">
                              NGN {""}
                              {withdraw?.amount?.NGN
                                ? toDecimal(withdraw?.amount?.NGN)
                                : "0.00"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={handleProceed}
                  disabled={withdraw?.proceed}
                >
                  Proceed
                </Button>
              </div>
            </div>

            <RecentWithdraw />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Withdraw;
