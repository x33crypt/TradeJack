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
import { PiHorseBold } from "react-icons/pi";

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

      <div className=" fixed top-0 right-0 left-0 bottom-0 lg:pt-[80px] md:pt-[85px] pt-[85px] bg-black flex p-[15px]  gap-[30px] flex-col">
        <div className="flex items-center gap-[15px]">
          <div className=" lg:w-[60px] sm:w-[150px] w-[90px] ">
            <img className="rounded-full" src={image} alt="" />
          </div>

          <div className="flex flex-col gap-[1px]">
            <p className="text-white lg:text-[18px] sm:text-[38px] text-[22px] font-extrabold">
              0xSanityy
            </p>

            <div className="flex gap-[10px]">
              <div className="flex gap-[3px] items-center">
                <p className="text-white lg:text-[13px] sm:text-[13px] text-[13px] font-[600]">
                  #TopTrader
                </p>
                <PiHorseBold className="text-tradeOrange" />
              </div>
              <p className="text-tradeGreen lg:text-[13px] sm:text-[13px] text-[13px] font-[600]">
                Online
              </p>
            </div>
            <div className="flex items-center gap-[3px]">
              <div className="flex items-center gap-[5px]">
                <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[600] text-white">
                  Nigeria
                </p>
              </div>
              <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[700] text-tradeFadeWhite">
                &#x2022;
              </p>
              <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[600] text-tradeFadeWhite">
                Joined 3 weeks ago
              </p>
            </div>
            {/* <p className="text-tradeFadeWhite text-[13px] font-[500]">
              0xsanityy@gmail.com
            </p> */}
          </div>
        </div>

        <div className="flex items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[6px]  gap-[10px] rounded-[12px]">
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
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <CgProfile className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Your Info</p>
          </div>
          <div
            onClick={() => handleIsDeposit()}
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <PiHandDepositBold className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Deposit & Withdraw</p>
          </div>
          <div
            onClick={() => handleIsSecurity()}
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <MdOutlineSecurity className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Security & Privacy</p>
          </div>
          <div
            onClick={() => handleIsSubscription()}
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <TbAlignBoxRightTop className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Subscriptions</p>
          </div>
          <div
            onClick={() => handleIsHelp()}
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <BiSupport className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Help & Support</p>
          </div>
          <div
            onClick={() => handleIsLogout()}
            className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
          >
            <MdLogin className="text-[16px] text-tradeFadeWhite" />
            <p className="text-white text-[16px] ">Logout</p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Account;
