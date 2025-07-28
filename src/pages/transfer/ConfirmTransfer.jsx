import React from "react";
import { useTransferContext } from "@/context/wallet/TransferContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";

const ConfirmTransfer = () => {
  const { transfer, setTransfer } = useTransferContext();
  const {
    error,
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

  const initiateTransfer = () => {};

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

  return (
    <div>
      {confirm && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[20px]  bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] h-[400px] ">
              <div className="flex  items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Transfer
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px]">
                <div className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[10px] p-[8px] bg-tradeAshLight rounded-[10px]">
                    <div>
                      <img className="w-[45px] rounded-full" src={""} alt="" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">
                        @{username}
                      </p>
                      <p className="text-xs text-tradeFadeWhite font-medium">
                        Recipient
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 py-[15px] rounded-[10px] border border-tradeAshLight ronded-[15px]">
                    <p className="text-white font-semibold text-xl leading-none">
                      NGN {toDecimal(amount)}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-medium ">
                      {`+${charges?.NGN}`}
                    </p>
                  </div>
                  <div className="flex flex-col border border-tradeAshLight rounded-[10px]">
                    <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAshLight">
                      <div className="flex items-center gap-1">
                        <BiSolidWalletAlt className="text-tradeFadeWhite" />
                        <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                          Wallet balance
                        </p>
                      </div>

                      <div>
                        <p className="md:text-[13px] text-[12px] font-semibold text-white">
                          NGN {toDecimal(balance?.NGN)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]  p-[8px]">
                      <div className="flex items-center gap-1">
                        <RiWaterFlashFill className="text-tradeFadeWhite" />
                        <p className="text-[12px] font-semibold text-tradeFadeWhite">
                          Service charge
                        </p>
                      </div>

                      <div>
                        <p className="md:text-[13px] text-[12px] font-semibold text-white">
                          NGN {toDecimal(charges?.NGN)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={initiateTransfer}
                  disabled={loading}
                >
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmTransfer;
