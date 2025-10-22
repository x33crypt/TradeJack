import React, { useState } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import SmallButton from "../buttons/SmallButton";
import Button from "../buttons/Button";
import { FaUserCheck } from "react-icons/fa6";
import { BsFillGiftFill } from "react-icons/bs";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdTimelapse } from "react-icons/md";
import { RiCopperCoinLine } from "react-icons/ri";
import ProgressBar from "../others/ProgressBar";
import { MdPending } from "react-icons/md";
import { LuBatteryCharging } from "react-icons/lu";
import { BiSolidBatteryCharging } from "react-icons/bi";
import { IoFlash } from "react-icons/io5";
import { PiCoinVerticalBold } from "react-icons/pi";
import { IoMdFlash } from "react-icons/io";
import { MdHourglassTop } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { RiCopperCoinFill } from "react-icons/ri";

const TodaysGoal = ({ loading, dashboard }) => {
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
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                      TODAY
                    </p>

                    <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                      WEEK
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
                      <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[15px] p-2 w-max cursor-pointer">
                        <RiCopperCoinFill className="text-xl text-white" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-[13px] font-semibold text-white">
                          Complete a trade in 45 minutes
                        </p>

                        <p className="text-xs text-tradeFadeWhite font-semibold">
                          50 Points
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

export default TodaysGoal;
