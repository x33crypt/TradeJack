import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { toDecimal } from "@/utils/toDecimal";
import image from "../../assets/landingImg4.JPG";
import { useToast } from "@/context/ToastContext";
import { useTransferContext } from "@/context/wallet/TransferContext";
import RecentTransfer from "@/components/wallet/RecentTransfer";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useBalance } from "@/context/BalanceContext";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { IoWalletOutline } from "react-icons/io5";

const Transfer = () => {
  const { loading, error, refetch } = useFetchBalance();
  const { balance } = useBalance();
  const { refetchTransactions } = useFetchTransactions();
  const { transactions } = useTransaction();
  const { transfer, setTransfer } = useTransferContext();
  const { setToast } = useToast();

  console.log("Transfer Context:", transfer);
  console.log("Balance in Transfer:", balance?.available_balance);

  const handleUsernameChange = (e) => {
    setTransfer((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const selectUSD = () => {
    setTransfer((prev) => ({
      ...prev,
      currency: "USD",
      amount: { NGN: null, USD: null },
    }));
  };

  const selectNGN = () => {
    setTransfer((prev) => ({
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

    setTransfer((prev) => ({
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

    setTransfer((prev) => ({
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
    if (!transfer?.amount?.USD || transfer?.currency !== "USD") return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const result = await toNGN(transfer?.amount?.USD);

        if (result && result.amount) {
          console.log("Converted NGN Value:", result.amount);

          setTransfer((prev) => ({
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
  }, [transfer?.amount?.USD, transfer?.currency]);

  // update USD amount if user input NGN
  useEffect(() => {
    if (!transfer?.amount?.NGN || transfer?.currency !== "NGN") return;

    console.log("Converting NGN to USD:", transfer?.amount?.NGN);

    const debounceTimeout = setTimeout(async () => {
      try {
        const result = await toUSD(transfer?.amount?.NGN);

        if (result && result.amount) {
          console.log("Converted USD Value:", result.amount);

          setTransfer((prev) => ({
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
  }, [transfer?.amount?.NGN, transfer?.currency]);

  const handleProceed = () => {
    const { username, currency, amount } = transfer;

    // Validate username
    if (!username?.trim()) {
      setToast({
        error: true,
        errorMessage: "Missing required field: Recipient Wallet",
      });
      return;
    }

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
        Number(amount?.NGN || 0) > Number(balance?.available_balance?.NGN || 0)
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

    // Proceed
    setTransfer((prev) => ({
      ...prev,
      proceed: true,
      confirm: true,
    }));
  };

  // Refetch transactions after a successfull transfer
  useEffect(() => {
    if (transfer?.success) {
      refetchTransactions();
    }
  }, [transfer?.success]);

  // Refetch transactions on page mount
  useEffect(() => {
    refetchTransactions();
  }, []);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 h-max flex flex-col md:flex-row md:gap-[5px] gap-[15px]">
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">Transfer Funds</p>
            </div>

            <div className="px-[15px] pt-[12px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Move your funds securely between wallets, accounts, or trades
                with real-time processing and complete transaction transparency.
              </p>
            </div>

            <div className="h-full flex flex-col justify-between p-[15px] md:gap-[10px] gap-[15px]">
              {/* Wallet Balance */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <p className="text-[13px] text-tradeFadeWhite font-semibold">
                    From Wallet
                  </p>

                  <div className="flex gap-1 items-cente">
                    <div
                      onClick={selectNGN}
                      className={`${
                        transfer?.currency === "NGN"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        transfer?.currency === "USD"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">USD</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[10px] w-full border- border-tradeAshLight">
                  <div className="p-[10px] bg-tradeAshLight w-max rounded-[10px]  border border-tradeAshExtraLight">
                    <IoWalletOutline className="text-[30px] text-tradeWhite" />
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Current balance
                    </p>

                    <div>
                      {transfer?.currency === "NGN" ? (
                        <p className="text-white text-[13px] font-semibold">
                          NGN{" "}
                          {balance?.available_balance?.NGN
                            ? toDecimal(balance?.available_balance?.NGN)
                            : "0.00"}
                        </p>
                      ) : (
                        <p className="text-white text-[13px] font-semibold">
                          USD{" "}
                          {balance?.available_balance?.USD
                            ? toDecimal(balance?.available_balance?.USD)
                            : "0.00"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Wallet */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <p className="text-[13px] text-tradeFadeWhite font-semibold">
                    Transfer To
                  </p>
                </div>

                <div className="flex flex-col pb-[5px gap-[10px] w-full border- border-tradeAshLight">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Recipient Wallet
                  </p>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder="Username"
                      onChange={handleUsernameChange}
                      value={transfer?.username}
                    />
                  </div>
                </div>

                <p className="text-tradeFadeWhite text-xs font-medium">
                  Please confirm the recipient’s username before proceeding with
                  the transfer. Transfers to the wrong user cannot be reversed.
                </p>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="flex gap-1 items-center">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Currency
                    </p>
                  </div>

                  <div className="flex gap-1 items-cente">
                    <div
                      onClick={selectNGN}
                      className={`${
                        transfer?.currency === "NGN"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        transfer?.currency === "USD"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">USD</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  {transfer?.currency === "NGN" ? (
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
                            value={formatWithCommas(transfer?.amount?.NGN)}
                            onChange={handleNGNAmountChange}
                            onFocus={(e) =>
                              (e.target.value = transfer?.amount?.NGN || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                transfer?.amount?.NGN
                              ))
                            } // format on blur
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-tradeFadeWhite text-xs font-semibold">
                          You're about to transfer the equivalent of{" "}
                          <span className="text-tradeOrange">
                            USD {""}
                            {transfer?.amount?.USD
                              ? toDecimal(transfer?.amount?.USD)
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
                            value={formatWithCommas(transfer?.amount?.USD)}
                            onChange={handleUSDAmountChange}
                            onFocus={(e) =>
                              (e.target.value = transfer?.amount?.USD || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                transfer?.amount?.USD
                              ))
                            } // format on blur
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-tradeFadeWhite text-xs font-semibold">
                          You're about to transfer the equivalent of{" "}
                          <span className="text-tradeOrange">
                            NGN {""}
                            {transfer?.amount?.NGN
                              ? toDecimal(transfer?.amount?.NGN)
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
                disabled={transfer?.proceed}
              >
                Proceed
              </Button>

              <div className="h-[100px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeFadeWhite">
                <p className="text-sm">Event</p>
              </div>
            </div>
          </div>

          <RecentTransfer transactions={transactions} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transfer;
