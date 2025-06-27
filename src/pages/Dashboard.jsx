import React, { useEffect, useState } from "react";
import DashSideNav from "../components/dashboard/DashSideNav";
import DashMain from "@/components/dashboard/DashMain";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";
import StateHandler from "@/components/stateHandler/StateHandler";

const Dashboard = () => {
  const { loading, error } = useFetchDashboard();

  return (
    <>
      <InAppNav />
      <StateHandler loading={loading} error={error}>
        <div className="md:pt-[64px] pt-[62px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[10px] bg-black">
          <DashSideNav />
          <DashMain />
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default Dashboard;
