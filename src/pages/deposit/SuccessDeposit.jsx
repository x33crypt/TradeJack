import React, { useEffect, useState } from "react";
import LockByScroll from "@/components/others/LockByScroll";
import Button from "@/components/buttons/Button";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import { useDepositContext } from "@/context/userContext/DepositContext";
import { MdPending } from "react-icons/md";
import { useTransaction } from "@/context/userContext/TransactionContext";

const SuccessDeposit = () => {
  const { details, setDetails } = useTransaction();
  const { deposit, setDeposit } = useDepositContext();
  const { success, currency, amount, referenceId } = deposit;

  const defaultDepositState = {
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
  };

  const viewDetails = (id) => {
    setDeposit({ ...defaultDepositState });

    setDetails({
      state: true,
      reference: id,
      data: {},
    });

    setTimeout(() => {
      setDeposit((prev) => ({
        ...prev,
        referenceId: null, // or whatever change you want
      }));
    }, 20000);
  };

  const close = () => {
    setDeposit((prev) => ({
      ...prev,
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

  return (
    <div>
      {success && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Deposit Feedback
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[2px] bg-tradeAshExtraLight text-[55px] text-tradeOrange rounded-full">
                      <MdPending />
                    </div>

                    <p className="text-[13px] font-semibold text-white">
                      Deposit Received
                    </p>
                  </div>

                  <p className="text-[13px] font-medium text-tradeFadeWhite leading-relaxed text-center">
                    We’ve successfully received your deposit of{" "}
                    <span className="font-semibold text-white">
                      {currency}{" "}
                      {currency === "USD"
                        ? toDecimal(amount?.USD)
                        : toDecimal(amount?.NGN)}
                    </span>
                    . Your wallet balance will update automatically once the
                    payment is confirmed.
                  </p>

                  <div className="flex flex-col bg-tradeAshLigh  borde border-tradeAshLight rounded-[15px]">
                    <div className="flex items-center justify-betwee justify-center gap-[10px] p-[8px border- border-tradeAsh">
                      <p className="text-xs font-medium text-tradeFadeWhite">
                        Reference -{" "}
                        <span className="font-semibold text-white">
                          {referenceId}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <Button
                    variant="Fadeout"
                    onClick={() => viewDetails(referenceId)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessDeposit;
