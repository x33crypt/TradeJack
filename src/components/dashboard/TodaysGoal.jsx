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
                    // <div
                    //   key={index}
                    //   className="flex items-center w-full h-max flex-grow  gap-[10px] border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]"
                    // >
                    //   <div className="flex flex-1 flex-col gap-4 items-start">
                    //     <div className="flex justify-between items-center gap-1 w-full">
                    //       <div className="flex items-center gap-1">
                    //         <div className="bg-tradeGree text-tradeGreen text-xs flex items-center gap-1 borde border-tradeAshExtraLight h-max rounded-[8px] p- w-max cursor-pointer">
                    //           <PiCoinVerticalBold />
                    //         </div>
                    //         <p className="text-xs text-tradeFadeWhite font-medium">
                    //           50 Points
                    //         </p>
                    //       </div>

                    //       <div className="flex items-center gap-1">
                    //         <div className="bg-tradeGree text-tradeOrange text-xs flex items-center gap-1 borde border-tradeAshExtraLight h-max rounded-[8px] p- w-max cursor-pointer">
                    //           <IoFlash />
                    //         </div>
                    //         <p className="text-xs text-tradeFadeWhite font-medium">
                    //           1h 30m left
                    //         </p>
                    //       </div>
                    //     </div>

                    //     <p className="text-[13px] font-semibold text-white">
                    //       Complete a trade within 45 minutes
                    //     </p>

                    //     <div className="flex justify-between items-center gap-1 w-full">
                    //       <ProgressBar value={80} />
                    //     </div>
                    //   </div>
                    // </div>

                    <div className="flex items-center w-full h-max flex-grow  gap-[10px] border border-tradeAshLight bg-tradeAsh p-[12px] rounded-[15px]">
                      <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                        <IoMdFlash className="text-lg text-tradeOrange" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-[13px] font-semibold text-white">
                          Complete a trade in 45 minutes
                        </p>
                        <div className="flex gap-2">
                          <div className="flex gap-[2px] items-center">
                            <p className="text-xs text-tradeFadeWhite font-semibold">
                              50
                            </p>
                            <PiCoinVerticalBold className="text-sm text-tradeGreen" />
                          </div>

                          <p className="text-xs text-tradeFadeWhite font-semibold">
                            1h 30m left
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                        <MdHourglassTop className="text-lg text-tradeFadeWhite" />
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
