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

const SuccessTransfer = () => {
  const { transfer, setTransfer } = useTransferContext();
  const { confirm } = transfer;
  const { receiverUsername, amount, currency, chargeAmount } = confirm;
  const { success } = transfer;
  const { state, viewBalance, closeSuccess } = success;

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col justify-between gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full min- h-[350px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-end items-start gap-[15px] pb-[15px  md:pt-0 md:p-[15px] lg:pb-[12px lg:p-0 border- border-tradeAshLight">
                  <div onClick={closeSuccess}>
                    <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <FaRegCircleCheck className="text-5xl text-tradeGreen" />
                </div>

                <div className="mt-[15px] flex flex-col items-center gap-3  justify-center">
                  <p className="text-lg font-semibold text-white leading-none">
                    Transfer Successful
                  </p>
                  <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                    Good job!{" "}
                    <span className="font-semibold text-white">
                      {toDecimal(amount)} {currency}
                    </span>{" "}
                    is on its way to{" "}
                    <span className="font-semibold text-tradeOrange">
                      @{receiverUsername}
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
                      {toDecimal(chargeAmount)} {currency}
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

              <Button variant="secondary" onClick={viewBalance}>
                View My Balance
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessTransfer;
