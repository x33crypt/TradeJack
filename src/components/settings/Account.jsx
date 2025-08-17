import React from "react";
import InAppNav from "../others/InAppNav";
import SideNav from "../account/SideNav";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from "../others/Footer";

const Account = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <SideNav />
        <div className="flex flex-col flex-1 md:border-x md:border-b md:border-t border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <div className="flex gap-[15px] items-center">
              <IoMdArrowRoundBack className="text-white  text-[20px]" />
              <p className="text-lg text-white font-[700]">
                <span className="text-tradeFadeWhite">Settings</span> / account
              </p>
            </div>
            <FaMagnifyingGlass className="text-white  text-[20px]" />
          </div>
          <div className="flex flex-col p-[15px] gap-[10px] bg-tradeAs"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
