import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RiArrowRightUpFill } from "react-icons/ri";
import { RiArrowUpFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { FaEyeSlash } from "react-icons/fa";

const Options = () => {
  return (
    <div className="flex flex-col flex-1 h-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col p-[8px gap-[10px] md:w-[350px bg-tradeAs rounded-[15px borde border-tradeAshLight">
          <div className="flex  w-full gap-[10px]">
            <div className="flex cursor-pointer gap-1 items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full bg-tradeGreen text-black hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200">
              <HiPlus className="text-xl" />
              <p>Deposit</p>
            </div>

            <div className="flex cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeAshLight text-white hover:bg-tradeAshLight/80 active:bg-tradeAsh active:text-tradeFadeWhite transition-colors duration-200">
              <RiArrowRightUpFill className="text-xl" />
              <p>Transfer</p>
            </div>

            <div className="md:flex hidden cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200">
              <RiArrowUpFill className="text-xl" />
              <p>Withdraw</p>
            </div>
          </div>

          <div className="flex md:hidden flex-1 cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200">
            <RiArrowUpFill className="text-xl" />
            <p>Withdraw</p>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Options;
