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
        <div className="flex flex-1 flex-col gap-[5px]">
          <div className="flex md:flex-ro flex-col gap-[5px]">
            <div className="flex-1 flex flex-col md:flex-row gap-[5px] ">
              <Balance dashboard={dashboard} />
              <div className="flex md:w-[320px]">
                <Limits />
              </div>
            </div>
            <Stats dashboard={dashboard} />

            <div className="flex flex-col md:flex-row gap-[5px]">
              <TopPicks dashboard={dashboard} loading={loading} />
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
