import React, { useRef, useEffect, useCallback } from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiRoundKnob } from "react-icons/gi";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import { useAccount } from "@/context/AccountContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";

const Stats = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();
  const { account, setAccount } = useAccount();
  const { view } = account;

  return (
    <div className={`${view === "Stats" ? "flex" : "hidden"} flex-1 p-[15px] `}>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-1">
          {profile === null ? (
            <NetworkError />
          ) : (
            <div className="flex-1 flex flex-col md:flex-row gap-[15px]">
              <div className=" lg:sticky top-[140px] max-h-max md:w-[310px] flex flex-col gap-[10px] ">
                <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-bold">
                      {profile?.feedback?.positive}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Positive Feedback
                    </p>
                  </div>
                  <div className="p-1  rounded-full bg-[#00de82]/30 ">
                    <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-bold">
                      {profile?.feedback?.negative}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Negative Feedback
                    </p>
                  </div>
                  <div className="p-1  rounded-full bg-red-600/30">
                    <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-bold">
                      {profile?.trustScore}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Trust Score
                    </p>
                  </div>
                  <div className="p-1  rounded-full bg-tradeOrange/30">
                    <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
                  </div>
                </div>
                {/* <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
          <div className="flex flex-col gap-1">
            <p className="text-white text-base font-bold">
              {profile?.totalTradeVolume?.amount}{" "}
              {profile?.totalTradeVolume?.currency}
            </p>
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Trade Volume
            </p>
          </div>
          <div className="p-1 rounded-full bg-tradeAshExtraLight/30 border border-tradeFadeWhite">
            <TiChartLine className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
          </div>
        </div> */}
                <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-bold">
                      {profile?.totalTradePartners}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Trade Partners
                    </p>
                  </div>
                  <div className="p-1 rounded-full bg-tradeAshExtraLight/30 border border-tradeFadeWhite">
                    <FaUserFriends className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-base font-bold">
                      {profile?.totalTrades}
                    </p>
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Total Trades
                    </p>
                  </div>
                  <div className="p-1 rounded-full bg-tradeAshExtraLight/30 border border-tradeFadeWhite">
                    <GiRoundKnob className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stats;
