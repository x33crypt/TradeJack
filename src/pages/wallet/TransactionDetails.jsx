import React, { useEffect, useState } from "react";
import LockByScroll from "@/components/LockByScroll";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { IoClose } from "react-icons/io5";
import { useFetchTransactionsDetails } from "@/hooks/useFetchTransactionDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { MdOutlineQuestionMark } from "react-icons/md";
import { toDecimal } from "@/utils/toDecimal";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { dateTime } from "@/utils/dateTime";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";

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

  const DetailRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2 px-2">
      <p className="text-[12px] md:text-[13px] font-semibold text-tradeFadeWhite">
        {label}
      </p>
      <p className="text-[12px] md:text-[13px] font-semibold text-white">
        {value}
      </p>
    </div>
  );

  return (
    <div>
      {state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 right-0 left-0 bottom-0 lg:px-[2%] md:px-[2.5%] px-[30px]  bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] min-h-[400px] ">
              <div className="flex  items-center justify-between  py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  Transaction Details
                </p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex py-[15px]">
                {loading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin text-[18px] text-tradeFadeWhite" />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between gap-[30px]">
                    <div className="flex flex-col gap-[20px]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div>
                          {(() => {
                            const status = transaction?.status;

                            if (status === "successfull") {
                              return (
                                <div className="p-[6px] bg-tradeAshLight text-[45px] text-tradeGreen rounded-full">
                                  <IoIosCheckmarkCircle />
                                </div>
                              );
                            }

                            if (status === "pending") {
                              return (
                                <div className="p-[6px] bg-tradeAshLight text-[45px] text-tradeOrange rounded-full">
                                  <MdPending />
                                </div>
                              );
                            }

                            if (status === "failed") {
                              return (
                                <div className="p-[6px] bg-tradeAshLight text-[45px] text-red-600 rounded-full">
                                  <MdCancel />
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <p className="text-[13px] font-semibold text-tradeFadeWhite">
                          {capitalizeFirst(transaction?.type)}{" "}
                          {capitalizeFirst(transaction?.status)}
                        </p>
                        <p className="text-xl font-bold text-white leading-none">
                          {userCurrency?.code}{" "}
                          {toDecimal(transaction?.amount.ngn)}
                        </p>
                        <p className="text-xs font-bold text-tradeOrange leading-none">
                          USD {toDecimal(transaction?.amount?.usd)}
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col gap-[10px]">
                        <div
                          className={`${
                            txOverview ? "flex" : "hidden"
                          } flex flex-col bg-tradeAshLight  border border-tradeAshLight rounded-[15px]`}
                        >
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAsh">
                            <div className="flex items-center gap-1">
                              <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                                Transaction Type
                              </p>
                            </div>

                            <div>
                              <p className="md:text-[13px] text-[12px] font-semibold text-white">
                                {capitalizeFirst(transaction?.type) ||
                                  "Status unknown"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAsh">
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
                                    return "Payment Method";
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
                                <span className="text-tradeFadeWhite"></span>
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
                                    return "Bank Deposit";
                                  }

                                  if (
                                    sender !== "Unknown" &&
                                    recipient === "Unknown" &&
                                    type === "deposit"
                                  ) {
                                    return `@${sender}`;
                                  }

                                  if (
                                    sender === "Unknown" &&
                                    recipient !== "Unknown" &&
                                    type === "transfer"
                                  ) {
                                    return `@${recipient}`;
                                  }

                                  return "N/A";
                                })()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAsh">
                            <div className="flex items-center gap-1">
                              <p className="md:text-[13px] text-[12px] font-medium text-tradeFadeWhite">
                                Date & Time
                              </p>
                            </div>

                            <div>
                              <p className="md:text-[13px] text-[12px] font-semibold text-white">
                                {dateTime(transaction?.createdAt) ||
                                  "Status unknown"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-[10px] p-[8px]">
                            <div className="flex items-center gap-1">
                              <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                                Reference ID
                              </p>
                            </div>

                            <div className="">
                              <p className="md:text-[13px] text-[12px] font-semibold text-white">
                                {transaction?.reference || "Status unknown"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${
                            txDetails ? "flex" : "hidden"
                          } flex flex-col  border border-tradeAshLight rounded-[15px]`}
                        >
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAshLight">
                            <div className="flex items-center gap-1">
                              <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                                Reference ID
                              </p>
                            </div>

                            <div className="">
                              <p className="md:text-[13px] text-[12px] font-semibold text-white">
                                {transaction?.reference || "Status unknown"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border-b border-tradeAshLight">
                            <div className="flex items-center gap-1">
                              <p className="md:text-[13px] text-[12px] font-semibold text-tradeFadeWhite">
                                Service Fee
                              </p>
                            </div>

                            <div>
                              <p className="md:text-[13px] text-[12px] font-semibold text-white">
                                {transaction?.fee ||
                                  `${userCurrency?.code} 0.00`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-[10px] p-[8px] border- border-tradeAshLight">
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
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center justify-center">
                      <p className="text-xs text-tradeFadeWhite font-medium text-center w-[250px] leading-relaxed">
                        Do you need help with this transaction ? Reach out via
                        our{" "}
                        <span className="text-tradeGreen font-semibold cursor-pointer hover:text-tradeGreen/80">
                          Support Channel
                        </span>
                      </p>
                    </div>
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
