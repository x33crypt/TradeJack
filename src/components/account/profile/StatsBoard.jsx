import React, { useRef, useEffect, useCallback } from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TiChartLine } from "react-icons/ti";
import { GiRoundKnob } from "react-icons/gi";

const StatsBoard = ({ profile }) => {
  return (
    <div className="flex flex-col flex-1 h-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">My Wallet</p>
      </div>

      <div className="flex p-[15px] h-full">
        <div className="flex-1 flex flex-col border border-tradeAshLight p-[12px] gap-[35px] bg-tradeAsh rounded-[15px]">
          <div className="flex justify-between bg-tradeGree w-full">
            <div className="flex flex-col gap-2 min-w-[120px]">
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

            <div className="flex flex-col gap-2 min-w-[120px]">
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

            <div className="flex flex-col gap-2 min-w-[120px]">
              <p className="text-tradeFadeWhite text-xs font-bold">
                Trust Score
              </p>
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
          </div>

          <div className="flex justify-between bg-tradeGree w-full">
            <div className="flex flex-col gap-2 min-w-[120px]">
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

            <div className="flex flex-col gap-2 min-w-[120px]">
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

            <div className="flex flex-col gap-2 min-w-[120px]">
              <p className="text-tradeFadeWhite text-xs font-bold">
                Total Trade
              </p>

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
      </div>
    </div>
  );
};

export default StatsBoard;
