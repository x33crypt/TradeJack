import React, { useEffect, useState } from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import LockByScroll from "@/components/others/LockByScroll";
import { PiSpinnerGapBold } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { useTrade } from "@/context/publicContext/TradeContext";
import Button from "@/components/buttons/Button";
import { GrSecure } from "react-icons/gr";

const PreTradeCheck = () => {
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { preTradeCheck, setPreTradeCheck } = useTrade();
  const { calculator, setCalculator } = useCalculator();
  const [countdownTime, setCountdownTime] = useState("03:00");

  const offer = aboutOffer?.data;

  useEffect(() => {
    let time = 180; // 3 minutes
    if (preTradeCheck?.success === true) {
      const interval = setInterval(() => {
        time--;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setCountdownTime(
          `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
        if (time <= 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [preTradeCheck?.success]);

  const updateChecksSequentially = (setState) => {
    setTimeout(() => {
      setState((prev) => ({ ...prev, isLimitVerified: true }));
    }, 3000); // after 300ms

    setTimeout(() => {
      setState((prev) => ({ ...prev, isEscrowSecured: true }));
    }, 5000); // after 300ms

    setTimeout(() => {
      setState((prev) => ({ ...prev, isStatusVerified: true }));
    }, 2000); // after 600ms

    setTimeout(() => {
      setState((prev) => ({ ...prev, state: false, success: true }));
    }, 5500); // success last
  };

  useEffect(() => {
    if (preTradeCheck?.state === true)
      updateChecksSequentially(setPreTradeCheck);
  }, [preTradeCheck?.state]);

  const handleCancelTrade = () => {
    setPreTradeCheck((prev) => ({
      ...prev,
      state: false,
      isLimitVerified: false,
      isEscrowSecured: false,
      isStatusVerified: false,
      success: false,
    }));
  };

  return (
    <>
      {preTradeCheck?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              {/* <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Running Pre-Trade Checks
                </p>
              </div> */}

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
                      {preTradeCheck?.isLimitVerified ? (
                        <IoMdCheckmarkCircle className="text-base text-tradeGreen" />
                      ) : (
                        <PiSpinnerGapBold className="text-base animate-spin text-tradeOrange" />
                      )}
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
                      {preTradeCheck?.isEscrowSecured ? (
                        <IoMdCheckmarkCircle className="text-base text-tradeGreen" />
                      ) : (
                        <PiSpinnerGapBold className="text-base animate-spin text-tradeOrange" />
                      )}
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
                      {preTradeCheck?.isStatusVerified ? (
                        <IoMdCheckmarkCircle className="text-base text-tradeGreen" />
                      ) : (
                        <PiSpinnerGapBold className="text-base animate-spin text-tradeOrange" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {preTradeCheck?.success && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Pre-Trade Checks Passed
                </p>

                {/* <div
                  // onClick={close}
                  className="w-max flex text-tradeGreen hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <GrSecure className="text-[16px]" />
                </div> */}
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                {/* <div className="flex items-center justify-center">
                  <GrSecure className="text-4xl" />
                </div> */}
                <div className="flex justify-center text-2xl font-bold text-tradeOrange">
                  {countdownTime}
                </div>
                <div className="flex-1 flex flex-col justify-between gap-[10px]">
                  <p className="text-white text-[13px] font-semibold leading-normal">
                    Your trade is secure. Waiting for vendor to accept your
                    request...
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-between gap-[10px]">
                  <p className="text-tradeFadeWhite font-medium text-xs">
                    If the vendor doesn’t respond in time, you can cancel and
                    try another offer.
                  </p>
                </div>

                <div>
                  <Button
                    onClick={handleCancelTrade}
                    variant="outline"
                    // disabled={loading}
                  >
                    Cancel Trade
                  </Button>
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
