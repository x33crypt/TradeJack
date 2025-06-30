import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const DesktopSetting = () => {
  return (
    <div className="hidden lg:flex flex-col flex-1 md:border-x md:border-b md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <div className="flex gap-[15px] items-center">
          <IoMdArrowRoundBack className="text-white  text-[20px]" />

          <p className="text-lg text-white font-[700]">Settings</p>
        </div>

        <FaMagnifyingGlass className="text-white  text-[20px]" />
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] bg-tradeAs"></div>
    </div>
  );
};

export default DesktopSetting;
