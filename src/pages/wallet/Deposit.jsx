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

const Deposit = () => {
  const { deposit, setDeposit } = useDepositContext();
  const [depositDetails, setDepositDetails] = useState({
    amount: null,
    url: null,
  });

  const { toast, setToast } = useToast();

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");

    if (!isNaN(rawValue)) {
      setDepositDetails((prevDetails) => ({
        ...prevDetails,
        amount: rawValue,
      }));
    }
  };

  console.log(depositDetails?.amount);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optionally show toast or feedback
        setToast({
          ...toast,
          success: true,
          successMessage: `Accound ID copied.`,
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

    const amount = Number(depositDetails?.amount);
    if (!amount || isNaN(amount)) {
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

    if (amount < Number(5000)) {
      setDeposit((prev) => ({
        ...prev,
        loading: false,
      }));
      setToast({
        ...toast,
        error: true,
        errorMessage: `The minimum transfer amount is NGN ${toDecimal(5000)}.`,
      });
      return;
    }

    const result = await submitDeposit(depositDetails);
    console.log("Deposit:", result);

    if (result?.success) {
      setDeposit((prev) => ({
        ...prev,
        depositAmount: depositDetails?.amount,
        depositReference: result?.reference,
        loading: false,
      }));

      // Redirect to the payment page
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

                  <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-white text-xs font-bold">NGN</p>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] w-full">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Amount
                  </p>
                  <div className="flex-1 flex bg-tradeAsh w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder={`Enter amount (min: 5,000.00 NGN)`}
                      onChange={handleAmountChange}
                      value={toDecimal(depositDetails?.amount)}
                    />
                  </div>
                </div>

                {/* <div className="bg-tradeOrang flex items-cente justify-center px-[10px] py-2 rounded-md">
                  <div className="bg-tradeOrang h-max text-tradeFadeWhite text-sm mr[2px] mt-[2px] leading-none">
                    <IoIosLock className="" />
                  </div>

                  <p className="text-tradeFadeWhite text-xs text-center leading-relaxed">
                    Secured by{""}
                    <span className="font-bold text-white ml-1">
                      Paystack
                    </span>{" "}
                    — you’ll be redirected to complete your deposit. Please
                    don’t close this tab.
                  </p>
                </div> */}

                <div className="flex flex-col gap-[20px] mt-[10px] bg-tradeOrang   rounded-lg">
                  <div className="w-full flex justify-center">
                    <img
                      className="w-[200px] leading-none"
                      src={paystackLogo}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-wrap items-center text-xs text-tradeFadeWhite gap-1">
                    <p className="flex items-start gap-1">
                      <span className="text-white">•</span>
                      Your payment is{" "}
                      <span className="font-semibold text-white">
                        secured by Paystack
                      </span>
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="text-white">•</span>
                      You’ll be{" "}
                      <span className="font-semibold text-white">
                        redirected
                      </span>{" "}
                      to Paystack to complete your deposit
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="text-white">•</span>
                      <span className="font-semibold text-white">
                        Do not close
                      </span>{" "}
                      this tab or navigate away during the process
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="text-white">•</span>
                      Deposits are{" "}
                      <span className="font-semibold text-white">
                        completely free
                      </span>{" "}
                      — no transaction or processing fees
                    </p>
                  </div>
                </div>
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

          <RecentDeposit />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
