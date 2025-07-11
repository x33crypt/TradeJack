import React from "react";

const OfferStats = () => {
  return (
    <div className="flex flex-col lg:w-[400px] w-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Trading Stats</p>
      </div>

      <div className="flex-1 flex  flex-col bg-tradeAs p-[15px] gap-[10px]">
        <div className="flex-1 border border-tradeAshLight gap-[10px] flex flex-col justify-between p-[12px] bg-tradeAsh w-full rounded-[15px] ">
          <div className="flex justify-between ">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Profit Earned
            </p>
          </div>
          <div className="flex items-baseline justify-between ">
            <p className="text-white font-bold text-[25px]">3,000 USD</p>
            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeGreen text-[13px] font-medium">0.5%</p>
            </div>
          </div>
        </div>
        <div className="flex-1 border border-tradeAshLight gap-[10px] flex flex-col justify-between p-[12px] bg-tradeAsh w-full rounded-[15px] ">
          <div className="flex justify-between ">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Total Traded
            </p>
          </div>
          <div className="flex items-baseline justify-between ">
            <p className="text-white font-bold text-[25px]">3,000 USD</p>
            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeGreen text-xs font-medium">0.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferStats;
