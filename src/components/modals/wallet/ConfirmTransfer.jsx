import React from "react";
import { useTransferContext } from "@/context/wallet/TransferContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/currency/toDecimal";

const ConfirmTransfer = () => {
  const { transfer, setTransfer } = useTransferContext();
  const { confirm } = transfer;
  const {
    state,
    receiverImage,
    receiverUsername,
    amount,
    currency,
    walletBalance,
    chargePercent,
    chargeAmount,
    transferTrigger,
    cancelTransfer,
    transferError,
    loading,
  } = confirm;

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[15px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col justify-between gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full min-h-[380px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between items-start gap-[15px] pb-[15px]  md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                  <div className="flex flex-col gap-3">
                    <p className="text-lg font-[700] text-white leading-none">
                      Confirm Transfer
                    </p>
                  </div>

                  <div onClick={cancelTransfer}>
                    <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                  </div>
                </div>
                <div className="flex items-center gap-[10px] p-[8px] bg-tradeAshLight rounded-[10px]">
                  <div>
                    <img
                      className="w-[45px] rounded-full"
                      src={receiverImage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">
                      @{receiverUsername}
                    </p>
                    <p className="text-xs text-tradeFadeWhite font-medium">
                      Recipient
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 py-[20px] rounded-[10px]">
                  <p className="text-white font-semibold text-2xl leading-none">
                    {toDecimal(amount)} {currency}
                  </p>
                  <p className="text-tradeFadeWhite text-xs font-medium ">
                    {`+${chargePercent}% Charge`}
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
                        {toDecimal(walletBalance)} {currency}
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
                        {toDecimal(chargeAmount)} {currency}
                      </p>
                    </div>
                  </div>
                </div>
                {transferError && (
                  <div className="flex items-center gap-1 p-[8px] text-xs font-medium text-white  bg-red-600 rounded-[10px]">
                    <MdError className=" leading-none shrink-0 flex" />
                    <p>{transferError} </p>
                  </div>
                )}
              </div>

              <Button
                variant="secondary"
                onClick={transferTrigger}
                disabled={loading}
                useLoader={true}
              >
                Transfer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmTransfer;
