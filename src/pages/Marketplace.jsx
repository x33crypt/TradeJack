import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import MarketTopNav from "@/components/MarketTopNav";
import MarketMain from "@/components/marketplace/MarketMain";
import MarketSide from "@/components/marketplace/MarketSide";

const Marketplace = () => {
  return (
    <>
      <MarketTopNav />
      <div className="pt-[90px] bg-tradeBlack">
        <DashSideNav />
        <div className="ml-[220px] p-[25px]">
          <MarketMain />
        </div>
      </div>
    </>
  );
};

export default Marketplace;
