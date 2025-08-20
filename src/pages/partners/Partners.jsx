import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React from "react";
import PartnersNav from "@/components/partners/PartnersNav";
import { FaUserFriends } from "react-icons/fa";

const Partners = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black">
        <div className="flex lg:w-[300px] w-full">
          <PartnersNav />
        </div>
        <div className="lg:flex hidden items-center justify-center flex-1 gap-[5px]">
          <div className="flex flex-col gap-[10px] items-center">
            <FaUserFriends className="text-tradeGreen text-[40px]" />
            <p className="text-white font-semibold text-lg leading-none">
              Trade Partners
            </p>
            <p className="text-tradeFadeWhite font-semibold text-[13px]">
              View and manage your trusted trading partners.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Partners;
