import React from "react";
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
import { FaUserCheck } from "react-icons/fa";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdKeyboardArrowRight } from "react-icons/md";

const SettingsNav = () => {
  const navigateTo = useNavigate();
  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex  sticky top-[64px] max-h-max border border-t-0 border-tradeAshLight w-[280px] gap-[10px] flex-col">
        <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
          <p className="text-lg font-[700] text-white ">Settings</p>
        </div>
        <div className="flex flex-col gap-[10px] px-[15px]">
          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black  transition-all duration-300 cursor-pointer"
            onClick={() => navigateTo("/account")}
          >
            <TbDashboardFilled className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Account</p>
          </div>

          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
            onClick={() => navigateTo("/wallet")}
          >
            <IoWalletOutline className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Change Password</p>
          </div>

          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
            onClick={() => navigateTo("/offers/myoffers")}
          >
            <TbFileInvoice className="text-[17px]" />
            <p className="text-[13px] font-[500]">Two-Factor Authentication</p>
          </div>
          <div
            className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
            onClick={() => navigateTo("/offers/mine")}
          >
            <TbFileLike className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Transaction Pin</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
            <BsChatQuote className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Privacy & Permissions</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
            <RiExchange2Fill className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Linked Accounts</p>
          </div>
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
            <RiGift2Fill className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Notifications</p>
          </div>

          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
            <RiGift2Fill className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Account Management</p>
          </div>
        </div>
        <div className="flex flex-col px-[15px] py-[12px] gap-[10px] border-t border-tradeAshLight">
          <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
            <LiaUserFriendsSolid className="text-[17px]" />
            <p className="text-[13px] font-[500]"> Support & Help</p>
          </div>
        </div>
      </div>

      {/* Mobile Nave */}
      <div className="flex-1 flex lg:hidden flex-col gap-[10px]">
        <div className="flex-1 flex flex-col md:border border-neutral-800">
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">Settings</p>
          </div>
          <div className="flex flex-col p-[15px] border-neutral-800 gap-[10px]">
            <div className="flex w-full p-[12px] bg-tradeAsh border border-tradeAshLight items-center justify-between rounded-[15px]">
              <div className="flex items-center  gap-3 ">
                <div className=" w-[60px] rounded-[10px] overflow-hidden border border-tradeAshExtraLight cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <img src={landingImg4} alt="" className="rounded-[10px]" />
                </div>

                <div className="flex flex-col gap-2 bg">
                  <p className="text-base leading-none text-white font-semibold">
                    Account
                  </p>
                  <p className="text-xs font-semibold text-tradeFadeWhite leading-none">
                    adeleke@gmail.com
                  </p>
                </div>
              </div>

              <div className="text-white text-[22px]">
                <MdKeyboardArrowRight />
              </div>
            </div>

            <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
              {/* Username */}
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Change Password
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Two-Factor Authentication (2FA)
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Transaction Pin
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Privacy & Permissions
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
              {/* Username */}
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Notifications
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
              {/* Username */}
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Account Management
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Linked Accounts
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
              {/* Username */}
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Support & Help
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">FAQs</p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center justify-between gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                // onClick={() => navigateTo("/settings/account/name")}
              >
                <p className="text-[13px] font-semibold text-white">
                  Feedbacks
                </p>

                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsNav;
