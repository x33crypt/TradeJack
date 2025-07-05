import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import RecentTransfer from "./RecentTransfer";
import { toUSD } from "@/utils/currency/toUSD";
import { getMinimumWithdrawal } from "@/utils/currency/minWithdraw";
import { toDecimal } from "@/utils/currency/toDecimal";
import LockByScroll from "@/components/LockByScroll";
import image from "../../assets/landingImg4.JPG";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useToast } from "@/context/ToastContext";
import { transfer } from "@/utils/wallet/transfer";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";

const Transfer = () => {
  const [transferDetails, setTransferDetails] = useState({
    username: "",
    amount: { USD: null, NGN: null },
    transferError: "",
    transferSuccess: false,
    reference: "",
  });
  const [minWithdraw, setMinWithdraw] = useState(null);
  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast, setToast } = useToast();

  // Fetch Minimum Withdraw - $20
  useEffect(() => {
    async function fetchMin() {
      const result = await getMinimumWithdrawal("NGN"); // or dynamic currency
      if (result) setMinWithdraw(result.toFixed(2));
    }
    fetchMin();
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

  console.log(transferDetails);

  const handleProceed = () => {
    const { username, amount } = transferDetails;

    // Validate username
    if (!username || username.trim().length === 0) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Please enter a valid username.",
      });
      return;
    }

    // Validate NGN amount
    const ngnAmount = Number(amount?.NGN);

    if (!ngnAmount || isNaN(ngnAmount)) {
      setToast({
        ...toast,
        error: true,
        errorMessage: "Please enter a valid NGN amount.",
      });
      return;
    }

    if (ngnAmount < minWithdraw) {
      setToast({
        ...toast,
        error: true,
        errorMessage: `The minimum transfer amount is NGN ${toDecimal(
          minWithdraw
        )}.`,
      });
      return;
    }

    setProceed(true);
  };

  const handleCancel = () => {
    setProceed(false);
    setTransferDetails((prev) => ({
      ...prev,
      transferError: "",
    }));
  };

  const handleTransfer = async () => {
    setLoading(true);
    const result = await transfer(transferDetails);
    console.log("Transfer:", result);

    if (result.success) {
      setLoading(false);

      setTransferDetails((prev) => ({
        ...prev,
        transferSuccess: true,
        reference: result.reference,
      }));
    } else {
      console.error("Transfer failed:", result.error);
      setLoading(false);

      setTransferDetails((prev) => ({
        ...prev,
        transferError: result.error,
      }));
    }
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <div className="flex-1 lg:px-[15%] flex flex-col gap-[10px]">
          <div className=" w-full md:border lg:border-0 border-neutral-800">
            <div className="flex items-center justify-between p-[15px] lg:px-0 border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white">
                Transfer to Wallet
              </p>
            </div>

            <div className="flex flex-col p-[15px] lg:px-0  gap-[10px]">
              <div className="h-[100px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeFadeWhite">
                <p className="text-sm">Event</p>
              </div>

              <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Transfer To
                    </p>
                  </div>

                  <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-white text-xs font-bold">NGN</p>
                  </div>
                </div>

                <div className="flex flex-col pb-[5px gap-[10px] w-full border- border-tradeAshLight">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Recipient Username
                  </p>
                  <div className="flex-1 flex bg-tradeAsh w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder="e.g., johnDoe"
                      onChange={handleUsernameChange}
                      value={transferDetails?.username}
                    />
                  </div>
                </div>

                <div className="flex flex-col pb-[5px gap-[10px] w-full border- border-tradeAshLight">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    Amount
                  </p>
                  <div className="flex-1 flex bg-tradeAsh w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder={
                        minWithdraw
                          ? `Enter amount (min: ${toDecimal(minWithdraw)})`
                          : "Loading minimum amount..."
                      }
                      onChange={handleAmountChange}
                      value={
                        transferDetails?.amount?.NGN
                          ? toDecimal(transferDetails?.amount?.NGN)
                          : ""
                      }
                    />
                  </div>
                </div>

                <div>
                  <p className="text-tradeFadeWhite text-xs font-semibold">
                    Value equivalent to{" "}
                    <span className="text-tradeOrange">
                      $
                      {transferDetails?.amount?.USD
                        ? transferDetails?.amount?.USD
                        : "0.00"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-[15px] md:py-[15px] lg:px-[0px]">
            <Button
              variant="primary"
              onClick={handleProceed}
              disabled={proceed}
            >
              Proceed
            </Button>
          </div>

          <RecentTransfer />
        </div>
      </div>

      {proceed && (
        <>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[15px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between items-start gap-[15px] pb-[15px]  md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-[700] text-white leading-none">
                      Confirm Details
                    </p>
                  </div>

                  <div onClick={handleCancel}>
                    <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                  </div>
                </div>
                <div className="flex items-center gap-[10px] p-[8px] bg-tradeAshLigh rounded-[10px]">
                  <div>
                    <img className="w-[45px] rounded-full" src={image} alt="" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">
                      @{transferDetails?.username}
                    </p>
                    <p className="text-[13px] text-tradeFadeWhite font-medium">
                      Transfer
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 py-[20px] rounded-[10px]">
                  <p className="text-white font-semibold text-2xl leading-none">
                    {toDecimal(transferDetails?.amount?.NGN)} NGN
                  </p>
                  <p className="text-tradeFadeWhite text-xs font-medium ">
                    +0.0% Charge
                  </p>
                </div>
                <div className="flex flex-col gap- px-[8px] border border-tradeAshLight rounded-[10px]">
                  <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                    <div className="flex items-center gap-1">
                      <BiSolidWalletAlt className="text-tradeFadeWhite" />
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Wallet balance
                      </p>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        0.00 NGN
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[10px]  py-[8px]">
                    <div className="flex items-center gap-1">
                      <RiWaterFlashFill className="text-tradeFadeWhite" />
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Service charge
                      </p>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-white">
                        0.00 NGN
                      </p>
                    </div>
                  </div>
                </div>
                {transferDetails?.transferError && (
                  <div className="flex items-center gap-1 p-[8px] text-xs font-medium text-white  bg-red-600 rounded-[10px]">
                    <MdError className=" leading-none" />
                    <p>{transferDetails?.transferError} </p>
                  </div>
                )}
              </div>

              <div className="mt-[10px]">
                <Button
                  variant="secondary"
                  onClick={handleTransfer}
                  disabled={loading}
                >
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Transfer;
