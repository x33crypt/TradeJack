import Footer from "@/components/others/Footer";
import MarketTopNav from "@/components/others/InAppNav";
import React from "react";
import PersonalInfo from "@/components/account/Profile";
import HeroEdit from "@/components/account/HeroEdit";
import { useProfile } from "@/context/userContext/ProfileContext";
import { useFetchProfile } from "@/hooks/userHooks/useFetchProfile";
import Stats from "@/components/account/Stats";
import Achievements from "@/components/account/Achievements";
import Feedbacks from "@/components/account/Feedbacks";

const Account = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();

  console.log("Hero Edit", profile);

  return (
    <>
      <MarketTopNav />
      <div className=" md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <div className="flex-1 flex flex-col gap-[5px]">
          <HeroEdit profile={profile} loading={loading} />
          <div className="md:hidden flex">
            <PersonalInfo profile={profile} loading={loading} />
          </div>
          <Stats profile={profile} loading={loading} />
          {/* <Achievements profile={profile} loading={loading} /> */}
          <Feedbacks profile={profile} loading={loading} />
        </div>
        <div className="md:flex hidden md:w-[320px]">
          <PersonalInfo profile={profile} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
