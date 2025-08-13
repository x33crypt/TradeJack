import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiLoader4Fill } from "react-icons/ri";
import { FaSort } from "react-icons/fa";

const PartnersNav = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex flex-1 md:sticky top-[64px] max-h-max md:border border-t-0 border-tradeAshLight w-full flex-col">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Trade Partners</p>
      </div>
      <div className=" flex flex-col lg:h-[460px]">
        {/* Filter & Search */}
        <div className="sticky h-max w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between items-cente gap-[5px] overflow-x-hidden p-[1.5px] ">
            <div
              className={`${
                false
                  ? "text-white bg-tradeAsh border-tradeGreen"
                  : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
              } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
            >
              <FaMagnifyingGlass />
            </div>
            <div
              className={`${
                false
                  ? "text-white bg-tradeAsh border-tradeGreen"
                  : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
              } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
            >
              <FaSort />
              <p className="text-[13px]">Recents</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="flex-1 flex flex-col py-[12px] px-[15px] gap-[10px]">
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

        {/* Bottom Filter */}
        <div className="custom-x-scrollbar flex py-[12px] px-[15px] gap-[5px] justify-between w-full items-center overflow-x-auto border-t border-dashed border-tradeAshLight">
          <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">12</p>
            </div>

            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">of</p>
            </div>

            <div className="flex items-center gap-1 text-tradeFadeWhite  px-[12px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
              <p className="text-[13px] font-semibold">200</p>
            </div>
          </div>

          <div className="flex gap-[5px] py-[1px]">
            <div>
              {true ? (
                <div
                  // onClick={handleNext}
                  className="flex gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                    <p className="text-[13px] font-semibold">
                      {true ? (
                        <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                      ) : (
                        "Load more"
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                (isEmpty || isEnd) && (
                  <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                    <p className="text-[13px] font-semibold">{message}</p>
                  </div>
                )
              )}
            </div>

            <div
              // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex md:hidden gap-[5px] text-tradeFadeWhite hover:text-white cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-1 text-tradeFadeWhite  px-[8px] py-[4px] font-medium rounded-[6.5px] border border-tradeAshExtraLight w-max">
                <p className="text-[13px] font-semibold">Scroll to Top</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersNav;
