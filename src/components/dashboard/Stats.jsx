import React from "react";
import { LuFileCheck2 } from "react-icons/lu";
import { LuFileX2 } from "react-icons/lu";
import { LuFileClock } from "react-icons/lu";
import { LuFileSearch } from "react-icons/lu";
import { LuFileChartColumn } from "react-icons/lu";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const Stats = ({ loading, dashboard }) => {
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          TRADE STATS
        </p>
      </div>

      <div className="flex flex-1 min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-col gap-[10px] flex-1">
                <div className="flex w-full md:min-w-[400px] flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                  <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                    <LuFileChartColumn className="text-lg text-tradeFadeWhite" />
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <p className="text-xs font-medium text-tradeFadeWhite">
                      Total Trades
                    </p>
                    <p className="text-white text-sm font-bold leading-none">
                      {dashboard?.tradeStats?.totalTrades ?? "0"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[10px]">
                  <div className="flex min-w-[150px md:min-w-[200px] flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                    <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                      <LuFileCheck2 className="text-lg text-tradeFadeWhite" />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <p className="text-xs font-medium text-tradeFadeWhite">
                        Completed
                      </p>
                      <p className="text-white text-sm font-bold leading-none">
                        {dashboard?.tradeStats?.completedTrades ?? "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[150px md:min-w-[200px] flex-grow flex-shrink-0 gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                    <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                      <LuFileX2 className="text-lg text-tradeFadeWhite" />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <p className="text-xs font-medium text-tradeFadeWhite">
                        Cancelled
                      </p>
                      <p className="text-white text-sm font-bold leading-none">
                        {dashboard?.tradeStats?.cancelledTrades ?? "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[150px md:min-w-[200px] flex-grow flex-shrink-0  gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                    <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                      <LuFileClock className="text-lg text-tradeFadeWhite" />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <p className="text-xs font-medium text-tradeFadeWhite">
                        In Progress
                      </p>
                      <p className="text-white text-sm font-bold leading-none">
                        {dashboard?.tradeStats?.inProgressTrades ?? "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[150px md:min-w-[200px] flex-grow flex-shrink-0  gap-[10px] items-center border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                    <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                      <LuFileSearch className="text-lg text-tradeFadeWhite" />
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <p className="text-xs font-medium text-tradeFadeWhite">
                        Disputed
                      </p>
                      <p className="text-white text-sm font-bold leading-none">
                        {dashboard?.tradeStats?.disputedTrades ?? "0"}
                      </p>
                    </div>
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
