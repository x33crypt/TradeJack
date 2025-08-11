import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import RecentDeposit from "@/components/wallet/RecentDeposit";
import { toDecimal } from "@/utils/toDecimal";
import { useToast } from "@/context/ToastContext";
import { submitDeposit } from "@/utils/wallet/deposit";
import { useDepositContext } from "@/context/wallet/DepositContext";
import paystackLogo from "../../assets/logos-paystack.png";
import { IoIosLock } from "react-icons/io";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { useEffect } from "react";
import { useTransaction } from "@/context/wallet/TransactionContext";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import { IoCopy } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { useBalance } from "@/context/BalanceContext";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import WalletBalance from "@/components/wallet/WalletBalance";

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
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 h-max flex flex-col md:flex-row md:gap-[5px] gap-[10px]">
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">Deposit Funds</p>
            </div>

            <div className="px-[15px] pt-[12px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Add funds to your account quickly and securely, ensuring you’re
                ready for seamless trading anytime.
              </p>
            </div>

            <div className="h-full flex flex-col justify-between p-[15px] md:gap-[25px] gap-[10px]">
              {/* Wallet Balance */}
              <WalletBalance />

              {/* External Deposit */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="flex gap-1 items-center">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      External Deposit
                    </p>
                  </div>

                  <div className="flex gap-1 items-cente">
                    <div
                      onClick={selectNGN}
                      className={`${
                        deposit?.currency === "NGN"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1  border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        deposit?.currency === "USD"
                          ? "bg-tradeOrange text-black"
                          : "bg-transparent text-tradeFadeWhite"
                      } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                    >
                      <p className="text-xs font-semibold">USD</p>
                    </div>
                  </div>
                </div>

                <div>
                  {deposit?.currency === "NGN" ? (
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
                      <div className="flex flex-col gap-[10px] w-full">
                        <p className="text-tradeFadeWhite text-xs font-medium">
                          Enter Amount in USD
                        </p>
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
                variant="primary"
                onClick={proceed}
                disabled={deposit?.loading}
              >
                Proceed
              </Button>

              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight h-[100px">
                <div className="flex flex-col gap-[20px] bg-tradeOrang rounded-lg">
                  {/* <div className="w-full flex items-center justify-center">
                    <img src={paystackLogo} className="w-[210px]" alt="" />
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
            </div>

            <div className="px-[15px] py-[12px]">
              <div className="h-[100px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeFadeWhite">
                <p className="text-sm">Event</p>
              </div>
            </div>
          </div>

          <RecentDeposit transactions={transactions} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
