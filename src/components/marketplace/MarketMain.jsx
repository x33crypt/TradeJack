import React, { useEffect, useState } from "react";
import OfferCard from "../cards/Both/OfferCard";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import OfferFilter from "./OfferFilter";
import { BiSolidBinoculars } from "react-icons/bi";
import { TbArrowGuide } from "react-icons/tb";
import { RiColorFilterFill } from "react-icons/ri";
import LockByScroll from "../LockByScroll";

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
    <>
      <div className="flex flex-col h-full md:border-x md:border-t-0 lg:border-b border-neutral-800 ">
        <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
          <p className="text-lg font-[700] text-white ">
            Secure P2P Marketplace
          </p>
        </div>

        <div className="flex flex-col flex-1 ">
          <div className="sticky md:top-[62px] top-[57px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
            <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  onClick={handleShowOfferFilter}
                  className="flex flex-shrink-0 lg:hidden items-center gap-2 px-[12px] py-[4px] text-tradeOrange  text-sm font-[600] rounded-[6.5px] border border-tradeOrange hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <BiSolidBinoculars className="lg:text-[17px] text-[18px]" />
                  <p>Filter</p>
                </div>
                <div
                  onClick={handleShowAllOffer}
                  className={`${
                    offerFilter?.allOffers
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>All</p>
                </div>
                <div
                  onClick={handleShowOnlineOffer}
                  className={`${
                    offerFilter?.onlineOffers
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Online</p>
                </div>
                <div
                  onClick={handleShowBestMargins}
                  className={`${
                    offerFilter?.bestMargin
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p> Best Margin</p>
                </div>
                <div
                  onClick={handleShowTopFeedBacks}
                  className={`${
                    offerFilter?.topFeedBack
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Top Feedback</p>
                </div>
                <div
                  onClick={handleShowmostTrusted}
                  className={`${
                    offerFilter?.mostTrusted
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Most Trusted</p>
                </div>
              </div>

              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={`bg-transparent border border-tradeAshLight text-tradeOrange inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Guide Me</p>
                </div>
                <div
                  className={`bg-tradeGreen text-black inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Create Offer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-[15px] gap-[15px]">
            <div className="flex flex-col gap-[15px]">
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

            {/* <div className="flex flex-col gap-[15px]">
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
          </div> */}
          </div>
        </div>
      </div>

      {offerFilter?.showFilter && (
        <div>
          <LockByScroll />
          <div
            className={`flex z-30 fixed top-[57px] md:top-[64px]  left-0 right-0 bottom-0 lg:hidden`}
          >
            <OfferFilter
              handleFilterOffer={handleFilterOffer}
              select={select}
              setSelect={setSelect}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MarketMain;
