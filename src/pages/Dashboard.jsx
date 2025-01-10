import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import DashMain from "@/components/dashboard/DashMain";
import DashSide from "@/components/dashboard/DashSide";

const Dashboard = () => {
  return (
    <>
      <DashTopNav />
      <div className="pt-[90px] flex bg-tradeBlack">
        <DashSideNav />
        <div className="ml-[220px] px-[25px] py-[20px] flex gap-[25px] ">
          <DashMain />
          <DashSide />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
