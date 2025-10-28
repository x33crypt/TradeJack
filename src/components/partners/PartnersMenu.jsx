import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import { IoGrid } from "react-icons/io5";

const PartnersMenu = () => {
  const navigateTo = useNavigate();

  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px]">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              RECENT
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              OLDER
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              GRID
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              ROW
            </p>
          </div>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
};

export default PartnersMenu;
