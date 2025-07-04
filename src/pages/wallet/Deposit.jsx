import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";

const Deposit = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex-1 flex flex-col h-full md:border border-neutral-800 bg-tradeAs">
            <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg font-[700] text-white">Add Money</p>
            </div>
            <div className="flex flex-col p-[15px] gap-[10px] h-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Deposit;
