import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import Performance from "@/components/account/profile/Performance";
import PersonalInfo from "@/components/account/Profile";
import StatsBoard from "@/components/account/Stats";
import HeroEdit from "@/components/account/profile/HeroEdit";
import { useProfile } from "@/context/ProfileContext";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import StateHandler from "@/components/stateHandler/StateHandler";
import ProfileNav from "@/components/ProfileNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import { useAccount } from "@/context/AccountContext";

const Account = () => {
  const { account, setAccount } = useAccount();
  const { view } = account;
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  console.log("Hero Edit", profile);
  console.log("Page in View : ", view);

  return (
    <>
      <MarketTopNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex flex-col w-full min-h-svh md:border border-neutral-800">
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">Account</p>
          </div>

          <div className="flex flex-col">
            <HeroEdit profile={profile} />
            <div className=" bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
                <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                  <div
                    className={`${
                      view === "Profile"
                        ? "text-tradeOrange bg-tradeOrange/20 border-tradeOrange"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Profile</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Stats</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Promotions</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Security & Access</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Privacy & Safety</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Notifications</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Invite a Friend</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Rewards</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Help & Support</p>
                  </div>
                </div>
                <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Community</p>
                  </div>
                  <div
                    className={`${
                      false
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>About</p>
                  </div>
                </div>
              </div>
            </div>
            <PersonalInfo profile={profile} view={view} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
