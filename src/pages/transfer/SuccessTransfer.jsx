import React from "react";
import { useTransferContext } from "@/context/wallet/TransferContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import { TiTick } from "react-icons/ti";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SuccessTransfer = () => {
  const { transfer, setTransfer } = useTransferContext();
  const {
    confirm,
    success,
    loading,
    username,
    currency,
    amount,
    balance,
    charges,
    referenceId,
    date,
  } = transfer;

  const close = () => {
    setTransfer((prev) => ({
      ...prev,
      proceed: false,
      confirm: false,
    }));
  };

  const viewBalance = () => {};
  return (
    <div>
      {success && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[30px]  bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] min-h-[400px] ">
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
                    <div className="p-[6px] bg-tradeAshLight text-[45px] text-tradeGreen rounded-full">
                      <IoIosCheckmarkCircle />
                    </div>

                    <p className="text-[13px] font-semibold text-tradeFadeWhite">
                      Transfer Successful
                    </p>

                    <div className="mt-[15px] flex flex-col items-center gap-3  justify-center">
                      <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                        Good job!{" "}
                        <span className="font-semibold text-white">
                          {toDecimal(amount?.NGN)} NGN
                        </span>{" "}
                        is on its way to{" "}
                        <span className="font-semibold text-tradeOrange">
                          @{username}
                        </span>
                        ’s wallet. You can view the details in your transaction
                        history.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap- px-[8px] border border-tradeAshLight rounded-[10px]">
                    <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                      <div className="flex items-center gap-2">
                        <RiWaterFlashFill className="text-tradeFadeWhite" />
                        <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                          Service charge
                        </p>
                      </div>

                      <div>
                        <p className="md:text-[13px] text-[12px] font-semibold text-white">
                          {charges ? toDecimal(charges?.NGN) : "0.00"} NGN
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]  py-[8px]">
                      <div className="flex items-center gap-2">
                        <MdDateRange className="text-tradeFadeWhite" />
                        <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                          Date
                        </p>
                      </div>

                      <div>
                        <p className="md:text-[13px] text-[12px] font-semibold text-white">
                          14 Feb, 2015 11:42:20 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" onClick={viewBalance}>
                  View My Balance
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessTransfer;
