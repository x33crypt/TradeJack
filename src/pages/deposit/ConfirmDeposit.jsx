import React from "react";
import { useDepositContext } from "@/context/wallet/DepositContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import image from "../../assets/landingImg4.JPG";
import { IoArrowRedoCircle } from "react-icons/io5";

const ConfirmDeposit = () => {
  const { deposit, setDeposit } = useDepositContext();
  const { loading, confirm, url, amount } = deposit;

  const close = () => {
    setDeposit((prev) => ({
      error: "",
      loading: false,
      confirm: false,
      success: false,
      currency: "NGN",
      url: null,
      amount: {
        USD: null,
        NGN: null,
      },
      referenceId: null,
    }));
  };

  const initiateDeposit = () => {
    setDeposit((prev) => ({
      loading: false,
    }));
    window.location.href = url;
  };

  return (
    <div>
      {confirm && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Deposit
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[2px] bg-tradeAshExtraLight text-[55px] text-tradeAsh rounded-full">
                      <IoArrowRedoCircle />
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[13px] font-medium text-center text-tradeFadeWhite">
                        You'll be redirected to Paystack to choose your payment
                        method
                      </p>
                      {/* <p className="text-[13px] font-semibold text-center text-white">
                        (Card, Bank Transfer, or USSD)
                      </p> */}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Amount
                      </p>
                      <div>
                        {deposit?.currency === "USD" ? (
                          <p className="text-white text-[13px]  font-semibold">
                            ${toDecimal(amount?.USD)}
                          </p>
                        ) : (
                          <p className="text-white text-[13px]  font-semibold">
                            #{toDecimal(amount?.NGN)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Fee
                      </p>
                      <p className="text-white text-[13px] font-semibold">
                        #0.00
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={initiateDeposit}>
                  Continue to Paystack
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDeposit;
