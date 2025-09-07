import React from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import LockByScroll from "@/components/others/LockByScroll";
import { PiSpinnerGapBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { MdSafetyCheck } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { GrSecure } from "react-icons/gr";

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
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Running Pre-Trade Checks
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                <div className="flex-1 flex flex-col justify-between gap-[10px]">
                  <p className="text-tradeFadeWhite text-xs font-semibold leading-normal">
                    Hang tight, we’re verifying all details to ensure your trade
                    is secure.
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-between gap-[10px]">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-1">
                      <GoDotFill className="text-sm text-tradeFadeWhite" />
                      <p className="text-[13px] text-white font-semibold">
                        Validating trade amount
                      </p>
                    </div>
                    <div>
                      <IoMdCheckmarkCircle className="text-base text-tradeGreen" />
                    </div>
                  </div>

                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-1">
                      <GoDotFill className="text-sm text-tradeFadeWhite" />
                      <p className="text-[13px] text-white font-semibold">
                        Securing escrow funds
                      </p>
                    </div>
                    <div>
                      <PiSpinnerGapBold className="text-base text-tradeFadeWhite" />
                    </div>
                  </div>

                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-1">
                      <GoDotFill className="text-sm text-tradeFadeWhite" />
                      <p className="text-[13px] text-white font-semibold">
                        Verifying vendor status
                      </p>
                    </div>
                    <div>
                      <MdPending className="text-base text-tradeOrange" />
                    </div>
                  </div>
                  {/* <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-1">
                      <GoDotFill className="text-sm text-tradeFadeWhite" />
                      <p className="text-[13px] text-white font-semibold">
                        Launching live trade
                      </p>
                    </div>
                    <div>
                      <MdPending className="text-base text-tradeOrange" />
                    </div>
                  </div> */}
                </div>

                {/* <div className="flex flex-col gap-3">
                  <div className="flex w-full items-center justify-center">
                    <p className="font-semibold text-tradeFadeWhite">Secured</p>
                    <GrSecure className="text-3xl text-tradeFadeWhite" />
                  </div>

                  <div>p</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreTradeCheck;
