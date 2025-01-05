import React from "react";
import { IoStatsChart } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import { TbViewfinder } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { SiQuantconnect } from "react-icons/si";
import { FaNotEqual } from "react-icons/fa6";

const Layer1 = () => {
  return (
    <div className=" pt-[100px] pb-[100px] flex flex-col px-[5%]">
      <div className=" flex items-end gap-[20px]">
        <div className="flex-1">
          <div className=" z-10 relative border border-tradeGreen w-[95px] h-[28.5px] pb-[2px] rounded-[8px]">
            <p className=" absolute top-[-2px] left-[-3px] text-[12px] text-white font-[500] px-[20px] py-[4px] rounded-[6px] bg-tradeGreen w-max">
              BENEFITS
            </p>
          </div>
          <p className=" mt-[10px] text-[50px] text-white font-[500] w-[500px] leading-[70px]">
            Redefining Global Digital Asset Trading
          </p>
        </div>
        <div className="flex-1 flex  items-end">
          <p className="text-neutral-400 text-[17px] leading-[30px]">
            Break barriers and unlock opportunities. Our platform connects users
            worldwide, enabling seamless digital asset trading.
            Cryptocurrencies, fiat currencies, and more. With unmatched security
            and transparency.
          </p>
        </div>
      </div>
      <div className="flex gap-[20px] mt-[100px]">
        <div className="bg-tradeGreen flex-1 p-[30px] rounded-[20px] h-[450px] flex flex-col justify-between">
          <div>
            <p className="text-[25px] font-Manrope font-[800]">
              Market Overview
            </p>
            <p className="text-[40px] font-Manrope font-[800]">4000+ Trades</p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <IoStatsChart className="text-[160px]" />
            </div>

            <p className="mt-[20px] text-[17px]">
              Join thousands of successful trades and stay updated with
              real-time market trends.
            </p>
          </div>
        </div>
        <div className="bg-tradeAsh flex-1 p-[30px] rounded-[20px] h-[450px] flex flex-col justify-between">
          <div>
            <p className="text-[25px] text-white font-Manrope font-[800]">
              Effortless Exploration
            </p>
            <p className="text-[40px] text-white font-Manrope font-[800] ">
              50+ Assets
            </p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <TbViewfinder className="text-[160px] text-tradePurple" />
            </div>

            <p className="mt-[20px] text-[17px] text-neutral-400">
              Enjoy a simple, flexible platform to explore and find the best
              deals with ease.
            </p>
          </div>
        </div>
        <div className="bg-tradeAsh flex-1 p-[30px] rounded-[20px] h-[450px] flex flex-col justify-between">
          <div>
            <p className="text-[25px] text-white font-Manrope font-[800]">
              Secure Market Insights
            </p>
            <p className="text-[40px] text-white font-Manrope font-[800]">
              Safe Trade
            </p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <GrSecure className="text-[160px] text-tradeOrange" />
            </div>

            <p className="mt-[20px] text-[17px] text-neutral-400">
              Trade confidently in a secure environment with verified vendors
              and real-time data.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[20px] flex gap-[20px]">
        <div className="bg-tradeOrange flex-1 rounded-[20px] rounded-tr-[30px] rounded-br-[30px] h-[450px]">
          <div className=" ml-[50px] p-[30px] rounded-[20px] bg-tradeAsh h-full flex flex-col justify-between">
            <div>
              <p className="text-[25px] text-white font-Manrope font-[800]">
                Trusted Community
              </p>
              <p className="text-[40px] text-white font-Manrope font-[800]">
                50,000+ Verified Users, Reliable Partnerships, Safe Transactions
              </p>
            </div>
            <div className="">
              <div className="flex justify-center">
                <SiQuantconnect className="text-[160px] text-tradeBlack" />
              </div>
            </div>
            {/* <p className="mt-[20px] text-[17px] text-white">
              Engage with verified users and vendors, fostering confidence and
              ensuring every transaction is with a trusted partner
            </p> */}
          </div>
        </div>
        <div className="h-[450px] w-[365px] rounded-[20px] p-[30px] bg-tradePurple flex flex-col justify-between">
          <div>
            <p className="text-[25px] text-white font-Manrope font-[800]">
              Transparent System
            </p>
            <p className="text-[40px] text-white font-Manrope font-[800]">
              Honest Trading
            </p>
          </div>
          <div className="">
            <div className="flex justify-center">
              <FaNotEqual className="text-[160px] text-white" />
            </div>

            <p className="mt-[20px] text-[17px] text-white">
              No hidden fees or surprises. Every trade is straightforward,
              secure, and completely transparent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layer1;
