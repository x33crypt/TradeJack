import React from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import LockByScroll from "@/components/others/LockByScroll";
import { MdOutlinePending } from "react-icons/md";
import { PiSpinnerGapBold } from "react-icons/pi";
import { BsDot } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmarkCircle } from "react-icons/io";

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
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              {/* <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Pre-Trade Check
                </p>
              </div> */}

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[10px]">
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GoDotFill className="text-sm text-tradeFadeWhite" />
                    <p className="text-[13px] text-white font-semibold">
                      Validating Trade Amount
                    </p>
                  </div>
                  <div>
                    <IoMdCheckmarkCircle className="text-sm text-tradeGreen" />
                  </div>
                </div>

                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GoDotFill className="text-sm text-tradeFadeWhite" />
                    <p className="text-[13px] text-white font-semibold">
                      Securing Escrow Funds
                    </p>
                  </div>
                  <div>
                    <PiSpinnerGapBold className="text-sm text-tradeFadeWhite" />
                  </div>
                </div>

                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GoDotFill className="text-sm text-tradeFadeWhite" />
                    <p className="text-[13px] text-white font-semibold">
                      Verifying Vendor Status
                    </p>
                  </div>
                  <div>
                    <MdOutlinePending className="text-sm text-tradeOrange" />
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GoDotFill className="text-sm text-tradeFadeWhite" />
                    <p className="text-[13px] text-white font-semibold">
                      Launching Live Trade
                    </p>
                  </div>
                  <div>
                    <MdOutlinePending className="text-sm text-tradeOrange" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreTradeCheck;
