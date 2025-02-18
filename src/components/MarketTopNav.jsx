import React, { useState, useEffect, useRef } from "react";
import { GiCardExchange } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const MarketTopNav = () => {
  const [isNavOption, setIsNavOption] = useState(false);
  const navOptionRef = useRef(null);

  useEffect(() => {
    const handleNavOptClickOutside = (event) => {
      if (
        navOptionRef.current &&
        !navOptionRef.current.contains(event.target)
      ) {
        setIsNavOption(false);
      }
    };

    document.addEventListener("mousedown", handleNavOptClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleNavOptClickOutside);
    };
  }, []);

  const placeholders = [
    "Search transaction...",
    "Search people...",
    "Search payment...",
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
    <div className="z-50 fixed right-0 left-0 bg-black lg:px-[2%] px-[3%] h-[70px] flex justify-between items-center border-b border-tradeAsh ">
      <div className="flex items-center lg:gap-[20px] gap-[15px]">
        <div className="lg:hidden flex">
          <HiOutlineMenuAlt2 className="text-white text-[22px]" />
        </div>
        <div className="flex items-center justify-start gap-[5px] ">
          <GiCardExchange className="lg:text-[22px] text-[20px] text-tradeGreen" />
          <p className=" lg:text-[22px] text-[20px] font-[700] text-tradeGreen">
            Trade
            <small className="lg:text-[22px] text-[20px] font-[700] text-white">
              Jack
            </small>
          </p>
        </div>
        <div className="ml-[35px] lg:flex hidden gap-[20px] items-center">
          <p
            className="text-white hover:text-tradeGreen text-[14px] font-[400]  cursor-pointer border  px-[20px] py-[4px] rounded-[4px]"
            onClick={() => navigateTo("/marketplace")}
          >
            Sell asset
          </p>
          <p
            className="text-white hover:text-tradeGreen text-[14px] font-[400] cursor-pointer border px-[20px] py-[4px] rounded-[4px]"
            onClick={() => navigateTo("/create-offer")}
          >
            Buy asset
          </p>

          <p className="text-white hover:text-tradeGreen text-[14px] font-[400]  cursor-pointer ">
            Favourite offers
          </p>
          <p
            className="text-white hover:text-tradeGreen text-[14px] font-[400]  cursor-pointer "
            onClick={() => navigateTo("/dashboard")}
          >
            Dasboard
          </p>
        </div>
      </div>

      <div className="flex items-center lg:gap-[20px] gap-[15px]">
        <div className="sm:flex hidden items-center bg-tradeAsh px-[10px] py-[2px] gap-[10px] rounded-[4px]">
          <FaMagnifyingGlass className="text-neutral-500 lg:text-[16px] text-[15px]" />
          <input
            className=" bg-transparent outline-none h-[28px] w-[200px] lg:placeholder:text-[14px] placeholder:text-[13px] placeholder:text-neutral-500 lg:text-[14px] text-[13px] text-white"
            type="text"
            placeholder={searchplaceholder}
          />
        </div>
        <div className="cursor-pointer sm:hidden">
          <FiSearch className="text-white text-[20px]" />
        </div>
        <div className="cursor-pointer">
          <FaRegBell className="text-white lg:text-[22px] text-[20px]" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setIsNavOption((prev) => !prev)}
        >
          <img
            className="lg:w-[34px] w-[30px] rounded-full"
            src={landingImg4}
            alt=""
          />
        </div>

        <div
          ref={navOptionRef}
          className={` ${
            isNavOption ? "flex" : "hidden"
          } fixed right-[25px] top-[70px] flex-col w-[170px] p-[3px] bg-tradeAshLight rounded-[1px]`}
          onClick={() => setIsNavOption((prev) => !prev)}
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
  );
};

export default MarketTopNav;
