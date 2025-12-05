import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import RecentDeposit from "@/components/wallet/RecentDeposit";
import { toDecimal } from "@/utils/toDecimal";
import { useToast } from "@/context/otherContext/ToastContext";
import { submitDeposit } from "@/utils/wallet/deposit";
import { useDepositContext } from "@/context/userContext/DepositContext";
import { useEffect } from "react";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import WalletBalance from "@/components/wallet/WalletBalance";
import { useCurrency } from "@/context/userContext/CurrencyContext";
import Conversion from "@/components/wallet/Conversion";
import { useConversion } from "@/context/otherContext/ConvertionContext";

const Deposit = () => {
  const { balance } = useBalance();
  const { transactions } = useTransaction();
  const { deposit, setDeposit } = useDepositContext();
  const { toast, setToast } = useToast();
  const [editingAmount, setEditingAmount] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { data } = useConversion();

  console.log("Conversion Data in Deposit:", data);

  const handleUSDAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Allow only numbers & dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }

    setDeposit((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        USD: rawValue,
      },
    }));
  };

  const handleNGNAmountChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // allow only numbers and one dot

    // Prevent multiple dots
    const parts = rawValue.split(".");
    if (parts.length > 2) {
      rawValue = parts[0] + "." + parts.slice(1).join("");
    }
    setDeposit((prev) => ({
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
      setDeposit((prev) => ({
        ...prev,
        amount: {
          ...prev.amount,
          NGN: Number(data.conversion_result) || 0,
        },
      }));
    }
  }, [currency?.current, data?.conversion_result, data?.base_code]);

  console.log("Deposit Amounts:", deposit?.amount);

  const formatWithCommas = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    setDeposit((prev) => ({
      ...prev,
      amount: {
        USD: null,
        NGN: null,
      },
    }));
  }, [currency?.current]);

  const amount =
    currency?.current === "default_currency"
      ? deposit?.amount?.USD
      : deposit?.amount?.NGN;

  const from =
    currency?.current === "default_currency"
      ? currency?.default_currency?.code
      : currency?.user_currency?.code;

  const to =
    currency?.current === "default_currency"
      ? currency?.user_currency?.code
      : currency?.default_currency?.code;

  const proceed = async () => {
    setDeposit((prev) => ({
      ...prev,
      loading: true,
    }));

    const amountNGN = deposit?.amount?.NGN;

    if (!amountNGN || isNaN(amountNGN)) {
      setDeposit((prev) => ({
        ...prev,
        loading: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Amount",
      });
      return;
    }

    if (amountNGN < 15000) {
      setDeposit((prev) => ({
        ...prev,
        loading: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: `The minimum deposit amount is NGN ${toDecimal(15000)}.`,
      });
      return;
    }

    const payload = {
      amount: deposit?.amount?.NGN,
    };

    console.log("Deposit Amount :", payload);

    // Submit deposit
    const result = await submitDeposit(payload);
    console.log("Deposit Response:", result);

    if (result?.success) {
      setDeposit((prev) => ({
        ...prev,
        confirm: true,
        url: result?.redirectUrl,
        referenceId: result?.reference,
      }));
    } else {
      console.error("Deposit failed:", result.error);
      setDeposit((prev) => ({
        ...prev,
        loading: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: result.error,
      });
    }
  };

  console.log("editingAmount:", editingAmount);
  console.log("Deposit Context:", deposit);
  console.log("Balance in Transfer:", balance?.available_balance);

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
                  DEPOSIT
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                {/* Wallet Balance */}
                <WalletBalance />

                {/* External Deposit */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] ">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Enter Amount
                    </p>
                  </div>

                  <div className="flex flex-col gap-[10px] ">
                    {currency?.current === "user_currency" ? (
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
                              ? deposit?.amount?.NGN || ""
                              : formatWithCommas(deposit?.amount?.NGN)
                          }
                          onChange={handleNGNAmountChange}
                          onFocus={() => setEditingAmount(true)}
                          onBlur={() => setEditingAmount(false)}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center gap-1 bg-tradeAsh w-full border-b-2 border-tradeAshLight ">
                        <p className="text-tradeFadeWhite text-xl font-medium">
                          {currency?.default_currency?.symbol}
                        </p>
                        <input
                          className="bg-transparent flex-1 py-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-xl font-medium leading-none"
                          type="text"
                          placeholder={`10.00 - 20,000.00`}
                          value={
                            editingAmount
                              ? deposit?.amount?.USD || ""
                              : formatWithCommas(deposit?.amount?.USD)
                          }
                          onChange={handleUSDAmountChange}
                          onFocus={() => setEditingAmount(true)}
                          onBlur={() => setEditingAmount(false)}
                        />
                      </div>
                    )}

                    <Conversion
                      disabled={true}
                      amount={amount}
                      from={from}
                      to={to}
                    />
                  </div>
                </div>

                <Button
                  variant="Fadeout"
                  onClick={proceed}
                  disabled={deposit?.loading}
                >
                  Proceed
                </Button>
              </div>
            </div>

            <RecentDeposit transactions={transactions} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
