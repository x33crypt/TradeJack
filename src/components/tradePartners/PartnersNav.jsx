import React from "react";
import { FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiLoader4Fill } from "react-icons/ri";
import { FaSort } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import SmallButton from "../buttons/SmallButton";

const PartnersNav = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex flex-1 md:sticky top-[64px] md:max-h-max  md:border border-t-0 border-tradeAshLight flex-col">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Trade Partners</p>
      </div>
      <div className="relative flex flex-col md:h-[460px] h-full">
        {/* Filter & Search */}
        <div className="sticky h-[55px] flex items-center w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between gap-[5px] overflow-x-hidden p-[2px]">
            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <FaSort />
                <p>All</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px]">
              <SmallButton variant="fadeout">
                <FaMagnifyingGlass />
              </SmallButton>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="flex-1 flex flex-col py-[12px] px-[15px] gap-[10px] md:overflow-y-auto custom-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              onClick={() => navigateTo(`/partners/${"Sane"}`)} // Replace "Sane" with dynamic username
              className="flex gap-[10px] items-center h-max w-full p-[12px] rounded-[15px] border border-tradeAshExtraLight bg-tradeAsh hover:bg-tradeAshLight transition-all duration-300 cursor-pointer"
            >
              <div className="flex text-white border border-tradeAshExtraLight text-[20px] p-2 w-max h-max rounded-[10px]">
                <FaUser className="text-tradeFadeWhite md:text-[20px] text-[25px]" />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="w-full flex justify-between items-center">
                  <p className="text-white font-semibold text-sm">@Sane</p>
                  <div className="flex gap-1 items-center">
                    <FaCircle className="flex text-tradeGreen text-[8px] flex-shrink-0" />
                    <p className=" text-xs font-medium text-white">
                      Online
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <p className="text-tradeFadeWhite font-semibold text-xs">
                    25 Trades
                  </p>
                  <p className="text-tradeFadeWhite font-semibold text-xs">
                    13/2/2023
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Filter */}
        <div className="h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
          <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
            <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
              <SmallButton variant="outline">
                <p>0</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>of</p>
              </SmallButton>
              <SmallButton variant="outline">
                <p>0</p>
              </SmallButton>
            </div>

            <div className="flex gap-[5px] py-[1px]">
              <SmallButton variant="outline">
                {true ? (
                  <div>
                    {false ? (
                      <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                    ) : (
                      <p>Load more</p>
                    )}
                  </div>
                ) : (
                  <div>{(isEmpty || isEnd) && <p>{message}</p>}</div>
                )}
              </SmallButton>

              <div className="md:hidden">
                <SmallButton
                  variant="outline"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <p>Scroll to Top</p>
                </SmallButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersNav;
