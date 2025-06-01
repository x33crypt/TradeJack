import MyOfferCard from "@/components/cards/MyOfferCard";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";

const MyOffer = () => {
  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col min-h-svh bg-black lg:px-[15%] md:px-[5%]">
        <div className="flex-1 min-h-svh md:pt-[80px] pt-[60px]">
          <div className="flex flex-col gap-[px] h-full md:border-x md:border-t md:border-b border-neutral-800">
            <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-[17px] text-white font-[700]">My Offers</p>
            </div>
            <div className="p-[15px]">
              <MyOfferCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOffer;
