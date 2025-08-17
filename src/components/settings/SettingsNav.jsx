import React from "react";
import { useNavigate } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";
import { Si2Fas } from "react-icons/si";
import { GrSecure } from "react-icons/gr";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const SettingsNav = () => {
  const navigateTo = useNavigate();
  return (
    <>
      {/* Desktop Nav */}
      <div className="lg:flex hidden flex-1 md:sticky top-[64px] md:max-h-max  md:border border-t-0 border-tradeAshLight flex-col">
        <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
          <p className="text-lg font-[700] text-white ">Settings</p>
        </div>

        <div className="relative gap-[10px] flex flex-col md:h-[450px] h-full md:overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-[10px] px-[15px] py-[12px]">
            <div
              className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black  transition-all duration-300 cursor-pointer"
              onClick={() => navigateTo("/account")}
            >
              <FaUser className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Account</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <PiPasswordBold className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Change Password</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <Si2Fas className="text-[17px]" />
              <p className="text-[13px] font-[500]">
                Two-Factor Authentication
              </p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <GrSecure className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Transaction Pin</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <MdOutlinePrivacyTip className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Privacy & Permissions</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <IoNotifications className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Notifications</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <MdManageAccounts className="text-[17px]" />
              <p className="text-[13px] font-[500]"> Account Management</p>
            </div>

            <div
              onClick={() => navigateTo("/wallet/accounts")}
              className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer"
            >
              <FaLink className="text-[17px]" />
              <p className="text-[13px] font-[500]">Linked Accounts</p>
            </div>
          </div>
          <div className="flex flex-col px-[15px] py-[12px] gap-[10px] border-t border-tradeAshLight">
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border-b hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <FaQuestionCircle className="text-[17px]" />
              <p className="text-[13px] font-[500]">FAQs</p>
            </div>
            <div className="p-[8px] flex items-center gap-[10px] rounded-[10px] hover:bg-tradeAsh text-tradeFadeWhite hover:text-white border hover:border-tradeAshLight border-black transition-all duration-300 cursor-pointer">
              <MdOutlineFeedback className="text-[17px]" />
              <p className="text-[13px] font-[500]">Feedbacks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex-1 flex lg:hidden flex-col gap-[10px]">
        <div className="flex-1 flex flex-col md:border border-neutral-800">
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">Settings</p>
          </div>
          <div className="flex flex-col p-[15px] border-neutral-800 gap-[10px]">
            <div
              onClick={() => navigateTo("/account")}
              className="flex w-full p-[12px] bg-tradeAsh border border-tradeAshLight items-center justify-between rounded-[15px]"
            >
              <div className="flex items-center  gap-3 ">
                <div className=" w-[45px] rounded-[10px] overflow-hidden border border-tradeAshExtraLight cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
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
                onClick={() => navigateTo("/wallet/accounts")}
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
