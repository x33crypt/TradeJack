import React, { useEffect, useState } from "react";
import LockByScroll from "@/components/LockByScroll";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { IoClose } from "react-icons/io5";
import { shortenID } from "@/utils/shortenID/shortenID";
import { useFetchTransactionsDetails } from "@/hooks/useFetchTransactionDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/buttons/Button";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { MdOutlineQuestionMark } from "react-icons/md";
import { toDecimal } from "@/utils/currency/toDecimal";
import { FaRegCopy } from "react-icons/fa6";

const TransactionDetails = () => {
  const { loading, error } = useFetchTransactionsDetails();
  const { details, setDetails } = useTransaction();
  const { state, transactionId, data } = details;
  const [txOverview, setTxOverview] = useState(true);
  const [txDetails, setTxDetails] = useState(false);

  const transaction = data?.data;
  const userCurrency = data?.userCurrency;

  const showOverview = () => {
    setTxOverview(true);
    setTxDetails(false);
  };
  const showDetails = () => {
    setTxOverview(false);
    setTxDetails(true);
  };

  const close = () => {
    setDetails({ state: false, transactionId: "", data: {} });
    setTxOverview(true);
    setTxDetails(false);
  };

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed inset-0 lg:px-[15px] md:px-[2.5%] p-[35px]  bg-black bg-opacity-90 flex items-center justify-center z-40">
            <div className="flex flex-col gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-sm w-full min-h-[350px]">
              <div className="flex justify-between items-start gap-[15px] pb-[15px] md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                <div className="flex flex-col gap-3">
                  <p className="text-lg font-[700] text-white leading-none">
                    Transaction Details
                  </p>
                </div>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex">
                {loading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin text-[18px] text-tradeFadeWhite" />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-[20px]">
                    <div className="w-full flex flex-col gap-[10px] justify-center items-center mt-[12px] borde border-tradeAshLight rounded-[15px]">
                      <div>
                        {(() => {
                          const type = transaction?.type;

                          if (type === "deposit") {
                            return (
                              <div className="flex text-tradeGreen p-4 text-lg rounded-full bg-tradeAshLight">
                                <IoMdArrowRoundDown />
                              </div>
                            );
                          }

                          if (type === "transfer") {
                            return (
                              <div className="flex text-red-600 p-4 text-lg rounded-full bg-tradeAshLight">
                                <IoMdArrowRoundUp />
                              </div>
                            );
                          }

                          return (
                            <div className="flex text-tradeFadeWhite p-4 text-lg rounded-full bg-tradeAshLight">
                              <MdOutlineQuestionMark />
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <p className="text-white text-xl font-semibold">
                          {userCurrency?.code}{" "}
                          {toDecimal(transaction?.amount.ngn)}
                        </p>
                        <p className="text-tradeFadeWhite text-[13px] font-medium">
                          USD {toDecimal(transaction?.amount?.usd)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 p-1 border border-tradeAshLight rounded-[10px]">
                      <div
                        onClick={showOverview}
                        className={`${
                          txOverview
                            ? "bg-tradeAshLight text-white"
                            : "bg-transparent text-tradeFadeWhite"
                        } flex-1 flex items-center justify-center gap-1 py-[6px] rounded-[6px] transition-all duration-300 cursor-pointer`}
                      >
                        <p className="md:text-[13px] text-[12px] font-medium ">
                          Overview
                        </p>
                      </div>

                      <div
                        onClick={showDetails}
                        className={`${
                          txDetails
                            ? "bg-tradeAshLight text-white"
                            : "bg-transparent text-tradeFadeWhite"
                        } flex-1 flex items-center justify-center gap-1 py-[6px] rounded-[6px] transition-all duration-300 cursor-pointer`}
                      >
                        <p className="md:text-[13px] text-[12px] font-medium">
                          Details
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-[10px]">
                      <div
                        className={`${
                          txOverview ? "flex" : "hidden"
                        } flex-col px-[8px] border border-tradeAshLight rounded-[10px]`}
                      >
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              Transaction Type
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              {transaction?.type || "Status unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              {(() => {
                                const sender = transaction?.senderUsername;
                                const recipient =
                                  transaction?.recipientUsername;
                                const type = transaction?.type;

                                if (
                                  sender === "Unknown" &&
                                  recipient === "Unknown" &&
                                  type === "deposit"
                                ) {
                                  return "Source";
                                }

                                if (
                                  sender !== "Unknown" &&
                                  recipient === "Unknown" &&
                                  type === "deposit"
                                ) {
                                  return "Sender";
                                }

                                if (
                                  sender === "Unknown" &&
                                  recipient !== "Unknown" &&
                                  type === "transfer"
                                ) {
                                  return "Recipient";
                                }

                                return "Unknown type";
                              })()}
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] text-white font-semibold">
                              <span className="text-tradeFadeWhite"> @</span>
                              {(() => {
                                const sender = transaction?.senderUsername;
                                const recipient =
                                  transaction?.recipientUsername;
                                const type = transaction?.type;

                                if (
                                  sender === "Unknown" &&
                                  recipient === "Unknown" &&
                                  type === "deposit"
                                ) {
                                  return "Wallet Credit";
                                }

                                if (
                                  sender !== "Unknown" &&
                                  recipient === "Unknown" &&
                                  type === "deposit"
                                ) {
                                  return sender;
                                }

                                if (
                                  sender === "Unknown" &&
                                  recipient !== "Unknown" &&
                                  type === "transfer"
                                ) {
                                  return recipient;
                                }

                                return "N/A";
                              })()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              Status
                            </p>
                          </div>

                          <div>
                            <p
                              className={`text-[13px] font-semibold ${
                                transaction?.status === "pending"
                                  ? "text-tradeOrange"
                                  : transaction?.status === "successful"
                                  ? "text-tradeGreen"
                                  : transaction?.status === "failed"
                                  ? "text-red-600"
                                  : "text-tradeAshDark" // default or unknown status
                              }`}
                            >
                              {transaction?.status || "Status unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border- border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-medium text-tradeFadeWhite">
                              Date & Time
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              {transaction?.createdAt || "Status unknown"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${
                          txDetails ? "flex" : "hidden"
                        } flex-col px-[8px] border border-tradeAshLight rounded-[10px]`}
                      >
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              Reference
                            </p>
                          </div>

                          <div className="">
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              {transaction?.reference || "Status unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              Service Fee
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              {transaction?.fee || `${userCurrency?.code} 0.00`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border-b border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              Payment Channel
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              Wallet
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[10px] py-[8px] border- border-tradeAshLight">
                          <div className="flex items-center gap-1">
                            <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                              IP Address
                            </p>
                          </div>

                          <div>
                            <p className="md:text-[13px] text-[12px] font-semibold text-white">
                              197.210.x.x
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button variant="outline">Report Issue</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
