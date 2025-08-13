import React from "react";
import Hero from "../account/profile/Hero";
import Stats from "../account/Stats";
import ActiveOffers from "../account/ActiveOffers";
import Feedbacks from "../account/Feedbacks";
import Achievements from "../account/Achievements";

const About = () => {
  return (
    <div className="flex-1 flex flex-col gap-[5px]">
      <Hero />
      <Stats />
      <Achievements />
      <ActiveOffers />
      <Feedbacks />
    </div>
  );
};

export default About;
