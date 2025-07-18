import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import Performance from "@/components/account/profile/Performance";
import PersonalInfo from "@/components/account/profile/PersonalInfo";
import StatsBoard from "@/components/account/profile/StatsBoard";
import HeroEdit from "@/components/account/profile/HeroEdit";
import { useProfile } from "@/context/ProfileContext";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import StateHandler from "@/components/stateHandler/StateHandler";

const UserProfile = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  console.log("Hero Edit", profile);

  return (
    <>
      <MarketTopNav />
      <StateHandler loading={loading} error={error}>
        <div className="flex flex-col min-h-svh bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[60px] gap-[10px]">
          <div className="flex flex-col w-full h-full md:border-x md:border-b md:border-t border-neutral-800">
            <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">My Profile</p>
            </div>
            <div className="flex bg-tradeOrang lg:flex-row flex-col lg:items-center lg:gap-[50px] md:gap-0 gap-[10px] rounded-[10px] lg:rounded-none overflow-hidden">
              <HeroEdit profile={profile} />
              <div className="border-t lg:border-r lg:h-[100px] border-tradeAshLight md:flex hidden ">
                <p className="hidden">g</p>
              </div>
              <StatsBoard profile={profile} />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <PersonalInfo profile={profile} />

            <div className="lg:w-[350px] ">
              <Performance />
            </div>
          </div>
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default UserProfile;
