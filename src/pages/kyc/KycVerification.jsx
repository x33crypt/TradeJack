import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import Button from "@/components/buttons/Button";
import KycVerify from "@/components/kyc/KycVerify";
import Footer from "@/components/others/Footer";

const KycVerification = () => {
  return (
    <>
      <InAppNav />

      <div className=" lg:sticky top-[64px] max-h-max md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-sv flex gap-[5px] bg-black ">
        <KycVerify />
      </div>

      <Footer />
    </>
  );
};

export default KycVerification;
