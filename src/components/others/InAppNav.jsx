import React, { useState, useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "../../assets/landingImg4.JPG";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { RiExchangeFill } from "react-icons/ri";
import { RiExchange2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbDashboardFilled } from "react-icons/tb";
import { RiExchangeBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { TbFileLike } from "react-icons/tb";
import { BsChatQuote } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";
import Button from "../buttons/Button";
import { IoWallet } from "react-icons/io5";
import { useProfileNav } from "@/context/otherContext/ProfileNavContext";
import LockByScroll from "./LockByScroll";
import { HiGiftTop } from "react-icons/hi2";
import { RiExchangeBoxLine } from "react-icons/ri";
import { HiOutlineGlobe } from "react-icons/hi";
import { HiViewGridAdd } from "react-icons/hi";
import { TiFlashOutline } from "react-icons/ti";
import { FiUserPlus } from "react-icons/fi";
import { RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import SmallButton from "../buttons/SmallButton";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const InAppNav = () => {
  const [isNavOption, setIsNavOption] = useState(false);
  const { show, setShow } = useProfileNav();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }, 5000); // every 20s

    return () => clearInterval(interval);
  }, []);

  const navigateTo = useNavigate();

  return (
    <>
      {/* Desktop Nav */}
      <div className="z-30 fixed right-0 left-0 bg-black  lg:p-[2%] md:p-[2.5%] px-[15px] h-[57px] md:h-[65px] flex justify-between items-center  border-neutral-800 ">
        <div className="flex items-center lg:gap-[30px] gap-[10px]">
          {isNavOption === false ? (
            <div
              onClick={() => setIsNavOption((prev) => !prev)}
              className="w-max flex lg:hidden gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
            >
              <HiOutlineMenuAlt2 className="text-white text-[16px]" />
            </div>
          ) : (
            <div
              onClick={() => setIsNavOption((prev) => !prev)}
              className="w-max flex lg:hidden gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03] opacity-0"
            >
              <HiOutlineMenuAlt2 className="text-white text-[16px]" />
            </div>
          )}

          <div
            onClick={() => navigateTo("/dashboard")}
            className="flex items-center gap-[5px] cursor-pointer "
          >
            <p className=" lg:text-xl md:text-[19px] text-[18px]  font-bold text-tradeOrange">
              00000000
              {/* <span className="font-semibold text-tradeOrange">GET</span>
              <span className="font-semibold text-white">SWAP</span> */}
            </p>
          </div>
        </div>

        <div className=" lg:flex hidden  gap-8 items-end">
          <div
            onClick={() => navigateTo("/dashboard")}
            className="flex flex-col items-center gap-1 "
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              DASHBOARD
            </p>
          </div>

          <div
            onClick={() => navigateTo("/wallet")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              WALLET
            </p>
          </div>

          <div
            onClick={() => navigateTo("/offer/create")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              CREATE OFFER
            </p>
          </div>

          <div
            onClick={() => navigateTo("/offers/explore")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              BROWSE OFFER
            </p>
          </div>

          <div
            onClick={() => navigateTo("/partners")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              TRADE PARTNERS
            </p>
          </div>

          <div
            onClick={() => navigateTo("/partners")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              TOOLS BOX 0.5
            </p>
          </div>
        </div>

        <div className="flex items-center  gap-[10px]">
          {/* <div className="lg:flex hidden w-full items-center bg-tradeAsh border border-tradeAshLight p-2  gap-[15px] rounded-[10px]">
            <FiSearch className="text-tradeFadeWhite text-[20px]" />
            <input
              className=" bg-transparent outline-none h-max w-[220px]  placeholder:text-tradeFadeWhite text-[13px] font-medium text-white"
              type="text"
              placeholder="Search trader"
            />
          </div> */}
          <div
            className={` ${
              animate ? "animate-zoomShake" : ""
            } w-max flex gap-1 items-center justify-center bg-tradeOrange border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <BiSupport className="text-[16px] text-black" />
          </div>
          <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaRegBell className="text-[16px]" />
          </div>
          <div
            className=" flex-shrink-0 w-[34px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03] border border-tradeAshExtraLight rounded-[10px]"
            onClick={() => setShow((prev) => !prev)}
          >
            <img className="rounded-[10px]" src={landingImg4} alt="" />
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div>
        {isNavOption === true && (
          <div>
            <LockByScroll />
            <div
              className={`${
                isNavOption ? "flex" : "hidden"
              }  z-50 fixed right-0 left-0 top-0 bottom-0  lg:hidden flex-col `}
            >
              <div className="flex items-center bg-transparent h-[57px] p-[15px] ">
                {isNavOption === true ? (
                  <div
                    onClick={() => setIsNavOption((prev) => !prev)}
                    className="w-max flex md:hidden gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <IoCloseSharp className="text-white text-[16px]" />
                  </div>
                ) : (
                  <div
                    onClick={() => setIsNavOption((prev) => !prev)}
                    className="w-max flex md:hidden gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03] opacity-0"
                  >
                    <IoCloseSharp className="text-white text-[16px]" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between p-[15px] bg-black ">
                <div className="flex flex-col p-[12px bg-tradeAshLigh gap-[10px] rounded-[15px] borde border-tradeAsh">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold text-base">
                      PREMIUM ACCOUNT
                    </p>

                    <div className="md:hidden text-tradeFadeWhite text-[15px] p-1 w-max h-max bg-transparent border border-tradeAshExtraLight rounded-[10px]">
                      <FaRegUser />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                    <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                      Remaing Limits : #{" "}
                      <span className="text-white">1,000,000.00</span>
                    </p>
                  </div>

                  {/* <p className="text-tradeFadeWhite font-semibold text-xs">
                    Remaing Limits : #{" "}
                    <span className="text-white">1,000,000.00</span>
                  </p> */}
                </div>

                <div className="flex flex-col gap-[15px]">
                  <div
                    onClick={() => {
                      navigateTo("/dashboard");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      SEARCH
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigateTo("/dashboard");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      DASHBOARD
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/wallet");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      WALLET
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      // navigateTo("/wallet");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      TOOLS BOX
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/offers");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      MY OFFERS
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      // navigateTo("/wallet");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      BOOKMARKS
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      // navigateTo("/wallet");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      PROMOTED OFFERS
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/partners");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      TRADE PARTNERS
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/partners");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      TRADE HISTORY
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/wallet/transactions");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      TRANSACTION HISTORY
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/wallet/transactions");
                      setIsNavOption(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      REFERRALS
                    </p>
                  </div>
                </div>

                <div className="w-full h-max flex flex-col gap-[8px]">
                  <Button
                    variant="Fadeout"
                    onClick={() => {
                      navigateTo("/offers/explore");
                      setIsNavOption(false);
                    }}
                  >
                    BROWSE OFFERS
                  </Button>

                  <Button
                    variant="Fadeout"
                    onClick={() => {
                      navigateTo("/offer/create");
                      setIsNavOption(false);
                    }}
                  >
                    CREATE OFFER
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InAppNav;
