import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React from "react";
import PersonalInfo from "@/components/account/Profile";
import HeroEdit from "@/components/account/profile/HeroEdit";
import { useProfile } from "@/context/ProfileContext";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useAccount } from "@/context/AccountContext";
import ViewOptions from "@/components/account/ViewOptions";
import Stats from "@/components/account/Stats";

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
          <div></div>

          <div className="flex flex-col flex-1">
            <HeroEdit profile={profile} />
            <ViewOptions />
            <PersonalInfo profile={profile} view={view} />
            <Stats profile={profile} view={view} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
