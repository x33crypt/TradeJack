import React from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Loading from "@/components/others/Loading";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { RiDonutChartFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import NetworkError from "../others/NetworkError";

const Stats = ({ loading, activityStats }) => {
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
            {activityStats === null ? (
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
                      {activityStats?.positiveFeedbacks ?? "1"}
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
                      {activityStats?.negativeFeedbacks ?? "0"}
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
                      {activityStats?.trustScore ?? "0"}%
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
                      {activityStats?.tradePartners ?? "0"}
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
                      {activityStats?.totalTrades ?? "0"}
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
                      {activityStats?.tradeVolume?.currency ?? "USD"}{" "}
                      {activityStats?.tradeVolume?.amount ?? "0.00"}
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
                      {activityStats?.blockedBy ?? "0"}
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
                      {activityStats?.hasBlocked ?? "0"}
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
