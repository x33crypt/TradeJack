import React, { useState, useEffect } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { useCreateOfferDetails } from "@/context/CreateOfferDetailsContext";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";

const EditOfferSummary = () => {
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const { createOffer, setCreateOffer } = useState(false);

  // Map full service type string to corresponding icon
  const serviceTypeIcons = {
    "Online Wallet Transfer": IoWalletOutline,
    "Direct Bank Transfer": CiBank,
    "Gift Card Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const IconComponent = serviceTypeIcons[offerDetails?.serviceType];

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col bg-black lg:px-[15%] md:px-[2.5%]">
        <div className="flex min-h-svh md:mt-[80px] mt-[60px]  w-full b">
          <div className=" relative w-full  flex flex-col md:border-x md:border-b md:border-t border-neutral-800">
            <div className="flex flex-col justify-between p-[15px]  border-b border-tradeAshLight w-full">
              <p className="text-[17px] text-white font-[700]">Offer Summary</p>
            </div>

            <div className="p-[15px] ">
              <p className="text-tradeFadeWhite text-[14px]">
                Verify your offer information to set clear terms and support a
                transparent, efficient trade.
              </p>
            </div>

            <div className="flex flex-col p-[15px]  ">
              <div className="flex gap-4 items-center bg-tradeAshLight border border-neutral-800 p-[15px]">
                <div>
                  {IconComponent && (
                    <IconComponent className="text-tradeFadeWhite text-[36px]" />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-tradeOrange text-base font-bold">
                    {offerDetails?.service || "-- --"}
                  </p>
                  <p className="text-white text-xs font-medium">
                    {offerDetails?.serviceType || "Service Type"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-[500]">
                  Accepted Currency
                </p>
                <p className="text-tradeOrange text-[15px] font-[600]">
                  {offerDetails?.currency?.name
                    ? `${offerDetails.currency.name} - ${offerDetails.currency.code}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-[500]">
                  Trade Limit Range
                </p>

                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-2 ">
                    <p className="text-tradeFadeWhite text-[14px]">
                      Minimum Purchase
                    </p>
                    <p className="text-tradeLightGreen text-[14px] font-[600]">
                      {offerDetails?.minimum !== undefined &&
                      offerDetails?.currency?.code
                        ? `${Number(offerDetails.minimum).toLocaleString()} ${
                            offerDetails.currency.code
                          }`
                        : "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 ">
                    <p className="text-tradeFadeWhite text-[14px]">
                      Maximum Purchase
                    </p>
                    <p className="text-tradeLightGreen text-[14px] font-[600]">
                      {offerDetails?.maximum !== undefined &&
                      offerDetails?.currency?.code
                        ? `${Number(offerDetails.maximum).toLocaleString()} ${
                            offerDetails.currency.code
                          }`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Profit Margin
                </p>

                <p className="text-white text-[14px]">
                  You’ve set a profit margin of{" "}
                  <span className="text-tradeGreen text-[14px] font-[600]">
                    {offerDetails?.margin !== undefined
                      ? `${offerDetails.margin} percent`
                      : "--"}
                  </span>
                  , which represents your expected earnings per successful
                  transaction.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Payment Window
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-white text-[14px]">
                    You’ve set a payment window of{" "}
                    <span className="font-[600] text-[14px] text-tradeGreen">
                      {offerDetails?.paymentWindow !== undefined
                        ? `${offerDetails.paymentWindow} hour(s)`
                        : "--"}
                    </span>{" "}
                    for sellers to complete their payment.
                  </p>

                  <p className="text-tradeFadeWhite text-[14px]">
                    <span className="text-tradeOrange font-bold">Note: </span>{" "}
                    If the payment is not made within this timeframe, the trade
                    will be automatically canceled. If funds were sent but not
                    confirmed, sellers may initiate a dispute.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Confirmation Time
                </p>

                <div className="flex flex-col gap-1">
                  <p className="text-white text-[14px]">
                    You’ve agreed to confirm receipt of payment and release
                    funds within{" "}
                    <span className="font-[600] text-[14px] text-tradeGreen">
                      {offerDetails?.confirmationTime !== undefined
                        ? `${offerDetails.confirmationTime} hour(s)`
                        : "--"}
                    </span>{" "}
                    after seller's marks the trade as paid.
                  </p>

                  <p className="text-tradeFadeWhite text-[14px]">
                    <span className="text-tradeOrange font-bold">Note: </span>
                    Failure to respond within this window may result in the
                    buyer escalating the trade through a dispute.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Term Tags
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {offerDetails?.termTags?.length ? (
                    offerDetails.termTags.map((tag, index) => (
                      <div className="flex w-max items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] bg-tradeAshLight border border-tradeAshLight">
                        <p
                          key={index}
                          className="text-[14px] font-medium text-tradeOrange"
                        >
                          {tag}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-tradeFadeWhite text-[14px] font-[500]">
                      No terms specified
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Trade Instruction
                </p>
                <div className="">
                  {offerDetails?.instruction ? (
                    <p className="text-white text-[14px]">
                      {offerDetails?.instruction}
                    </p>
                  ) : (
                    <p className="text-tradeFadeWhite text-[14px] font-[500]">
                      No Instructions set yet
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Service Charge
                </p>
                <div>
                  <p className="text-white text-[14px]">
                    <span className="font-semibold text-tradeOrange">
                      Applied at time of trade
                    </span>{" "}
                    (typically ranges between 0.5% – 2%)
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-black flex flex-col gap-[15px] p-[15px]">
              <button
                className={` ${
                  createOffer
                    ? "bg-tradeAsh text-tradeGreen"
                    : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
              >
                <p className="text-[14px] font-[700]">Publish Offer</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditOfferSummary;
