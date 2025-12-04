import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { toDecimal } from "@/utils/toDecimal";
import { useToast } from "@/context/otherContext/ToastContext";
import { useTransferContext } from "@/context/userContext/TransferContext";
import RecentTransfer from "@/components/wallet/RecentTransfer";
import DasHboardMenu from "@/components/dashboard/DashboardMenu";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import { IoWalletOutline } from "react-icons/io5";
import { useFetchTransferTxt } from "@/hooks/userHooks/useFetchTransferTxt";
import WalletBalance from "@/components/wallet/WalletBalance";
import WalletMenu from "@/components/wallet/WalletMenu";

const Transfer = () => {
  const { refetchTransferTxt } = useFetchTransferTxt();
  const { loading, refetch } = useFetchBalance();
  const { balance } = useBalance();
  const { transfer, setTransfer } = useTransferContext();
  const { setToast } = useToast();

  console.log("Transfer Context:", transfer);
  console.log("Balance in Transfer:", balance?.available_balance);

  useEffect(() => {
    refetch();
  }, []);

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
      refetchTransferTxt();
    }
  }, [transfer?.success]);

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
                  TRANSFER
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                {/* Wallet Balance */}
                {/* <WalletBalance /> */}

                {/* Recipient Wallet */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Recipient Wallet
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder="Username"
                      onChange={handleUsernameChange}
                      value={transfer?.username}
                    />
                  </div>

                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Verify the recipient’s username, transfers are irreversible.
                  </p>
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
                          transfer?.currency === "NGN"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        NGN
                      </p>

                      <p
                        onClick={selectUSD}
                        className={`${
                          transfer?.currency === "USD"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        USD
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    {transfer?.currency === "NGN" ? (
                      // NGN
                      <div className="flex flex-col gap-[10px]">
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
                  variant="secondary"
                  onClick={handleProceed}
                  disabled={transfer?.proceed}
                >
                  Proceed
                </Button>
              </div>
            </div>
            <RecentTransfer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transfer;
