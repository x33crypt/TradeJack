import React from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Loading from "@/components/others/Loading";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { RiDonutChartFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import NetworkError from "../others/NetworkError";

const Stats = ({ loading, profile }) => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Activity Stats</p>
      </div>
      <div className="flex flex-1 p-[15px] min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {profile === null ? (
              <NetworkError />
            ) : (
              <div className="flex-wrap flex items-center gap-[10px] overflow-x-hidden ">
                <div className="flex min-w-[250px] md:min-w-0 flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdThumbUpAlt className="text-lg text-tradeGreen" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Positive Feedbacks
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.feedback?.positive?.profile?.feedback
                        ?.positive ?? "0"}
                    </p>
                  </div>
                </div>
                <div className="flex min-w-[250px] md:min-w-0 flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdThumbDownAlt className="text-lg text-red-600" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Negative Feedbacks
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.feedback?.negative
                        ? profile?.feedback?.negative
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdOutlineSafetyCheck className="text-lg text-tradeOrange" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Trust Score
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.trustScore ? profile?.trustScore : "0"}%
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <FaUserFriends className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Trade Partners
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.totalTradePartners
                        ? profile?.totalTradePartners
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <TbActivityHeartbeat className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Total Trades
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.totalTrades ? profile?.totalTrades : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <RiDonutChartFill className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Trade Volume
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {profile?.totalTradeVolume?.currency
                        ? profile?.totalTradeVolume?.currency
                        : "USD"}{" "}
                      {profile?.totalTradeVolume
                        ? profile?.totalTradeVolume?.amount
                        : "0.00"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <ImBlocked className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Blocked by
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      0
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <ImBlocked className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Has Blocked
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      0
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
