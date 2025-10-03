import React, { useEffect, useState } from "react";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import { useFetchDashboard } from "@/hooks/userHooks/useFetchDashboard";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import Performance from "@/components/dashboard/Performance";
import { useDashboard } from "@/context/userContext/DashboardContext";
import Balance from "@/components/dashboard/Balance";
import Stats from "@/components/dashboard/Stats";
import RecentTrades from "@/components/dashboard/RecentTrades";
import TodaysGoal from "@/components/dashboard/TodaysGoal";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import FloatingTradeButton from "@/components/others/FloatingTradeButton";

const Dashboard = () => {
  const { dashboard } = useDashboard();
  const { loading } = useFetchDashboard();

  console.log(dashboard);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {dashboard === null ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[5px]">
                  <DasHboardMenu />
                  <div className="flex flex-1 flex-col gap-[5px]">
                    <div className="flex flex-1 flex-col md:flex-row gap-[5px]">
                      <div className="flex-1 flex flex-col gap-[5px] ">
                        <Balance dashboard={dashboard} />
                        <Stats dashboard={dashboard} />
                      </div>
                      <div className="flex flex-col md:w-[320px] gap-[5px]">
                        <TodaysGoal dashboard={dashboard} loading={loading} />
                      </div>
                    </div>
                    <Performance dashboard={dashboard} />
                    <RecentTrades />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <FloatingTradeButton />
      <Footer />
    </>
  );
};

export default Dashboard;
