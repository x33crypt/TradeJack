import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import MarketTopNav from "@/components/MarketTopNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/Footer";

const Marketplace = () => {
  return (
    <>
      <MarketTopNav />
      <div className="pt-[90px] flex bg-tradeBlack">
        <div>
          <DashSideNav />
        </div>
        <div className="flex-1 p-[25px]">
          <MarketMain />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
