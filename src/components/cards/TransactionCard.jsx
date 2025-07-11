import React from "react";
import { MdDateRange } from "react-icons/md";
import { MdGrid3X3 } from "react-icons/md";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { date } from "@/utils/dateTimeFormat/date";
import { toDecimal } from "@/utils/currency/toDecimal";
import { shortenID } from "@/utils/shortenID/shortenID";

const TransactionCard = ({ transaction }) => {
  return (
    <>
      {/* Desktop Card */}
      <div className="md:flex hidden p-[15px] gap-5 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer">
        <div className="flex flex-col lg:flex-1 w-[160px] gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              {shortenID(transaction?.transactionId)}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              {date(transaction?.createdAt)}
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

              return null;
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

                  return "";
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

                return null;
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

              return null;
            })()}
          </div>
        </div>
        <div className="flex flex-col  flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Service Fee
            </p>
          </div>
          <p className="text-white text-[13px] font-semibold">#0.00 </p>
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
            {transaction?.status}
          </p>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="flex flex-col md:hidden  bg-tradeAsh rounded-[15px] border  border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Top: Offer ID and Status */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">
              {shortenID(transaction?.transactionId)}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">
              {date(transaction?.createdAt)}
            </p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex w-full justify-between  gap-3 px-4 py-3 border-b border-tradeAshLight">
          <div className="flex gap-3 items-center">
            <div>
              {(() => {
                const type = transaction?.type;

                if (type === "deposit") {
                  return (
                    <div className="flex text-tradeGreen p-3 text-lg rounded-full bg-tradeAshLight">
                      <IoMdArrowRoundDown />
                    </div>
                  );
                }

                if (type === "transfer") {
                  return (
                    <div className="flex text-red-600 p-3 text-lg rounded-full bg-tradeAshLight">
                      <IoMdArrowRoundUp />
                    </div>
                  );
                }

                return null;
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

                    return "";
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
                        <span className="text-tradeFadeWhite">@</span>{" "}
                        {recipient}
                      </p>
                    );
                  }

                  return null;
                })()}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
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

                return null;
              })()}
            </div>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex justify-between items-center px-4 py-3 md:border-b border-tradeAshLight">
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
            {transaction?.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
