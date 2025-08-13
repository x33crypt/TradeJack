import React, { useRef, useEffect, useCallback } from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiRoundKnob } from "react-icons/gi";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import { useAccount } from "@/context/AccountContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { RiDonutChartFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";

const Stats = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Activity Stats</p>
      </div>
      <div className="flex flex-1 p-[15px] min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex-wrap flex items-center gap-[10px] overflow-x-hidden ">
            <div className="flex flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Positive Feedbacks
              </p>

              <div className="flex gap-1 items-center">
                <div className="p-1  rounded-full bg-[#00de82]/5 ">
                  <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.feedback?.positive?.profile?.feedback?.positive ??
                    "0"}
                </p>
              </div>
            </div>
            <div className="flex flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Negative Feedbacks
              </p>

              <div className="flex gap-1 items-center">
                <div className="p-1  rounded-full bg-red-600/5">
                  <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.feedback?.negative
                    ? profile?.feedback?.negative
                    : "0"}
                </p>
              </div>
            </div>
            <div className="flex  flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Trust Score
              </p>

              <div className="flex gap-1 items-center">
                <div className="p-1  rounded-full bg-tradeOrange/5">
                  <MdOutlineSafetyCheck className="text-tradeOrange text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semiboldleading-tight">
                  {profile?.trustScore ? profile?.trustScore : "0"}%
                </p>
              </div>
            </div>
            <div className="flex  flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Trade Partners
              </p>
              <div className="flex gap-1 items-center">
                <div className="p-1 rounded-full bg-tradeAshExtraLight/5 ">
                  <FaUserFriends className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.totalTradePartners
                    ? profile?.totalTradePartners
                    : "0"}
                </p>
              </div>
            </div>
            <div className="flex flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Total Trades
              </p>
              <div className="flex gap-1 items-center">
                <div className="p-1 rounded-full bg-tradeAshExtraLight/5 ">
                  <TbActivityHeartbeat className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.totalTrades ? profile?.totalTrades : "0"}
                </p>
              </div>
            </div>
            <div className="flex min-w-[130px] flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Trade Volume
              </p>
              <div className="flex gap-1 items-center">
                <div className="p-1 rounded-full bg-tradeAshExtraLight/5 ">
                  <RiDonutChartFill className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.totalTradeVolume?.currency
                    ? profile?.totalTradeVolume?.currency
                    : "USD"}{" "}
                  {profile?.totalTradeVolume
                    ? profile?.totalTradeVolume?.amount
                    : "0.00"}
                </p>
              </div>
            </div>
            <div className="flex min-w-[130px] flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Blocked by
              </p>
              <div className="flex gap-1 items-center">
                <div className="p-1 rounded-full bg-tradeAshExtraLight/5 ">
                  <ImBlocked className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.totalTradeVolume
                    ? profile?.totalTradeVolume?.amount
                    : "0.00"}
                </p>
              </div>
            </div>
            <div className="flex min-w-[130px] flex-grow flex-shrink-0 flex-col border border-tradeAshLight bg-tradeAsh gap-[10px] p-[12px] rounded-[15px]">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Has Blocked
              </p>
              <div className="flex gap-1 items-center">
                <div className="p-1 rounded-full bg-tradeAshExtraLight/5 ">
                  <ImBlocked className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                </div>

                <p className="text-white text-[13px] font-semibold leading-tight">
                  {profile?.totalTradeVolume
                    ? profile?.totalTradeVolume?.amount
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
