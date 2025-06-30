import React from "react";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";

const KycDetails = () => {
  const navigateTo = useNavigate();

  const nextButton = () => {
    navigateTo("/settings/account/kycVerify/1");
  };

  return (
    <div>
      {false ? (
        <div className="flex flex-col w-full h-full md:border-x md:border-b md:border-t border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-[700]">KYC Details</p>
          </div>

          <div className="p-[15px] flex">
            <p className="text-red-500 hover:text-red-600 font-semibold underline-offset-4 hover:underline transition-colors cursor-pointer duration-200">
              Not verified
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full  md:border-x md:border-b md:border-t border-neutral-800">
          <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-[700]">KYC Details</p>
          </div>

          <div className="flex flex-col gap-[15px] p-[15px] min-h-[300px] items-center justify-center h-full text-center">
            <p className="text-white text-lg leading-none font-semibold">
              No KYC Record Found
            </p>
            <p className="text-tradeFadeWhite text-[13px] font-medium">
              In order to access all feature of the app we do need to{" "}
              <span className="text-white">verify your profile</span>
            </p>
            <Button variant="primary" onClick={nextButton}>
              Start Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycDetails;
