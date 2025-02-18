import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import DashMain from "@/components/dashboard/DashMain";
import DashSide from "@/components/dashboard/DashSide";
import Footer from "@/components/Footer";
import MarketTopNav from "@/components/MarketTopNav";

const Dashboard = () => {
  return (
    <>
      <DashTopNav />
      <div className="lg:pt-[80px] pt-[80px] flex bg-black lg:gap-[10px] p-[2%]">
        <div className="flex flex-col gap-[10px]">
          <DashSideNav />
        </div>
        <div className="flex flex-1">
          <DashMain />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
