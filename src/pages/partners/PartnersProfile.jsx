import About from "@/components/tradePartners/About";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import PartnersNav from "@/components/tradePartners/PartnersNav";

const PartnersProfile = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <div className="md:flex hidden md:w-[300px] flex-1 md:flex-none">
          <PartnersNav />
        </div>
        <div className="flex-1 gap-[5px] ">
          <About />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnersProfile;
