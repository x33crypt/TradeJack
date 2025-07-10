import DashSideNav from "@/components/dashboard/DashSideNav";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import LinkedAccount from "@/components/wallet/LinkedAccount";
import MyWallet from "@/components/wallet/MyWallet";
import Overview from "@/components/wallet/Overview";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React from "react";
import { useTransaction } from "@/context/wallet/TransactionContext";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";

const Wallet = () => {
  const { loading, error } = useFetchTransactions();
  const { transactions } = useTransaction();

  console.log("Wallet Transaction", transactions);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex gap-[10px] bg-black ">
        <DasHboardMenu />
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <div className="flex flex-col gap-[10px] flex-1 ">
              <MyWallet />
              {/* <Options /> */}
              <LinkedAccount />
            </div>

            <Overview />
          </div>
          <RecentTransaction transactions={transactions} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wallet;
