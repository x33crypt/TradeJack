import About from "@/components/tradePartners/About";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";

const PartnerProfile = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <About />
      </div>
      <Footer />
    </>
  );
};

export default PartnerProfile;
