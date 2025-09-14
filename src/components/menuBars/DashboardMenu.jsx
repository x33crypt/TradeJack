import React from "react";
import { useNavigate } from "react-router-dom";
import { TbFileLike } from "react-icons/tb";
import { BsChatQuote } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { RiGift2Fill } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";
import { TiFlashOutline } from "react-icons/ti";
import { FiUserPlus } from "react-icons/fi";
import { RiExchangeFundsLine } from "react-icons/ri";
import { useDashboard } from "@/context/userContext/DashboardContext";

const DasHboardMenu = () => {
  const { dashboard } = useDashboard();
  const navigateTo = useNavigate();
  return (
    <div className="hidden lg:flex px-[15px] py-[12px] sticky top-[64px] h-max border border-t-0 border-tradeAshLight w-[300px] gap-[10px] flex-col">
      <div className="flex flex-col gap-[10px]">
        <div
          className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/offers/user")}
        >
          <TbFileInvoice className="text-[17px]" />
          <p className="text-[13px] font-[500]">My offers</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <TbFileLike className="text-[17px]" />
          <p className="text-[13px] font-[500]">Favourite offers</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <TiFlashOutline className="text-[17px]" />
          <p className="text-[13px] font-[500]">Promoted offers</p>
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
          <RiExchangeFundsLine className="text-[17px]" />
          <p className="text-[13px] font-[500]">Transaction history</p>
        </div>
      </div>
      <div className="flex flex-col pt-[10px] gap-[10px] border-t border-tradeAshLight">
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <FiUserPlus className="text-[17px]" />
          <p className="text-[13px] font-[500]">Referrals</p>
        </div>
        <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
          <RiGift2Fill className="text-[17px]" />
          <p className="text-[13px] font-[500]">Rewards</p>
        </div>
      </div>
      <div className="bg-tradeAsh p-[12px] rounded-[15px] h-[100px] border border-tradeAshLight"></div>
    </div>
  );
};

export default DasHboardMenu;
