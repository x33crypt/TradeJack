import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import RecentDeposit from "@/components/wallet/RecentDeposit";
import { toDecimal } from "@/utils/currency/toDecimal";
import { useToast } from "@/context/ToastContext";
import { submitDeposit } from "@/utils/wallet/deposit";
import { useDepositContext } from "@/context/wallet/DepositContext";
import paystackLogo from "../../assets/logos-paystack.png";
import { IoIosLock } from "react-icons/io";
import { toUSD } from "@/utils/currency/toUSD";
import { toNGN } from "@/utils/currency/toNGN";
import { useEffect } from "react";

const Deposit = () => {
  const { deposit, setDeposit } = useDepositContext();
  const [depositDetails, setDepositDetails] = useState({
    url: null,
    selectedCurrency: "NGN",
    amount: { NGN: null, USD: null },
  });

  const { toast, setToast } = useToast();

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
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    const usdValue = rawValue || ""; // Default to empty string if cleared

    setDepositDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
        USD: usdValue,
      },
    }));
  };

  // update NGN amount if user input USD
  useEffect(() => {
    if (
      !depositDetails?.amount?.USD ||
      depositDetails?.selectedCurrency !== "USD"
    )
      return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: ngnValue } = await toNGN(depositDetails.amount.USD);

        if (ngnValue) {
          setDepositDetails((prevDetails) => ({
            ...prevDetails,
            amount: {
              ...prevDetails.amount,
              NGN: ngnValue,
            },
          }));
        }
      } catch (error) {
        console.error("Conversion to NGN failed:", error);
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(debounceTimeout); // Clear previous timeout on new input
  }, [depositDetails?.amount?.USD, depositDetails?.selectedCurrency]);

  const handleNGNAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    const ngnValue = rawValue || ""; // Default to empty string if cleared

    setDepositDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
        NGN: ngnValue,
      },
    }));
  };

  // update USD amount if user input NGN
  useEffect(() => {
    if (
      !depositDetails?.amount?.NGN ||
      depositDetails?.selectedCurrency !== "NGN"
    )
      return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: usdValue } = await toUSD(depositDetails.amount.NGN);

        if (usdValue) {
          setDepositDetails((prevDetails) => ({
            ...prevDetails,
            amount: {
              ...prevDetails.amount,
              USD: usdValue,
            },
          }));
        }
      } catch (error) {
        console.error("Conversion to USD failed:", error);
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(debounceTimeout); // Clear on new keystroke
  }, [depositDetails?.amount?.NGN, depositDetails?.selectedCurrency]);

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

    const currency = depositDetails?.selectedCurrency;
    const amountUSD = depositDetails?.amount?.USD;
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

    // // Validate minimums
    // if (currency === "USD" && amountUSD < 10) {
    //   setDeposit((prev) => ({
    //     ...prev,
    //     loading: false,
    //   }));
    //   setToast({
    //     ...toast,
    //     error: true,
    //     errorMessage: "The minimum deposit amount is USD 10.",
    //   });
    //   return;
    // }

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
      amount_ngn: depositDetails?.amount?.NGN,
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

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <div className="flex-1 lg:px-[15%] flex flex-col gap-[10px]">
          <div className=" w-full md:border lg:border-0 border-neutral-800">
            <div className="flex items-center justify-between p-[15px] lg:px-0 border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white">Add Cash</p>
            </div>

            <div className="flex flex-col p-[15px] lg:px-0 gap-[10px]">
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
                  <p className="text-white font-semibold text-2xl leading-none bg-tradeOrang">
                    <span className="text-tradeFadeWhite">@</span>sane
                  </p>
                </div>

                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Your username serves as your internal account ID. Share it
                    with friends or trade partners on this platform to receive
                    payments and fund your wallet seamlessly.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handleCopy("sane")}
                  textToCopy="tradejack-username"
                >
                  Copy
                </Button>
              </div>

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

                {depositDetails?.selectedCurrency === "NGN" ? (
                  // NGN
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[10px] w-full">
                      <p className="text-tradeFadeWhite text-xs font-medium">
                        Amount in NGN
                      </p>
                      <div className="flex-1 flex bg-tradeAsh w-full border border-tradeAshLight rounded-[10px]">
                        <input
                          className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                          type="text"
                          placeholder={`Enter amount (min: 15,000.00 NGN)`}
                          onChange={handleNGNAmountChange}
                          value={toDecimal(depositDetails?.amount?.NGN) || ""}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Value equivalent to{" "}
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
                        Amount in USD
                      </p>
                      <div className="flex-1 flex bg-tradeAsh w-full border border-tradeAshLight rounded-[10px]">
                        <input
                          className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                          type="text"
                          placeholder={`Enter amount (min: 10.00 USD)`}
                          onChange={handleUSDAmountChange}
                          value={toDecimal(depositDetails?.amount?.USD) || ""}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Value equivalent to{" "}
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
          </div>

          <div className="p-[15px] md:py-[15px] lg:px-[0px]">
            <Button
              variant="primary"
              onClick={handleDeposit}
              disabled={deposit?.loading}
            >
              Add Cash Now
            </Button>
          </div>

          <div className="flex flex-col p-[15px] lg:px-0 gap-[10px]">
            <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
              <div className="flex flex-col gap-[20px] bg-tradeOrang rounded-lg">
                <div className="w-full flex justify-center">
                  <img
                    className="w-[180px] leading-none"
                    src={paystackLogo}
                    alt=""
                  />
                </div>
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
                    <span className="font-semibold text-white">free</span> — no
                    transaction or processing fees
                  </p>
                </div>
              </div>
            </div>
          </div>

          <RecentDeposit />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
