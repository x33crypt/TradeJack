import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { GiCardExchange } from "react-icons/gi";
import { TbMenu } from "react-icons/tb";
import { CgMenuRight } from "react-icons/cg";

const Nav = () => {
  return (
    <div className="z-50 px-[5%] bg-[rgb(17,17,22)] lg:h-[100px] h-[80px] flex items-center justify-between fixed top-0 right-0 left-0">
      <div className="flex items-center gap-[5px]">
        <GiCardExchange className="lg:text-[25px] text-[24px] text-tradeGreen" />
        <p className=" lg:text-[25px] text-[22px] font-[700] text-tradeGreen">
          Trade
          <small className="lg:text-[25px] text-[22px] font-[700] text-white">
            Jack
          </small>
        </p>
      </div>
      <div className=" lg:flex hidden gap-[40px]">
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          FEATURES
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          MARKETPLACE
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          ABOUT
        </p>
        <p className="text-[15px] text-neutral-400 hover:text-white cursor-pointer">
          FAQ
        </p>
      </div>
      <div>
        <div className="flex items-center gap-[10px] bg-white lg:px-[20px] px-[15px] py-[8px] rounded-[8px]">
          <p className="text-black lg:text-[16px] text-[15px] font-[600]">
            Get Started
          </p>
          {/* <MdArrowOutward className="text-black text-[17px] font-bold" /> */}
        </div>
      </div>
      <div className="lg:hidden flex">
        <CgMenuRight className="text-neutral-400 text-[24px]" />
      </div>
    </div>
  );
};

export default Nav;
