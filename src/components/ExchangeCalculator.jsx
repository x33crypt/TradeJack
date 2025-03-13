import React from "react";

const ExchangeCalculator = (prop) => {
  return (
    <div className="px-[15.5px] md:p-0">
      <div className=" h-full lg:w-[400px] flex flex-col bg-tradeAsh md:border border-tradeAsh rounded-[12.5px]">
        <div className="flex flex-col justify-between p-[20px] border-b border-tradeAshExtraLight">
          <p className="text-[18px] text-white font-[700] cursor-pointer">
            Offer Calculator
          </p>
        </div>

        <div className="flex flex-col h-full ">
          <div className="flex flex-col gap-[10px] p-[20px]">
            <div className="flex flex-col gap-[15px] bg-black p-[15.5px] rounded-[16px]">
              <div className="flex justify-between items-center">
                <p className="text-tradeFadeWhite text-[13px]">Send</p>
                <div className="flex items-center gap-[5px]">
                  <p className="text-tradeFadeWhite text-[13px] flex gap-[5px]">
                    Min
                    <small className="text-white text-[13px] font-[600]">
                      {`${parseInt(
                        prop?.offerDetails?.miniPurchase
                      ).toLocaleString()}`}
                    </small>
                  </p>
                  <p className="text-white">-</p>
                  <p className="text-tradeFadeWhite text-[13px] flex gap-[5px]">
                    Max
                    <small className="text-white text-[13px] font-[600]">
                      {`${parseInt(
                        prop?.offerDetails?.maxPurchase
                      ).toLocaleString()}`}
                    </small>
                  </p>
                </div>
              </div>
              <div className="flex gap-[20px] justify-between items-center">
                <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                  {prop?.offerDetails?.currency}
                </p>
                <input
                  className="h-[20px] w-full outline-none border-none bg-transparent text-right text-[22px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[22px] caret-tradeGreen"
                  type="text"
                  placeholder="Enter Amount"
                  value={
                    prop?.tradeValue
                      ? parseInt(prop?.tradeValue).toLocaleString()
                      : ""
                  }
                  onChange={prop?.handleTradeValueChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[15px] bg-black p-[15.5px] rounded-[16px]">
              <div className="flex">
                <p className="text-tradeFadeWhite text-[13px]">Receive</p>
              </div>
              <div className="flex gap-[20px] justify-between items-center">
                <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                  BTC
                </p>
                <input
                  className="h-[20px] w-full outline-none border-none bg-transparent text-right text-[22px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[22px] cursor-default"
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
              </div>
            </div>
          </div>

          <div className=" flex flex-col items-center ">
            {prop?.exchangeError ? (
              <div className="flex md:h-[10px] h-[25px] w-full justify-center items-center gap-[5px]">
                <p className="text-[12.5px] font-[600] text-red-600">
                  {prop?.exchangeError}
                </p>
              </div>
            ) : (
              <div className="flex h-[10px] items-center gap-[5px]"></div>
            )}
          </div>

          <div className=" flex lg:pb-[px] py-[15.5px] flex-col">
            <div className="flex justify-between px-[20px] py-[8px] border-t border-tradeAshExtraLight">
              <p className="text-[14px] font-[500] text-tradeGreen">
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

            <div className="flex justify-between px-[20px] py-[8px] border-t border-tradeAshExtraLight">
              <p className="text-[14px] font-[500] text-tradeFadeWhite">
                Your receive value in ({prop?.offerDetails.currency})
              </p>
              <p className="text-[14px] font-[600] text-white">
                <p className="text-[14px] font-[600] text-white">
                  {isNaN(prop?.calculatorResult?.currencyValue) ||
                  prop?.calculatorResult?.prop?.currencyValue === null ||
                  prop?.calculatorResult?.currencyValue === undefined
                    ? "00.00"
                    : prop?.calculatorResult.currencyValue}{" "}
                  {prop?.offerDetails.currency}
                </p>
              </p>
            </div>

            <div className="flex justify-between px-[20px] py-[8px] border-t border-tradeAshExtraLight">
              <p className="text-[14px] font-[500] text-tradeFadeWhite">
                Your receive value in (USD)
              </p>
              <p className="text-[14px] font-[600] text-white">
                <p className="text-[14px] font-[600] text-white">
                  {isNaN(prop?.calculatorResult?.usdValue) ||
                  prop?.calculatorResult?.usdValue === null ||
                  prop?.calculatorResult?.usdValue === undefined
                    ? "00.00"
                    : prop?.calculatorResult.usdValue}{" "}
                  USD
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
