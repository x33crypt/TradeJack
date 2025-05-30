import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa6";
import { BsChatText } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineQueryStats } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";
import { LuCircleHelp } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { RiDashboard2Line } from "react-icons/ri";

const DashSideNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className=" hidden lg:flex mt-[80px] ">
      <div className="flex p-[15px] sticky top-[80px] max-h-max border border-r-0 border-tradeAshLight w-[260px]  gap-[10px] flex-col">
        <div className="flex flex-col gap-[10px]">
          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => navigateTo("/dashboard")}
          >
            <RiDashboardHorizontalLine className="text-[17px]" />
            <p className="text-[13.5px] font-[500]"> Dashboard</p>
          </div>

          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <TbLayoutList className="text-[17px]" />
            <p className="text-[13.5px] font-[500]">My Offers</p>
          </div>
          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer"
            // onClick={() => navigateTo("/messages")}
          >
            <HiOutlineEnvelope className="text-[17px]" />
            <p className="text-[13.5px] font-[500]"> Messages</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <MdOutlineQueryStats className="text-[17px]" />
            <p className="text-[13.5px] font-[500]">Trade Statistics</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <RiExchangeFundsLine className="text-[17px]" />
            <p className="text-[13.5px] font-[500]">Transaction History</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <LiaUserFriendsSolid className="text-[17px]" />
            <p className="text-[13.5px] font-[500]">Invite a friend</p>
          </div>
        </div>
        <div className="flex flex-col pt-[10px] gap-[10px] border-t border-tradeAshLight">
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <LuCircleHelp className="text-[17px]" />
            <p className="text-[13.5px] font-[500]"> Help</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeGreen text-tradeFadeWhite hover:text-black transition-all duration-300 cursor-pointer">
            <IoSettingsOutline className="text-[17px]" />
            <p className="text-[13.5px] font-[500]">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashSideNav;
