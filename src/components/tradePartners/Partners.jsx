import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Partners = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex flex-1 md:sticky top-[64px] max-h-max md:border border-t-0 border-tradeAshLight w-full flex-col">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Trade Partners</p>
      </div>
      <div className=" flex flex-col lg:h-[460px]">
        {/* Filter & Search */}
        <div className="sticky h-max w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] overflow-x-hidden p-[1.5px] ">
            <div
              className={`${
                false
                  ? "text-white bg-tradeAsh border-tradeGreen"
                  : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
              } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
            >
              <FaMagnifyingGlass />
              <p className="text-[13px]">Search</p>
            </div>
            <div
              className={`${
                false
                  ? "text-white bg-tradeAsh border-tradeGreen"
                  : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
              } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
            >
              <RiFilter3Line />
              <p className="text-[13px]">Recent</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="flex flex-col py-[12px] px-[15px] gap-[10px]">
          <div
            onClick={() => navigateTo("/trade/partners/:username")}
            className="flex gap-[10px] items-center h-max w-full p-[12px] rounded-[15px] border border-tradeAshExtraLight bg-tradeAsh"
          >
            <div className="flex text-white border border-tradeAshExtraLight text-[20px] p-2 w-max h-max rounded-[10px]">
              <FaUser className="text-tradeAshLight md:text-[15px] text-[20px]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-white font-semibold text-sm">@Sane</p>
              <p className="text-tradeFadeWhite font-semibold text-xs">
                25 Trades
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <FaCircle className="flex text-tradeGreen text-[8px] flex-shrink-0" />
              <p className="md:hidden text-xs font-medium text-white">Online</p>
            </div>
          </div>

          <div className="flex gap-[10px] items-center h-max w-full p-[12px] rounded-[15px] border border-tradeAshExtraLight bg-tradeAsh">
            <div className="flex text-white border border-tradeAshExtraLight text-[20px] p-2 w-max h-max rounded-[10px]">
              <FaUser className="text-tradeAshLight md:text-[15px] text-[20px]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-white font-semibold text-sm">@Sane</p>
              <p className="text-tradeFadeWhite font-semibold text-xs">
                25 Trades
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
