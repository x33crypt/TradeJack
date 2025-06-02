import MyOfferCard from "@/components/cards/MyOfferCard";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidBinoculars } from "react-icons/bi";

const MyOffer = () => {
  return (
    <>
      <InAppNav />
      <div className="flex flex-col min-h-svh bg-black lg:px-[15%] md:px-[5%] md:pt-[80px] pt-[60px] relative">
        <div className="flex flex-col w-full h-full md:border-x md:border-t md:border-b border-neutral-800">
          <div className="flex items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-[17px] text-white font-[700]">My Offers</p>
          </div>

          <div className=" z-10 sticky top-[60px] flex gap-[5px] px-[15px] bg-black">
            <div className="w-full flex justify-between  gap-[10px] overflow-hidden">
              <div className=" gap-[10px] py-[15px] flex">
                <div className=" flex items-center gap-2 px-[12px] py-[4px] text-tradeOrange  lg:text-[13px] text-[14px] font-[600] rounded-[6.5px] border border-neutral-800 hover:border-tradeOrange md:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <BiSolidBinoculars className="lg:text-[17px] text-[18px]" />
                  <p className=" ">Filter</p>
                </div>
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
              <div className=" gap-[10px] py-[15px] flex">
                <div className=" flex gap-2 text-neutral-500  border-neutral-800 hover:border-tradeGreen hover:text-white items-center justify-center  px-[12px] py-[4px] text-[15px] rounded-[6.5px] border cursor-default transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <FaMagnifyingGlass className="text-tradeGreen" />
                  <p className=" lg:text-[13px] text-[14px] font-[600]">
                    Search
                  </p>
                </div>
              </div>
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
