import React from "react";
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
import { FaHashtag } from "react-icons/fa";

const TransactionCard = ({ transaction }) => {
  const { details, setDetails } = useTransaction();

  const viewDetails = (id) => {
    setDetails({ state: true, transactionId: id, data: {} });
  };

  return (
    <>
      {/* Desktop Card */}

      <div className=" md:flex hidden items-center gap-[10px]  p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-[5px] items-center">
            <div className="flex gap-1 items-center">
              <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                {monthDate(transaction?.createdAt)}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <MdAccessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                {time(transaction?.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <FaHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            <p className="text-xs font-medium text-tradeFadeWhite">
              {shortenID(transaction.reference)}
            </p>
          </div>
        </div>

        <div className="flex-1 flex gap-2">
          <div>
            {transaction?.type === "deposit" ? (
              <div className="p-[10px] rounded-full bg-tradeGreen/5 text-lg items-center justify-center">
                <IoMdArrowRoundDown className="text-tradeGreen" />
              </div>
            ) : transaction?.type === "transfer" ? (
              <div className="p-[10px] rounded-full bg-red-600/5 text-lg items-center justify-center">
                <IoMdArrowRoundUp className="text-red-600 text-xl" />
              </div>
            ) : transaction?.type === "withdrawal" ? (
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
              {capitalizeFirst(transaction?.type)}
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
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs font-semibold text-tradeFadeWhite">Amount</p>
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
              if (
                (type === "withdrawal" && senderUsername === "Unknown") ||
                (type === "withdrawal" && recipientUsername === null)
              )
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

        <div className="w-[130px] flex flex-col gap-2">
          <p className="text-xs font-semibold text-tradeFadeWhite">
            Service Fee
          </p>
          <p className="text-[13px] font-semibold text-tradeFadeWhite">#0.00</p>
        </div>

        <div className="w-[120px] flex flex-col gap-2">
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
              ) : transaction?.type === "withdrawal" ? (
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
                {capitalizeFirst(transaction?.type)}
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
                if (
                  (type === "withdrawal" && senderUsername === "Unknown") ||
                  (type === "withdrawal" && recipientUsername === null)
                )
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
