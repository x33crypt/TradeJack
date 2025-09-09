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

const TodaysGoal = ({ loading, dashboard }) => {
  const [value, setValue] = useState(20);

  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Let's Go!</p>
      </div>

      <div className="flex flex-1 min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex-1 flex flex-col justify-between lg:gap-0 gap-[40px]">
                <div className="flex flex-col gap-[10px]">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center w-full h-max flex-grow  gap-[10px] border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]"
                    >
                      {/* <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[10px] p-1 w-max cursor-pointer">
                        <MdOutlineAccessTimeFilled className="text-xl text-tradeFadeWhite" />
                      </div> */}

                      <div className="flex flex-1 flex-col gap-2 items-start">
                        <div className="flex justify-between items-center gap-1 w-full">
                          <div className="bg-tradeAshLight text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight h-max rounded-[8px] p-1 w-max cursor-pointer">
                            <p className="text-xs font-semibold">
                              Today's task
                            </p>
                          </div>

                          <div className="bg-tradeAshLight text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight h-max rounded-[8px] p-1 w-max cursor-pointer">
                            <RiCopperCoinLine className="text-xs text-tradeOrange" />
                            <p className="text-xs font-semibold">50</p>
                          </div>
                        </div>

                        <p className="text-[13px] font-semibold text-white">
                          Complete a trade within 45 minutes
                        </p>

                        <ProgressBar value={10} />
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline">
                  <p>Leaderboard</p>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysGoal;
