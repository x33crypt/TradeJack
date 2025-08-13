import React from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import SettingsNav from "@/components/settings/SettingsNav";
import HeroEdit from "@/components/account/HeroEdit";
import Stats from "@/components/account/Stats";
import Profile from "@/components/account/Profile";
import Achievements from "@/components/account/Achievements";

const Settings = () => {
  return (
    <>
      <InAppNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex flex-1 lg:flex-none">
          <SettingsNav />
        </div>
        <div className="flex-1 lg:flex hidden flex-col gap-[5px]">
          <HeroEdit />
          <Stats />
          <Profile />
          <Achievements />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
