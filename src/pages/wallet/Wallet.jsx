import DashSideNav from "@/components/dashboard/DashSideNav";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import LinkedAccount from "@/components/wallet/LinkedAccount";
import MyWallet from "@/components/wallet/MyWallet";
import Overview from "@/components/wallet/Overview";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React, { useEffect, useState, useRef } from "react";
import TopPicks from "@/components/dashboard/TopPicks";

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
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex md:flex-row flex-col gap-[5px] bg-black "
      >
        <div className="flex flex-col md:w-[320px]">
          <MyWallet />
        </div>

        <div className="flex flex-1 flex-col gap-[5px]">
          <div className="flex md:flex-row flex-col gap-[5px]">
            <Overview />
            <div className="flex md:w-[320px]  ">
              <LinkedAccount />
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
