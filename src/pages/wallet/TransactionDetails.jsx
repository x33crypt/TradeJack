import React, { useEffect, useState } from "react";
import LockByScroll from "@/components/others/LockByScroll";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { IoClose } from "react-icons/io5";
import { useFetchTransactionsDetails } from "@/hooks/userHooks/useFetchTransactionDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toDecimal } from "@/utils/toDecimal";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { dateTime } from "@/utils/dateTime";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { useToast } from "@/context/otherContext/ToastContext";
import Loading from "@/components/others/Loading";
import Button from "@/components/buttons/Button";
import { shortenID } from "@/utils/shortenID";
import { MdArrowRightAlt } from "react-icons/md";
import NetworkError from "@/components/others/NetworkError";
import { date } from "@/utils/date";
import MiniButton from "@/components/buttons/MiniButton";

const TransactionDetails = () => {
  const { loading, error } = useFetchTransactionsDetails();
  const { details, setDetails } = useTransaction();
  const { state, data, user } = details;
  const { toast, setToast } = useToast();

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optionally show toast or feedback
        setToast({
          ...toast,
          success: true,
          successMessage: `Reference ID copied to clipboard`,
        });
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  const close = () => {
    setDetails({
      state: false,
      data: null,
      reference: null,
    });
  };

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[280px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Transaction Details
                </p>

                <div
                  className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-transparent hover:bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  onClick={close}
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex py-[15px] min-h-[360px] max-h-max">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-1">
                    {data === null ? (
                      <div className="flex flex-1">
                        <NetworkError />
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-betweena gap-[15px]">
                        <div className="flex flex-col gap-[10px]">
                          <div className="w-full flex flex-col gap-1 bg-transparent border border-tradeAshLight border-dashed p-[12px] rounded-[15px]">
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Status
                              </p>
                              <p
                                className={`text-[13px] font-semibold ${
                                  data?.status === "pending"
                                    ? "text-tradeOrange"
                                    : data?.status === "successful"
                                    ? "text-tradeGreen"
                                    : data?.status === "failed"
                                    ? "text-red-600"
                                    : "text-tradeAshDark"
                                }`}
                              >
                                {capitalizeFirst(data?.status)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Date
                              </p>
                              <p className="text-[13px] font-semibold text-white">
                                {dateTime(data?.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Type
                              </p>
                              <p className="text-[13px] font-semibold text-white">
                                {capitalizeFirst(data?.type)}
                              </p>
                            </div>
                          </div>

                          <div className="w-full flex flex-col gap-1 bg-tradeAshLight p-[12px] rounded-[15px]">
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                {data?.type === "transfer"
                                  ? "Recipient"
                                  : data?.type === "deposit"
                                  ? "Sender"
                                  : data?.type === "withdrawal"
                                  ? "Bank"
                                  : "Unknown"}
                              </p>
                              <p className="text-[13px] font-semibold text-white">
                                {(() => {
                                  const {
                                    senderUsername,
                                    recipientUsername,
                                    type,
                                  } = data || {};
                                  if (
                                    senderUsername === "Unknown" &&
                                    recipientUsername === "Unknown" &&
                                    type === "deposit"
                                  )
                                    return "Wallet Funding";
                                  if (
                                    senderUsername !== "Unknown" &&
                                    recipientUsername === "Unknown" &&
                                    type === "deposit"
                                  )
                                    return `@${senderUsername}`;
                                  if (
                                    senderUsername === "Unknown" &&
                                    recipientUsername !== "Unknown" &&
                                    type === "transfer"
                                  )
                                    return `@${recipientUsername}`;
                                  if (
                                    senderUsername === "Unknown" &&
                                    recipientUsername === null &&
                                    type === "withdrawal"
                                  )
                                    return `Bank Account`;
                                  return "N/A";
                                })()}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Amount
                              </p>

                              <p className="text-[13px] font-semibold text-white">
                                #{toDecimal(data?.amount?.ngn)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Value
                              </p>

                              <p className="text-[13px] font-semibold text-white">
                                ${toDecimal(data?.amount?.usd)}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Rate
                              </p>
                              <p className="text-white text-[13px] font-semibold">
                                {user?.code} 1 = USD{" "}
                                {toDecimal(data?.exchangeRate)}
                              </p>
                            </div>
                          </div>

                          <div className="w-full flex flex-col gap-1 bg-transparent border border-tradeAshLight border-dashed p-[12px] rounded-[15px]">
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Fee
                              </p>
                              <p className="text-white text-[13px] font-semibold">
                                #0.00
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                                Reference
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-[13px] w-[70px] truncate font-semibold text-white">
                                  {data?.reference}
                                </p>

                                <MiniButton
                                  onClick={() => handleCopy(data?.reference)}
                                >
                                  <FaCopy className="text-[16px]" />
                                </MiniButton>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-xs text-tradeFadeWhite/50 font-medium leading-relaxed text-center">
                            Transaction updates in real time.{" "}
                          </p>
                          <p className="text-xs text-tradeFadeWhite/50 font-medium leading-relaxed text-center">
                            Need help? Please{" "}
                            <span className="text-tradeFadeWhite hover:text-tradeOrange font-bold cursor-pointer transition-all duration-300">
                              contact support
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
