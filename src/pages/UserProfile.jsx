import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import Performance from "@/components/profile/Performance";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Hero from "@/components/profile/Hero";
import StatsBoard from "@/components/profile/StatsBoard";
import HeroEdit from "@/components/profile/HeroEdit";
import { useScrollRestoration } from "@/utils/scroll/restoration";

const UserProfile = () => {
  useScrollRestoration();

  return (
    <>
      <MarketTopNav />

      <div className="md:pt-[80px] pt-[75px] pb-[10px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-screen flex flex-col gap-[20px] bg-black">
        <div className="flex lg:flex-row flex-col bg-tradePurpl lg:pb-[15px] md:items-cente gap-[20px] rounded-[10px] lg:rounded-none">
          <HeroEdit />
          <div className="border-t border-tradeAshLight md:flex hidden ">
            <p className="hidden">g</p>
          </div>
          <StatsBoard />
        </div>

        <div className="flex lg:flex-row flex-col gap-[15px] ">
          <Performance />
          <PersonalInfo />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
