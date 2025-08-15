import React from "react";
import { useTransferContext } from "@/context/userContext/TransferContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import image from "../../assets/landingImg4.JPG";
import { submitTransfer } from "@/utils/wallet/transfer";
import { useToast } from "@/context/otherContext/ToastContext";

const ConfirmTransfer = () => {
  const { transfer, setTransfer } = useTransferContext();
  const { confirm, loading, username, amount } = transfer;
  const { setToast } = useToast();

  const close = () => {
    setTransfer((prev) => ({
      ...prev,
      proceed: false,
      confirm: false,
    }));
  };

  const initiateTransfer = async () => {
    setTransfer((prev) => ({
      ...prev,
      loading: true,
    }));

    const details = { username: username, amount: amount };

    const result = await submitTransfer(details);
    console.log("Transfer Result:", result);

    if (result?.success) {
      setTransfer((prev) => ({
        ...prev,
        error: "",
        proceed: false,
        confirm: false,
        success: true,
        loading: false,
        charges: {
          USD: null,
          NGN: null,
        },
        referenceId: result?.reference,
      }));
    } else {
      setToast({
        error: true,
        errorMessage: result.error,
      });

      setTransfer((prev) => ({
        ...prev,
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
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Transfer
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <img
                      src={image}
                      className="p-[10px bg-tradeAshLight w-[65px] text-red-600 rounded-full"
                      alt=""
                    />

                    <div className="flex gap-1">
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Recipient -
                      </p>
                      <p className="text-[13px] font-semibold text-white">
                        @{username}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Amount
                      </p>
                      <div>
                        {transfer?.currency === "USD" ? (
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

                <Button
                  variant="outline"
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
