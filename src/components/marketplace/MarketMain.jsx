import React from "react";
import { TbReload } from "react-icons/tb";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import VendorCard from "./VendorCard";

const MarketMain = () => {
  return (
    <div className="flex flex-col gap-[35px]">
      <div className="px-[20px] py-[15px] bg-tradeAsh flex gap-[3px] flex-col rounded-[5px]">
        <p className="text-[24px] text-white font-[600] ">
          Explore and Trade Assets Seamlessly
        </p>
        <p className="text-neutral-500 text-[15px]">
          A trusted marketplace where connections thrive, trades excel, and
          opportunities abound.
        </p>
      </div>
      <div className="flex items-center justify-between border border-neutral-600 rounded-[8px] p-[15px]">
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <p className="font-[800] text-[15px] text-neutral-500">Asset :</p>
            <div className="rounded-[5px] overflow-hidden">
              <select
                className=" py-[4px] px-[5px]  text-[15px] outline-none cursor-pointer"
                name=""
                id=""
              >
                <option value="">Cashapp</option>
                <option value="">Zelle</option>
                <option value="">Apple Pay</option>
                <option value="">E-transfer</option>
                <option value="">Western Union</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <p className="font-[800] text-[15px] text-neutral-500">Sort :</p>
            <div className=" rounded-[5px] overflow-hidden">
              <select
                className="py-[4px] px-[5px] text-[15px] outline-none cursor-pointer"
                name=""
                id=""
              >
                <option value="">Trade Rate: Lowest to Highest </option>
                <option value="">Trade Rate: Highest to Lowest</option>
                <option value="">Trust Score: Lowest to Highest</option>
                <option value="">Trust Score: Highest to Lowest</option>
                <option value="">Trade Speed: Fastest to Slowest</option>
                <option value="">Trade Speed: Slowest to Fastest</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <p className="font-[800] text-[15px] text-neutral-500">Offer :</p>
            <div className=" bg-white rounded-[5px] overflow-hidden">
              <select
                className="py-[4px] px-[5px] text-[15px] outline-none cursor-pointer"
                name=""
                id=""
              >
                <option value="">Default</option>
                <option value="">Online vendors</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center text-[15px] px-[20px] py-[4px] gap-[15px] bg-tradePurple text-white font-[400] rounded-[5px] cursor-pointer">
          <p>Search Offers</p>
          <TbReload />
        </div>
      </div>
      <div className="flex flex-col gap-[20px] border border-neutral-600 rounded-[10px] p-[15px]">
        <div className="bg-[rgb(231,206,109)] px-[20px] py-[5px]">
          <p className="font-[600]">Promoted Offers</p>
        </div>
        <div className="grid grid-cols-3 gap-[15px] items-center">
          <VendorCard />
          <VendorCard />
          <VendorCard />
        </div>
      </div>
      <div className="flex flex-col gap-[20px] border border-neutral-600 rounded-[10px] p-[15px]">
        <div className="bg-[rgb(231,206,109)] px-[20px] py-[5px]">
          <p className="font-[600]">Other Offers</p>
        </div>
        <div className="grid grid-cols-3 gap-[15px] items-center">
          <VendorCard />
          <VendorCard />
          <VendorCard />
        </div>
      </div>
    </div>
  );
};

export default MarketMain;
