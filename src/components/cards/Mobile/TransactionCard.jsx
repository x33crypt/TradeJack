import React from "react";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { date } from "@/utils/date";
import { toDecimal } from "@/utils/toDecimal";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { shortenID } from "@/utils/shortenID";

const TransactionCard = ({ transaction }) => {
  const { setDetails } = useTransaction();

  const viewDetails = (id) => {
    setDetails({ state: true, reference: id, data: {} });
  };

  return (
    <div
      onClick={() => viewDetails(transaction.reference)}
      className="md:hidde flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight rounded-[15px] border border-tradeAshLight transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between  ">
        <div className="flex gap-2">
          <div>
            {transaction?.type === "deposit" ? (
              <div className="p-[10px] rounded-full bg-tradeAshLight text-lg items-center justify-center">
                <IoMdArrowRoundDown className="text-tradeFadeWhite" />
              </div>
            ) : transaction?.type === "transfer" ? (
              <div className="p-[10px] rounded-full bg-tradeAshLight text-lg items-center justify-center">
                <IoMdArrowRoundUp className="text-tradeFadeWhite text-xl" />
              </div>
            ) : transaction?.type === "withdrawal" ? (
              <div className="p-[10px] rounded-full bg-tradeAshLight text-lg items-center justify-center">
                <IoMdArrowRoundUp className="text-tradeFadeWhite text-xl" />
              </div>
            ) : (
              <div className="p-[10px] rounded-full bg-tradeAshLight text-lg items-center justify-center">
                <MdOutlineQuestionMark className="text-tradeFadeWhite" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-tradeFadeWhite">
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
                  <p className="text-white text-[13px] font-semibold">
                    + #{toDecimal(amount?.ngn)}
                  </p>
                );
              if (type === "transfer" && recipientUsername !== "Unknown")
                return (
                  <p className="text-white text-[13px] font-semibold">
                    - #{toDecimal(amount?.ngn)}
                  </p>
                );
              if (
                (type === "withdrawal" && senderUsername === "Unknown") ||
                (type === "withdrawal" && recipientUsername === null)
              )
                return (
                  <p className="text-white text-[13px] font-semibold">
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
      <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-white">
            {shortenID(transaction?.reference)}
          </p>
          <p className="text-xs font-medium text-tradeFadeWhite">
            Reference ID
          </p>
        </div>
        <div className="flex flex-col gap-1 items-end">
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
          <p className="text-xs font-medium text-tradeFadeWhite">Status</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
