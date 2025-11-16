import React, { useEffect } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import { useTransaction } from "@/context/userContext/TransactionContext";
import { useFetchTransactionsDetails } from "@/hooks/userHooks/useFetchTransactionDetails";
import { toDecimal } from "@/utils/toDecimal";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { dateTime } from "@/utils/dateTime";
import { useToast } from "@/context/otherContext/ToastContext";
import { useParams } from "react-router-dom";

const TransactionReceipt = () => {
  const { id = "" } = useParams();
  const { loading } = useFetchTransactionsDetails();
  const { details, setDetails } = useTransaction();
  const { data, user } = details;
  const { toast, setToast } = useToast();

  useEffect(() => {
    if (id) {
      setDetails((prev) => ({ ...prev, state: true, reference: id, data: {} }));
    }
  }, [id]);

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

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <PartnersMenu /> */}
          <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
            <div className="flex  items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                TRANSACTION RECEIPT
              </p>
            </div>
            <div className="flex-1 flex">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {data === null ? (
                    <div className="flex flex-1">
                      <NetworkError />
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col gap-[30px]">
                      {/* <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-2xl font-semibold text-white">
                          {toDecimal(data?.amount?.ngn)} {user?.code}
                        </p>

                        <div className="flex items-center gap-1">
                          <p className="text-[13px] text-white font-semibold">
                            {data?.type === "transfer"
                              ? "to"
                              : data?.type === "deposit"
                              ? "from"
                              : data?.type === "withdrawal"
                              ? "to"
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
                            })().toUpperCase()}
                          </p>
                        </div>
                      </div> */}

                      <div className="flex flex-col gap-[10px]">
                        <div className="w-full flex flex-col gap-1 bg-tradeAsh border border-tradeAshLight border-dashed p-[12px] rounded-[15px]">
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
                              })().toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-1 bg-tradeAsh border border-tradeAshLight border-dashed p-[12px] rounded-[15px]">
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
                              Channel
                            </p>
                            <p
                              className={`text-[13px] font-semibold text-white`}
                            >
                              -- --
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

                        <div className="w-full flex flex-col gap-1 bg-tradeAsh border border-tradeAshLight border-dashed p-[12px] rounded-[15px]">
                          <div className="flex items-center justify-between">
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              Transaction Fee
                            </p>
                            <p className="text-white text-[13px] font-semibold">
                              #0.00
                            </p>
                          </div>
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
                              Reference
                            </p>
                            <p className="text-[13px] font-semibold text-white">
                              {data?.reference}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed text-center">
                          Transaction updates in real time.{" "}
                          <span className="text-tradeOrange">
                            Contact support
                          </span>{" "}
                          with your reference for any issues.
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
      <Footer />
    </>
  );
};

export default TransactionReceipt;
