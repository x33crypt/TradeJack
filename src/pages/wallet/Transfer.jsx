import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import { toDecimal } from "@/utils/toDecimal";
import { useToast } from "@/context/otherContext/ToastContext";
import { useTransferContext } from "@/context/userContext/TransferContext";
import RecentTransfer from "@/components/wallet/RecentTransfer";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchTransferTxt } from "@/hooks/userHooks/useFetchTransferTxt";
import WalletBalance from "@/components/wallet/WalletBalance";
import { useCurrency } from "@/context/userContext/CurrencyContext";
import Conversion from "@/components/wallet/Conversion";
import { useConversion } from "@/context/otherContext/ConvertionContext";

const Transfer = () => {
  const { refetchTransferTxt } = useFetchTransferTxt();
  const { balance } = useBalance();
  const { transfer, setTransfer } = useTransferContext();
  const { setToast } = useToast();
  const { currency, setCurrency } = useCurrency();
  const { data } = useConversion();
  const [editingAmount, setEditingAmount] = useState(false);

  console.log("Conversion Data in Deposit:", data);

  const handleUsernameChange = (e) => {
    setTransfer((prev) => ({
      ...prev,
      username: e.target.value,
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

  useEffect(() => {
    if (!data?.conversion_result) return;
    if (data?.base_code !== "USD") return;

    if (currency?.current === "default_currency") {
      setTransfer((prev) => ({
        ...prev,
        amount: {
          ...prev.amount,
          NGN: Number(data.conversion_result) || 0,
        },
      }));
    }
  }, [currency?.current, data?.conversion_result, data?.base_code]);

  console.log("Transfer Amounts:", transfer?.amount);

  const formatWithCommas = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const amount =
    currency?.current === "default_currency"
      ? transfer?.amount?.USD
      : transfer?.amount?.NGN;

  const from =
    currency?.current === "default_currency"
      ? currency?.default_currency?.code
      : currency?.user_currency?.code;

  const to =
    currency?.current === "default_currency"
      ? currency?.user_currency?.code
      : currency?.default_currency?.code;

  const proceed = () => {
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
                <WalletBalance />

                {/* Recipient Wallet */}
                <div className="flex flex-col gap-[10px] py-[12px] bg-tradeAs rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Recipient Wallet
                    </p>
                  </div>

                  <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                    <input
                      className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-semibold leading-none"
                      type="text"
                      placeholder="Username"
                      onChange={handleUsernameChange}
                      value={transfer?.username}
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-[10px] py-[12px] bg-tradeAs rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Enter Amount
                    </p>
                  </div>

                  <div>
                    {currency?.current === "user_currency" ? (
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                          <p className="text-tradeFadeWhite text-xl font-semibold">
                            {currency?.user_currency?.symbol}
                          </p>

                          <input
                            className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-semibold leading-none"
                            type="text"
                            placeholder={`15,000.000 - 30,000,000.00`}
                            value={
                              editingAmount
                                ? transfer?.amount?.NGN || ""
                                : formatWithCommas(transfer?.amount?.NGN)
                            }
                            onChange={handleNGNAmountChange}
                            onFocus={() => setEditingAmount(true)}
                            onBlur={() => setEditingAmount(false)}
                          />
                        </div>

                        <Conversion
                          disabled={true}
                          amount={amount}
                          from={from}
                          to={to}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex-1 flex items-center gap-1 bg-tradeAshLigh w-full border-b-2 border-tradeAshLight ">
                          <p className="text-tradeFadeWhite text-xl font-medium">
                            {currency?.default_currency?.symbol}
                          </p>
                          <input
                            className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-medium leading-none"
                            type="text"
                            placeholder={`10.00 - 20,000.00`}
                            value={
                              editingAmount
                                ? transfer?.amount?.USD || ""
                                : formatWithCommas(transfer?.amount?.USD)
                            }
                            onChange={handleUSDAmountChange}
                            onFocus={() => setEditingAmount(true)}
                            onBlur={() => setEditingAmount(false)}
                          />
                        </div>

                        <Conversion
                          disabled={true}
                          amount={amount}
                          from={from}
                          to={to}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={proceed}
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
