import React, { useState } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { useCreateOfferDetails } from "@/context/CreateOfferDetailsContext";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";

const CreateOfferSummary = () => {
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const { createOffer, setCreateOffer } = useState(false);
  const [platformFee, setPlatformFee] = useState("5");

  const iconMap = {
    CiBank: CiBank,
    IoWalletOutline: IoWalletOutline,
    IoCardOutline: IoCardOutline,
    HiOutlineGift: HiOutlineGift,
    GiTwoCoins: GiTwoCoins,
  };

  const IconComponent = iconMap[offerDetails?.serviceTypeIcon];

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col bg-black lg:px-[15%] md:px-[2.5%]">
        <div className="flex min-h-svh md:mt-[80px] mt-[60px]  w-full b">
          <div className=" relative w-full  flex flex-col md:border-x md:border-b md:border-t border-neutral-800">
            <div className="flex flex-col justify-between p-[15px]  border-b border-tradeAshLight w-full">
              <p className="text-[17px] text-white font-[700]">Offer Summary</p>
            </div>

            <div className="p-[15px]">
              <p className="text-white text-[14px]">
                Verify your offer information to set clear terms and support a
                transparent, efficient trade.
              </p>
            </div>

            <div className="flex flex-col gap-[25px] p-[15px] ">
              <div className="flex gap-[15px] items-center bg-tradeAsh border border-neutral-800 lg:px-[15px] md:px-[2.5%] p-[15px] rounded-[10px]">
                <div>
                  {IconComponent && (
                    <IconComponent className="text-tradeOrange text-[36px]" />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-[4px] ">
                  <p className="text-[13px] text-tradeFadeWhite font-[500]">
                    {offerDetails?.serviceType || "Service Type"}
                  </p>
                  <p className="text-[15px] text-tradeLightGreen font-[600]">
                    {offerDetails?.service || "-- --"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Currency
                </p>
                <p className="text-tradeOrange text-[15px] font-[600]">
                  {offerDetails?.currency?.name
                    ? `${offerDetails.currency.name} - ${offerDetails.currency.code}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Limit Range
                </p>

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

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Profit Margin
                </p>
                <p className="text-white text-[14px]">
                  Your estimated profit per transaction is{" "}
                  <span className="text-tradeGreen text-[14px] font-[600]">
                    {offerDetails?.margin !== undefined
                      ? `${offerDetails.margin}%`
                      : "--"}
                  </span>
                  . This represents the percentage you’ll earn on each
                  successful trade.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Payment Window
                </p>
                <p className="text-white text-[14px]">
                  The seller has{" "}
                  <span className="font-[600] text-[14px] text-tradeGreen">
                    {offerDetails?.paymentWindow !== undefined
                      ? `${offerDetails.paymentWindow} hour(s)`
                      : "--"}
                  </span>{" "}
                  to complete payment. If not, the trade will be canceled. If
                  funds were already sent, a dispute can be filed.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Confirmation Time
                </p>
                <p className="text-white text-[14px]">
                  You'll have{" "}
                  <span className="font-[600] text-[14px] text-tradeGreen">
                    {offerDetails?.confirmationTime !== undefined
                      ? `${offerDetails.confirmationTime} hour(s)`
                      : "--"}
                  </span>{" "}
                  to confirm receipt and release funds after the seller marks
                  the trade as paid. If you don't respond in time, the seller
                  may escalate and file a dispute.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Term Tags
                </p>
                <div className="grid grid-cols-2 gap-y-1">
                  {offerDetails?.termTags?.length ? (
                    offerDetails.termTags.map((tag, index) => (
                      <div className="flex w-max items-center gap-[8px] px-[10px] py-[4px] rounded-[8px] bg-tradeAshLight border border-tradeAshLight">
                        <p
                          key={index}
                          className="text-[14px] font-medium text-tradeOrange"
                        >
                          {tag}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-tradeFadeWhite text-[15px] font-[500]">
                      No terms specified
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
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

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Platform fee
                </p>
                <div className="">
                  <p className="text-white text-[14px]">
                    <span className="font-semibold text-tradeGreen">
                      {`${platformFee}%`}
                    </span>{" "}
                    per trade
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-black flex flex-col gap-[15px] p-[15px]">
              <div className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300">
                <p className="text-[14px] font-[700] ">Save as Draft</p>
              </div>
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

export default CreateOfferSummary;
