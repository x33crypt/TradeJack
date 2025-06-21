import React, { useEffect } from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashMain from "@/components/dashboard/DashMain";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import { useDashboard } from "@/context/DashboardContext";

const Dashboard = () => {
  const { dashboard } = useDashboard();

  console.log(dashboard);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[62px] pb-[10px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[10px] bg-black">
        <DashSideNav />
        <DashMain />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
