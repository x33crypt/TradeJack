import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import SettingsNav from "@/components/settings/SettingsNav";
import { RiUserSettingsFill } from "react-icons/ri";

const Settings = () => {
  return (
    <>
      <InAppNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex lg:w-[300px] w-full">
          <SettingsNav />
        </div>
        <div className="lg:flex hidden items-center justify-center flex-1 gap-[5px]">
          <div className="flex flex-col gap-[10px] items-center">
            <RiUserSettingsFill className="text-tradeGreen text-[40px]" />
            <p className="text-white font-semibold text-lg leading-none">
              Settings
            </p>
            <p className="text-tradeFadeWhite font-semibold text-[13px]">
              Select a setting from the menu to get started.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
