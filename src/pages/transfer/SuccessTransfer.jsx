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
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useNavigate } from "react-router-dom";

const SuccessTransfer = () => {
  const { details, setDetails } = useTransaction();
  const { transfer, setTransfer } = useTransferContext();
  const { success, username, amount, referenceId } = transfer;

  const close = () => {
    setTransfer((prev) => ({
      ...prev,
      success: false,
      referenceId: null,
    }));
  };

  const viewDetails = (id) => {
    setDetails({ state: true, transactionId: id, data: {} });

    setTransfer((prev) => ({
      ...prev,
      success: false,
      username: "",
      amount: {
        USD: null,
        NGN: null,
      },
      referenceId: null,
    }));
  };

  const navigateTo = useNavigate();

  const viewBalance = () => {
    setTransfer((prev) => ({
      ...prev,
      success: false,
      referenceId: null,
    }));

    navigateTo("/wallet");
  };

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

                    <p className="text-2xl font-bold text-white leading-none">
                      NGN {toDecimal(amount.NGN)}
                    </p>
                    <p className="text-[13px] font-bold text-tradeOrange leading-none">
                      USD {amount.USD ? toDecimal(amount.USD) : "0.00"}
                    </p>
                  </div>

                  <div className="mt-[15px] flex flex-col items-center gap-3  justify-center">
                    <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                      Funds are now being processed.{" "}
                      <span className="font-semibold text-tradeOrange">
                        @{username}
                      </span>{" "}
                      will typically receive them within 1 to 3 minutes.
                    </p>
                  </div>

                  < div className="flex flex-col bg-tradeAshLigh  borde border-tradeAshLight rounded-[15px]">
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
                  <Button variant="secondary" onClick={viewBalance}>
                    Go to Wallet
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
