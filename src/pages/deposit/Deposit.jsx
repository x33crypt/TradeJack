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

const Deposit = () => {
  const { transactions } = useTransaction();
  const { deposit, setDeposit } = useDepositContext();
  const [depositDetails, setDepositDetails] = useState({
    url: null,
    selectedCurrency: "NGN",
    amount: { NGN: null, USD: null },
  });
  const { toast, setToast } = useToast();
  const [editingAmount, setEditingAmount] = useState(false);

  const selectUSD = () => {
    setDepositDetails((prevDetails) => ({
      url: null,
      selectedCurrency: "USD",
      amount: { NGN: null, USD: null },
    }));
  };

  const selectNGN = () => {
    setDepositDetails((prevDetails) => ({
      url: null,
      selectedCurrency: "NGN",
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

    setDepositDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
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

    setDepositDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
        NGN: rawValue, // store the raw value
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
      !depositDetails.amount?.USD || // check USD input, not NGN
      depositDetails.selectedCurrency !== "USD"
    )
      return;

    const currentUSD = depositDetails.amount.USD;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: ngnValue } = await toNGN(currentUSD); // convert USD to NGN

        // Only update if USD value hasn't changed during fetch
        setDepositDetails((prev) => {
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
  }, [
    depositDetails.amount?.USD,
    depositDetails.selectedCurrency,
    editingAmount,
  ]);

  // Update NGN amount if user inputs NGN (convert NGN → USD)
  useEffect(() => {
    if (
      !depositDetails.amount?.NGN ||
      depositDetails.selectedCurrency !== "NGN"
    )
      return;

    const currentNGN = depositDetails.amount.NGN;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: usdValue } = await toUSD(currentNGN);

        // Only update if NGN value hasn't changed during fetch
        setDepositDetails((prev) => {
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
  }, [
    depositDetails.amount?.NGN,
    depositDetails.selectedCurrency,
    editingAmount,
  ]);

  console.log(depositDetails?.amount);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optionally show toast or feedback
        setToast({
          ...toast,
          success: true,
          successMessage: `Accound ID copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  const handleDeposit = async () => {
    setDeposit((prev) => ({
      ...prev,
      loading: true,
    }));

    const amountNGN = depositDetails?.amount?.NGN;

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
      amount: depositDetails?.amount?.NGN,
    };

    console.log("Depost Amount :", payload);

    // Submit deposit
    const result = await submitDeposit(payload);
    console.log("Deposit:", result);

    if (result?.success) {
      setDeposit((prev) => ({
        ...prev,
        depositAmount: depositDetails?.amount,
        depositReference: result?.reference,
        loading: false,
      }));

      window.location.href = result?.redirectUrl;
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

  console.log("Deposit Details:", depositDetails);
  console.log("editingAmount:", editingAmount);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 h-max flex flex-col md:flex-row md:gap-[5px] gap-[15px]">
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">Add Funds</p>
            </div>

            <div className="h-full flex flex-col justify-between p-[15px] md:gap-[10px] gap-[15px]">
              {/* Internal Deposit */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Internal Deposit
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Username
                  </p>

                  <div className="flex justify-between items-center bg-tradePurpl">
                    <p className="text-white font-semibold text-2xl leading-none bg-tradeOrang">
                      <span className="text-tradeFadeWhite">@</span>sane
                    </p>
                    <div
                      onClick={() => handleCopy("sane")}
                      className="flex gap-2 items-center px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300"
                    >
                      <p className="text-xs text-white font-bold">Copy</p>
                      <IoCopy className="text-sm text-tradeOrange" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Your username serves as your internal account ID. Share it
                    with friends or trade partners on this platform to receive
                    payments and fund your wallet seamlessly.
                  </p>
                </div>

                {/* <Button
                  variant="Fadeout"
                  onClick={() => handleCopy("sane")}
                  textToCopy="tradejack-username"
                >
                  Copy
                </Button> */}
              </div>

              {/* External Deposit */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      External Deposit
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <div
                      onClick={selectNGN}
                      className={`${
                        depositDetails?.selectedCurrency === "NGN"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        depositDetails?.selectedCurrency === "USD"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">USD</p>
                    </div>
                  </div>
                </div>

                <div>
                  {depositDetails?.selectedCurrency === "NGN" ? (
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
                                ? depositDetails?.amount?.NGN || ""
                                : formatWithCommas(depositDetails?.amount?.NGN)
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
                            {depositDetails?.amount?.USD
                              ? toDecimal(depositDetails?.amount?.USD)
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
                                ? depositDetails?.amount?.USD || ""
                                : formatWithCommas(depositDetails?.amount?.USD)
                            }
                            onChange={handleUSDAmountChange}
                            onFocus={() => setEditingAmount(true)}
                            onBlur={() => setEditingAmount(false)}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-tradeFadeWhite text-xs font-semibold">
                          You're about to deposit the equivalent of{" "}
                          <span className="text-tradeOrange">
                            NGN {""}
                            {depositDetails?.amount?.NGN
                              ? toDecimal(depositDetails?.amount?.NGN)
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
                onClick={handleDeposit}
                disabled={deposit?.loading}
              >
                Add Cash Now
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

          <RecentDeposit transactions={transactions} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
