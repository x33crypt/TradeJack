import React from "react";

const Performance = () => {
  return (
    <div className="flex-1 h-full md:border border-tradeAshLight flex flex-col">
      <div className="flex  p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Performance</p>
      </div>

      <div className="flex h-[500px] md:h-full p-[15px] flex-col gap-[20px]">
        <div className=" flex flex-col gap-[20px] h-full">
          <div className="flex-1 flex flex-col gap-[10px] py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight rounded-[10px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
            <div className="flex w-full justify-between">
              <p className="text-xs text-tradeFadeWhite font-bold">
                Average Weekly Purchase
              </p>
              <p className="text-xs text-tradeOrange font-bold">0,52%</p>
            </div>
            <div className="flex">
              <p className="md:md:text-3xl text-2xl text-white font-[800] leading-none">
                25,568 NGN
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[10px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight rounded-[10px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
            <div className="flex w-full justify-between">
              <p className="text-xs text-tradeFadeWhite font-bold">
                Average Monthly Purchase
              </p>
              <p className="text-xs text-tradeGreen font-bold">0,52%</p>
            </div>
            <div className="flex">
              <p className="md:text-3xl text-2xl text-white font-[800] leading-none">
                25,568 NGN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
