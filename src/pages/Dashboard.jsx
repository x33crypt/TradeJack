import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import { useFetchDashboard } from "@/hooks/useFetchDashboard";
import StateHandler from "@/components/stateHandler/StateHandler";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import Performance from "@/components/dashboard/Performance";
import { useDashboard } from "@/context/DashboardContext";
import Balance from "@/components/dashboard/Balance";
import Limits from "@/components/dashboard/Limits";
import Ads from "@/components/dashboard/Ads";
import Stats from "@/components/dashboard/Stats";
import RecentTrades from "@/components/dashboard/RecentTrades";

const Dashboard = () => {
  const { dashboard } = useDashboard();
  const { loading, error } = useFetchDashboard();

  console.log(dashboard);

  return (
    <>
      <InAppNav />
      <StateHandler loading={loading} error={error}>
        <div className="md:pt-[64px] pt-[62px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[10px] bg-black">
          <DasHboardMenu />
          <div className="flex-1 flex flex-col md:gap-[10px] ">
            <div className="flex lg:flex-row flex-col flex-1 md:p-0 gap-[10px]">
              <div className="flex-1 flex flex-col md:border border-t-0 border-tradeAshLight">
                <div className="flex items-center gap-3 p-[15px] border-b border-tradeAshLight">
                  <p className="text-lg font-semibold text-tradeFadeWhite flex items-center gap-1">
                    Welcome back,{" "}
                    <span className=" text-white ">
                      {dashboard?.profile?.username || "User"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col p-[15px] gap-[10px]">
                  <Balance dashboard={dashboard} />
                  <Ads />
                  <Stats dashboard={dashboard} />
                </div>
              </div>
              <div className="lg:w-[350px] w-full lg:flex flex-col gap-[10px]">
                <Limits dashboard={dashboard} />
                <Performance dashboard={dashboard} />
              </div>
            </div>
            <RecentTrades />
          </div>
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default Dashboard;
