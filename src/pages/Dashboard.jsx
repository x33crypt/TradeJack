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
      <MarketTopNav />
      <div className=" lg:pt-[80px] md:pt-[85px] pt-[80px] flex gap-[15px] bg-black lg:p-[2%] md:p-[2.5%] ">
        <DashSideNav />
        <DashMain />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
