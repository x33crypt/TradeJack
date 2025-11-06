import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import RecentDeposit from "@/components/wallet/RecentDeposit";
import { toDecimal } from "@/utils/toDecimal";
import { useToast } from "@/context/otherContext/ToastContext";
import { submitDeposit } from "@/utils/wallet/deposit";
import { useDepositContext } from "@/context/userContext/DepositContext";
import paystackLogo from "../../assets/logos-paystack.png";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { useEffect } from "react";
import { useTransaction } from "@/context/userContext/TransactionContext";
import DasHboardMenu from "@/components/dashboard/DashboardMenu";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import WalletBalance from "@/components/wallet/WalletBalance";
import WalletMenu from "@/components/wallet/WalletMenu";

const Deposit = () => {
  const { loading, error, refetch } = useFetchBalance();
  const { balance } = useBalance();
  const { transactions } = useTransaction();
  const { deposit, setDeposit } = useDepositContext();
  const { toast, setToast } = useToast();
  const [editingAmount, setEditingAmount] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const selectUSD = () => {
    setDeposit((prev) => ({
      ...prev,
      url: null,
      currency: "USD",
      amount: { NGN: null, USD: null },
    }));
  };

  const selectNGN = () => {
    setDeposit((prev) => ({
      ...prev,
      url: null,
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

  const formatWithCommas = (value) => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  // Update NGN amount if user inputs USD (convert USD → NGN)
  useEffect(() => {
    if (
      !deposit?.amount?.USD || // check USD input, not NGN
      deposit?.currency !== "USD"
    )
      return;

    const currentUSD = deposit?.amount?.USD;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: ngnValue } = await toNGN(currentUSD); // convert USD to NGN

        // Only update if USD value hasn't changed during fetch
        setDeposit((prev) => {
          if (prev.amount.USD !== currentUSD) return prev;
          return {
            ...prev,
            amount: {
              ...prev.amount,
              NGN: ngnValue || "",
            },
          };
        });
      } catch (error) {
        console.error("Conversion to NGN failed:", error);
      }
    }, 700);

    return () => clearTimeout(debounceTimeout);
  }, [deposit.amount?.USD, deposit?.currency, editingAmount]);

  // Update NGN amount if user inputs NGN (convert NGN → USD)
  useEffect(() => {
    if (!deposit.amount?.NGN || deposit.currency !== "NGN") return;

    const currentNGN = deposit?.amount?.NGN;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: usdValue } = await toUSD(currentNGN);

        // Only update if NGN value hasn't changed during fetch
        setDeposit((prev) => {
          if (prev.amount.NGN !== currentNGN) return prev;
          return {
            ...prev,
            amount: {
              ...prev.amount,
              USD: usdValue || "",
            },
          };
        });
      } catch (error) {
        console.error("Conversion to USD failed:", error);
      }
    }, 700); // ~700ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [deposit.amount?.NGN, deposit?.currency, editingAmount]);

  console.log(deposit?.amount);

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

              <div className="flex flex-col  gap-[10px]">
                {/* Wallet Balance */}
                <WalletBalance />

                {/* External Deposit */}
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Enter Amount
                    </p>

                    <div className="flex items-center gap-2">
                      <p
                        onClick={selectNGN}
                        className={`${
                          deposit?.currency === "NGN"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        NGN
                      </p>

                      <p
                        onClick={selectUSD}
                        className={`${
                          deposit?.currency === "USD"
                            ? "bg-tradeOrange text-black"
                            : "bg-tradeAshLight/50 hover:bg-tradeOrange/30 text-tradeFadeWhite hover:text-white "
                        } text-xs font-bold  leading-none p-1 w-max rounded-sm transition-all duration-300 cursor-pointer`}
                      >
                        USD
                      </p>
                    </div>
                  </div>

                  <div>
                    {deposit?.currency === "NGN" ? (
                      // NGN
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                          <input
                            className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
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

                        <div>
                          <p className="text-tradeFadeWhite text-xs font-semibold">
                            You're about to deposit the equivalent of{" "}
                            <span className="text-tradeOrange">
                              USD {""}
                              {deposit?.amount?.USD
                                ? toDecimal(deposit?.amount?.USD)
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

                        <div>
                          <p className="text-tradeFadeWhite text-xs font-medium">
                            You're about to deposit the equivalent of{" "}
                            <span className="text-tradeOrange font-semibold">
                              NGN {""}
                              {deposit?.amount?.NGN
                                ? toDecimal(deposit?.amount?.NGN)
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
