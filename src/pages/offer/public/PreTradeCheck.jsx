import React, { useEffect, useState } from "react";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import LockByScroll from "@/components/others/LockByScroll";
import { PiSpinnerGapBold } from "react-icons/pi";

import { IoMdCheckmarkCircle } from "react-icons/io";
import { useTrade } from "@/context/publicContext/TradeContext";
import Button from "@/components/buttons/Button";
import { LuMinimize } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";

const PreTradeCheck = () => {
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { preTradeCheck, setPreTradeCheck } = useTrade();
  const [countdownTime, setCountdownTime] = useState("03:00");

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;

  console.log("offer in pre trade check :", offer);
  console.log("user in pre trade check :", user);

  useEffect(() => {
    let time = 180;
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
      setState((prev) => ({
        ...prev,
        checking: false,
        success: true,
        failed: false,
      }));
    }, 3000); // after 300ms
  };

  useEffect(() => {
    if (preTradeCheck?.checking === true)
      updateChecksSequentially(setPreTradeCheck);
  }, [preTradeCheck?.checking]);

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

      {preTradeCheck?.success && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Awaiting Vendor
                </p>

                <div className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <LuMinimize className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-[10px] justify-between items-start">
                    <div className="flex flex-col gap-[10px] justify-center ">
                      <p className="text-lg font-semibold flex-wrap text-white leading-none max-w-[200px]">
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

                  {/* <Info
                    text={
                      "Please send the exact amount shown. Sending more or less may cause unnecessary disputes or processing delays"
                    }
                  /> */}

                  <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
                    <p className="text-tradeFadeWhite font-medium text-xs">
                      <span className="text-white">Note</span> : This trade will
                      auto-cancel if{" "}
                      <span className="text-tradeGreen font-semibold">
                        @{user?.username}
                      </span>{" "}
                      declines or fails to respond. Once canceled, you can retry
                      or browse and engage with other available offers.
                    </p>
                  </div>
                </div>

                <div>
                  {countdownTime !== "00:00" ? (
                    <div className="flex flex-col gap-[10px]">
                      <Button variant="Fadeout"> {countdownTime}</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        onClick={handleCancelTrade}
                        variant="Fadeout"
                        // disabled={loading}
                      >
                        <p>Re-initiate this trade</p>
                      </Button>
                      <Button
                        onClick={handleCancelTrade}
                        variant="Fadeout"
                        // disabled={loading}
                      >
                        <p>Cancel</p>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {preTradeCheck?.failed && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Awaiting Vendor
                </p>

                <div className="w-max flex text-tradeFadeWhite hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                  <LuMinimize className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[15px]">
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-[10px] justify-between items-start">
                    <div className="flex flex-col gap-[10px] justify-center ">
                      <p className="text-lg font-semibold flex-wrap text-white leading-none max-w-[200px]">
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

                  {/* <Info
                    text={
                      "Please send the exact amount shown. Sending more or less may cause unnecessary disputes or processing delays"
                    }
                  /> */}

                  <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
                    <p className="text-tradeFadeWhite font-medium text-xs">
                      <span className="text-white">Note</span> : This trade will
                      auto-cancel if{" "}
                      <span className="text-tradeGreen font-semibold">
                        @{user?.username}
                      </span>{" "}
                      declines or fails to respond. Once canceled, you can retry
                      or browse and engage with other available offers.
                    </p>
                  </div>
                </div>

                <div>
                  {countdownTime !== "00:00" ? (
                    <div className="flex flex-col gap-[10px]">
                      <Button variant="Fadeout"> {countdownTime}</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[10px]">
                      <Button
                        onClick={handleCancelTrade}
                        variant="Fadeout"
                        // disabled={loading}
                      >
                        <p>Re-initiate this trade</p>
                      </Button>
                      <Button
                        onClick={handleCancelTrade}
                        variant="Fadeout"
                        // disabled={loading}
                      >
                        <p>Cancel</p>
                      </Button>
                    </div>
                  )}
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
