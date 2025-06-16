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
      <div className="md:pt-[75px] pt-[75px] pb-[10px] lg:px-[2%] md:px-[2.5%] min-h-svh flex flex-col gap-[20px] bg-black">
        <div className="z-20 fixed lg:right-[2%] md:right[2.5%] right-[2.5%] lg:left-[2%] md:left[2.5%] left-[2.5%] top-[60px] md:top-[65px] bg-black flex items-center gap-4 border-b py-[15px] border-tradeAshLight">
          <div className="flex items-center gap-3 ">
            <p className=" text-base text-white ">
              Welcome back,{" "}
              <small className="text-lg text-white font-[700]">
                {dashboard?.profile?.username}
              </small>
            </p>
          </div>
        </div>

        <div className="flex mt-[48px] lg:flex-row flex-col bg-tradePurpl lg:pb-[15px] md:items-cente gap-[20px] rounded-[10px] lg:rounded-none">
          <DashSideNav />
          <DashMain />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
