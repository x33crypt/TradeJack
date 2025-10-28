import React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/userContext/DashboardContext";
import { IoMdArrowDropright } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const SettingMenu = () => {
  const { dashboard } = useDashboard();
  const navigateTo = useNavigate();
  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px] ">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        {/* <div className="flex px-2.5 py-1.5 gap-2 items-center bg-tradeAsh flex-1 rounded-sm ">
          <div className="text-lg text-tradeFadeWhite">
            <HiOutlineMagnifyingGlass />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-[150px] h-full text-[13px] font-medium outline-none text-white placeholder:text-tradeFadeWhite"
            />
          </div>
          <div className="text-lg text-tradeFadeWhite">
            <IoCloseSharp />
          </div>
        </div> */}
        <div className="flex flex-col gap-[15px]">
          <div
            onClick={() => navigateTo("/profile")}
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              PROFILE
            </p>
          </div>
          <div
            onClick={() => navigateTo("/settings/accounts")}
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              ACCOUNTS
            </p>
          </div>
          <div
            onClick={() => navigateTo("/settings/password")}
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              CHANGE PASSWORD
            </p>
          </div>
          <div
            onClick={() => navigateTo("/settings/2FA")}
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              2FA AUTHENTICATION
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              CHANGE PIN
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              PRIVACY & PERMISSION
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              NOTIFICATION
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              FAQ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              TERM OF USE
            </p>
          </div>

          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              RATE US
            </p>
          </div>

          <div className="flex lg:flex-row flex-col gap-2 mt-5">
            <div className=" text-white text-base p-1 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaXTwitter />
            </div>
            <div className=" text-white text-base p-1 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaTelegramPlane />
            </div>
            <div className=" text-white text-base p-1 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingMenu;
