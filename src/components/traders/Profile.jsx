import React from "react";
import Stats from "../account/Stats";
import ActiveOffers from "../account/ActiveOffers";
import Hero from "../account/Hero";
import TradeHistory from "../account/TradeHistory";
import Achievements from "../account/Achievements";
import Feedbacks from "../account/Feedbacks";

const Profile = ({ Heading, profile, loading }) => {
  return (
    <div className="flex-1 flex gap-[5px]">
      <div className="flex-1 flex flex-col gap-[5px]">
        <Hero profile={profile} loading={loading} Heading={Heading} />
        <Stats profile={profile} loading={loading} />
        <Achievements profile={profile} loading={loading} />
        <div className="md:hidden flex">
          <ActiveOffers profile={profile} loading={loading} />
        </div>
        <TradeHistory profile={profile} loading={loading} />
        <Feedbacks />
      </div>
      <div className="md:flex hidden md:w-[320px]">
        <ActiveOffers profile={profile} loading={loading} />
      </div>
    </div>
  );
};

export default Profile;
