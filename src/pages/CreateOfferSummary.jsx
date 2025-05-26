import React, { useState } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { CiBank } from "react-icons/ci";
import { useCreateOfferDetails } from "@/context/CreateOfferDetailsContext";

const CreateOfferSummary = () => {
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const { createOffer, setCreateOffer } = useState(false);

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%]">
        <div className="flex min-h-svh md:mt-[80px] mt-[60px]  lg:w-[520px] w-full border-neutral-800 ">
          <div className=" relative w-full  flex flex-col md:border-r md:border-b md:border-t border-neutral-800">
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
                  <CiBank className="text-tradeOrange text-[36px]" />
                </div>
                <div className="flex-1 flex flex-col gap-[2px] ">
                  <p className="text-[12.5px] text-tradeFadeWhite font-[500]">
                    {offerDetails?.serviceType || "Service Type"}
                  </p>
                  <p className="text-[15px] text-tradeLightGreen font-[600]">
                    {offerDetails?.service || "-- --"}
                  </p>
                </div>
                <div></div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Currency
                </p>
                <p className="text-tradeLightGreen text-[15px] font-[600]">
                  {offerDetails?.currency?.name
                    ? `${offerDetails.currency.name} - ${offerDetails.currency.code}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Limit Range
                </p>

                <div className="flex flex-row justify-between">
                  <p className="text-white text-[15px]">Minimum Purchase</p>
                  <p className="text-tradeLightGreen text-[15px] font-[600]">
                    {offerDetails?.minimum !== undefined &&
                    offerDetails?.currency?.code
                      ? `${Number(offerDetails.minimum).toLocaleString()} ${
                          offerDetails.currency.code
                        }`
                      : "N/A"}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-white text-[15px]">Maximum Purchase</p>
                  <p className="text-tradeLightGreen text-[15px] font-[600]">
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
                <p className="text-white text-[15px] ">
                  Estimated return:{" "}
                  <span className="text-tradeLightGreen font-[600]">
                    {offerDetails?.margin !== undefined
                      ? `${offerDetails.margin}%`
                      : "--"}
                  </span>{" "}
                  per trade
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Payment Window
                </p>
                <p className="text-white text-[15px]">
                  Seller has{" "}
                  <span className="font-[600] text-tradeLightGreen">
                    {offerDetails?.timeLimit !== undefined
                      ? `${offerDetails.timeLimit} minutes`
                      : "--"}
                  </span>{" "}
                  to complete payment
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Term Tags
                </p>
                <div className="grid grid-cols-2 gap-y-1">
                  {offerDetails?.termTags?.length ? (
                    offerDetails.termTags.map((tag, index) => (
                      <p
                        key={index}
                        className="text-[15px] font-[500] text-tradeOrange"
                      >
                        {tag}
                        {index < offerDetails.termTags.length - 1 && ","}
                      </p>
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
                    <p className="text-white text-[15px]">
                      {offerDetails?.instruction}
                    </p>
                  ) : (
                    <p className="text-tradeFadeWhite text-[15px] font-[500]">
                      No Instructions set yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky top-[60px] bottom-0 bg-black flex flex-col gap-[15px] p-[15px]">
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
                <p className="text-[14px] font-[700]">Create Offer</p>
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
