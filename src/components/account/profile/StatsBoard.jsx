import React, { useRef, useEffect, useCallback } from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TiChartLine } from "react-icons/ti";
import { GiRoundKnob } from "react-icons/gi";

const StatsBoard = ({ profile }) => {
  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="flex-1 md:flex hidden items-center bg-tradeOrang  lg:p-0 border md:border-0 border-tradeAshLight lg:bg-transparent p-[15px]">
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-[35px] p-[15px] lg:p-0 bg-tradeOrang w-full h-max bg-tradeAsh lg:bg-transparent rounded-[15px]">
          <div className="flex w-full flex-col gap-2 bg-tradeGree">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Positive Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-[#00de82]/30 ">
                <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="positive"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.feedback?.positive}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-tradeGree">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Negative Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-red-600/30">
                <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="negative"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.feedback?.negative}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">Trust Score</p>
            <div className="flex gap-2">
              <div className="p-1  rounded-full bg-tradeOrange/30">
                <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.trustScore}
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Volume
            </p>

            <div className="flex items-end gap-2">
              <p
                id="tradeVolume"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTradeVolume?.amount}{" "}
                {profile?.totalTradeVolume?.currency}
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Partners
            </p>

            <div className="flex items-end gap-2">
              <p
                id="tradePartners"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTradePartners}
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">Total Trade</p>

            <div className="flex items-end gap-2">
              <p
                id="totalTrade"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTrades}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden flex-col  p-[15px]  gap-[10px]">
        <div className="flex flex-col  bg-tradeAsh  border border-tradeAshLight rounded-[10px] overflow-hidden">
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Positive Feedback
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-[#00de82]/30 ">
                <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="positive"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.feedback?.positive}
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Negative Feedback
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-red-600/30">
                <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="negative"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.feedback?.negative}
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 ">
            <p className="text-tradeFadeWhite text-xs font-bold">Trust Score</p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeOrange/30">
                <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.trustScore}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  bg-tradeAsh border border-tradeAshLight  rounded-[10px] overflow-hidden">
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Volume
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshLight/30">
                <TiChartLine className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="tradeVolume"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTradeVolume?.amount}{" "}
                {profile?.totalTradeVolume?.currency}
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Partners
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshExtraLight/30 ">
                <FaUserFriends className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="tradePartners"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTradePartners}
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Total Trades
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshLight/30">
                <GiRoundKnob className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="totalTrade"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                {profile?.totalTrades}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsBoard;
