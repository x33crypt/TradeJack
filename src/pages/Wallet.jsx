import DashSideNav from "@/components/dashboard/DashSideNav";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import LinkedAccount from "@/components/wallet/LinkedAccount";
import MyWallet from "@/components/wallet/MyWallet";
import WalletMain from "@/components/wallet/MyWallet";
import Overview from "@/components/wallet/Overview";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React from "react";

const Wallet = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex gap-[10px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <MyWallet />
            <Overview />
          </div>
          <RecentTransaction />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
