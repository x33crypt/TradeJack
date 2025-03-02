import React, { useState, useEffect, useRef } from "react";
import { GiCardExchange } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa6";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlineQueryStats } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import { TbHelpCircle } from "react-icons/tb";
import { RiExchangeLine } from "react-icons/ri";
import { TbBuildingBank } from "react-icons/tb";
import { FaVenusDouble } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const MarketTopNav = () => {
  const [isNavOption, setIsNavOption] = useState(false);
  const [isProfileOption, setIsProfileOption] = useState(false);

  const navOptionRef = useRef(null);

  useEffect(() => {
    const handleNavOptClickOutside = (event) => {
      if (
        navOptionRef.current &&
        !navOptionRef.current.contains(event.target)
      ) {
        setIsProfileOption(false);
      }
    };

    document.addEventListener("mousedown", handleNavOptClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleNavOptClickOutside);
    };
  }, []);

  const placeholders = [
    "Search transaction",
    "Search people",
    "Search payment",
  ];
  const [searchplaceholder, setSearchplaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchplaceholder((prev) => {
        const nextIndex =
          (placeholders.indexOf(prev) + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [placeholders]);

  const navigateTo = useNavigate();

  return (
    <>
      <div className="z-50 fixed right-0 left-0 bg-black md:p-[1.5%] p-[15px] h-[67px] md:h-[70px] flex justify-between items-center border-b border-neutral-800 ">
        <div className="flex items-center lg:gap-[30px] gap-[15px]">
          <div
            onClick={() => setIsNavOption((prev) => !prev)}
            className="lg:hidden flex"
          >
            {isNavOption ? (
              <i class="fa-regular fa-circle-xmark text-white text-[22px] mr-[4px]"></i>
            ) : (
              <HiOutlineMenuAlt2 className="text-white text-[24px]" />
            )}
          </div>
          <div className="flex items-center justify-start gap-[5px] ">
            <GiCardExchange className="lg:text-[20px] text-[20px] text-tradeGreen" />
            <p className=" lg:text-[20px] text-[20px] font-[700] text-tradeGreen">
              Trade
              <small className="lg:text-[20px] text-[20px] font-[700] text-white">
                Jack
              </small>
            </p>
          </div>
          <div className=" lg:flex hidden gap-[10px] items-center">
            <div
              onClick={() => navigateTo("/marketplace")}
              className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[4.5px] rounded-[8px] cursor-pointer transition-all duration-300"
            >
              <RiExchangeLine className="text-[17px]" />
              <p className="text-[14px]">Sell Assets</p>
            </div>
            <div
              onClick={() => navigateTo("/create-offer")}
              className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[4.5px] rounded-[8px] cursor-pointer transition-all duration-300"
            >
              <TbBuildingBank className="text-[17px]" />
              <p className="text-[14px]">Buy Assets</p>
            </div>
            <div
              onClick={() => navigateTo("/create-offer")}
              className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[4.5px] rounded-[8px] cursor-pointer transition-all duration-300"
            >
              <FaVenusDouble className="text-[17px]" />
              <p className="text-[14px]">Favourite Vendors</p>
            </div>
            <div
              onClick={() => navigateTo("/dashboard")}
              className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[4.5px] rounded-[8px] cursor-pointer transition-all duration-300"
            >
              <MdOutlineSpaceDashboard className="text-[17px]" />
              <p className="text-[14px]">Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center lg:gap-[15px] gap-[15px]">
          <div className="sm:flex hidden items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[2px] gap-[10px] rounded-[10px]">
            <FaMagnifyingGlass className="text-neutral-500 lg:text-[15px] text-[15px]" />
            <input
              className=" bg-transparent outline-none h-[28px] w-[220px] lg:placeholder:text-[13px] placeholder:text-[13px] placeholder:text-neutral-500 lg:text-[13px] text-[13px] text-white"
              type="text"
              placeholder={searchplaceholder}
            />
          </div>
          {/* <div className="cursor-pointer sm:hidden">
            <FiSearch className="text-white hover:text-tradeGreen text-[24px] transition-all duration-300" />
          </div> */}
          <div className="cursor-pointer">
            <FaRegBell className="text-white hover:text-tradeGreen sm:text-[24px] text-[22px] transition-all duration-300" />
          </div>
          <div
            className="cursor-pointer sm:p-[3px] p-[4px] border border-tradeAshLight hover:border-tradeAshExtraLight rounded-full transition-all duration-300"
            onClick={() => setIsProfileOption((prev) => !prev)}
          >
            <img
              className="lg:w-[34px] sm:w-[30px] w-[32px] rounded-full"
              src={landingImg4}
              alt=""
            />
          </div>

          <div
            ref={navOptionRef}
            className={` ${
              isProfileOption ? "flex" : "hidden"
            } fixed right-[25px] top-[70px] flex-col w-[170px] p-[3px] bg-tradeAshLight rounded-[1px]`}
            onClick={() => setIsProfileOption((prev) => !prev)}
          >
            <p
              className="text-white text-[12px] font-[700] py-[7px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer"
              onClick={() => navigateTo("/profile")}
            >
              Account
            </p>

            <p className="text-white text-[12px] font-[700] py-[7px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
              Support
            </p>
            <p className="text-white text-[12px] font-[700] py-[7px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
              Security
            </p>
            <p className="text-white text-[12px] font-[700] py-[7px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
              Settings
            </p>
            <div className="border-t border-tradeAshExtraLight"></div>
            <p className="text-white text-[12px] font-[700]  py-[7px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
              Log out
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          isNavOption ? "flex" : "hidden"
        } z-50 fixed right-0 left-0 top-[70px] bottom-0 bg-black sm:px-[2%] px-[3%] pt-[20px] pb-[20px] lg:hidden flex flex-col gap-[20px] `}
      >
        <div className="w-full h-max flex gap-[10px]">
          <p
            onClick={() => {
              navigateTo("/marketplace");
              setIsNavOption(false);
            }}
            className="flex-1 flex items-center justify-center text-black text-[16px] font-[600] bg-white py-[9px] rounded-[6px]"
          >
            Sell Asset
          </p>
          <p
            onClick={() => {
              navigateTo("/create-offer");
              setIsNavOption(false);
            }}
            className="flex-1 flex items-center justify-center text-black text-[16px] font-[600] bg-tradeGreen py-[9px] rounded-[6px]"
          >
            Buy Asset
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div
            onClick={() => {
              navigateTo("/dashboard");
              setIsNavOption(false);
            }}
            className=" flex gap-[10px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] "
          >
            <MdSpaceDashboard className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">Dashboard</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <TbLayoutList className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">My Offers</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <BsLightningCharge className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">Favourite Offers</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <FaRegEnvelope className="text-[16px] text-white" />
            <p className="text-white text-[16px] "> Messages</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <RiExchangeFundsLine className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">Trade History</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <MdOutlineQueryStats className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">Trade Statistics</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <LiaUserFriendsSolid className="text-[16px] text-white" />
            <p className="text-white text-[16px] ">Invite a friend</p>
          </div>
          <div className=" flex gap-[15px] items-center px-[10px] py-[11px] bg-tradeAsh hover:bg-tradeAshLight rounded-[6px] ">
            <TbHelpCircle className="text-[16px] text-white" />
            <p className="text-white text-[16px] "> Help Center</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketTopNav;
