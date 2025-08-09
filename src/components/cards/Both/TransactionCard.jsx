import React from "react";
import { MdDateRange } from "react-icons/md";
import { MdGrid3X3 } from "react-icons/md";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { date } from "@/utils/date";
import { toDecimal } from "@/utils/toDecimal";
import { shortenID } from "@/utils/shortenID";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { monthDate } from "@/utils/monthDate";
import { time } from "@/utils/time";

const TransactionCard = ({ transaction }) => {
  const { details, setDetails } = useTransaction();

  const viewDetails = (id) => {
    setDetails({ state: true, transactionId: id, data: {} });
  };

  return (
    <>
      {/* Desktop Card */}
      <div
        onClick={() => viewDetails(transaction.reference)}
        className=" md:flex hidden justify-between p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-1 w-[160px] gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              {transaction?.transactionId
                ? shortenID(transaction.reference)
                : "No transaction ID"}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              {transaction?.createdAt
                ? date(transaction.createdAt)
                : "Date not available"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-1 lg:mr-[40px] items-center">
          <div>
            {(() => {
              const type = transaction?.type;

              if (type === "deposit") {
                return (
                  <div className="lg:flex hidden text-tradeGreen p-3 text-base rounded-full bg-tradeAshLight">
                    <IoMdArrowRoundDown />
                  </div>
                );
              }

              if (type === "transfer") {
                return (
                  <div className="lg:flex hidden text-red-600 p-3 text-base rounded-full bg-tradeAshLight">
                    <IoMdArrowRoundUp />
                  </div>
                );
              }

              return (
                <div className="lg:flex hidden text-tradeFadeWhite p-3 text-base rounded-full bg-tradeAshLight">
                  <MdOutlineQuestionMark />
                </div>
              );
            })()}
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {(() => {
                  const sender = transaction?.senderUsername;
                  const recipient = transaction?.recipientUsername;
                  const type = transaction?.type;

                  if (
                    sender === "Unknown" &&
                    recipient === "Unknown" &&
                    type === "deposit"
                  ) {
                    return "Deposit";
                  }

                  if (
                    sender !== "Unknown" &&
                    recipient === "Unknown" &&
                    type === "deposit"
                  ) {
                    return "Transfer From";
                  }

                  if (
                    sender === "Unknown" &&
                    recipient !== "Unknown" &&
                    type === "transfer"
                  ) {
                    return "Transfer To";
                  }

                  return "Unknown type";
                })()}
              </p>
            </div>
            <div>
              {(() => {
                const sender = transaction?.senderUsername;
                const recipient = transaction?.recipientUsername;
                const type = transaction?.type;

                if (
                  sender === "Unknown" &&
                  recipient === "Unknown" &&
                  type === "deposit"
                ) {
                  return (
                    <p className="text-white text-[13px] font-semibold">
                      Wallet Credit
                    </p>
                  );
                }

                if (
                  sender !== "Unknown" &&
                  recipient === "Unknown" &&
                  type === "deposit"
                ) {
                  return (
                    <p className="text-white text-[13px] font-semibold">
                      <span className="text-tradeFadeWhite">@</span> {sender}
                    </p>
                  );
                }

                if (
                  sender === "Unknown" &&
                  recipient !== "Unknown" &&
                  type === "transfer"
                ) {
                  return (
                    <p className="text-white text-[13px] font-semibold">
                      <span className="text-tradeFadeWhite">@</span> {recipient}
                    </p>
                  );
                }

                return (
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    N/A
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1  gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Amount</p>
          </div>
          <div>
            {(() => {
              const sender = transaction?.senderUsername;
              const recipient = transaction?.recipientUsername;
              const type = transaction?.type;

              if (
                sender === "Unknown" &&
                recipient === "Unknown" &&
                type === "deposit"
              ) {
                return (
                  <p className="text-tradeGreen text-[13px] font-semibold">
                    + #{toDecimal(transaction?.amount?.ngn)}{" "}
                  </p>
                );
              }

              if (
                sender !== "Unknown" &&
                recipient === "Unknown" &&
                type === "deposit"
              ) {
                return (
                  <p className="text-tradeGreen text-[13px] font-semibold">
                    + #{toDecimal(transaction?.amount?.ngn)}{" "}
                  </p>
                );
              }

              if (
                sender === "Unknown" &&
                recipient !== "Unknown" &&
                type === "transfer"
              ) {
                return (
                  <p className="text-red-600 text-[13px] font-semibold">
                    - #{toDecimal(transaction?.amount?.ngn)}{" "}
                  </p>
                );
              }

              return (
                <p className="text-tradeFadeWhite text-[13px] font-semibold">
                  N/A
                </p>
              );
            })()}
          </div>
        </div>
        <div className="flex flex-col  flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Service Fee
            </p>
          </div>
          <p className="text-white text-[13px] font-semibold">
            {transaction?.serviceFee?.ngn !== undefined
              ? `#${toDecimal(transaction.serviceFee.ngn)}`
              : "#0.00"}
          </p>
        </div>
        <div className="flex flex-col flex-1  gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Status</p>
          </div>

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
            {capitalizeFirst(transaction?.status) || "Status unknown"}
          </p>
        </div>
      </div>

      {/* Mobile Card */}

      <div className="md:hidden flex flex-col justify-between bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex justify-between p-[12px] ">
          <div className="flex gap-2">
            <div>
              {transaction?.type === "deposit" ? (
                <div className="p-[10px] rounded-full bg-tradeGreen/5 text-lg items-center justify-center">
                  <IoMdArrowRoundDown className="text-tradeGreen" />
                </div>
              ) : transaction?.type === "transfer" ? (
                <div className="p-[10px] rounded-full bg-red-600/5 text-lg items-center justify-center">
                  <IoMdArrowRoundUp className="text-red-600 text-xl" />
                </div>
              ) : (
                <div className="p-[10px] rounded-full bg-tradeFadeWhite/5 text-lg items-center justify-center">
                  <MdOutlineQuestionMark className="text-tradeFadeWhite" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {(() => {
                  const { senderUsername, recipientUsername, type } =
                    transaction || {};
                  if (
                    senderUsername === "Unknown" &&
                    recipientUsername === "Unknown" &&
                    type === "deposit"
                  )
                    return "Deposit";
                  if (
                    senderUsername !== "Unknown" &&
                    recipientUsername === "Unknown" &&
                    type === "deposit"
                  )
                    return "Transfer";
                  if (
                    senderUsername === "Unknown" &&
                    recipientUsername !== "Unknown" &&
                    type === "transfer"
                  )
                    return "Transfer";
                  return "Unknown Type";
                })()}
              </p>

              <p className="text-[13px] font-semibold text-white">
                {(() => {
                  const { senderUsername, recipientUsername, type } =
                    transaction || {};
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
                  return "N/A";
                })()}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-xs font-medium text-tradeFadeWhite">
              {date(transaction?.createdAt)}
            </p>
            <div>
              {(() => {
                const { senderUsername, recipientUsername, type, amount } =
                  transaction || {};
                if (
                  (type === "deposit" && senderUsername === "Unknown") ||
                  (type === "deposit" && senderUsername !== "Unknown")
                )
                  return (
                    <p className="text-tradeGreen text-[13px] font-semibold">
                      + #{toDecimal(amount?.ngn)}
                    </p>
                  );
                if (type === "transfer" && recipientUsername !== "Unknown")
                  return (
                    <p className="text-red-600 text-[13px] font-semibold">
                      - #{toDecimal(amount?.ngn)}
                    </p>
                  );
                return (
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    N/A
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
        <div className="flex justify-between p-[12px] gap-5 border-t border-dashed border-tradeAshLight">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-tradeFadeWhite">Reference</p>
            <p className="text-xs font-semibold text-white">
              {transaction?.reference}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-tradeFadeWhite">Status</p>
            <p
              className={`text-xs font-semibold ${
                transaction?.status === "pending"
                  ? "text-tradeOrange"
                  : transaction?.status === "successful"
                  ? "text-tradeGreen"
                  : transaction?.status === "failed"
                  ? "text-red-600"
                  : "text-tradeAshDark"
              } `}
            >
              {capitalizeFirst(transaction?.status) || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
