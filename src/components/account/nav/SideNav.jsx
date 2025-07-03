import React from "react";
import { useNavigate } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiTimerFlashLine } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import image from "../../../assets/landingImg4.JPG";
import { GiTopHat } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoArrowRedoOutline } from "react-icons/io5";
import { RiGroup2Line } from "react-icons/ri";

const SideNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className="hidden lg:flex p-[15px] gap-[10px] sticky top-[64px] max-h-max border border-t-0 border-tradeAshLight w-[280px] flex-col">
      <div
        className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black  transition-all duration-300 cursor-pointer"
        onClick={() => navigateTo("/settings/account")}
      >
        <FaUserCircle className="text-[17px]" />
        <p className="text-[13px] font-[500]">Account</p>
      </div>
      <div
        className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
        onClick={() => navigateTo("/wallet")}
      >
        <IoWalletOutline className="text-[17px]" />
        <p className="text-[13px] font-[500]">Manage wallet</p>
      </div>
      <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
        <RiTimerFlashLine className="text-[17px]" />
        <p className="text-[13px] font-[500]">Promotions</p>
      </div>
      <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
        <IoNotificationsOutline className="text-[17px]" />
        <p className="text-[13px] font-[500]">Notifications</p>
      </div>
      <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
        <MdOutlinePrivacyTip className="text-[17px]" />
        <p className="text-[13px] font-[500]">Privacy & safety </p>
      </div>
      <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
        <MdOutlineSecurity className="text-[17px]" />
        <p className="text-[13px] font-[500]">Security & access </p>
      </div>
      <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
        <BiSupport className="text-[17px]" />
        <p className="text-[13px] font-[500]">Help & support</p>
      </div>
      <div className="flex flex-col pt-[10px] gap-[10px] border-t border-tradeAshLight">
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <IoArrowRedoOutline className="text-[17px]" />
          <p className="text-[13px] font-[500]">Invite a friend</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiGroup2Line className="text-[17px]" />
          <p className="text-[13px] font-[500]">Community</p>
        </div>

        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <FaInfoCircle className="text-[17px]" />
          <p className="text-[13px] font-[500]">About</p>
        </div>
      </div>

      {/* <div
          onClick={() => navigateTo("/logout")}
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-red-600 hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
        >
          <IoLogOut className="text-[17px]" />
          <p className="text-[13px] font-[500]">Log out</p>
        </div> */}
    </div>
  );
};

export default SideNav;
