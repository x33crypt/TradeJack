import React, { useEffect, useState } from "react";
import OfferCard from "../cards/Both/OfferCard";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import OfferFilter from "./OfferFilter";
import { BiSolidBinoculars } from "react-icons/bi";
import { TbArrowGuide } from "react-icons/tb";
import { RiColorFilterFill } from "react-icons/ri";
import LockByScroll from "../LockByScroll";
import { useExploreOffers } from "@/context/ExploreOffersContext";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { RiFilter3Line } from "react-icons/ri";

const MarketMain = ({
  promotedOffers,
  unPromotedOffers,
  handleFilterOffer,
  select,
  setSelect,
}) => {
  const { filter, setFilter } = useExploreOffers();

  const showFilter = () => {
    setFilter((prev) => ({
      ...prev,
      state: true,
    }));
  };

  const showAllOffers = () => {
    setFilter((prev) => ({
      ...prev,
      all: true,
      active: false,
    }));
  };

  const showActiveVendors = () => {
    setFilter((prev) => ({
      ...prev,
      active: !prev.active,
      all: false,
    }));
  };

  const showBestMargins = () => {
    setFilter((prev) => ({
      ...prev,
      bestMargin: !prev.bestMargin,
      topFeedBack: false,
      mostTrusted: false,
    }));
  };

  const showTopFeedBacks = () => {
    setFilter((prev) => ({
      ...prev,
      topFeedBack: !prev.topFeedBack,
      bestMargin: false,
      mostTrusted: false,
    }));
  };

  const showMostTrusted = () => {
    setFilter((prev) => ({
      ...prev,
      mostTrusted: !prev.mostTrusted,
      bestMargin: false,
      topFeedBack: false,
    }));
  };

  const navigateTo = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-svh md:border-x md:border-t-0 lg:border-b border-neutral-800 ">
        <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
          <p className="text-lg font-[700] text-white ">
            Secure P2P Marketplace
          </p>
        </div>
        <div className="px-[15px] py-[12px]">
          <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
            Browse through over 10,000 active trade offers from verified users.
            Use filters to quickly find the best rates, trusted traders, and
            secure deals.
          </p>
        </div>

        <div className="flex flex-col flex-1 justify-between ">
          <div className="sticky md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-y border-dashed border-tradeAshLight">
            <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  onClick={showFilter}
                  className={`flex lg:hidden  items-center  gap-2 text-tradeOrange border-tradeOrange  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <RiFilter3Line className=" text-[18px]" />
                  <p>Filter</p>
                </div>
                <div
                  onClick={showAllOffers}
                  className={`${
                    filter?.all
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>All</p>
                </div>
                <div
                  onClick={showActiveVendors}
                  className={`${
                    filter?.active
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Active Traders</p>
                </div>
                <div
                  onClick={showBestMargins}
                  className={`${
                    filter?.bestMargin
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1 w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Verified Offers</p>
                </div>
                <div
                  onClick={showBestMargins}
                  className={`${
                    filter?.bestMargin
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1 w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p> Best Margin</p>
                </div>
                <div
                  onClick={showTopFeedBacks}
                  className={`${
                    filter?.topFeedBack
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1 w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Top Feedback</p>
                </div>
                <div
                  onClick={showMostTrusted}
                  className={`${
                    filter?.mostTrusted
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Most Trusted</p>
                </div>
              </div>

              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={`flex items-center gap-2 text-tradeOrange border-tradeOrange w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <FaInfoCircle className="lg:text-[14px] text-[14px]" />
                  <p>Explore</p>
                </div>
                <div
                  onClick={() => navigateTo("/offers/create")}
                  className={`bg-tradeGreen text-black inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Create Offer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-[15px] gap-[15px]">
            {/* <div className="flex flex-1 flex-col gap-1 md:gap-0 border border-t-0 border-tradeAshLight">
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
            </div> */}

            <div className="flex flex-col gap-[5px] w-full h-max">
              {promotedOffers?.map((offer, index) => (
                <div key={offer.id || index}>
                  <OfferCard offer={offer} />
                </div>
              ))}
            </div>

            {/* <div className="flex flex-col gap-[15px]">
            <div className="z-10 sticky top-[125px] flex justify-between items-center px-4 py-2 bg-tradeAshLight/80 shadow-sm">
              <p className="text-white text-sm font-semibold">Published On</p>
              <p className="text-tradeOrange text-sm font-semibold">
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

          <div className="bg-black lg:py-[15px] py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
            <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={` md:flex hidden text-tradeFadeWhite border-tradeAshLight w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Date</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>0</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>of</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>0</p>
                </div>
              </div>

              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={`text-tradeGreen cursor-pointer border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Load More</p>
                </div>
                <div
                  className={` text-tradeFadeWhite hover:text-white cursor-pointer border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Scroll to Top</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filter?.state && (
        <div>
          <LockByScroll />
          <div
            className={`flex z-30 fixed top-[57px] md:top-[64px] left-0 right-0 bottom-0 lg:hidden`}
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
