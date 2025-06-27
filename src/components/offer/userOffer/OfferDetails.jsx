import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const OfferDetails = () => {
  return (
    <div className="flex flex-col h-full  md:border border-neutral-800">
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
              Direct Bank Transfer
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Service
            </p>
            <p className="text-tradeOrange text-[13px] font-semibold">
              Wells Fargo
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
              Canadian Dollar
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border- border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Trade Volume
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">215 Trades</p>
          </div>
        </div>
        <div className="flex w-full flex-col bg-tradeAsh rounded-[15px]  border border-tradeAshLight">
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Minimum Purchase
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>

            <p className="text-white text-[13px] font-semibold">100 CAD</p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Maximum Purchase
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">1,000 CAD</p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Payment Window
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">2 Hour(s)</p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border- border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Confirmation Window
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">2 Hour(s)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
