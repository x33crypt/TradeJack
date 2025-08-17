import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
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
        <div className="flex lg:w-[300px] w-full">
          <SettingsNav />
        </div>
        <div className="lg:flex hidden flex-1 gap-[5px]">
          {/* <HeroEdit />
          <Stats />
          <Profile />
          <Achievements /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
