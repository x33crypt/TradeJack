import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import { toUSD } from "@/utils/toUSD";
import { toNGN } from "@/utils/toNGN";
import { getMinimumWithdrawal } from "@/utils/currency/minWithdraw";
import { toDecimal } from "@/utils/toDecimal";
import image from "../../assets/landingImg4.JPG";
import { useToast } from "@/context/ToastContext";
import { submitTransfer } from "@/utils/wallet/transfer";
import { useTransferContext } from "@/context/wallet/TransferContext";
import { useNavigate } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import RecentTransfer from "@/components/wallet/RecentTransfer";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import { useTransaction } from "@/context/wallet/TransactionContext";

const Transfer = () => {
  const { transactions } = useTransaction();
  const { transfer, setTransfer } = useTransferContext();
  const [transferDetails, setTransferDetails] = useState({
    username: "",
    selectedCurrency: "NGN",
    amount: { USD: null, NGN: null },
    error: "",
    loading: false,
  });
  const [minWithdraw, setMinWithdraw] = useState({
    loading: true,
    success: false,
    result: null,
  });
  const [proceed, setProceed] = useState(false);
  const { toast, setToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const fetchMinWithdraw = async () => {
    setMinWithdraw({
      loading: true,
      success: false,
    });

    const result = await getMinimumWithdrawal("NGN");
    console.log("minimum withdraw result:", result);

    // Add 2-second delay before updating state
    setTimeout(() => {
      if (result?.success) {
        setMinWithdraw({
          loading: false,
          success: true,
          result: result.minimum.toFixed(2),
        });
      } else {
        setMinWithdraw({
          loading: false,
          success: false,
          result: null,
        });
      }
    }, 2000); // 2000ms = 2 seconds
  };

  useEffect(() => {
    fetchMinWithdraw();
  }, []);

  const handleUsernameChange = (e) => {
    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      username: e.target.value,
    }));
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");

    if (!isNaN(rawValue)) {
      setTransferDetails((prev) => ({
        ...prev,
        amount: {
          ...prev.amount,
          NGN: rawValue,
        },
      }));
    }
  };

  // Fetch Withdaw Amount In USD
  useEffect(() => {
    const timeout = setTimeout(() => {
      const ngnValue = Number(transferDetails?.amount?.NGN);
      if (!isNaN(ngnValue) && ngnValue > 0) {
        toUSD(ngnValue, "NGN").then((res) => {
          if (res) {
            console.log("hello", res);

            setTransferDetails((prev) => ({
              ...prev,
              amount: {
                ...prev.amount,
                USD: toDecimal(res?.amount, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              },
            }));
          }
        });
      } else {
        setTransferDetails((prev) => ({
          ...prev,
          amount: {
            ...prev.amount,
            USD: "",
          },
        }));
      }
    }, 500); // debounce time

    return () => clearTimeout(timeout);
  }, [transferDetails?.amount?.NGN]);

  // updating error state in confirm transfer modal
  useEffect(() => {
    setTransfer((prev) => ({
      ...prev,
      confirm: {
        ...prev.confirm,
        transferError: transferDetails?.error,
      },
    }));
  }, [transferDetails?.error]);

  // updating loading state in confirm transfer modal
  useEffect(() => {
    setTransfer((prev) => ({
      ...prev,
      confirm: {
        ...prev.confirm,
        loading: transferDetails?.loading,
      },
    }));
  }, [transferDetails?.loading]);

  const navigateTo = useNavigate();

  const handleProceed = () => {
    const { username, amount } = transferDetails;

    // Validate username
    if (!username || username.trim().length === 0) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Recipient Username",
      });
      return;
    }

    // Validate that minWithdraw has a valid number
    const minAmount = Number(minWithdraw?.result);
    const isMinValid = minWithdraw?.success && !isNaN(minAmount);

    // if (!isMinValid) {
    //   setToast({
    //     ...toast,
    //     error: true,
    //     errorMessage:
    //       "Minimum transfer amount not available. Retry and try again.",
    //   });
    //   return;
    // }

    // Validate NGN amount
    const ngnAmount = Number(amount?.NGN);
    if (!ngnAmount || isNaN(ngnAmount)) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Missing required field: Amount",
      });
      return;
    }

    // if (ngnAmount < minAmount) {
    //   setToast({
    //     ...toast,
    //     error: true,
    //     errorMessage: `The minimum transfer amount is NGN ${toDecimal(
    //       minAmount
    //     )}.`,
    //   });
    //   return;
    // }

    if (ngnAmount < Number(5000)) {
      setToast({
        ...toast,
        error: true,
        errorMessage: `The minimum transfer amount is NGN ${toDecimal(5000)}.`,
      });
      return;
    }

    // If all validations pass, proceed
    setProceed(true); // Only set after passing validation

    setTransferDetails((prev) => ({
      ...prev,
      error: "",
    }));

    setTransfer((prev) => ({
      ...prev,
      confirm: {
        ...prev.confirm,
        state: true,
        receiverImage: image || "",
        receiverUsername: username,
        amount: ngnAmount,
        currency: "NGN",
        walletBalance: 571000.34,
        chargePercent: 0.5,
        chargeAmount: 115.43,
        transferTrigger: handleTransfer,
        cancelTransfer: handleCancel,
        loading: transferDetails?.loading,
      },
    }));
  };

  const handleCancel = () => {
    setProceed(false);

    setTransferDetails((prev) => ({
      ...prev,
      error: "",
    }));

    setTransfer((prev) => ({
      ...prev,
      confirm: {
        ...prev.confirm,
        state: false,
        transferError: "",
      },
    }));
  };

  const handleTransfer = async () => {
    setTransferDetails((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));

    const result = await submitTransfer(transferDetails);
    console.log("Transfer:", result);

    if (result?.success) {
      setProceed(false);

      setTransferDetails((prev) => ({
        ...prev,
        username: "",
        amount: { USD: null, NGN: null },
        error: "",
        loading: false,
        error: "",
      }));

      setTransfer((prev) => ({
        ...prev,
        confirm: {
          ...prev.confirm,
          state: false,
        },
        success: {
          state: true,
          date: result?.date,
          transferReferenceNo: result?.reference,
          viewBalance: handleViewBalance,
          closeSuccess: handleCloseSuccess,
        },
      }));
    } else {
      console.error("Transfer failed:", result.error);
      setTransferDetails((prev) => ({
        ...prev,
        error: result.error,
        loading: false,
      }));
    }
  };

  const handleViewBalance = () => {
    navigateTo("/wallet");

    setTransfer((prev) => ({
      ...prev,
      confirm: {
        state: false,
        receiverImage: null,
        receiverUsername: null,
        amount: null,
        currency: null,
        walletBalance: null,
        chargePercent: null,
        chargeAmount: null,
        transferTrigger: null,
        cancelTransfer: null,
        transferError: null,
        loading: false,
      },
      success: {
        ...prev.success,
        state: false,
        viewBalance: null,
        closeSuccess: null,
      },
    }));
  };

  const handleCloseSuccess = () => {
    setTransfer((prev) => ({
      ...prev,
      confirm: {
        state: false,
        receiverImage: null,
        receiverUsername: null,
        amount: null,
        currency: null,
        walletBalance: null,
        chargePercent: null,
        chargeAmount: null,
        transferTrigger: null,
        cancelTransfer: null,
        transferError: null,
        loading: false,
      },
      success: {
        state: false,
        viewBalance: null,
        closeSuccess: null,
      },
    }));
  };

  console.log(transfer);

  const selectUSD = () => {
    setTransferDetails((prevDetails) => ({
      selectedCurrency: "USD",
      amount: { NGN: null, USD: null },
    }));
  };

  const selectNGN = () => {
    setTransferDetails((prevDetails) => ({
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

    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
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

    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      amount: {
        ...prevDetails.amount,
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
    if (
      !transferDetails?.amount?.USD ||
      transferDetails?.selectedCurrency !== "USD"
    )
      return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: ngnValue } = await toNGN(transferDetails.amount.USD);

        if (ngnValue) {
          setTransferDetails((prevDetails) => ({
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
  }, [transferDetails?.amount?.USD, transferDetails?.selectedCurrency]);

  // update USD amount if user input NGN
  useEffect(() => {
    if (
      !transferDetails?.amount?.NGN ||
      transferDetails?.selectedCurrency !== "NGN"
    )
      return;

    const debounceTimeout = setTimeout(async () => {
      try {
        const { amount: usdValue } = await toUSD(transferDetails.amount.NGN);

        if (usdValue) {
          setTransferDetails((prevDetails) => ({
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
  }, [transferDetails?.amount?.NGN, transferDetails?.selectedCurrency]);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 h-max flex flex-col md:flex-row md:gap-[5px] gap-[15px]">
          <div className="flex flex-col flex-1 md:border border-neutral-800">
            <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white ">
                Transfer to Wallet
              </p>
            </div>

            <div className="h-full flex flex-col justify-between p-[15px] md:gap-[10px] gap-[15px]">
              {/* Event */}
              <div className="h-[100px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeFadeWhite">
                <p className="text-sm">Event</p>
              </div>

              {/* Recipient Wallet */}
              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Transfer To
                    </p>
                  </div>
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
                      value={transferDetails?.username}
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
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Currency
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <div
                      onClick={selectNGN}
                      className={`${
                        transferDetails?.selectedCurrency === "NGN"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">NGN</p>
                    </div>
                    <div
                      onClick={selectUSD}
                      className={`${
                        transferDetails?.selectedCurrency === "USD"
                          ? "bg-tradeOrange"
                          : "bg-transparent"
                      }  px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300`}
                    >
                      <p className="text-white text-xs font-bold">USD</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  {transferDetails?.selectedCurrency === "NGN" ? (
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
                            value={formatWithCommas(
                              transferDetails?.amount?.NGN
                            )}
                            onChange={handleNGNAmountChange}
                            onFocus={(e) =>
                              (e.target.value =
                                transferDetails?.amount?.NGN || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                transferDetails?.amount?.NGN
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
                            {transferDetails?.amount?.USD
                              ? toDecimal(transferDetails?.amount?.USD)
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
                            value={formatWithCommas(
                              transferDetails?.amount?.USD
                            )}
                            onChange={handleUSDAmountChange}
                            onFocus={(e) =>
                              (e.target.value =
                                transferDetails?.amount?.USD || "")
                            } // show raw when editing
                            onBlur={(e) =>
                              (e.target.value = formatWithCommas(
                                transferDetails?.amount?.USD
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
                            {transferDetails?.amount?.NGN
                              ? toDecimal(transferDetails?.amount?.NGN)
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
                disabled={proceed}
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
