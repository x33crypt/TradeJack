import MarketTopNav from "@/components/others/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/others/Footer";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import Button from "@/components/buttons/Button";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import LockByScroll from "@/components/others/LockByScroll";
import { IoClose } from "react-icons/io5";
import toDecimal from "@/utils/toDecimal";
import withComma from "@/utils/withComma";
import OfferFeedback from "@/components/offer/global/OfferFeedback";
import { VscVerifiedFilled } from "react-icons/vsc";
import { PiNetworkBold } from "react-icons/pi";
import { RiExchange2Fill } from "react-icons/ri";
import { useTrade } from "@/context/publicContext/TradeContext";

const AboutPublicOffer = () => {
  const topRef = useRef(null);
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { preTradeCheck, setPreTradeCheck } = useTrade();
  const { loading } = useFetchAboutOffers();
  const { calculator, setCalculator } = useCalculator();

  const offer = aboutOffer?.data;

  console.log("about offer :", aboutOffer);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const initiateTrade = () => {
    setCalculator((prev) => ({
      ...prev,
      state: true,
    }));
    scrollToTop();
  };

  const handlePreTradeCheck = () => {
    setCalculator((prev) => ({
      ...prev,
      state: false,
    }));

    setPreTradeCheck((prev) => ({
      ...prev,
      state: true,
    }));
  };

  const close = () => {
    setCalculator((prev) => ({
      ...prev,
      state: false,
      loading: false,
      amount: "",
      receive: "",
    }));
  };

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^\d.-]/g, "");
    setCalculator((prev) => ({
      ...prev,
      amount: val,
    }));
  };

  return (
    <>
      <MarketTopNav />
      <div
        ref={topRef}
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex flex-col md:flex-row md:gap-[5px] gap-[5px] bg-black "
      >
        <div className="flex flex-col flex-1 ">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {aboutOffer === null ? (
                <NetworkError />
              ) : (
                <div className="flex-1 flex flex-col gap-[5px]">
                  <OfferDetails aboutOffer={aboutOffer} loading={loading} />
                  <div className="py-[15px] md:px-0 px-[15px]">
                    <Button onClick={initiateTrade}>Initiate Swap</Button>
                  </div>
                  <OfferFeedback
                    heading={"Offer feedback"}
                    profile={aboutOffer}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {calculator?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex md:w-[300px] w-full h-max flex-col rounded-[15px] px-[15px] bg-tradeAsh  ">
              <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
                <p className="text-lg text-white font-[700] cursor-pointer">
                  Exchange Calculator
                </p>

                <div
                  onClick={close}
                  className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <IoClose className="text-[16px]" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[12px] gap-[20px]">
                <div className=" flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-medium text-tradeFadeWhite">
                      How much would you like to trade?
                    </p>

                    <div className="flex gap-[10px] items-center bg-tradeGree">
                      <div className="flex-1 bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                        <input
                          className="flex-1 bg-transparent p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                          type="text"
                          placeholder="Enter amount"
                          value={withComma(calculator?.amount)}
                          onChange={handleAmountChange}
                        />
                      </div>
                      <div className="w-max p-[12px] text-sm  font-semibold text-white bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                        <p>{offer?.preferredCurrency?.code}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-medium text-tradeFadeWhite">
                      Estimated amount to receive
                    </p>

                    <p className="text-white text-2xl font-semibold">
                      {toDecimal(
                        calculator?.receive !== ""
                          ? calculator?.receive
                          : "0.00"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <RiExchange2Fill className="flex text-tradeFadeWhite text-base flex-shrink-0" />
                      <p className="text-xs font-semibold text-tradeFadeWhite">
                        Rate
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        1 {offer?.preferredCurrency?.code} = NGN 1,239
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <PiNetworkBold className="flex text-tradeFadeWhite text-base flex-shrink-0" />
                      <p className="text-xs font-semibold text-tradeFadeWhite">
                        Network Fee
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        NGN 50.00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  <Button
                    onClick={handlePreTradeCheck}
                    variant="Fadeout"
                    disabled={calculator?.loading}
                  >
                    Proceed
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

export default AboutPublicOffer;
