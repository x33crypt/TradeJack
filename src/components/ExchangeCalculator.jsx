import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const ExchangeCalculator = (prop) => {
  return (
    <div className="w-full flex justify-between flex-col md:border border-tradeAshLight">
      <div className=" flex items-center gap-[10px] p-[15px] border-y  md:border-b md:border-t-0 border-tradeAshLight ">
        <p className=" text-[17px] text-white font-[700] cursor-pointer">
          Exchange Calculator
        </p>
      </div>
      <div className="flex md:justify-center items-center">
        <div className="w-full h-max flex flex-col justify-between ">
          <div className="flex h-full justify-between flex-col p-[15px] gap-[20px] ">
            <div className="flex flex-col sm:flex-row gap-[10px] w-full">
              <div className="flex-1 flex flex-col">
                <div className="flex gap-2">
                  <p className="text-tradeFadeWhite text-[13px] font-[500]">
                    I will send
                  </p>
                </div>

                <div
                  className={`  relative flex mt-[5px] text-[14px] placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full rounded-[10px] cursor-pointer`}
                >
                  <input
                    className="w-full p-[12px] outline-none bg-transparent text-tradeOrange text-[14px] font-[500] placeholder:text-tradeFadeWhite cursor-pointer"
                    placeholder="00.00"
                    type="text"
                    value={
                      prop?.tradeValue
                        ? parseInt(prop?.tradeValue).toLocaleString()
                        : ""
                    }
                    onChange={prop?.handleTradeValueChange}
                  />

                  <div className="flex items-center justify-center w-[70px] border-l border-tradeAshLight">
                    <p className="text-[14px] text-white font-[700]">USD</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex gap-2">
                  <p className="text-tradeFadeWhite text-[13px] font-[500]">
                    and receive
                  </p>
                </div>

                <div
                  className={`  relative flex mt-[5px] text-[14px] placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border border-tradeAshLight outline-none w-full rounded-[10px] cursor-pointer`}
                >
                  <input
                    className="w-full p-[12px] outline-none bg-transparent text-tradeOrange text-[14px] font-[500] placeholder:text-tradeFadeWhite cursor-pointer"
                    type="text"
                    readOnly
                    placeholder="00.00"
                    value={
                      prop?.calculatorResult?.btcValue &&
                      prop?.calculatorResult?.btcValue > 0
                        ? prop?.calculatorResult?.btcValue
                        : ""
                    }
                  />
                  <div className="flex items-center justify-center w-[70px] border-l border-tradeAshLight">
                    <p className="text-[14px] text-white font-[700]">USDT</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-center  ">
              {prop.exchangeError ? (
                <p className="text-[12px] text-red-500">
                  {prop?.exchangeError}
                </p>
              ) : (
                <p className="text-tradeFadeWhite text-[12px]">
                  Real-time rate applied.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 bg-tradeAshLight border border-tradeAshExtraLight p-[12px] rounded-[10px]">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-tradeFadeWhite">
                  Buyers's Profit margin
                </p>
                <p className="text-sm font-semibold text-white">3.00%</p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-medium text-tradeFadeWhite">
                  Rate breakdown
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">1 USD</p>
                  <FaArrowRightArrowLeft className="text-tradeOrange text-xs" />
                  <p className="text-sm font-bold text-white">0.23 USDT</p>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-medium text-tradeFadeWhite">
                  USDT worth in USD
                </p>
                <p className="text-sm font-semibold text-white">406 USD</p>
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
      </div>
    </div>
  );
};

export default ExchangeCalculator;
