import React from "react";
import { GiCardExchange } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import landingImg4 from "../../assets/landingImg4.JPG";

import { BsThreeDotsVertical } from "react-icons/bs";

const MarketTopNav = () => {
  return (
    <div className="fixed right-0 left-0 bg-tradeBlack h-[90px] px-[3%] flex justify-between items-center border-b border-tradeAsh">
      <div className="flex items-center">
        <div className="flex items-center justify-start gap-[5px] ">
          <GiCardExchange className="lg:text-[23px] text-[25px] text-tradeGreen" />
          <p className=" lg:text-[24px] text-[24px] font-[700] text-tradeGreen">
            Trade
            <small className="lg:text-[23px] text-[24px] font-[700] text-white">
              Jack
            </small>
          </p>
        </div>
        <div className="ml-[65px] flex gap-[20px] items-center">
          <p className="text-white hover:text-neutral-400 text-[16px] font-[400]  cursor-pointer">
            Buy Assets
          </p>
          <p className="text-white hover:text-neutral-400 text-[15px] font-[400]  cursor-pointer">
            Sell Assets
          </p>
          <p className="text-white hover:text-neutral-400 text-[15px] font-[400] cursor-pointer">
            Create an offer
          </p>
          <p className="text-white hover:text-neutral-400 text-[15px] font-[400]  cursor-pointer">
            Favourite offers
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center bg-tradeAsh px-[10px] py-[4px] gap-[10px] rounded-[8px]">
          <FaMagnifyingGlass className="text-white" />
          <input
            className=" bg-tradeAsh outline-none h-[28px] w-[200px] placeholder:text-[14px] placeholder:text-white text-[14px] text-white"
            type="text"
            placeholder="Search"
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

export default MarketTopNav;
