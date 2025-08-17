import React from "react";
import { useTransferContext } from "@/context/userContext/TransferContext";
import LockByScroll from "@/components/others/LockByScroll";
import Button from "@/components/buttons/Button";
import { IoClose } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { useNavigate } from "react-router-dom";
import { toDecimal } from "@/utils/toDecimal";

const SuccessTransfer = () => {
  const { details, setDetails } = useTransaction();
  const { transfer, setTransfer } = useTransferContext();
  const { success, username, currency, amount, referenceId } = transfer;

  const defaultTransferState = {
    error: "",
    proceed: false,
    confirm: false,
    success: false,
    loading: false,
    username: "",
    currency: "NGN",
    amount: {
      USD: null,
      NGN: null,
    },
    charges: {
      USD: null,
      NGN: null,
    },
  };

  const viewDetails = (id) => {
    setTransfer({ ...defaultTransferState });

    setDetails({
      state: true,
      reference: id,
      data: {},
    });

    setTimeout(() => {
      setTransfer((prev) => ({
        ...prev,
        referenceId: null, // or whatever change you want
      }));
    }, 20000);
  };

  const close = () => {
    setTransfer((prev) => ({
      ...prev,
      success: false,
      username: "",
      currency: "NGN",
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
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[30px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Transfer Feedback
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[2px] bg-tradeAshExtraLight text-[55px] text-tradeGreen rounded-full">
                      <IoIosCheckmarkCircle />
                    </div>

                    <p className="text-[13px] font-semibold text-white">
                      Transfer Successful
                    </p>
                  </div>

                  <p className="text-[13px] font-medium text-tradeFadeWhite leading-relaxed text-center">
                    Processing your transfer of{" "}
                    <span className="font-semibold text-white">
                      {currency}{" "}
                      {currency === "USD"
                        ? ` ${toDecimal(amount?.USD)}`
                        : `${toDecimal(amount?.NGN)}`}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-tradeOrange">
                      @{username}
                    </span>
                    . They’ll typically receive it within 1 to 3 minutes.
                  </p>

                  <div className="flex flex-col bg-tradeAshLigh  borde border-tradeAshLight rounded-[15px]">
                    <div className="flex items-center justify-betwee justify-center gap-[10px] p-[8px border- border-tradeAsh">
                      <p className="text-[13px] font-medium text-tradeFadeWhite">
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

export default SuccessTransfer;
