import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React from "react";
import PersonalInfo from "@/components/account/Profile";
import HeroEdit from "@/components/account/HeroEdit";
import { useProfile } from "@/context/userContext/ProfileContext";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import Stats from "@/components/account/Stats";
import Achievements from "@/components/account/Achievements";
import SettingsNav from "@/components/settings/SettingsNav";
import Feedbacks from "@/components/account/Feedbacks";

const Account = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  console.log("Hero Edit", profile);

  return (
    <>
      <MarketTopNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="hidden lg:flex">
          <SettingsNav />
        </div>
        <div className="flex-1 flex flex-col gap-[5px]">
          <HeroEdit profile={profile} loading={loading} />
          <PersonalInfo profile={profile} loading={loading} />
          <Stats profile={profile} loading={loading} />
          <Achievements profile={profile} loading={loading} />
          <Feedbacks profile={profile} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
