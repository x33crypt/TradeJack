import Profile from "@/components/traders/Profile";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import { useTraderProfile } from "@/context/publicContext/ProfileContext";

const AboutTrader = () => {
  const { profile } = useTraderProfile();
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <Profile Heading={"About Trader"} profile={profile} />
      </div>
      <Footer />
    </>
  );
};

export default AboutTrader;
