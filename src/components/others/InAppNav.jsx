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
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              DASHBOARD
            </p>
          </div>

          <div
            onClick={() => navigateTo("/wallet")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              WALLET
            </p>
          </div>

          <div
            onClick={() => navigateTo("/offer/create")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              CREATE OFFER
            </p>
          </div>

          <div
            onClick={() => navigateTo("/offers/explore")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              BROWSE OFFER
            </p>
          </div>

          <div
            onClick={() => navigateTo("/partners")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              TRADE PARTNERS
            </p>
          </div>

          <div
            onClick={() => navigateTo("/partners")}
            className="flex flex-col items-center gap-1"
          >
            {/* <IoMdArrowDropdown className="text-lg text-tradeFadeWhite" /> */}
            <p className="text-xs font-semibold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
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
                <div className="flex w-full items-center bg-tradeAsh border border-tradeAshLight py-[12px] px-2  gap-[15px] rounded-[10px]">
                  <FiSearch className="text-tradeFadeWhite text-[20px]" />
                  <input
                    className=" bg-transparent outline-none h-max w-full  placeholder:text-tradeFadeWhite text-[13px] font-medium text-white"
                    type="text"
                    placeholder="Search trader"
                  />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <div
                    onClick={() => {
                      navigateTo("/dashboard");
                      setIsNavOption(false);
                    }}
                    className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] "
                  >
                    <TbDashboardFilled className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px] font-medium">
                      Dashboard
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigateTo("/wallet");
                      setIsNavOption(false);
                    }}
                    className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] "
                  >
                    <IoWalletOutline className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      Wallet
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigateTo("/offers");
                      setIsNavOption(false);
                    }}
                    className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] "
                  >
                    <TbFileInvoice className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      My offers
                    </p>
                  </div>
                  <div className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] ">
                    <TbFileLike className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px] ">Favourite offers</p>
                  </div>
                  <div className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] ">
                    <TiFlashOutline className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium">
                      Promoted offer
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      navigateTo("/partners");
                      setIsNavOption(false);
                    }}
                    className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] "
                  >
                    <FaUserFriends className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      Trade partners
                    </p>
                  </div>
                  <div className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] ">
                    <BsChatQuote className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      Messages
                    </p>
                  </div>
                  <div className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] ">
                    <RiExchange2Fill className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      Trade history
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigateTo("/wallet/transactions");
                      setIsNavOption(false);
                    }}
                    className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] "
                  >
                    <RiExchangeFundsLine className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium ">
                      Transaction history
                    </p>
                  </div>
                  <div className=" flex gap-[15px] items-center p-2 h-max  border border-transparent hover:border-tradeAshExtraLight rounded-[10px] ">
                    <FiUserPlus className="text-[20px] text-tradeFadeWhite" />
                    <p className="text-white text-[13px]  font-medium">
                      Referrals
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
                    Browse Offers
                  </Button>

                  <Button
                    variant="Fadeout"
                    onClick={() => {
                      navigateTo("/offer/create");
                      setIsNavOption(false);
                    }}
                  >
                    Create Offer
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
