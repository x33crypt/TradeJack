import React from "react";
import { useTransferContext } from "@/context/wallet/TransferContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";
import image from "../../assets/landingImg4.JPG";
import { useBalance } from "@/context/BalanceContext";
import { submitTransfer } from "@/utils/wallet/transfer";
import { useToast } from "@/context/ToastContext";

const ConfirmTransfer = () => {
  const { balance } = useBalance();
  const { transfer, setTransfer } = useTransferContext();
  const {
    error,
    confirm,
    success,
    loading,
    username,
    amount,
    charges,
    referenceId,
    date,
  } = transfer;
  const { setToast } = useToast();

  console.log("Balance in Withdraw:", balance?.available_balance);

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
        currency: "NGN",
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
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[30px]  bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] min-h-[400px] ">
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

                  <div className="flex flex-col bg-tradeAshLight  border border-tradeAshLight rounded-[15px]">
                    <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAsh">
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Amount
                      </p>

                      <p className="text-[13px]  font-semibold text-white">
                        NGN {toDecimal(amount?.NGN)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAsh">
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Current Balance
                      </p>

                      <p className="text-[13px]  font-semibold text-white">
                        NGN {toDecimal(balance?.available_balance?.NGN)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-[10px] p-[8px]">
                      <p className="text-[13px] font-semibold text-tradeFadeWhite">
                        Service Charge
                      </p>

                      <p className="text-[13px]  font-semibold text-white">
                        NGN 0.00
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col pb-[5px gap-[10px] w-full border- border-tradeAshLight">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Add a note
                    </p>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-[13px] font-semibold leading-none"
                        type="text"
                        placeholder="What's this for?"
                        // onChange={handleUsernameChange}
                        // value={transfer?.username}
                      />
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
