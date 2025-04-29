import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const ExchangeCalculator = (prop) => {
  return (
    <div className="lg:w-[380px] flex flex-col justify-between md:border-x lg:border-l-0 md:border-y  border-tradeAshLight">
      <div className="flex items-center gap-[10px] p-[15px] md:border-b md:border-t-0 border-y border-tradeAshLight">
        <p className="text-[17px] text-white font-[700] cursor-pointer">
          Exchange Calculator
        </p>
      </div>

      <div className="flex h-full justify-between flex-col p-[15px] gap-[20px] ">
        <div className="flex flex-col gap-[10px]">
          <div className="flex border border-tradeAshLight flex-col gap-[15px] bg-tradeAsh p-[15px] rounded-[16px]">
            <div className="flex justify-between items-center">
              <p className="text-tradeFadeWhite text-[13px] font-[500]">Send</p>
            </div>
            <div className="bg-tradePurpl flex gap-[20px] justify-between items-center">
              <input
                className="h-[20px] w-full outline-none border-none bg-transparent  text-[22px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[22px] caret-tradeGreen"
                type="text"
                placeholder="00.00"
                value={
                  prop?.tradeValue
                    ? parseInt(prop?.tradeValue).toLocaleString()
                    : ""
                }
                onChange={prop?.handleTradeValueChange}
              />
              <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[700] bg-white">
                {prop?.offerDetails?.currency}
              </p>
            </div>
          </div>

          <div className="flex border border-tradeAshLight flex-col gap-[15px] bg-tradeAsh p-[15.5px] rounded-[16px]">
            <div className="flex">
              <p className="text-tradeFadeWhite text-[13px] font-[500]">
                Payout
              </p>
            </div>
            <div className="flex gap-[20px] justify-between items-center">
              <input
                className="h-[20px] w-full outline-none border-none bg-transparent text-[22px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[22px] cursor-default"
                type="text"
                value={
                  prop?.calculatorResult?.btcValue &&
                  prop?.calculatorResult?.btcValue > 0
                    ? prop?.calculatorResult?.btcValue
                    : ""
                }
                readOnly
                placeholder="00.00"
              />
              <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[700] bg-white">
                BTC
              </p>
            </div>
          </div>
        </div>

        <div className=" flex justify-center  ">
          {prop.exchangeError ? (
            <p className="text-[12px] text-red-500">{prop?.exchangeError}</p>
          ) : (
            <p className="text-tradeFadeWhite text-[12px]">
              Real-time rate applied.
            </p>
          )}
        </div>

        <div className=" flex flex-col gap-[10px]">
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-tradeFadeWhite">
              Exchange Rate
            </p>

            <div className="flex items-center gap-[6px] ">
              <p className="text-sm font-semibold text-white">{`1 ${prop?.offerDetails?.currency}`}</p>
              <FaArrowRightArrowLeft className="text-tradeOrange text-[12px] " />
              <p className="text-sm font-semibold text-white"> NGN 750.00</p>
            </div>
          </div>

          <div className="flex justify-between  ">
            <p className="text-sm font-semibold text-tradeFadeWhite">
              Payout ({prop?.offerDetails?.currency})
            </p>

            <p className="text-[14px] font-[600] text-white">
              {prop?.offerDetails.currency}{" "}
              {isNaN(prop?.calculatorResult?.currencyValue) ||
              prop?.calculatorResult?.prop?.currencyValue === null ||
              prop?.calculatorResult?.currencyValue === undefined
                ? "00.00"
                : prop?.calculatorResult.currencyValue}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-semibold text-tradeFadeWhite">
              Payout (NGN)
            </p>
            <p className="text-sm font-semibold text-white">NGN 19,435.00</p>
          </div>
        </div>

        <div className="">
          <button
            className={`${
              prop?.handleShowGreenButton()
                ? "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen cursor-pointe"
                : "bg-tradeAsh text-tradeGreen cursor-default"
            } w-full p-[12px] rounded-[10px] flex justify-center items-center transition-all duration-300`}
          >
            <p className="text-[14px] font-[700] ">Initiate Trade</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
