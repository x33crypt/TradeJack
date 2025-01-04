import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { GiCardExchange } from "react-icons/gi";

const Nav = () => {
  return (
    <div className="z-50 px-[5%] bg-[rgb(17,17,22)] h-[100px] flex items-center justify-between fixed top-0 right-0 left-0">
      <div className="flex items-center gap-[5px]">
        <GiCardExchange className="text-[25px] text-tradeGreen" />
        <p className="text-[25px] font-[700] text-tradeGreen">
          Trade
          <small className="text-[25px] font-[700] text-white">Jack</small>
        </p>
      </div>
      <div className="flex gap-[40px]">
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          HOME
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          SOLUTION
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          MARKET
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          ABOUT
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          FAQ
        </p>
      </div>
      <div>
        <div className="flex items-center gap-[10px] bg-tradeGreen px-[20px] py-[8px] rounded-[8px]">
          <p className="text-black text-[16px] font-[600]">Get Started</p>
          {/* <MdArrowOutward className="text-black text-[17px] font-bold" /> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
