import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import ProfileMenu from "@/components/profile/user/ProfileMenu";
import Hero from "@/components/profile/user/Hero";
import Stats from "@/components/profile/Stats";
import Feedbacks from "@/components/profile/Feedbacks";
import Info from "@/components/profile/user/Info";
import { useFetchProfile } from "@/hooks/userHooks/useFetchProfile";
import { useProfile } from "@/context/userContext/ProfileContext";

const UserProfile = () => {
  const { loading } = useFetchProfile();
  const { profile } = useProfile();
  const { account, stats, info, feedbacks } = profile;

  console.log("user profile:", profile);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px]">
          <ProfileMenu />
          <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
            <Hero account={account} loading={loading} />
            <Info info={info} loading={loading} />
            <Stats stats={stats} loading={loading} />
            <Feedbacks feedbacks={feedbacks} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
