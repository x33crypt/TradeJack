import MyOfferCard from "@/components/cards/MyOfferCard";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";

const MyOffer = () => {
  return (
    <>
      <InAppNav />
      <div className="flex flex-col min-h-svh bg-black lg:px-[2.5%] md:px-[5%] md:pt-[80px] pt-[60px] relative">
        <div className="flex flex-col w-full h-full md:border-x md:border-t md:border-b border-neutral-800">
          <div className="flex items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-[17px] text-white font-[700]">My Offers</p>
          </div>

          <div className="flex flex-col gap-[5px] px-[15px] relative">
            <div className=" gap-[10px] sticky top-[80px] py-[15px] flex ">
              <p
                className={`${
                  true
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] lg:text-[13px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                All
              </p>
              <p
                className={`${
                  false
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] lg:text-[13px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Active
              </p>
              <p
                className={`${
                  false
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] lg:text-[13px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Inactive
              </p>
            </div>
          </div>

          <div className="p-[15px]">
            <MyOfferCard />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOffer;
