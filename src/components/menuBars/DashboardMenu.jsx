import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoWalletOutline } from "react-icons/io5";
import { TbDashboardFilled } from "react-icons/tb";
import { TbFileLike } from "react-icons/tb";
import { BsChatQuote } from "react-icons/bs";
import { TbLayoutListFilled } from "react-icons/tb";
import { TbFileInvoice } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { RiGift2Fill } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";

const DasHboardMenu = () => {
  const navigateTo = useNavigate();
  return (
    <div className="hidden lg:flex px-[15px] py-[12px] sticky top-[64px] max-h-max border border-t-0 border-tradeAshLight w-[280px] gap-[10px] flex-col">
      <div className="flex flex-col gap-[10px]">
        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black  transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/dashboard")}
        >
          <TbDashboardFilled className="text-[17px]" />
          <p className="text-[13px] font-[500]"> Dashboard</p>
        </div>

        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/wallet")}
        >
          <IoWalletOutline className="text-[17px]" />
          <p className="text-[13px] font-[500]">Wallet</p>
        </div>

        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/offers/myoffers")}
        >
          <TbFileInvoice className="text-[17px]" />
          <p className="text-[13px] font-[500]">My offers</p>
        </div>
        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/offers/mine")}
        >
          <TbFileLike className="text-[17px]" />
          <p className="text-[13px] font-[500]">Favourite offers</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <BsChatQuote className="text-[17px]" />
          <p className="text-[13px] font-[500]"> Messages</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiExchange2Fill className="text-[17px]" />
          <p className="text-[13px] font-[500]">Trade history</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiExchangeBoxLine className="text-[17px]" />
          <p className="text-[13px] font-[500]">Transaction history</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiGift2Fill className="text-[17px]" />
          <p className="text-[13px] font-[500]">Rewards</p>
        </div>
      </div>
      <div className="flex flex-col pt-[10px] gap-[10px] border-t border-tradeAshLight">
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <LiaUserFriendsSolid className="text-[17px]" />
          <p className="text-[13px] font-[500]">Invite a friend</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <BiSupport className="text-[17px]" />
          <p className="text-[13px] font-[500]"> Help & support</p>
        </div>
      </div>
    </div>
  );
};

export default DasHboardMenu;
