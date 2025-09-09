import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import SmallButton from "../buttons/SmallButton";
import { FaSort } from "react-icons/fa";

const Performance = () => {
  return (
    <div className="flex-1 md:border border-tradeAshLight flex flex-col">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Trade Result</p>

        <SmallButton variant="fadeout">
          <FaSort />
          <p>This week</p>
        </SmallButton>
      </div>

      <div className="flex p-[15px] flex-col gap-[10px] min-h-[300px] h-full">
        <div className="flex-1 flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh ">
          {/* <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Trade report
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
                This week
              </p>
              <p className="text-white text-[13px]  font-semibold">
                #300,987.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Last week
              </p>
              <p className="text-white text-[13px] font-semibold">
                #300,987.00
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Performance;
