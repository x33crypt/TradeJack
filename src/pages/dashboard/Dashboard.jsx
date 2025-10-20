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
import RecentTransaction from "@/components/wallet/RecentTransaction";

const Dashboard = () => {
  const { dashboard } = useDashboard();
  const { loading } = useFetchDashboard();

  console.log(dashboard);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {/* dashboard === null ? */}
              {false ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
                  <DasHboardMenu />
                  <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
                    <Balance dashboard={dashboard} />
                    <Stats dashboard={dashboard} />
                    <TodaysGoal dashboard={dashboard} loading={loading} />
                    <RecentTransaction />
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
