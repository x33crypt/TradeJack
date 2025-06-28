import React from "react";

const KycStatus = () => {
  return (
    <div className="flex flex-col w-full  md:border-x md:border-b md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">KYC Status</p>
      </div>
      <div className="flex flex-col gap-[10px] p-[15px] w-full">
        <p className="text-base text-tradeOrange font-semibold">
          Verification Required
        </p>

        <p className="text-tradeFadeWhite text-[13px] font-medium">
          Verify your identity to unlock full access and build trust with other
          traders. It only takes a few minutes.
        </p>
      </div>
    </div>
  );
};

export default KycStatus;
