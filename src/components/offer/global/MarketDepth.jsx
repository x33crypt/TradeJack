import React from "react";

const MarketDepth = () => {
  return (
    <div className="flex md:w-[350px] w-full lg:flex-row gap-[10px] flex-col bg-black  lg:pt-0 md:pt-[64px] pt-[60px]">
      <div className="relative bg-black w-full min-h-svh flex flex-col md:border-x md:border-b md:border-t-0 border-neutral-800">
        <div className="flex flex-col justify-between px-[15px] py-[12px]  border-b border-tradeAshLight w-full">
          <p className="text-lg text-white font-[700]">Market Depth</p>
        </div>

        <div className="flex flex-1 flex-col p-[15px] gap-[15px]">
          <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
            Real-time demand for every asset. Select an asset to view its order
            flow before you create an offer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketDepth;
