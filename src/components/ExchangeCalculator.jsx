import React from "react";
import { AiOutlineCalculator } from "react-icons/ai";

const ExchangeCalculator = (prop) => {
  return (
    <div className="lg:w-[400px] flex flex-col justify-between  md:border border-b border-tradeAshLight md:rounded-[12px]">
      <div className="flex items-center gap-[10px] p-[15px] border-b border-tradeAshLight">
        <p className="text-[18px] text-white font-[700] cursor-pointer">
          Exchange Calculator
        </p>
      </div>

      <div className="flex h-full justify-between flex-col p-[15px] gap-[20px] ">
        <div className="flex flex-col gap-[10px]">
          <div className="flex border border-tradeAshLight flex-col gap-[15px] bg-tradeAsh p-[15px] rounded-[16px]">
            <div className="flex justify-between items-center">
              <p className="text-tradeFadeWhite text-[14px]">Send</p>
            </div>
            <div className="bg-tradePurpl flex gap-[20px] justify-between items-center">
              <input
                className="h-[20px] w-full outline-none border-none bg-transparent  text-[22px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[22px] caret-tradeGreen"
                type="text"
                placeholder="Enter Amount"
                value={
                  prop?.tradeValue
                    ? parseInt(prop?.tradeValue).toLocaleString()
                    : ""
                }
                onChange={prop?.handleTradeValueChange}
              />
              <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                {prop?.offerDetails?.currency}
              </p>
            </div>
          </div>

          <div className="flex border border-tradeAshLight flex-col gap-[15px] bg-tradeAsh p-[15.5px] rounded-[16px]">
            <div className="flex">
              <p className="text-tradeFadeWhite text-[14px]">Receive</p>
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
              <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                BTC
              </p>
            </div>
          </div>
        </div>

        <div className=" flex justify-center ">
          <p className="text-tradeFadeWhite text-[13.5px]">
            Enter an amount to trade and see your return.
          </p>
        </div>

        <div className=" flex flex-col gap-[10px]">
          <div className="flex justify-between">
            <p className="text-[14px] font-[600] text-tradeGreen">
              Rate breakdown
            </p>
            <p className="text-[14px] font-[600] text-white">
              {`
1 ${prop?.offerDetails?.currency ? prop?.offerDetails.currency : "USD"} =  
${
  isNaN(prop?.calculatorResult?.perUsd) ||
  prop?.calculatorResult?.perUsd === null ||
  prop?.calculatorResult?.perUsd === undefined
    ? "00.00"
    : prop?.calculatorResult.perUsd
}
`}{" "}
              {prop?.offerDetails.currency} of BTC
            </p>
          </div>

          <div className="flex justify-between  ">
            <p className="text-[14px] font-[600] text-tradeFadeWhite">
              BTC worth in {prop?.offerDetails.currency}
            </p>

            <p className="text-[14px] font-[600] text-white">
              {isNaN(prop?.calculatorResult?.currencyValue) ||
              prop?.calculatorResult?.prop?.currencyValue === null ||
              prop?.calculatorResult?.currencyValue === undefined
                ? "00.00"
                : prop?.calculatorResult.currencyValue}{" "}
              {prop?.offerDetails.currency}
            </p>
          </div>

          <div className="flex justify-between  ">
            <p className="text-[14px] font-[600] text-tradeFadeWhite">
              BTC worth in USD
            </p>
            <p className="text-[14px] font-[600] text-white">
              {isNaN(prop?.calculatorResult?.usdValue) ||
              prop?.calculatorResult?.usdValue === null ||
              prop?.calculatorResult?.usdValue === undefined
                ? "00.00"
                : prop?.calculatorResult.usdValue}{" "}
              USD
            </p>
          </div>
        </div>

        <div className="flex  items-center justify-center ">
          <p className="text-[15px] text-center  text-black bg-tradeGreen hover:bg-white font-[700]  border border-tradeGreen hover:border-tradeAshExtraLight p-[10px] rounded-[10px]  w-[100%] transition-all duration-300 cursor-pointer">
            Initiate Trade
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
