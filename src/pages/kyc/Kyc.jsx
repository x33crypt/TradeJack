import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/InAppNav";
import img from "../../../public/Fingerprint-bro.svg";
import Button from "@/components/buttons/Button";
import Footer from "@/components/Footer";
import DashSideNav from "@/components/dashboard/DashSideNav";
import { CgDanger } from "react-icons/cg";
import SideNav from "@/components/account/nav/SideNav";

import KycStatus from "@/components/account/kyc/KycStatus";
import KycDetails from "@/components/account/kyc/KycDetails";
import KycBenefits from "@/components/account/kyc/KycBenefits";

const Kyc = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <SideNav />
        <div className="flex-1 flex flex-col gap-[10px]">
          <KycStatus />
          <KycDetails />
          <KycBenefits />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Kyc;
