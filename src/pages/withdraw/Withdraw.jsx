import React, { useEffect } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import RecentWithdraw from "@/components/wallet/RecentWithdraw";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { useToast } from "@/context/ToastContext";
import { toDecimal } from "@/utils/toDecimal";
import { useWithdrawContext } from "@/context/wallet/WithdrawContext";
import { IoWalletOutline } from "react-icons/io5";
import { useBalance } from "@/context/BalanceContext";
import { useFetchLinkedBanks } from "@/hooks/useFetchLinkedBanks";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";

const Withdraw = () => {
  const { balance } = useBalance();
  const { withdraw, setWithdraw } = useWithdrawContext();
  const { loading, error, refetch } = useFetchLinkedBanks();
  const { linkedAccounts } = useLinkedAccount();
  const { setToast } = useToast();

  console.log("Withdraw Context:", withdraw);
  console.log("Balance in Withdraw:", balance?.available_balance);
  console.log("Linked Accounts:", linkedAccounts);

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

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col md:flex-row md:gap-[5px] gap-[15px]">
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">Withdraw Funds</p>
            </div>
            <div className="h-full flex flex-col justify-between p-[15px] md:gap-[10px] gap-[15px]">
              {/* Wallet */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      From Wallet
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] w-full border- border-tradeAshLight">
                  <div className="p-3 bg-tradeAshLight w-max rounded-[10px]">
                    <IoWalletOutline className="text-[25px] text-tradeWhite" />
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Current balance
                    </p>
                    <p className="text-white text-[15px] font-semibold">
                      NGN {toDecimal(balance?.available_balance?.NGN)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      To Bank Account
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <div
                      onClick={selectDefaultAccount}
                      className={` ${
                        withdraw?.account === "Default"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">Default</p>
                    </div>

                    <div
                      onClick={selectAlternativeAccount}
                      className={`${
                        withdraw?.account === "Alternative"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      } px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">
                        Alternative
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] w-full border- border-tradeAshLight">
                  <div className="p-[10px] bg-tradeAshLight rounded-[10px]">
                    <img
                      className="w-[30px]"
                      src={
                        withdraw?.bank?.logo || "/images/default-bank-logo.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      {withdraw?.bank?.bank_name || "Bank Name"}
                    </p>
                    <p className="text-white text-[15px] font-semibold">
                      {withdraw?.bank?.account_number || "Account Number"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Currency
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <div
                      onClick={selectNGN}
                      className={`${
                        withdraw?.currency === "NGN"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        withdraw?.currency === "USD"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">USD</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  {withdraw?.currency === "NGN" ? (
                    // NGN
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex flex-col gap-[10px] w-full">
                        <p className="text-tradeFadeWhite text-xs font-medium">
                          Enter Amount in NGN
                        </p>
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
                      <div className="flex flex-col gap-[10px] w-full">
                        <p className="text-tradeFadeWhite text-xs font-medium">
                          Enter Amount in USD
                        </p>
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
                variant="primary"
                onClick={handleProceed}
                disabled={withdraw?.proceed}
              >
                Proceed
              </Button>

              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight h-[100px]">
                <div className="flex flex-col gap-[20px] bg-tradeOrang rounded-lg">
                  {/* <div className="w-full flex justify-center">
                    <img
                      className="w-[180px] leading-none"
                      src={paystackLogo}
                      alt=""
                    />
                  </div> */}
                  <div className="flex flex-wrap lg:items-center text-xs text-tradeFadeWhite gap-1">
                    <p className="inline items-start gap-1">
                      <span className="text-white mr-[2px]">•</span>
                      Your payment is{" "}
                      <span className="font-semibold text-white">
                        secured by Paystack
                      </span>
                    </p>
                    <p className=" inline items-start gap-1">
                      <span className="text-white mr-[2px]">•</span>
                      You’ll be{" "}
                      <span className="font-semibold text-white">
                        redirected
                      </span>{" "}
                      to Paystack to complete your deposit
                    </p>
                    <p className="inline items-start gap-1">
                      <span className="text-white mr-[2px]">•</span>
                      <span className="font-semibold text-white">
                        Do not close
                      </span>{" "}
                      this tab or navigate away during the process
                    </p>
                    <p className="inline items-start gap-1">
                      <span className="text-white mr-[2px]">•</span>
                      Deposits are{" "}
                      <span className="font-semibold text-white">free</span> —
                      no transaction or processing fees
                    </p>
                  </div>
                </div>
              </div>

              {/* Event */}
              <div className="h-[100px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeFadeWhite">
                <p className="text-sm">Event</p>
              </div>
            </div>
          </div>
          <RecentWithdraw />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Withdraw;
