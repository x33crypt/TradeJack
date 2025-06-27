import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";
import { dateTime } from "@/utils/dateTimeFormat/dateTimeFormat";

const OfferDetails = ({ aboutOffer }) => {
  return (
    <div className="flex flex-col h-full flex-1  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">About Offer</p>
      </div>

      <div className="flex-1 flex md:flex-row flex-col bg-tradeAs p-[15px] gap-[10px]">
        <div className="flex w-full flex-col bg-tradeAsh rounded-[15px]  border border-tradeAshLight">
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Service Type
            </p>
            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.serviceType}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Service
            </p>
            <p className="text-tradeOrange text-[13px] font-semibold">
              {aboutOffer?.service}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Accepted Currency
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-tradeGreen text-[13px] font-semibold">
              {aboutOffer?.preferredCurrency?.name}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border- border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Profit Margin
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.marginRate?.percent}% per trade
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col bg-tradeAs rounded-[15px]  border border-tradeAshLight">
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Published Date
            </p>

            <p className="text-white text-[13px] font-semibold">
              {dateTime(aboutOffer?.publishedOn)}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Offer Status
            </p>

            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  aboutOffer?.status === "active"
                    ? "bg-tradeGreen"
                    : "bg-red-500"
                }`}
              ></span>
              <p
                className={`text-[14px] font-semibold ${
                  aboutOffer?.status === "active"
                    ? "text-tradeGreen"
                    : "text-red-500"
                }`}
              >
                {aboutOffer?.status === "active" ? "Active" : "Not Active"}
              </p>
            </div>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Trade Volume
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.offerTransactionCount} Trades
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border- border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Feedback Summary
            </p>

            <div className="flex gap-3 items-center">
              <p className=" text-sm text-white flex items-center gap-1 font-semibold">
                <IoMdThumbsUp className="text-tradeGreen " />
                {aboutOffer?.offerRating?.positiveFeedback}
              </p>

              <p className="text-sm text-white flex items-center gap-1 font-semibold">
                <MdThumbDownAlt className="text-red-500" />
                {aboutOffer?.offerRating?.negativeFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
