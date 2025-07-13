import React, { useState, useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaVenusDouble } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { RiExchangeFill } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbDashboardFilled } from "react-icons/tb";
import { RiExchangeBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TbFileLike } from "react-icons/tb";
import { BsChatQuote } from "react-icons/bs";
import { TbLayoutListFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import Button from "./buttons/Button";
import { GiTopHat } from "react-icons/gi";
import { RiGift2Fill } from "react-icons/ri";

const InAppNav = () => {
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

  const placeholders = ["Search vendor's", "Search offer's"];
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
      {/* Desktop Nav */}
      <div className="z-30 fixed right-0 left-0 bg-black  lg:p-[2%] md:p-[2.5%] px-[15px] h-[57px] md:h-[65px] flex justify-between items-center border-b border-neutral-800 ">
        <div className="flex items-center lg:gap-[30px] gap-[15px]">
          <div
            onClick={() => setIsNavOption((prev) => !prev)}
            className="flex md:hidden items-center gap-1 bg-tradeAs text-white px-[5px] py-1 border border-tradeAshExtraLight rounded-[4px] w-max"
          >
            {isNavOption ? (
              <IoCloseSharp className="text-white text-lg" />
            ) : (
              <HiOutlineMenuAlt2 className="text-white text-lg" />
            )}
          </div>
          <div
            onClick={() => navigateTo("/dashboard")}
            className="flex items-center gap-[5px] cursor-pointer "
          >
            <RiExchangeFill className=" flex lg:text-2xl text-[20px] text-tradeGreen" />
            <p className=" lg:text-xl md:text-[19px] text-[20px]  font-semibold text-tradeGreen">
              Trade
              <span className="font-semibold text-white">Jack</span>
            </p>
          </div>
        </div>

        <div className=" md:flex hidden  gap-[8px] items-center">
          <div
            onClick={() => navigateTo("/offers/marketplace")}
            className="flex items-center gap-[8px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <RiExchange2Fill className="lg:flex hidden text-[16px]" />
            <p className="text-[13px] font-[700]">Sell Assets</p>
          </div>
          <div
            onClick={() => navigateTo("/offers/create")}
            className="flex items-center gap-[8px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <RiExchangeBoxFill className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Buy Assets</p>
          </div>
          <div className="flex items-center gap-[8px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300">
            <FaUserFriends className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Trade Partners</p>
          </div>
          <div
            onClick={() => navigateTo("/dashboard")}
            className="flex items-center gap-[8px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <TbDashboardFilled className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center lg:gap-[15px] gap-[15px]">
          <div className="lg:flex hidden items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[1px] gap-[8px] rounded-[8px]">
            <FaMagnifyingGlass className="text-neutral-500  text-[15px]" />
            <input
              className=" bg-transparent outline-none h-[28px] w-[220px]  placeholder:text-tradeFadeWhite text-[13px] font-medium text-white"
              type="text"
              placeholder={searchplaceholder}
            />
          </div>
          <div className="cursor-pointer md:flex lg:hidden hidden">
            <FiSearch className="text-white hover:text-tradeGreen text-[22px] transition-all duration-300" />
          </div>
          <div className="cursor-pointer flex">
            <FaRegBell className="text-white hover:text-tradeGreen text-[22px] transition-all duration-300" />
          </div>
          <div
            className="cursor-pointer lg:w-[32px] sm:w-[30px] w-[32px]"
            onClick={() => navigateTo("/account/profile")}
          >
            <img className=" rounded-full" src={landingImg4} alt="" />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`${
          isNavOption ? "flex" : "hidden"
        } z-50 fixed right-0 left-0 top-[60px] bottom-0 bg-black p-[15px] pt-[13px] pb-[16px] lg:hidden flex flex-col justify-between`}
      >
        <div className="flex gap-[8px] p-[12px] rounded-[10px] text-sm font-semibold items-center bg-tradeAsh border border-tradeAshExtraLight">
          <FaMagnifyingGlass className="text-tradeFadeWhite text-[18px]" />

          <p className=" text-tradeFadeWhite text-[13px] font-semibold">
            Hello, <span className="text-white">x33crypt.</span> How can we help
            ?
          </p>
        </div>
        <div className="flex flex-col gap-[5px]">
          <div
            onClick={() => {
              navigateTo("/dashboard");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] "
          >
            <TbDashboardFilled className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Dashboard</p>
          </div>
          <div
            onClick={() => {
              navigateTo("/wallet");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] "
          >
            <IoWalletOutline className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Wallet</p>
          </div>
          <div
            onClick={() => {
              navigateTo("/offers/myoffers");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] "
          >
            <TbFileInvoice className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">My offers</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <TbFileLike className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Favourite offers</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <FaUserFriends className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Trade partners</p>
          </div>
          <div
            className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] "
            onClick={() => {
              setIsNavOption(false);
            }}
          >
            <BsChatQuote className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] "> Messages</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <TbLayoutListFilled className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Trade history</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <RiGift2Fill className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Rewards</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <LiaUserFriendsSolid className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Invite a friend</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] ">
            <BiSupport className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] "> Help & support</p>
          </div>
          <div
            onClick={() => navigateTo("/settings")}
            className=" flex gap-[15px] items-center p-[8px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[10px] "
          >
            <IoMdSettings className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[13px] ">Settings</p>
          </div>
        </div>

        <div className="w-full h-max flex flex-col gap-[8px]">
          <Button
            variant="primary"
            onClick={() => {
              navigateTo("/offers/marketplace");
              setIsNavOption(false);
            }}
          >
            Sell Asset
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              navigateTo("/offers/create");
              setIsNavOption(false);
            }}
          >
            Buy Asset
          </Button>
        </div>
      </div>

      {/* <div
        ref={navOptionRef}
        className={` ${
          isProfileOption ? "flex" : "hidden"
        } z-30 fixed lg:right-[25px] md:right-[19px] right-[15px] md:top-[65px] top-[62px]  flex-col w-[160px] p-[3px] bg-tradeAshLight rounded-[1px]`}
        onClick={() => setIsProfileOption((prev) => !prev)}
      >
        <p
          className="text-white text-[12px] font-[700] py-[8px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer"
          onClick={() => navigateTo("/account/profile")}
        >
          Profile
        </p>
        <p
          className="text-white text-[12px] font-[700] py-[8px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer border-t border-tradeAshExtraLight"
          onClick={() => navigateTo("/account/setting")}
        >
          Setting
        </p>
      </div> */}
    </>
  );
};

export default InAppNav;
