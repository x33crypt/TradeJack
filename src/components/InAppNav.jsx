import React, { useState, useEffect, useRef } from "react";
import { GiCardExchange } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa6";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlineQueryStats } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";
import { TbHelpCircle } from "react-icons/tb";
import { RiExchangeLine } from "react-icons/ri";
import { TbBuildingBank } from "react-icons/tb";
import { FaVenusDouble } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import useSafeNavigate from "./SafeNavigation";
import { IoWalletOutline } from "react-icons/io5";
import { RiExchangeFill } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbDashboardFilled } from "react-icons/tb";
import { RiExchangeBoxFill } from "react-icons/ri";

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

  const safeNavigate = useSafeNavigate();

  return (
    <>
      <div className="z-30 fixed right-0 left-0 bg-black  lg:p-[2%] md:p-[2.5%] p-[15px] h-[62px] md:h-[65px] flex justify-between items-center border-b border-neutral-800 ">
        <div className="flex items-center lg:gap-[30px] gap-[15px]">
          <div
            onClick={() => setIsNavOption((prev) => !prev)}
            className="md:hidden flex border border-tradeAshLight p-[3px] rounded-[6px]"
          >
            {isNavOption ? (
              <IoCloseSharp className="text-white text-[22px]" />
            ) : (
              <HiOutlineMenuAlt2 className="text-white text-[22px]" />
            )}
          </div>
          <div
            onClick={() => safeNavigate("/dashboard")}
            className="flex items-center gap-[5px] cursor-pointer "
          >
            <RiExchangeFill className=" flex lg:text-2xl text-xl text-tradeGreen" />
            <p className=" text-xl font-[700] text-tradeGreen">
              Trade
              <small className="lg:text-xl md:text-[19px] text-[19px] font-[700] text-white">
                Jack
              </small>
            </p>
          </div>
        </div>

        <div className=" md:flex hidden  gap-[10px] items-center">
          <div
            onClick={() => safeNavigate("/offers/marketplace")}
            className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <RiExchange2Fill className="lg:flex hidden text-[16px]" />
            <p className="text-[13px] font-[700]">Sell Assets</p>
          </div>
          <div
            onClick={() => safeNavigate("/offers/create")}
            className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <RiExchangeBoxFill className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Buy Assets</p>
          </div>
          <div className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300">
            <FaUserFriends className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Trade Partners</p>
          </div>
          <div
            onClick={() => safeNavigate("/dashboard")}
            className="flex items-center gap-[10px] hover:bg-tradeAsh border  border-black hover:border-tradeAshLight hover:text-white text-tradeFadeWhite px-[12px] py-[5px] rounded-[7px] cursor-pointer transition-all duration-300"
          >
            <TbDashboardFilled className="lg:flex hidden text-[17px]" />
            <p className="text-[13px] font-[700]">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center lg:gap-[15px] gap-[15px]">
          <div className="lg:flex hidden items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[1px] gap-[10px] rounded-[8px]">
            <FaMagnifyingGlass className="text-neutral-500 lg:text-[15px] text-[15px]" />
            <input
              className=" bg-transparent outline-none h-[28px] w-[220px]  placeholder:text-tradeFadeWhite text-[12px] text-white"
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
            onClick={() => setIsProfileOption((prev) => !prev)}
          >
            <img className=" rounded-full" src={landingImg4} alt="" />
          </div>
        </div>
      </div>

      <div
        className={`${
          isNavOption ? "flex" : "hidden"
        } z-50 fixed right-0 left-0 top-[60px] bottom-0 bg-black p-[15px] pt-[13px] pb-[16px] lg:hidden flex flex-col justify-between`}
      >
        <div className="flex gap-[10px] p-[10px] items-center bg-tradeAsh border border-tradeAshExtraLight rounded-[12px]">
          <HiMiniMagnifyingGlass className="text-tradeFadeWhite text-[20px]" />

          <p className=" text-tradeFadeWhite text-[14px] font-[500]">
            Hello,{" "}
            <small className="text-tradeFadeWhite text-[14px] font-[600]">
              x33crypt.
            </small>{" "}
            How can we help ?
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div
            onClick={() => {
              safeNavigate("/dashboard");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] "
          >
            <MdSpaceDashboard className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Dashboard</p>
          </div>
          <div
            onClick={() => {
              safeNavigate("/dashboard");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] "
          >
            <IoWalletOutline className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Wallet</p>
          </div>
          <div
            onClick={() => {
              safeNavigate("/offers/myoffers");
              setIsNavOption(false);
            }}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] "
          >
            <TbLayoutList className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">My Offers</p>
          </div>
          <div
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] "
            onClick={() => {
              // safeNavigate("/messages");
              setIsNavOption(false);
            }}
          >
            <FaRegEnvelope className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] "> Messages</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] ">
            <FaVenusDouble className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Favourite Vendors</p>
          </div>

          <div className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] ">
            <RiExchangeFundsLine className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Trade History</p>
          </div>

          <div className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] ">
            <LiaUserFriendsSolid className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Invite a friend</p>
          </div>
          <div className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshExtraLight hover:bg-tradeAsh rounded-[12px] ">
            <TbHelpCircle className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] "> Help Center</p>
          </div>
        </div>

        <div className="w-full h-max flex flex-col gap-[10px]">
          <p
            onClick={() => {
              safeNavigate("/offers/marketplace");
              setIsNavOption(false);
            }}
            className="flex-1 flex items-center justify-center text-black text-[15px] font-[600] bg-white py-[10px] rounded-[12px]"
          >
            Sell Asset
          </p>
          <p
            onClick={() => {
              safeNavigate("/offers/create");
              setIsNavOption(false);
            }}
            className="flex-1 flex items-center justify-center text-black text-[15px] font-[600] bg-tradeGreen py-[10px] rounded-[12px]"
          >
            Buy Asset
          </p>
        </div>
      </div>

      <div
        ref={navOptionRef}
        className={` ${
          isProfileOption ? "flex" : "hidden"
        } z-30 fixed lg:right-[25px] md:right-[19px] right-[15px] md:top-[65px] top-[62px]  flex-col w-[160px] p-[3px] bg-tradeAshLight rounded-[1px]`}
        onClick={() => setIsProfileOption((prev) => !prev)}
      >
        <p
          className="text-white text-[12px] font-[700] py-[8px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer"
          onClick={() => safeNavigate("/account/profile", { replace: true })}
        >
          Profile
        </p>
        <p className="text-white text-[12px] font-[600] py-[8px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
          Wallet
        </p>
        <p className="text-white text-[12px] font-[600] py-[8px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
          Subscriptions
        </p>
        <p className="text-white text-[12px] font-[600] py-[8px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
          Rewards
        </p>
        <p className="text-white text-[12px] font-[600] py-[8px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
          Security & privacy
        </p>

        <p className="text-white text-[12px] font-[600] py-[8px] px-[15px]  rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer">
          Support
        </p>
        <div className="border-t border-tradeAshExtraLight"></div>
        <p
          className="text-white text-[12px] font-[600]  py-[8px] px-[15px] rounded-[1px] hover:bg-tradeAshExtraLight hover:underline transition-all duration-300 cursor-pointer"
          onClick={() =>
            safeNavigate("/logout", { state: { from: location.pathname } })
          }
        >
          Log out
        </p>
      </div>
    </>
  );
};

export default InAppNav;
