import React, { useEffect, useState } from "react";
import OfferCard from "../offerCards/MarketCard";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsFilterSquare } from "react-icons/bs";
import OfferFilter from "./OfferFilter";
import { BiSolidBinoculars } from "react-icons/bi";
import { TbArrowGuide } from "react-icons/tb";
import { BiCheckShield } from "react-icons/bi";
import { RiPoliceBadgeLine } from "react-icons/ri";

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
    }));
    handleFilterOffer();
  };

  const handleShowTopFeedBacks = () => {
    setOfferFilter((prev) => ({
      ...prev,
      topFeedBack: !prev.topFeedBack,
    }));

    handleFilterOffer();
  };

  const handleShowmostTrusted = () => {
    setOfferFilter((prev) => ({
      ...prev,
      mostTrusted: !prev.mostTrusted,
    }));

    handleFilterOffer();
  };

  return (
    <div className="flex flex-col gap-[px] h-full md:border-x md:border-t md:border-b border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-[17px] text-white font-[700]">Secure P2P Trading</p>

        <div onClick={handleShowOfferFilter} className="text-white text-[25px]">
          <BiSolidBinoculars />
        </div>
      </div>

      <div className="flex flex-col gap-[10px] px-[15px] pb-[15px]">
        <div className="z-10 gap-[10px] sticky top-[60px] py-[15px] flex flex-col bg-black ">
          <div className="flex gap-2 md:justify-between w-full">
            <div
              onClick={handleShowOfferFilter}
              className=" flex md:hidden items-center gap-2 px-[12px] py-[4px] text-tradeOrange text-[13px] font-[600] rounded-[6.5px] border border-tradeOrange hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
            >
              <BiSolidBinoculars className="text-[17px]" />
              <p>Filter</p>
            </div>

            <div className="max-w-full overflow-hidden whitespace-nowrap flex items-center gap-2 bg-transparent ">
              <p
                onClick={handleShowAllOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                All
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.onlineOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Online
              </p>
              <p
                onClick={handleShowBestMargins}
                className={`${
                  offerFilter?.bestMargin
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Best Margins
              </p>

              <p
                onClick={handleShowTopFeedBacks}
                className={`${
                  offerFilter?.topFeedBack
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Top Feedback
              </p>
              <p
                onClick={handleShowmostTrusted}
                className={`${
                  offerFilter?.mostTrusted
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Most-Trusted
              </p>
            </div>

            <div className=" gap-[5px] md:flex hidden">
              <div
                onClick={handleShowOnlineOffer}
                className="text-neutral-500 border-neutral-800  hover:text-white 
        flex items-center justify-center gap-[4px]
        px-[12px] py-[4px] text-[15px] 
        rounded-[6.5px] border cursor-default
        transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <FaMagnifyingGlass />
                <span className="text-[11px] font-semibold text-tradeGreen">
                  3
                </span>
              </div>

              <div
                onClick={handleShowAllOffer}
                className=" flex items-center gap-1 px-[12px] py-[4px] text-tradeOrange text-[13px] font-[600] rounded-[6.5px] border border-neutral-800 hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <TbArrowGuide className="text-[17px]" />
                <p>Guide Me</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={` ${
            offerFilter?.showFilter ? "flex" : "hidden"
          } z-30 fixed top-[62px] md:top-[59px] left-0 right-0 bottom-0 lg:hidden bg-transparent`}
        >
          <OfferFilter
            handleFilterOffer={handleFilterOffer}
            select={select}
            setSelect={setSelect}
          />
        </div>

        <div className="flex flex-col gap-[15px] rounded-[12px]">
          <div className="flex flex-col gap-[15px]">
            <div className=" sticky top-[118px] flex bg-tradeOrange px-[12px] py-[4px] lg:rounded-[px] rounded-[px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Promoted Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px] ">
              <div className="grid grid-cols-1 gap-1 md:gap-0  items-center">
                {promotedOffers?.map((offer, index) => (
                  <div key={index}>
                    <OfferCard
                      offerId={offer.offerId}
                      isVerified={offer.isVerified}
                      username={offer.username}
                      lastSeen={offer.lastSeen}
                      service={offer.service}
                      serviceType={offer.serviceType}
                      miniPurchase={offer.miniPurchase}
                      maxPurchase={offer.maxPurchase}
                      positiveFeedback={offer.positiveFeedback}
                      trustScore={offer.trustScore}
                      currency={offer.currency}
                      avgTradeTime={offer.avgTradeTime}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <div className="sticky top-[118px]  flex bg-white px-[12px] py-[4px] lg:rounded-[px] rounded-[px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Other Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 gap-1 md:gap-0 items-center">
                {unPromotedOffers?.map((offer, index) => (
                  <div key={index}>
                    <OfferCard
                      offerId={offer.offerId}
                      isVerified={offer.isVerified}
                      username={offer.username}
                      lastSeen={offer.lastSeen}
                      service={offer.service}
                      serviceType={offer.serviceType}
                      miniPurchase={offer.miniPurchase}
                      maxPurchase={offer.maxPurchase}
                      positiveFeedback={offer.positiveFeedback}
                      trustScore={offer.trustScore}
                      currency={offer.currency}
                      avgTradeTime={offer.avgTradeTime}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketMain;
