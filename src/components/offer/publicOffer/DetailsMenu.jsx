import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { MdReport } from "react-icons/md";

const DetailsMenu = () => {
  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px] ">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <GoBookmarkFill className="text-xs text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              BOOKMARK
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaShareAlt className="text-xs text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              SHARE
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <MdReport className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              REPORT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMenu;
