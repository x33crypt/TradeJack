import DashSideNav from "@/components/dashboard/DashSideNav";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import LinkedAccount from "@/components/wallet/LinkedAccount";
import MyWallet from "@/components/wallet/Balance";
import Overview from "@/components/wallet/Overview";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React, { useEffect, useState, useRef } from "react";
import TopPicks from "@/components/dashboard/TopPicks";
import WalletMenu from "./WalletMenu";
import Balance from "@/components/wallet/Balance";
import EscrowActivity from "./EscrowActivity";

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
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {false ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {false ? (
                <NetworkError />
              ) : (
                <div
                  ref={topRef}
                  className="flex flex-1 lg:flex-row flex-col gap-[25px] "
                >
                  <WalletMenu />
                  <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
                    <Balance />
                    <EscrowActivity />
                    <RecentTransaction scrollToTop={scrollToTop} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
