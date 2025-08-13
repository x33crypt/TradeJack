import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";
import PartnersNav from "@/components/tradePartners/PartnersNav";
import About from "@/components/tradePartners/About";

const TradePartners = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <div className="flex md:w-[280px] flex-1 md:flex-none">
          <PartnersNav />
        </div>
        <div className="md:flex hidden flex-1 gap-[5px] ">
          <About />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TradePartners;
