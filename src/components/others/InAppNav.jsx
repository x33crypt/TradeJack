import React, { useState, useEffect, useRef } from "react";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "../../assets/landingImg4.JPG";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import Button from "../buttons/Button";
import { useProfileNav } from "@/context/otherContext/ProfileNavContext";
import LockByScroll from "./LockByScroll";
import { IoMdArrowDropright } from "react-icons/io";
import { RiCopperCoinFill } from "react-icons/ri";
import { PiFlagCheckeredBold } from "react-icons/pi";
import { TbArrowsSort } from "react-icons/tb";
import { FaRegSmileWink } from "react-icons/fa";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { useBalance } from "@/context/userContext/BalanceContext";

const InAppNav = () => {
  const [isNavOption, setIsNavOption] = useState(false);
  const { show, setShow } = useProfileNav();
  const [animate, setAnimate] = useState(false);
  const [animateSoon, setAnimateSoon] = useState(false);
  const [defaultCurrencies, setDefaultCurrencies] = useState([
    { code: "NGN", name: "Nigeria naira" },
    { code: "USD", name: "United States dollar " },
  ]);
  const { select, setSelect } = useSelectElement();
  const { balance, setBalance } = useBalance();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }, 5000); // every 20s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateSoon(true);
      setTimeout(() => setAnimateSoon(false), 600);
    }, 10000); // every 20s

    return () => clearInterval(interval);
  }, []);

  // handling currency changes if clicks more
  useEffect(() => {
    if (
      select?.page === "InAppNav" &&
      select?.element === "default currency" &&
      select?.pick
    ) {
      const selectedCurrency = select.pick; // ✅ correct scope

      if (
        typeof selectedCurrency === "object" &&
        selectedCurrency.code &&
        selectedCurrency.name
      ) {
        setBalance((prev) => ({
          ...prev,
          currency: selectedCurrency.code,
        }));
      }
    }
  }, [select]);

  const navigateTo = useNavigate();

  return (
    <>
      {/* Desktop Nav */}
      <div className="z-30 fixed right-0 left-0 bg-black  lg:p-[2%] md:p-[2.5%] px-[15px] h-[57px] md:h-[65px] flex justify-between items-center  border-neutral-800 ">
        <div className="flex items-center lg:gap-[30px] gap-[10px] ">
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
              GO
              <span className="font-semibold text-tradeOrange">GET</span>
              <span className="font-semibold text-white">SWAP</span>
            </p>
          </div>
        </div>

        <div className=" lg:flex hidden items-center gap-8">
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

          <div className="flex  items-center gap-2">
            <p className="text-xs font-bold text-tradeFadeWhite hover:text-white  leading-none cursor-pointer  transition-all duration-300">
              TOOLS BOX
            </p>

            <div
              className={` ${
                animateSoon ? "animate-zoomShake" : ""
              } flex items-center gap-1 text-white p-0.5 bg-red-600 rounded-sm`}
            >
              <p className="text-[10px] font-bold">Soon</p>
              <FaRegSmileWink className="text-white text-sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-[10px]">
          <div
            onClick={() =>
              setSelect({
                state: true,
                selectOne: false,
                selectTwo: true,
                page: "InAppNav",
                element: "default currency",
                options: defaultCurrencies,
              })
            }
            className="w-max lg:flex hidden text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
          >
            <p className="text-xs text-white font-semibold">
              {balance?.currency}
            </p>
            <TbArrowsSort className="text-[16px]" />
          </div>
          <div
            onClick={() => navigateTo("/kyc/levels")}
            className=" w-max lg:flex hidden text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
          >
            <p className="text-xs text-white font-semibold">
              <span className="text-tradeFadeWhite">LIMIT : $</span> 2,000,000
            </p>
          </div>
          <div className="w-max lg:flex hidden text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p className="text-xs text-white font-semibold">2,530</p>
            <RiCopperCoinFill className="text-[16px]" />
          </div>
          <div
            className={` ${
              animate ? "animate-zoomShake" : ""
            } w-max flex gap-1 items-center justify-center bg-tradeOrange border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
          >
            <BiSupport className="text-[16px] text-black" />
          </div>
          <div className="relative w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaRegBell className="text-[16px]" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold p-1 py-[0px] rounded-full shadow-md">
              0
            </span>
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
              <div className="flex items-center bg-transparent h-[57px] lg:px-[2%] md:px-[20px] p-[15px] ">
                {isNavOption === true ? (
                  <div
                    onClick={() => setIsNavOption((prev) => !prev)}
                    className="w-max flex  gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <IoCloseSharp className="text-white text-[16px]" />
                  </div>
                ) : (
                  <div
                    onClick={() => setIsNavOption((prev) => !prev)}
                    className="w-max flex gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03] opacity-0"
                  >
                    <IoCloseSharp className="text-white text-[16px]" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between lg:px-[2%] md:px-[20px] p-[15px]  bg-black ">
                <div className="flex flex-col p-[12px bg-tradeAshLigh gap-[20px] rounded-[15px] borde border-tradeAsh">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white flex items-center gap-1">
                      MENU
                    </p>

                    <div className="text-tradeFadeWhite text-3xl fade-pulse cursor-pointer">
                      <PiFlagCheckeredBold />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => {
                          setSelect({
                            state: true,
                            selectOne: false,
                            selectTwo: true,
                            page: "InAppNav",
                            element: "default currency",
                            options: defaultCurrencies,
                          });
                          setIsNavOption(false);
                        }}
                        className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <TbArrowsSort className="text-[16px]" />

                        <p className="text-xs text-white font-semibold">
                          {balance?.currency}
                        </p>
                      </div>
                      <div
                        onClick={() => navigateTo("/kyc/levels")}
                        className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <p className="text-xs text-white font-semibold">
                          <span className="text-tradeFadeWhite">LIMIT : $</span>{" "}
                          2,000,000
                        </p>
                      </div>
                    </div>

                    <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                      <RiCopperCoinFill className="text-[16px]" />

                      <p className="text-xs text-white font-semibold">2,530</p>
                    </div>
                  </div>
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

                  <div className="flex items-center gap-2">
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      TOOLS BOX
                    </p>
                    <div
                      className={` ${
                        animateSoon ? "animate-zoomShake" : ""
                      } flex items-center gap-1 text-white p-0.5 bg-red-600 rounded-sm`}
                    >
                      <p className="text-[10px] font-bold">Soon</p>
                      <FaRegSmileWink className="text-white text-sm" />
                    </div>
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

                  <div className="flex items-center gap-2">
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      ADS
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      BOOKMARKS
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      CHATS
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

                  <div className="flex items-center gap-2">
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

                  {/* <div className="flex items-center gap-2">
                    <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                    <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                      REFERRALS
                    </p>
                  </div> */}
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
