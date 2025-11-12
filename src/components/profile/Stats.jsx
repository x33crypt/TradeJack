import React from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Loading from "@/components/others/Loading";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { RiDonutChartFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import NetworkError from "../others/NetworkError";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const Stats = ({ loading, stats }) => {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          ACTIVITY STATS
        </p>
      </div>

      <div className="flex flex-1 min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {stats === null ? (
              <NetworkError />
            ) : (
              <div className="flex-wrap flex items-center gap-[10px] overflow-x-hidden ">
                <div className="flex min-w-[250px] md:min-w-0 flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdThumbUpAlt className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Positive Feedbacks
                    </p>
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.positiveFeedbacks ?? "1"}
                    </p>
                  </div>
                </div>
                <div className="flex min-w-[250px] md:min-w-0 flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdThumbDownAlt className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Negative Feedbacks
                    </p>
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.negativeFeedbacks ?? "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <MdOutlineHealthAndSafety className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Trust Score
                    </p>
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.trustScore ?? "0"}%
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
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.tradePartners ?? "0"}
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
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.totalTrades ?? "0"}
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
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.tradeVolume?.currency ?? "USD"}{" "}
                      {stats?.tradeVolume?.amount ?? "0.00"}
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
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.blockedBy ?? "0"}
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
                    <p className="text-white text-[13px] font-semibold leading-none">
                      {stats?.hasBlocked ?? "0"}
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
