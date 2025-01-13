import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import DashMain from "@/components/dashboard/DashMain";
import DashSide from "@/components/dashboard/DashSide";
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <>
      <DashTopNav />
      <div className="pt-[90px] flex bg-tradeBlack">
        <div>
          <DashSideNav />
        </div>
        <div className="flex flex-1 p-[25px] gap-[25px] ">
          <DashMain />
          <DashSide />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
