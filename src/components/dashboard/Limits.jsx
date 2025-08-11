import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Limits = ({ dashboard }) => {
  return (
    <div className="h-max md:border border-tradeAshLight flex flex-col">
      <div className="flex px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Limits</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Purchase limits
            </p>

            <div className="flex gap-1 ">
              <div className="flex gap-1">
                <div
                  // onClick={selectNGN}
                  className={`${
                    // balance?.currency === "NGN"
                    false
                      ? "bg-tradeOrange text-black"
                      : "bg-transparent text-tradeFadeWhite"
                  } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                >
                  <p className="text-xs font-semibold">NGN</p>
                </div>
                <div
                  // onClick={selectUSD}
                  className={`${
                    // balance?.currency === "USD"
                    false
                      ? "bg-tradeOrange text-black"
                      : "bg-transparent text-tradeFadeWhite"
                  } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
                >
                  <p className="text-xs font-semibold">USD</p>
                </div>
              </div>
              <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <FaQuestionCircle className="text-sm text-tradeOrange" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Minimum
              </p>
              <p className="text-white text-[13px]  font-semibold">
                #300,987.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Maximum
              </p>
              <p className="text-white text-[13px] font-semibold">
                #300,987.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limits;
