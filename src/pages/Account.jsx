import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../assets/landingImg4.JPG";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { PiHandDepositBold } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbAlignBoxRightTop } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const Account = () => {
  const navigateTo = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState({
    yourInfo: false,
    deposit: false,
    security: false,
    subscription: false,
    help: false,
    logout: false,
  });

  // Function to navigate
  const handleIsYourInfo = () => {
    navigateTo("/account/profile");
  };

  const handleIsDeposit = () => {
    navigateTo("/account/deposit&withdraw");
  };

  const handleIsSecurity = () => {
    navigateTo("/account/security&privacy");
  };

  const handleIsSubscription = () => {
    navigateTo("/account/subscription");
  };

  const handleIsHelp = () => {
    navigateTo("/account/help");
  };

  const handleIsLogout = () => {
    navigateTo("/account/logout");
  };

  // Listen for route changes and update the active page
  useEffect(() => {
    if (location.pathname === "/account/profile") {
      setActivePage({
        yourInfo: true,
        deposit: false,
        security: false,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/deposit&withdraw") {
      setActivePage({
        yourInfo: false,
        deposit: true,
        security: false,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/security&privacy") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: true,
        subscription: false,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/subscription") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: true,
        help: false,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/help") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: false,
        help: true,
        logout: false,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  useEffect(() => {
    if (location.pathname === "/account/logout") {
      setActivePage({
        yourInfo: false,
        deposit: false,
        security: false,
        subscription: false,
        help: false,
        logout: true,
      });
    }
  }, [location.pathname]); // Runs every time the URL changes

  return (
    <>
      <InAppNav />

      <div className="lg:pt-[80px] md:pt-[85px] pt-[85px] pb-[10px] bg-black flex p-[15px]  min-h-screen gap-[30px] flex-col">
        <div className="flex items-center gap-[15px]">
          <div className=" lg:w-[60px] sm:w-[150px] w-[80px] ">
            <img className="rounded-full" src={image} alt="" />
          </div>

          <div>
            <p className="text-white lg:text-[18px] sm:text-[38px] text-[22px] font-extrabold">
              0xSanityy
            </p>
            <p className="text-tradeFadeWhite text-[13px] font-[500]">
              0xsanityy@gmail.com
            </p>
          </div>
        </div>

        <div className="flex items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[7px]  gap-[10px] rounded-[12px]">
          <HiMiniMagnifyingGlass className="text-neutral-500 text-[20px]" />
          <input
            className=" bg-transparent outline-none h-[28px] w-[220px] text-[15px] placeholder:text-tradeFadeWhite  text-white"
            type="text"
            placeholder="Find a setting"
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <div
            onClick={() => handleIsYourInfo()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <CgProfile className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Your Info</p>
          </div>
          {/* <div
            onClick={() => handleIsYourInfo()}
            className={` ${
              activePage?.yourInfo
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]  transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <CgProfile />
            </div>
            <p className="text-[15px] font-[500]">Your Info</p>
          </div> */}
          <div
            onClick={() => handleIsDeposit()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <PiHandDepositBold className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Deposit & Withdraw</p>
          </div>
          {/* <div
            onClick={() => handleIsDeposit()}
            className={` ${
              activePage?.deposit
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]    transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <PiHandDepositBold />
            </div>
            <p className="text-[15px] font-[500]">Deposit & Withdraw</p>
          </div> */}
          {/* <div
            onClick={() => handleIsSecurity()}
            className={` ${
              activePage?.security
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]    transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <MdOutlineSecurity />
            </div>
            <p className="text-[15px] font-[500]">Security & Privacy</p>
          </div> */}

          <div
            onClick={() => handleIsSecurity()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <MdOutlineSecurity className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Security & Privacy</p>
          </div>

          {/* <div
            onClick={() => handleIsSubscription()}
            className={` ${
              activePage?.subscription
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]   transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <TbAlignBoxRightTop />
            </div>
            <p className="text-[15px] font-[500]">Subscriptions</p>
          </div> */}

          <div
            onClick={() => handleIsSubscription()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <TbAlignBoxRightTop className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Subscriptions</p>
          </div>

          {/* <div
            onClick={() => handleIsHelp()}
            className={` ${
              activePage?.help
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]   transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <BiSupport />
            </div>
            <p className="text-[15px] font-[500]">Help & Support</p>
          </div> */}

          <div
            onClick={() => handleIsHelp()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <BiSupport className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Help & Support</p>
          </div>

          {/* <div
            onClick={() => handleIsLogout()}
            className={` ${
              activePage?.logout
                ? "bg-tradeGreen text-black hover:text-black"
                : "text-tradeFadeWhite hover:text-white"
            } p-[8px] flex items-center gap-[10px] rounded-[10px]  transition-all duration-300 cursor-pointer`}
          >
            <div className="text-[16px]">
              <MdLogin />
            </div>
            <p className="text-[15px] font-[500]">Logout</p>
          </div> */}

          <div
            onClick={() => handleIsLogout()}
            className=" flex gap-[15px] items-center p-[10px] border border-transparent hover:border-tradeAshLight hover:bg-tradeAsh rounded-[12px] "
          >
            <MdLogin className="text-[15px] text-tradeFadeWhite" />
            <p className="text-white text-[15px] ">Logout</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
