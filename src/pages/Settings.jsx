import SideNav from "@/components/account/nav/SideNav";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";
import MobileSettings from "@/components/settings/mobileScreen/MobileSetting";
import DesktopSetting from "@/components/settings/desktopScreen/DesktopSetting";

const Settings = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <SideNav />
        <DesktopSetting />
        <MobileSettings />
      </div>
      <Footer />
    </>
  );
  h;
};

export default Settings;
