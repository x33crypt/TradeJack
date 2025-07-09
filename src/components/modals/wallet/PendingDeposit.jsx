import React, { useEffect, useState } from "react";
import LockByScroll from "@/components/LockByScroll";
import Button from "@/components/buttons/Button";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toDecimal } from "@/utils/currency/toDecimal";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { useDepositContext } from "@/context/wallet/DepositContext";
import { BsCardText } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { MdNotes } from "react-icons/md";

const PendingDeposit = () => {
  const { deposit, setDeposit } = useDepositContext();
  const { depositPending, depositReference, depositAmount } = deposit;

  const viewDetails = () => {};

  const closePendingDepositModal = () => {
    setDeposit((prev) => ({
      ...prev,
      depositPending: false,
    }));
  };

  console.log(deposit);

  return (
    <div>
      {depositPending && (
        <div>
          <LockByScroll />
          {/* Modal */}
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col justify-between gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full min-h-[350px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-end items-start gap-[15px] pb-[15px  md:pt-0 md:p-[15px] lg:pb-[12px lg:p-0 border- border-tradeAshLight">
                  <div onClick={closePendingDepositModal}>
                    <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <MdOutlinePending className="text-5xl text-tradeGreen" />
                </div>

                <div className="mt-[15px] flex flex-col items-center gap-3  justify-center">
                  <p className="text-lg font-semibold text-white leading-none">
                    Deposit Received
                  </p>

                  <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                    Dear Sane, an incoming deposit has been received on your
                    wallet and is currently pending. It will be added to your
                    balance once confirmed.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap- px-[8px] border border-tradeAshLight rounded-[10px]">
                <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                  <div className="flex items-center gap-2">
                    <RiBankLine className="text-tradeFadeWhite" />
                    <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                      Amount
                    </p>
                  </div>

                  <div>
                    <p className="md:text-[13px] text-[12px] font-semibold text-white">
                      {depositAmount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-[10px]  py-[8px] border-b border-tradeAshLight">
                  <div className="flex items-center gap-2">
                    <MdDateRange className="text-tradeFadeWhite" />
                    <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                      Date
                    </p>
                  </div>

                  <div>
                    <p className="md:text-[13px] text-[12px] font-semibold text-white">
                      14 Feb, 2015
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-[10px] py-[8px] border- border-tradeAshLight">
                  <div className="flex items-center gap-2">
                    <MdNotes className="text-tradeFadeWhite" />
                    <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                      Reference
                    </p>
                  </div>

                  <div>
                    <p className="md:text-[13px] text-[12px] font-semibold text-white">
                      {depositReference}
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="secondary" onClick={viewDetails}>
                View Deatils
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDeposit;
