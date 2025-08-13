import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";
import Partners from "@/components/tradePartners/Partners";
import About from "@/components/aboutTrader/About";

const TradePartners = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <div className="flex md:w-[280px] flex-1 md:flex-none">
          <Partners />
        </div>
        <div className="md:flex hidden flex-1 gap-[5px] ">
          <div className="w-full">
            <About />
          </div>
          {/* <div className="flex lg:w-[350px] w-full"></div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TradePartners;
