import React, { useEffect, useState } from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import LockByScroll from "@/components/others/LockByScroll";
import { PiSpinnerGapBold } from "react-icons/pi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useTrade } from "@/context/publicContext/TradeContext";
import Button from "@/components/buttons/Button";
import { LuMinimize } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsCheck } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Warning from "@/components/alerts/Warning";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import Info from "@/components/alerts/Info";

const PreTradeCheck = () => {
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { preTradeCheck, setPreTradeCheck } = useTrade();

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;

  // Start countdown when preTradeCheck passes
  useEffect(() => {
    if (preTradeCheck?.success) {
      setPreTradeCheck((prev) => ({
        ...prev,
        isCounting: true,
      }));
    }
  }, [preTradeCheck?.success]);

  // 🕐 Countdown logic
  useEffect(() => {
    if (!preTradeCheck?.isCounting) return;

    const interval = setInterval(() => {
      setPreTradeCheck((prev) => {
        if (prev.time <= 0) {
          clearInterval(interval);
          return { ...prev, time: 0, isCounting: false };
        }
        return { ...prev, time: prev.time - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [preTradeCheck?.isCounting]); // 👈 Only runs when countdown starts/stops

  // 📍 Format the time
  const time = Number(preTradeCheck?.time) || 0;
  const formattedTime = `${String(Math.floor(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`;

  const handleCancelTrade = () => {
    setPreTradeCheck((prev) => ({
      ...prev,
      countdown: "03:00",
      checking: false,
      success: false,
      failed: false,
      details: false,
      waiting: false,
      result: {
        limitEligible: null,
        collacteralSecured: null,
        kycCompliant: null,
        activeNow: null,
      },
    }));
  };

  const collacteralWait = () => {
    setPreTradeCheck((prev) => ({
      ...prev,
      time: 180, // reset countdown to 2:00
      isCounting: true, // ensure countdown restarts
      success: false,
      details: false,
      failed: false,
      waiting: true,
      result: {
        ...prev.result,
        collacteralSecured: null,
      },
    }));
  };

  const inActiveWait = () => {
    setPreTradeCheck((prev) => ({
      ...prev,
      time: 180, // reset countdown to 2:00
      isCounting: true, // ensure countdown restarts
      success: false,
      details: false,
      failed: false,
      waiting: true,
      result: {
        ...prev.result,
        activeNow: null,
      },
    }));
  };

  const kycContinue = () => {
    setPreTradeCheck((prev) => ({
      ...prev,
      time: 300,
      isCounting: true, // ensure countdown restarts
      success: true,
      details: false,
      failed: false,
      waiting: false,
      result: {
        ...prev.result,
        kycCompliant: false,
      },
    }));
  };

  console.log(preTradeCheck);

  return (
    <>
      {/* Checking */}
      {preTradeCheck?.checking && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] gap-[20px] w-full h-max flex-col rounded-[15px] p-[15px] bg-tradeAs">
              <div className="flex justify-center items-center gap-2">
                {preTradeCheck?.isLimitVerified ? (
                  <IoMdCheckmarkCircle className="text-base text-tradeGreen" />
                ) : (
                  <PiSpinnerGapBold className="text-4xl animate-spin text-white" />
                )}
              </div>

              <div className="flex-1 flex flex-col items-center gap-[10px]">
                <p className="text-xl text-white leading-none font-[700] cursor-pointer">
                  Running Pre-Trade Checks
                </p>
                <p className="text-tradeFadeWhite text-xs text-center font-semibold leading-normal">
                  Hang tight, we’re verifying all details to ensure your trade
                  is secure.
                </p>
              </div>

              {/* <Button variant="Fadeout">Cancel</Button> */}
            </div>
          </div>
        </div>
      )}

      {/* Waiting */}
      {preTradeCheck?.waiting && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Awaiting Trader
                </p>

                <p className="text-lg text-tradeFadeWhite font-[700] cursor-pointer">
                  {formattedTime}
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-[10px] justify-between items-start">
                    <div className="flex flex-col gap-[10px] justify-center ">
                      <p className="text-xl font-semibold flex-wrap text-tradeOrange leading-none max-w-[200px]">
                        {offer?.serviceName || "N/A"}
                      </p>

                      <p className="text-xs font-semibold text-tradeFadeWhite leading-none">
                        {offer?.serviceType || "N/A"}
                      </p>

                      <p className="text-white font-semibold text-lg leading-none">
                        500.00 USD
                      </p>
                    </div>

                    {/* <div>
                      <HiOutlineUserCircle className="flex text-white text-4xl flex-shrink-0" />
                    </div> */}

                    <div className="flex justify-center items">
                      <HiOutlineUserCircle className="flex text-white text-6xl flex-shrink-0" />
                    </div>
                  </div>

                  <div className="flex gap-1 border-t border-dashed border-tradeAshLight pt-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.limitEligible === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.limitEligible ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Limit Eligible
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.collacteralSecured === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.collacteralSecured ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Collateral Secured
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.kycCompliant === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.kycCompliant ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          KYC Compliants
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.activeNow === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.activeNow ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Ready to Trade
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
                    <p className="text-tradeFadeWhite font-medium text-xs">
                      <span className="text-white">Note:</span> This trade will
                      auto cancel if{" "}
                      <span className="text-white font-semibold">
                        @{user?.username}
                      </span>{" "}
                      declines or doesn’t respond. If the wait is too long, you
                      can cancel the trade or minimize it to browse other offers
                      while waiting.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <Button
                    // onClick={handleCancelTrade}
                    variant="Fadeout"
                    // disabled={loading}
                  >
                    <p>Minimize</p>
                  </Button>
                  <Button
                    onClick={handleCancelTrade}
                    variant="Fadeout"
                    // disabled={loading}
                  >
                    <p>Cancel trade</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Failed*/}
      {preTradeCheck?.failed && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] p-[15px] bg-tradeAsh">
              {/* Primary */}
              <div
                className={`${
                  preTradeCheck?.details ? "hidden" : "flex"
                } flex-1 flex-col justify-between gap-[15px] `}
              >
                <div className="flex justify-between items-center pb-[12px] border-b border-neutral-800 ">
                  <p className="text-lg text-white font-[700] cursor-pointer">
                    Trade on Hold
                  </p>

                  <div className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <LuMinimize className="text-[16px]" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-[10px] justify-between items-start">
                    <div className="flex flex-col gap-[10px] justify-center ">
                      <p className="text-xl font-semibold flex-wrap text-tradeOrange leading-none max-w-[200px]">
                        {offer?.serviceName || "N/A"}
                      </p>

                      <p className="text-xs font-semibold text-tradeFadeWhite leading-none">
                        {offer?.serviceType || "N/A"}
                      </p>

                      <p className="text-white font-semibold text-lg leading-none">
                        500.00 USD
                      </p>
                    </div>

                    <div className="flex justify-center items">
                      <HiOutlineUserCircle className="flex text-white text-6xl flex-shrink-0" />
                    </div>
                  </div>

                  <div className="flex gap-1 border-t border-dashed border-tradeAshLight pt-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.limitEligible === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.limitEligible ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Limit Eligible
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.collacteralSecured === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.collacteralSecured ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Collateral Secured
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.kycCompliant === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.kycCompliant ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          KYC Compliants
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.activeNow === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.activeNow ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Ready to Trade
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
                    {preTradeCheck?.result?.limitEligible === false ? (
                      <Warning text="This trade amount exceeds the vendor’s limit. You’ll need to cancel and choose another offer that supports your desired amount." />
                    ) : preTradeCheck?.result?.collacteralSecured === false ? (
                      <Warning text="The trader doesn’t have enough collateral to start this trade. You can cancel now or give them 3 more minutes to fund their wallet." />
                    ) : preTradeCheck?.result?.kycCompliant === false ? (
                      <Warning text="This trader hasn’t completed identity verification. You can cancel the trade or continue if you’re comfortable proceeding." />
                    ) : (
                      <Warning text="The trader is currently offline. You can wait 2 minutes while we notify them to come online, or cancel and trade with someone who’s available now." />
                    )}
                  </div>
                </div>

                <div>
                  {preTradeCheck?.result?.limitEligible === false ? (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        variant="Fadeout"
                        onClick={handleCancelTrade}
                        // disabled={loading}
                      >
                        <p>Cancel Trade</p>
                      </Button>
                    </div>
                  ) : preTradeCheck?.result?.collacteralSecured === false ? (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        variant="Fadeout"
                        // disabled={loading}
                        onClick={collacteralWait}
                      >
                        <p>Wait 2 Minutes</p>
                      </Button>

                      <Button
                        variant="Fadeout"
                        onClick={handleCancelTrade}
                        // disabled={loading}
                      >
                        <p>Cancel Trade</p>
                      </Button>
                    </div>
                  ) : preTradeCheck?.result?.kycCompliant === false ? (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        variant="Fadeout"
                        // disabled={loading}
                        onClick={kycContinue}
                      >
                        <p>Continue</p>
                      </Button>

                      <Button
                        variant="Fadeout"
                        onClick={handleCancelTrade}
                        // disabled={loading}
                      >
                        <p>Cancel Trade</p>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        variant="Fadeout"
                        // disabled={loading}
                        onClick={inActiveWait}
                      >
                        <p>Wait 2 minutes</p>
                      </Button>

                      <Button
                        variant="Fadeout"
                        onClick={handleCancelTrade}
                        // disabled={loading}
                      >
                        <p>Cancel trade</p>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              {/* <div className={`${preTradeCheck?.details ? "flex" : "hidden"}`}>
                {preTradeCheck?.result?.limitEligible === false ? (
                  // Limit Eligible Failed
                  <div className="flex flex-1 flex-col justify-between gap-[15px] ">
                    <div className="flex justify-between items-center pb-[12px] border-b border-neutral-800 ">
                      <p className="text-lg text-white font-[700] cursor-pointer">
                        Trade Limit Exceeded
                      </p>

                      <div
                        onClick={closeErrorDetails}
                        className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <IoMdArrowRoundBack className="text-[16px]" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-[15px] ">
                      <Info text="This trader’s limit does not cover the amount you’re trying to trade. You can cancel this trade and explore other offers that match your desired amount." />

                      <div className="flex flex-col gap-[10px]">
                        <Button
                          variant="Fadeout"
                          onClick={handleCancelTrade}
                          // disabled={loading}
                        >
                          <p>Cancel Trade</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : preTradeCheck?.result?.collacteralSecured === false ? (
                  // Collateral Not Secured
                  <div className="flex flex-1 flex-col justify-between gap-[15px] ">
                    <div className="flex justify-between items-center pb-[12px] border-b border-neutral-800 ">
                      <p className="text-lg text-white font-[700] cursor-pointer">
                        Insufficient Collateral
                      </p>

                      <div
                        onClick={closeErrorDetails}
                        className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <IoMdArrowRoundBack className="text-[16px]" />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-[15px] ">
                      <Info text="This trader doesn’t have enough collateral at the moment. You have two options: cancel the trade now or wait 2 minutes for them to add funds to their wallet." />

                      <div className="flex flex-col gap-[10px]">
                        <Button
                          variant="Fadeout"
                          // disabled={loading}
                          onClick={collacteralWait}
                        >
                          <p>Wait 2 Minutes</p>
                        </Button>

                        <Button
                          variant="Fadeout"
                          onClick={handleCancelTrade}
                          // disabled={loading}
                        >
                          <p>Cancel Trade</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : preTradeCheck?.result?.kycCompliant === false ? (
                  // KYC Failed
                  <div className="flex flex-1 flex-col justify-between gap-[15px] ">
                    <div className="flex justify-between items-center pb-[12px] border-b border-neutral-800 ">
                      <p className="text-lg text-white font-[700] cursor-pointer">
                        Trader Not KYC-Compliant
                      </p>

                      <div
                        onClick={closeErrorDetails}
                        className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <IoMdArrowRoundBack className="text-[16px]" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-[15px] ">
                      <Info text="This trader hasn’t completed KYC verification. You can cancel the trade if that’s a concern, or continue if you’re comfortable proceeding." />

                      <div className="flex flex-col gap-[10px]">
                        <Button
                          variant="Fadeout"
                          // disabled={loading}
                          onClick={kycContinue}
                        >
                          <p>Continue</p>
                        </Button>

                        <Button
                          variant="Fadeout"
                          onClick={handleCancelTrade}
                          // disabled={loading}
                        >
                          <p>Cancel Trade</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Now Failed
                  <div className="flex flex-1 flex-col justify-between gap-[15px] ">
                    <div className="flex justify-between items-center pb-[12px] border-b border-neutral-800 ">
                      <p className="text-lg text-white font-[700] cursor-pointer">
                        Trader Currently Offline
                      </p>

                      <div
                        onClick={closeErrorDetails}
                        className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                      >
                        <IoMdArrowRoundBack className="text-[16px]" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-[15px] ">
                      <Info text="This trader is offline. You can wait 2 minutes while we notify them to come online, or cancel and trade with an active vendor." />

                      <div className="flex flex-col gap-[10px]">
                        <Button
                          variant="Fadeout"
                          // disabled={loading}
                          onClick={inActiveWait}
                        >
                          <p>Wait 2 minutes</p>
                        </Button>

                        <Button
                          variant="Fadeout"
                          onClick={handleCancelTrade}
                          // disabled={loading}
                        >
                          <p>Cancel trade</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {preTradeCheck?.success && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Trade Secured
                </p>

                {/* <div className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <LuMinimize className="text-[16px]" />
                </div> */}
                <p className="text-lg text-tradeFadeWhite font-[700] cursor-pointer">
                  {formattedTime}
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-[10px] justify-between items-start">
                    <div className="flex flex-col gap-[10px] justify-center ">
                      <p className="text-xl font-semibold flex-wrap text-tradeOrange leading-none max-w-[200px]">
                        {offer?.serviceName || "N/A"}
                      </p>

                      <p className="text-xs font-semibold text-tradeFadeWhite leading-none">
                        {offer?.serviceType || "N/A"}
                      </p>

                      <p className="text-white font-semibold text-lg leading-none">
                        500.00 USD
                      </p>
                    </div>

                    {/* <div>
                      <HiOutlineUserCircle className="flex text-white text-4xl flex-shrink-0" />
                    </div> */}

                    <div className="flex justify-center items">
                      <HiOutlineUserCircle className="flex text-white text-6xl flex-shrink-0" />
                    </div>
                  </div>

                  {/* Check result */}
                  <div className="flex gap-1 border-t border-dashed border-tradeAshLight pt-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.limitEligible === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.limitEligible ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Limit Eligible
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.collacteralSecured === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.collacteralSecured ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}

                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Collateral Secured
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.kycCompliant === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.kycCompliant ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          KYC Compliants
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {preTradeCheck?.result?.activeNow === null ? (
                          <BiLoaderCircle className="text-tradeFadeWhite text-base animate-spin" />
                        ) : (
                          <div>
                            {preTradeCheck?.result?.activeNow ? (
                              <BsCheck className="text-tradeGreen text-base" />
                            ) : (
                              <IoClose className="text-red-600 text-base" />
                            )}
                          </div>
                        )}
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Ready to Trade
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
                    <p className="text-tradeFadeWhite font-medium text-xs">
                      <span className="text-white">Note:</span> This trade will
                      auto cancel if{" "}
                      <span className="text-white font-semibold">
                        @{user?.username}
                      </span>{" "}
                      declines or doesn’t respond. If the wait is too long, you
                      can cancel the trade or minimize it to browse other offers
                      while waiting.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <Button
                    // onClick={handleCancelTrade}
                    variant="Fadeout"
                    // disabled={loading}
                  >
                    <p>Minimize</p>
                  </Button>
                  <Button
                    onClick={handleCancelTrade}
                    variant="Fadeout"
                    // disabled={loading}
                  >
                    <p>Cancel trade</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Declined */}

      {/* Cancelled */}
    </>
  );
};

export default PreTradeCheck;
