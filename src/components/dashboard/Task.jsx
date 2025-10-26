import React, { useState } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import { MdLeaderboard } from "react-icons/md";
import { RiCopperCoinFill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";

const Task = ({ loading, dashboard }) => {
  const [value, setValue] = useState(20);

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          LET'S GO
        </p>
      </div>

      <div className="flex flex-col gap-[10px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex-1 flex flex-col justify-between gap-[25px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                    <TbArrowsSort />
                    <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                      TODAY
                    </p>
                  </div>

                  <div className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                    <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                      LEADERBOARD
                    </p>
                    <MdLeaderboard />
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex items-center w-full h-max flex-grow  gap-[10px] border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                      <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                        <RiCopperCoinFill className="text-lg text-white" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-xs text-tradeFadeWhite font-semibold">
                          50 Points
                        </p>

                        <p className="text-[13px] font-semibold text-white">
                          Complete a trade in 45 minutes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
