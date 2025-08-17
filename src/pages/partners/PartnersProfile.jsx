import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import Profile from "@/components/traders/Profile";

const PartnersProfile = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <Profile Heading={"Partner Profile"} profile={false} loading={false} />
      </div>
      <Footer />
    </>
  );
};

export default PartnersProfile;
