import React from "react";
import { useWithdrawContext } from "@/context/wallet/WithdrawContext";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdError } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/toDecimal";

const ConfirmWithdraw = () => {
  const { withdraw, setWithdraw } = useWithdrawContext();
  const {
    error,
    confirm,
    success,
    loading,
    currency,
    amount,
    account,
    bank,
    charges,
    referenceId,
    date,
  } = withdraw;

  const close = () => {
    setWithdraw((prev) => ({
      ...prev,
      proceed: false,
      confirm: false,
    }));
  };

  const initiateTransfer = () => {};

  return (
    <div>
      {confirm && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[30px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] h-[400px] ">
              <div className="flex  items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Confirm Withdraw
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmWithdraw;
