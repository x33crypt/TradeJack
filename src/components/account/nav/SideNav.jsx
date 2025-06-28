import React from "react";
import { useNavigate } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiTimerFlashLine } from "react-icons/ri";
import { RiGift2Fill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import image from "../../../assets/landingImg4.JPG";
import { GiTopHat } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const SideNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className="hidden  lg:flex p-[15px] sticky top-[64px] max-h-max border border-t-0 border-tradeAshLight w-[260px] gap-[25px] flex-col">
      <div className="flex flex-col gap-[10px]">
        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black  transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/account/profile")}
        >
          <FaUserCircle className="text-[17px]" />
          <p className="text-[13px] font-[500]">Profile</p>
        </div>

        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/wallet")}
        >
          <IoWalletOutline className="text-[17px]" />
          <p className="text-[13px] font-[500]">Manage Wallet</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiTimerFlashLine className="text-[17px]" />
          <p className="text-[13px] font-[500]">Promotion</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiGift2Fill className="text-[17px]" />
          <p className="text-[13px] font-[500]">Rewards</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <MdPrivacyTip className="text-[17px]" />
          <p className="text-[13px] font-[500]">Security & Privacy</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <IoNotificationsOutline className="text-[17px]" />
          <p className="text-[13px] font-[500]">Notification</p>
        </div>
      </div>

      <div className="flex flex-col pt-[10px] gap-[10px] border-t border-tradeAshLight">
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <BiSupport className="text-[17px]" />
          <p className="text-[13px] font-[500]">Help & Support</p>
        </div>
        <div
          onClick={() => navigateTo("/logout")}
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-red-600 hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
        >
          <IoLogOut className="text-[17px]" />
          <p className="text-[13px] font-[500]">Log Out</p>
        </div>
      </div>

      <div className="flex items-center gap-[10px] p-[8px] bg-tradeAsh borde border-tradeAshLight rounded-[10px]">
        <div>
          <img src={image} className="w-[50px] rounded-full" alt="" />
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-white text-sm font-semibold leading-none">
            <span className="text-tradeFadeWhite">@</span>saneghsxtasfk
          </p>
          <div className="flex gap-1 items-center text-tradeOrange">
            <p className=" text-xs font-medium">Master Trader</p>
            <GiTopHat className="text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
