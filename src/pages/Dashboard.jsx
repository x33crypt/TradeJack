import React from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashTopNav from "../components/dashboard/DashTopNav";
import DashMain from "@/components/dashboard/DashMain";
import DashSide from "@/components/dashboard/DashSide";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";

const Dashboard = () => {
  return (
    <>
      <InAppNav />
      <div className="flex min-h-screen bg-black lg:px-[2%] md:px-[2.5%]">
        <DashSideNav />
        <DashMain />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
