import DashSideNav from "@/components/dashboard/DashSideNav";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import LinkedAccount from "@/components/wallet/LinkedAccount";
import MyWallet from "@/components/wallet/MyWallet";
import Overview from "@/components/wallet/Overview";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React, { useEffect, useState, useRef } from "react";

const Wallet = () => {
  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black "
      >
        <DasHboardMenu />
        <div className="flex-1 flex flex-col gap-[5px]">
          <div className="flex md:flex-row flex-col gap-[5px] ">
            <div className="flex flex-col gap-[5px] flex-1 ">
              <MyWallet />
              <LinkedAccount />
            </div>

            <div className="flex flex-col gap-[5px] flex-1 md:flex-none md:w-[350px] lg:flex-none ">
              <Overview />
            </div>
          </div>
          <RecentTransaction scrollToTop={scrollToTop} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
