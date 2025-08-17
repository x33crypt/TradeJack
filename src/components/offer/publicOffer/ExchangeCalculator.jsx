import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const ExchangeCalculator = (prop) => {
  return (
    <div className="w-full flex justify-between flex-col bg-tradeOrang md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Exchange Calculator</p>
      </div>
      <div className="flex h-full justify-between flex-col p-[15px]">
        <div className="flex flex-col  gap-[10px] w-full">
          <div className="flex-1 flex flex-col p-[15px] gap-[10px] bg-tradeAsh rounded-[15px]">
            <div className="flex  justify-between">
              <p className="text-white text-[13px] font-[500]">I will send</p>
              <div className="flex gap-2 items-center">
                <p className="text-[13px] font-bold text-black px-1.5 p bg-tradeOrange rounded-full">
                  CAD
                </p>

                <p className="text-[13px] font-semibold text-white">
                  Canadian Dollar
                </p>
              </div>
            </div>

            <div className=" flex py-[10px]  justify-between items-baseline border-b border-tradeAshLight">
              <input
                type="text"
                placeholder="00.00"
                value={
                  prop?.tradeValue
                    ? parseInt(prop?.tradeValue).toLocaleString()
                    : ""
                }
                onChange={prop?.handleTradeValueChange}
                className="bg-transparent text-white placeholder:text-white text-[30px] font-bold cursor-pointer outline-none w-full "
              />
            </div>

            <div className="flex justify-between">
              <p className="text-white text-xs font-semibold">
                Equivalent to :
              </p>

              <p className="text-white text-xs font-semibold">500.00 USD</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-[15px] gap-[10px] bg-tradeAsh rounded-[15px]">
            <div className="flex  justify-between">
              <p className="text-white text-[13px] font-[500]">
                I will receive
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[13px] font-bold text-black px-1.5 p bg-tradeOrange rounded-full">
                  USD
                </p>

                <p className="text-[13px] font-semibold text-white">
                  US Dollar
                </p>
              </div>
            </div>

            <div className=" flex py-[10px]  justify-between items-baseline border-b border-tradeAshLight">
              <input
                type="text"
                placeholder="00.00"
                value={
                  prop?.tradeValue
                    ? parseInt(prop?.tradeValue).toLocaleString()
                    : ""
                }
                onChange={prop?.handleTradeValueChange}
                className="bg-transparent text-white placeholder:text-white text-[30px] font-bold cursor-pointer outline-none w-full "
              />
            </div>

            <div className="flex justify-between">
              <p className="text-white text-xs font-semibold">
                Equivalent to :
              </p>

              <p className="text-white text-xs font-semibold">500.00 CAD</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col bg-tradeAs p-[15px] pt-0 gap-[10px]">
        <div className="flex w-full flex-col   ">
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Vendor's Margin
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              1.5% (50.00 USD)
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Service Charge
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              1.5% (50.00 USD)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
