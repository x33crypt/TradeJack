import React, { useEffect, useState } from "react";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import { useFetchDashboard } from "@/hooks/userHooks/useFetchDashboard";
import StateHandler from "@/components/stateHandler/StateHandler";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import Performance from "@/components/dashboard/Performance";
import { useDashboard } from "@/context/userContext/DashboardContext";
import Balance from "@/components/dashboard/Balance";
import Stats from "@/components/dashboard/Stats";
import RecentTrades from "@/components/dashboard/RecentTrades";
import TopPicks from "@/components/dashboard/TopPicks";
import Limits from "@/components/dashboard/Limits";

const Dashboard = () => {
  const { dashboard } = useDashboard();
  const { loading, error } = useFetchDashboard();

  console.log(dashboard);

  return (
    <>
      <InAppNav />

      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[5px] bg-black">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col gap-[5px] ">
          <div className="flex lg:flex-row flex-col flex-1 md:p-0 gap-[5px]">
            <div className="flex flex-col flex-1 gap-[5px]">
              <Balance dashboard={dashboard} />
              <Stats dashboard={dashboard} />
              <TopPicks />
            </div>

            <div className="lg:w-[350px] w-full flex flex-col gap-[5px]">
              <Limits />
              <Performance dashboard={dashboard} />
            </div>
          </div>
          <RecentTrades />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
