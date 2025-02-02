import React, { useState, useEffect } from "react";
import { GiCardExchange } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "../../assets/landingImg4.JPG";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const DashTopNav = () => {
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
    <div className="z-50 fixed right-0 left-0 bg-black px-[2%] h-[80px] flex justify-between items-center border-b border-tradeAsh ">
      <div className="flex items-center ">
        <div className="flex items-center justify-start gap-[5px] ">
          <GiCardExchange className="lg:text-[23px] text-[25px] text-tradeGreen" />
          <p className=" lg:text-[24px] text-[24px] font-[700] text-tradeGreen">
            Trade
            <small className="lg:text-[23px] text-[24px] font-[700] text-white">
              Jack
            </small>
          </p>
        </div>
        <div className="ml-[100px]">
          <p className="text-[24px] text-white">
            Welcome Back,{" "}
            <small className="text-[23px] font-[700]">X33crypt</small>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center bg-tradeAsh px-[10px] py-[4px] gap-[10px] rounded-[8px]">
          <FaMagnifyingGlass className="text-neutral-500" />
          <input
            className=" bg-transparent outline-none h-[28px] w-[200px] placeholder:text-[14px] placeholder:text-neutral-500 text-[14px] text-white"
            type="text"
            placeholder={searchplaceholder}
          />
        </div>
        <div className="cursor-pointer">
          <FaRegBell className="text-white text-[20px]" />
        </div>
        <div className="cursor-pointer">
          <img className="w-[35px] rounded-full" src={landingImg4} alt="" />
        </div>
        <div className="cursor-pointer">
          <BsThreeDotsVertical className="text-white text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default DashTopNav;
