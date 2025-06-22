import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import Performance from "@/components/profile/Performance";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Hero from "@/components/profile/Hero";
import StatsBoard from "@/components/profile/StatsBoard";
import HeroEdit from "@/components/profile/HeroEdit";
import { useScrollRestoration } from "@/utils/scroll/restoration";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  useScrollRestoration();

  const navigateTo = useNavigate();

  return (
    <>
      <MarketTopNav />

      <div className="md:pt-[80px] pt-[75px] lg:px-[2%] md:px-[2.5%]  min-h-screen flex flex-col gap-[15px] bg-black">
        <div className="z-20 fixed  right-0  left-0 lg:px-[2%] md:px-[2.5%] px-[15px] py-[15px] top-[60px] md:top-[65px] bg-black flex items-center gap-4 border-b border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <IoMdArrowRoundBack
              onClick={() => navigateTo(location?.state?.from || -1)}
              className="text-tradeFadeWhite text-[20px] cursor-pointer"
            />
            <p className="  text-base text-white font-[700]">My Profile</p>
          </div>
        </div>

        <div className="flex mt-[50px] lg:flex-row flex-col lg:items-center lg:gap-[50px] gap-[20px] rounded-[10px] lg:rounded-none overflow-hidden">
          <HeroEdit />
          <div className="border-t lg:border-r lg:h-[100px] border-tradeAshLight md:flex hidden ">
            <p className="hidden">g</p>
          </div>
          <StatsBoard />
        </div>

        <div className="flex lg:flex-row flex-col gap-[10px] ">
          <PersonalInfo />

          <div className="lg:w-[400px] ">
            <Performance />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
