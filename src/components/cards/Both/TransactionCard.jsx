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
        className="md:flex hidden p-[15px] gap-5 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer"
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
      <div
        onClick={() => viewDetails(transaction.reference)}
        className="md:hidden flex flex-col bg-tradeAsh rounded-[12px] border border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer p-3 space-y-3"
      >
        {/* Top Row: ID, Date, Status */}
        <div className="flex justify-between items-center text-xs text-tradeFadeWhite font-medium">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 bg-transparent px-[3px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <span className="font-semibold">
              {shortenID(transaction?.reference || "")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 bg-transparent px-[3px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <span className="font-semibold">
              {date(transaction?.createdAt)}
            </span>
          </div>
          <div
            className={`font-semibold text-[12px] hidden md:flex ${
              transaction?.status === "pending"
                ? "text-tradeOrange"
                : transaction?.status === "successful"
                ? "text-tradeGreen"
                : transaction?.status === "failed"
                ? "text-red-600"
                : "text-tradeAshDark"
            }`}
          >
            {capitalizeFirst(transaction?.status) || "Unknown"}
          </div>
        </div>

        {/* Main Info Row */}
        <div className="flex items-center justify-between">
          {/* Icon and Type */}
          <div className="flex items-center gap-2">
            <div className="p-[10px] rounded-full bg-tradeAshLight text-lg items-center justify-center">
              {transaction?.type === "deposit" ? (
                <IoMdArrowRoundDown className="text-tradeGreen" />
              ) : transaction?.type === "transfer" ? (
                <IoMdArrowRoundUp className="text-red-600 text-xl" />
              ) : (
                <MdOutlineQuestionMark className="text-tradeFadeWhite" />
              )}
            </div>
            <div className="flex gap-1 flex-col">
              <div className="flex items-center gap-1 bg-transparent px-[6px] border border-tradeAshExtraLight rounded-[4px] w-max">
                <span className="text-[12px] text-tradeFadeWhite">
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
                </span>
              </div>

              <span className="text-white text-[13px] font-bold">
                {(() => {
                  const { senderUsername, recipientUsername, type } =
                    transaction || {};
                  if (
                    senderUsername === "Unknown" &&
                    recipientUsername === "Unknown" &&
                    type === "deposit"
                  )
                    return "Wallet Credit";
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
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-transparent px-[6px] border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-[12px] text-tradeFadeWhite font-medium">
                Amount
              </p>
            </div>

            {(() => {
              const { senderUsername, recipientUsername, type, amount } =
                transaction || {};
              if (
                (type === "deposit" && senderUsername === "Unknown") ||
                (type === "deposit" && senderUsername !== "Unknown")
              )
                return (
                  <p className="text-tradeGreen text-[13px] font-bold">
                    + #{toDecimal(amount?.ngn)}
                  </p>
                );
              if (type === "transfer" && recipientUsername !== "Unknown")
                return (
                  <p className="text-red-600 text-[13px] font-bold">
                    - #{toDecimal(amount?.ngn)}
                  </p>
                );
              return (
                <p className="text-tradeFadeWhite text-[13px] font-bold">
                  N/A
                </p>
              );
            })()}
          </div>
        </div>

        {/* Status Info */}
        <div className="flex md:hidden justify-between items-center text-xs text-tradeFadeWhite font-medium">
          <div className="flex items-center gap-1 bg-transparent px-[6px] border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-[12px] text-tradeFadeWhite font-medium">
              Status
            </p>
          </div>

          <div
            className={`font-semibold text-[13px] ${
              transaction?.status === "pending"
                ? "text-tradeOrange"
                : transaction?.status === "successful"
                ? "text-tradeGreen"
                : transaction?.status === "failed"
                ? "text-red-600"
                : "text-tradeAshDark"
            }`}
          >
            {capitalizeFirst(transaction?.status) || "Unknown"}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
