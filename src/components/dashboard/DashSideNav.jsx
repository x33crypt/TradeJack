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

const DashSideNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className=" lg:flex hidden flex-col justify-between p-[10px] w-[240px] bg-tradeAsh rounded-[10px]">
      <div className="flex flex-col gap-[10px]">
        <div
          className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px] hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/dashboard")}
        >
          <MdSpaceDashboard className="text-[15px]" />
          <p className="text-[14px] font-[400]"> Dashboard</p>
        </div>
        <div
          className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px] hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/marketplace")}
        >
          <RiExchange2Fill className="text-[15px]" />
          <p className="text-[14px] font-[400]">Marketplace</p>
        </div>
        <div
          className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px] hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/marketplace")}
        >
          <TbLayoutList className="text-[15px]" />
          <p className="text-[14px] font-[400]">My Offers</p>
        </div>
        <div className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px]  hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer">
          <RiExchangeFundsLine className="text-[15px]" />
          <p className="text-[14px] font-[400]">Trade History</p>
        </div>
        <div className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px]  hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer">
          <MdOutlineQueryStats className="text-[15px]" />
          <p className="text-[14px] font-[400]">Trade Statistics</p>
        </div>
        <div className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px]  hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer">
          <FaRegEnvelope className="text-[15px]" />
          <p className="text-[14px] font-[400]"> Messages</p>
        </div>
        <div className="px-[15px] py-[8px] flex items-center gap-[10px] rounded-[8px]  hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer">
          <LiaUserFriendsSolid className="text-[15px]" />
          <p className="text-[14px] font-[400]">Invite a friend</p>
        </div>
      </div>
    </div>
  );
};

export default DashSideNav;
