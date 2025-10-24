import React, { useEffect, useState } from "react";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import { useFetchDashboard } from "@/hooks/userHooks/useFetchDashboard";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import { useDashboard } from "@/context/userContext/DashboardContext";
import Balance from "@/components/dashboard/Hero";
import Stats from "@/components/dashboard/Stats";
import RecentTrades from "@/components/dashboard/RecentTrades";
import TodaysGoal from "@/components/dashboard/Task";
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
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <DashboardMenu />
          <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
            <Balance dashboard={dashboard} loading={loading} />
            <Stats dashboard={dashboard} loading={loading} />
            <TodaysGoal dashboard={dashboard} loading={loading} />
            <RecentTransaction />
          </div>
        </div>
      </div>
      <FloatingTradeButton />
      <Footer />
    </>
  );
};

export default Dashboard;
