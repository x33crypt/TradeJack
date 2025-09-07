import React from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useCalculator } from "@/context/publicContext/CalculatorContext";

const PreTradeCheck = () => {
  const { aboutOffer, setAboutOffer, preTradeCheck } = usePublicOffers();
  const { calculator, setCalculator } = useCalculator();
  const offer = aboutOffer?.data;

  return (
    <>
      {preTradeCheck?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreTradeCheck;
