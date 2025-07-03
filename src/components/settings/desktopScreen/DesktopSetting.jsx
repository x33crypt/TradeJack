import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

const DesktopSetting = () => {
  return (
    <div className="hidden lg:flex flex-col flex-1 h-max  md:border-x md:border-b md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <div className="flex gap-[15px] items-center">
          <IoMdArrowRoundBack className="text-white  text-[20px]" />

          <p className="text-lg text-white font-[700]">Settings</p>
        </div>

        <FaMagnifyingGlass className="text-white  text-[20px]" />
      </div>
      <div className="flex flex-col py-10 gap-[10px] h-full items-center justify-center">
        <IoMdSettings className="text-tradeGreen text-[90px] leading-none" />
        <p className="text-xl font-bold text-white">Manage Your Account</p>
        <p className="text-[13px] font-medium text-tradeFadeWhite max-w-[500px] text-center">
          Access all your settings in one place. Manage your profile and wallet,
          update your preferences, and fine-tune how the platform works for you.
        </p>
      </div>
    </div>
  );
};

export default DesktopSetting;
