import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { TbArrowsExchange2 } from "react-icons/tb";

const OfferPerformance = () => {
  return (
    <div className="lg:w-[400px] w-full  md:border border-tradeAshLight flex flex-col">
      <div className="flex  p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Performance</p>
      </div>

      <div className="flex h-full p-[15px] flex-col gap-[20px]">
        <div className=" flex flex-col gap-[10px] h-full">
          <div className="flex-1 flex flex-col gap-[10px]  p-[15px]  bg-tradeAsh hover:bg-tradeAshLight rounded-[15px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
            <div className="flex w-full justify-between">
              <p className="text-xs text-tradeFadeWhite font-semibold">
                Average Visitors
              </p>
              <div className="flex gap-[5px] text-tradeGreen ">
                <FaUserFriends />
                <p className="text-xs font-bold">400</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[10px]  p-[15px]  bg-tradeAsh hover:bg-tradeAshLight rounded-[15px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
            <div className="flex w-full justify-between">
              <p className="text-xs text-tradeFadeWhite font-bold">
                Average Trade
              </p>
              <div className="flex gap-[5px] text-tradeOrange ">
                <TbArrowsExchange2 />
                <p className="text-xs font-bold">26</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPerformance;
