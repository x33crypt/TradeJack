import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import SettingMenu from "@/components/settings/SettingMenu";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/userContext/DashboardContext";
import { IoMdArrowDropright } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Settings = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <InAppNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <SettingMenu />
          {/* Desktop */}
          <div className="lg:flex hidden flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                SETTINGS
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-[10px]">
              <IoMdSettings className="md:text-[22px] text-tradeFadeWhite" />
              <div className="flex flex-col gap-[5px] items-center justify-center ">
                <p className="text-[13px] font-semibold text-white leading-none">
                  NOTHING HERE YET
                </p>
                <p className="text-xs font-medium text-tradeFadeWhite text-center">
                  SELECT FROM MENU TO GET STARTED
                </p>
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="lg:hidden flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                SETTINGS
              </p>
            </div>
            <div className="flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-[15px]">
                <div
                  onClick={() => navigateTo("/profile")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    PROFILE
                  </p>
                </div>

                <div
                  onClick={() => navigateTo("/settings/accounts")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    ACCOUNTS
                  </p>
                </div>

                <div
                  onClick={() => navigateTo("/settings/password")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    CHANGE PASSWORD
                  </p>
                </div>

                <div
                  onClick={() => navigateTo("/settings/2FA")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    2FA AUTHENTICATION
                  </p>
                </div>
                <div
                  onClick={() => navigateTo("/settings/pin")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    CHANGE PIN
                  </p>
                </div>
                <div
                  onClick={() => navigateTo("/settings/notification")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    NOTIFICATION
                  </p>
                </div>
                <div
                  onClick={() => navigateTo("/settings/sessions")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    SECURITY & ACCESS
                  </p>
                </div>
                <div
                  onClick={() => navigateTo("/settings/faq")}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    FAQ
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    TERM OF USE
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    RATE US
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    COMMUNITY
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col gap-[15px] mt-5">
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaXTwitter className="text-[16px]" />
                  </div>
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaTelegramPlane className="text-[16px]" />
                  </div>
                  <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FaInstagram className="text-[16px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
