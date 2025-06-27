import React from "react";

const OfferInstruction = () => {
  return (
    <div className="flex flex-col flex-1  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Offer Instructions</p>
      </div>

      <div className="flex-1 flex md:flex-row flex-col bg-tradeAs p-[15px] gap-[10px] overflow-y-auto">
        <p className="text-white text-[13px] leading-relaxed">
          IF I CLAIM THE PAYMENT AND IT HAS NOT BEEN ENTERED INTO MY ACCOUNT IN
          THE PROVIDED TIME, YOU MUST SEND A VIDEO RECORDING FROM THE SOFI
          ACCOUNT TO WHICH THE PAYMENT WAS SENT AND VERIFY THE STATUS. OTHERWISE
          I WILL SEND THE TRADE TO DISPUTE AND REPORT IT.
        </p>
      </div>
    </div>
  );
};

export default OfferInstruction;
