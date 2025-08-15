import React from "react";
import Stats from "../account/Stats";
import ActiveOffers from "../account/ActiveOffers";
import Hero from "../account/Hero";
import TradeHistory from "../account/TradeHistory";
import Achievements from "../account/Achievements";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/userContext/ProfileContext";

const About = () => {
  const { loading } = useFetchProfile();
  const { profile } = useProfile();

  return (
    <div className="flex-1 flex flex-col gap-[5px]">
      <Hero profile={profile} loading={loading} Heading={"Partner Profile"} />
      <Stats profile={profile} loading={loading} />
      <Achievements profile={profile} loading={loading} />
      <ActiveOffers profile={profile} loading={loading} />
      <TradeHistory profile={profile} loading={loading} />
    </div>
  );
};

export default About;
