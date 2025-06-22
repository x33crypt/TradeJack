import React, { useRef, useEffect, useCallback } from "react";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TiChartLine } from "react-icons/ti";
import { GiRoundKnob } from "react-icons/gi";

const StatsBoard = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const animateCount = (start, end, duration, id, suffix = "") => {
    const element = document.getElementById(id);
    if (!element || typeof end !== "number" || start === end) return;

    const range = end - start;
    const increment = range > 0 ? 1 : -1;
    const stepTime = Math.max(16, Math.floor(duration / Math.abs(range)));

    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = `${current.toLocaleString()}${suffix}`;

      if (
        (increment > 0 && current >= end) ||
        (increment < 0 && current <= end)
      ) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  const animator = useCallback(() => {
    animateCount(1, 420, 2000, "positive", "K+");
    animateCount(1, 15, 4000, "negative", "");
    animateCount(1, 56, 4000, "trust", "%");
    animateCount(1, 35, 2000, "tradeVolume", "M+ NGN");
    animateCount(1, 5, 4000, "vendor", "");
    animateCount(1, 565, 2000, "totalTrade", "");
    animateCount(1, 42, 2000, "tradePartners", "");
  }, []);

  useEffect(() => {
    if (!desktopRef.current && !mobileRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Component is in view!");
          animator();
          // Unobserve both to prevent re-triggering
          if (desktopRef.current) observer.unobserve(desktopRef.current);
          if (mobileRef.current) observer.unobserve(mobileRef.current);
        }
      });
    });

    if (desktopRef.current) observer.observe(desktopRef.current);
    if (mobileRef.current) observer.observe(mobileRef.current);

    return () => {
      if (desktopRef.current) observer.unobserve(desktopRef.current);
      if (mobileRef.current) observer.unobserve(mobileRef.current);
    };
  }, [animator]);

  return (
    <>
      {/* Desktop & Tablet View */}
      <div
        ref={desktopRef}
        className="flex-1 md:flex hidden items-center bg-tradeOrang p-[15px] lg:p-0 border md:border-0 border-tradeAshLight rounded-[12px] bg-tradeAsh lg:bg-transparent"
      >
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-[35px] bg-tradeOrang w-full h-max">
          <div className="flex w-full flex-col gap-2 bg-tradeGree">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Positive Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-[#00de82]/30 ">
                <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="positive"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-tradeGree">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Negative Feedback
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1  rounded-full bg-red-600/30">
                <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="negative"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">Trust Score</p>
            <div className="flex gap-2">
              <div className="p-1  rounded-full bg-tradeOrange/30">
                <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Volume
            </p>

            <div className="flex items-end gap-2">
              <p
                id="tradeVolume"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Partners
            </p>

            <div className="flex items-end gap-2">
              <p
                id="tradePartners"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <p className="text-tradeFadeWhite text-xs font-bold">Total Trade</p>

            <div className="flex items-end gap-2">
              <p
                id="totalTrade"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div
        ref={mobileRef}
        className="flex md:hidden flex-col  p-[15px]  gap-[10px]"
      >
        <div className="flex flex-col  bg-tradeAsh  border border-tradeAshLight rounded-[10px] overflow-hidden">
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Positive Feedback
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-[#00de82]/30 ">
                <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="positive"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Negative Feedback
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-red-600/30">
                <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="negative"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 ">
            <p className="text-tradeFadeWhite text-xs font-bold">Trust Score</p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeOrange/30">
                <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
              </div>
              <p
                id="trust"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  bg-tradeAsh border border-tradeAshLight  rounded-[10px] overflow-hidden">
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Volume
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshLight/30">
                <TiChartLine className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="tradeVolume"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 border-b border-tradeAshLight ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Trade Partners
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshExtraLight/30 ">
                <FaUserFriends className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="tradePartners"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
          <div className="flex p-[12px] w-full flex-col gap-2 ">
            <p className="text-tradeFadeWhite text-xs font-bold">
              Total Trades
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="p-1  rounded-full bg-tradeAshLight/30">
                <GiRoundKnob className="text-white text-[13px] md:text-sm leading-none" />
              </div>

              <p
                id="totalTrade"
                className="text-[18px] md:text-[22px] text-white font-[900] leading-none"
              >
                0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsBoard;
