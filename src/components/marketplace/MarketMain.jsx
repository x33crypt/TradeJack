import React, { useEffect, useState } from "react";
import OfferCard from "../cards/OfferCard";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import OfferFilter from "./OfferFilter";
import { BiSolidBinoculars } from "react-icons/bi";
import { TbArrowGuide } from "react-icons/tb";
import { RiColorFilterFill } from "react-icons/ri";

const MarketMain = ({
  promotedOffers,
  unPromotedOffers,
  handleFilterOffer,
  select,
  setSelect,
}) => {
  const { offerFilter, setOfferFilter } = useOfferFilter();

  const handleShowOfferFilter = () => {
    setOfferFilter((prev) => ({
      ...prev,
      showFilter: !prev.showFilter,
    }));
  };

  const handleShowAllOffer = () => {
    setOfferFilter((prev) => ({
      ...prev,
      allOffers: true,
      onlineOffers: false,
    }));
    handleFilterOffer();
  };

  const handleShowOnlineOffer = () => {
    setOfferFilter((prev) => ({
      ...prev,
      onlineOffers: true,
      allOffers: false,
    }));

    handleFilterOffer();
  };

  const handleShowBestMargins = () => {
    setOfferFilter((prev) => ({
      ...prev,
      bestMargin: !prev.bestMargin,
      topFeedBack: false,
      mostTrusted: false,
    }));
  };

  const handleShowTopFeedBacks = () => {
    setOfferFilter((prev) => ({
      ...prev,
      topFeedBack: !prev.topFeedBack,
      bestMargin: false,
      mostTrusted: false,
    }));
  };

  const handleShowmostTrusted = () => {
    setOfferFilter((prev) => ({
      ...prev,
      mostTrusted: !prev.mostTrusted,
      bestMargin: false,
      topFeedBack: false,
    }));
  };

  return (
    <div className="flex flex-col  h-full md:border-x md:border-t-0 lg:border-b border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Secure P2P Marketplace</p>

        <div className="text-white text-[25px]">
          <RiColorFilterFill />
        </div>
      </div>

      <div className="flex flex-col gap-[15px] ">
        {/* <div className=" z-20 sticky top-[62px] flex flex-col gap-[5px] px-[15px] bg-black">
          <div className="flex py-[15px] gap-2 md:justify-between overflow-x-hidden flex-shrink-0">
            <div
              onClick={handleShowOfferFilter}
              className="flex flex-shrink-0 lg:hidden items-center gap-2 px-[12px] py-[4px] text-tradeOrange  text-sm font-[600] rounded-[6.5px] border border-tradeOrange hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
            >
              <BiSolidBinoculars className="lg:text-[17px] text-[18px]" />
              <p>Filter</p>
            </div>

            <div className=" flex  flex-shrink-0 items-center gap-2 bg-transparent ">
              <p
                onClick={handleShowAllOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } shrink-0 inline-block px-[12px] py-[4px] text-sm font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                All
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.onlineOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } shrink-0 inline-block px-[12px] py-[4px] text-sm font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Online
              </p>
              <p
                onClick={handleShowBestMargins}
                className={`${
                  offerFilter?.bestMargin
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } shrink-0 inline-block px-[12px] py-[4px] text-sm font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Best Margins
              </p>
              <p
                onClick={handleShowTopFeedBacks}
                className={`${
                  offerFilter?.topFeedBack
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } shrink-0 inline-block px-[12px] py-[4px] text-sm font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Top Feedback
              </p>
              <p
                onClick={handleShowmostTrusted}
                className={`${
                  offerFilter?.mostTrusted
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } shrink-0 inline-block px-[12px] py-[4px] text-sm font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Most-Trusted
              </p>
            </div>

            <div className=" gap-[5px] flex flex-shrink-0">
              <div
                onClick={handleShowOnlineOffer}
                className="shrink-0 text-neutral-500 border-neutral-800  hover:text-white flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-[15px] rounded-[6.5px] border cursor-default transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <FaMagnifyingGlass />
                <span className="text-[11px] font-semibold text-tradeGreen">
                  3
                </span>
              </div>

              <div className=" flex-shrink-0 flex items-center gap-1 px-[12px] py-[4px] text-tradeOrange text-[13px] font-[600] rounded-[6.5px] border border-neutral-800 hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <TbArrowGuide className="text-[17px]" />
                <p>Guide Me</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="sticky top-[65px]  bg-black p-[15px] border-b border-dashed border-tradeAshLight overflow-x-auto">
          <div className="flex justify-between min-w-max gap-[10px]">
            <div className="flex items-center gap-2 bg-transparent">
              <div
                onClick={handleShowOfferFilter}
                className="flex flex-shrink-0 lg:hidden items-center gap-2 px-[12px] py-[4px] text-tradeOrange  text-sm font-[600] rounded-[6.5px] border border-tradeOrange hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <BiSolidBinoculars className="lg:text-[17px] text-[18px]" />
                <p>Filter</p>
              </div>
              <p
                onClick={handleShowAllOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                All
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.onlineOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Online
              </p>
              <p
                onClick={handleShowBestMargins}
                className={`${
                  offerFilter?.bestMargin
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Best Margins
              </p>
              <p
                onClick={handleShowTopFeedBacks}
                className={`${
                  offerFilter?.topFeedBack
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Top Feedback
              </p>
              <p
                onClick={handleShowmostTrusted}
                className={`${
                  offerFilter?.mostTrusted
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block w-max px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Most-Trusted
              </p>
            </div>

            <div className=" gap-[5px] flex flex-shrink-0">
              <div
                onClick={handleShowOnlineOffer}
                className="shrink-0 text-neutral-500 border-neutral-800  hover:text-white flex items-center justify-center gap-[4px] px-[12px] py-[4px] text-[15px] rounded-[6.5px] border cursor-default transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <FaMagnifyingGlass />
                <span className="text-[11px] font-semibold text-tradeGreen">
                  3
                </span>
              </div>

              <div className=" flex-shrink-0 flex items-center gap-1 px-[12px] py-[4px] text-tradeOrange text-[13px] font-[600] rounded-[6.5px] border border-neutral-800 hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <TbArrowGuide className="text-[17px]" />
                <p>Guide Me</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter for mobile screen */}
        <div
          className={` ${
            offerFilter?.showFilter ? "flex" : "hidden"
          } z-30 fixed top-[60px] md:top-[59px] left-0 right-0 bottom-0 lg:hidden`}
        >
          <OfferFilter
            handleFilterOffer={handleFilterOffer}
            select={select}
            setSelect={setSelect}
          />
        </div>

        <div className="flex flex-col px-[15px] pb-[15px] gap-[15px]">
          <div className="flex flex-col gap-[15px]">
            <div className="z-10 sticky top-[125px] flex justify-between items-center px-4 py-2 bg-tradeOrange/80 shadow-sm">
              <p className="text-black text-sm font-semibold">
                Promoted Offers
              </p>
              <p className="text-black text-sm font-semibold">June 14, 2025</p>
            </div>

            <div className="grid grid-cols-1 gap-1 md:gap-0  items-center border border-t-0 border-tradeAshLight">
              {promotedOffers?.map((offer, index) => (
                <div key={index}>
                  <OfferCard
                    offerId={offer.offerId}
                    isVerified={offer.isVerified}
                    username={offer.username}
                    isOnline={offer.isOnline}
                    paymentWindow={offer.paymentWindow}
                    service={offer.service}
                    serviceType={offer.serviceType}
                    minimum={offer.minimum}
                    maximum={offer.maximum}
                    positiveFeedback={offer.positiveFeedback}
                    trustScore={offer.trustScore}
                    currency={offer.currency}
                    avgTradeTime={offer.avgTradeTime}
                    margin={offer.margin}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[15px]">
            <div className="z-10 sticky top-[125px] flex justify-between items-center px-4 py-2 bg-tradeAshLight/80 shadow-sm">
              <p className="text-white text-sm font-medium">Published On</p>
              <p className="text-tradeOrange text-sm font-medium">
                Saturday, Jun 24
              </p>
            </div>

            <div className="grid grid-cols-1 gap-1 md:gap-0 items-center border border-t-0 border-tradeAshLight">
              {unPromotedOffers?.map((offer, index) => (
                <div key={index}>
                  <OfferCard
                    offerId={offer.offerId}
                    isVerified={offer.isVerified}
                    username={offer.username}
                    isOnline={offer.isOnline}
                    paymentWindow={offer.paymentWindow}
                    service={offer.service}
                    serviceType={offer.serviceType}
                    minimum={offer.minimum}
                    maximum={offer.maximum}
                    positiveFeedback={offer.positiveFeedback}
                    trustScore={offer.trustScore}
                    currency={offer.currency}
                    avgTradeTime={offer.avgTradeTime}
                    margin={offer.margin}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketMain;
