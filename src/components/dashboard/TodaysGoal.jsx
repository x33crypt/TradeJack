import React from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import SmallButton from "../buttons/SmallButton";
import Button from "../buttons/Button";
import { FaUserCheck } from "react-icons/fa6";
import { BsFillGiftFill } from "react-icons/bs";

const TodaysGoal = ({ loading, dashboard }) => {
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
                <div className="flex flex-1  flex-col gap-[10px]">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-[12px] bg-tradeAsh rounded-[15px] gap-[10px] border border-tradeAshLight"
                    >
                      <div className="flex justify-between items-center border- border-dashed border-tradeAshLight pb-[10px ">
                        <div
                          className="
                            bg-transparent text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer"
                        >
                          <p className="text-xs font-semibold">Week's task</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <BsFillGiftFill className="text-sm text-tradeOrange" />

                          <p className="text-xs font-semibold text-tradeFadeWhite">
                            5 Credit
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-start ">
                        <div>
                          <p className="text-white font-semibold text-sm leading-normal">
                            Complete a trade within 45 minutes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex  items-center gap-1">
                          <p className="text-xs font-semibold text-tradeFadeWhite">
                            2 completed, 1 more to go
                          </p>
                        </div>

                        <div className="flex  items-center gap-1">
                          <p className="text-xs font-semibold text-tradeFadeWhite">
                            6,307
                          </p>
                          <FaUserCheck className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button>
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
