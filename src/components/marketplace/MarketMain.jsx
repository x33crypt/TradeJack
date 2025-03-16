import React, { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import OfferCard from "./OfferCard";
import axios from "axios";
import { LuFilter } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";
import OfferFilter from "./OfferFilter";
import { FiFilter } from "react-icons/fi";
import fakeData from "../../../public/fakeData.json";
import { LuSettings2 } from "react-icons/lu";

const MarketMain = ({
  promotedOffers,
  unPromotedOffers,
  setServiceType,
  serviceType,
  accountType,
  setAccountType,
  walletType,
  setWaletType,
  giftCardType,
  setGiftCardType,
  debitCreditCardType,
  setDebitCreditCardType,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  setIsOfferFilter,
  isOfferFilter,
  isFilterLoading,
  setIsPriceSort,
  isPriceSort,
  setIsTimeSort,
  isTimeSort,
  isOfferSortBy,
  setIsOfferSortBy,
  isAllOffer,
  setIsAllOffer,
  isOnlineOffer,
  setIsOnlineOffer,
  handleFilterOffer,
  handleResetFilter,
  setClearFilter,
}) => {
  return (
    <div className="flex flex-col min-h-screen md:border border-neutral-800 md:rounded-[10px]">
      <div className="flex flex-col justify-between p-[15px] border-b border-neutral-800 ">
        <p className="text-[18px] text-white font-[700]">
          Seamless Asset Trading
        </p>
      </div>

      <div className="flex flex-col  gap-[10px] px-[15px] pb-[15px]">
        <div className="z-10 gap-[10px] sticky top-[68px]  py-[15px] bg-black  flex flex-col ">
          <div className="flex justify-between w-full ">
            <div className="max-w-max flex items-center gap-[5px] bg-transparent borde border-neutral-800 rounded-[6.5px]">
              <p
                onClick={() => (
                  setIsAllOffer(true),
                  setIsOnlineOffer(false),
                  handleFilterOffer()
                )}
                className={` ${
                  isAllOffer
                    ? "text-white bg-tradeAshLight border-tradeAsh"
                    : "text-tradeFadeWhite bg-transparent border-tradeAshLight"
                } px-[12px] py-[4px] text-[14px] font-[500] rounded-[6.5px] border  hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
              >
                All
              </p>
              <p
                onClick={() => (
                  setIsOnlineOffer(true),
                  setIsAllOffer(false),
                  handleFilterOffer()
                )}
                className={` ${
                  isOnlineOffer
                    ? "text-white bg-tradeAshLight border-tradeAsh"
                    : "text-tradeFadeWhite bg-transparent border-tradeAshLight"
                } px-[12px] py-[4px] text-[14px] font-[500] rounded-[6.5px] border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
              >
                Online
              </p>
            </div>
            <div>
              <div
                onClick={() => setIsOfferSortBy((prev) => !prev)}
                className={`${
                  isOfferSortBy
                    ? "text-white bg-tradeAsh border-tradeAshExtraLight"
                    : "text-neutral-500 bg-transparent border-neutral-800"
                } md:flex hidden justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
              >
                <LuSettings2 className="text-[17px]" />
                <p className=" text-[14px] font-[500]">Sort by</p>
              </div>
              <div
                onClick={() => setIsOfferFilter((prev) => !prev)}
                className={`${
                  isOfferFilter
                    ? "text-white bg-tradeAshLight border-tradeAsh"
                    : "text-tradeFadeWhite bg-transparent border-tradeAshLight"
                } md:hidden flex  justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border cursor-pointer duration-300 transition-all`}
              >
                <LuSettings2 className="text-[17px]" />
                <p className="text-[14px] font-[500]">
                  {isOfferFilter ? "Close Filter" : "Filter"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={` ${
            isOfferFilter ? "flex" : "hidden"
          } z-50 fixed top-0 left-0 right-0 bottom-0 mt-[32%] lg:hidden`}
        >
          <OfferFilter
            serviceType={serviceType}
            setServiceType={setServiceType}
            accountType={accountType}
            setAccountType={setAccountType}
            walletType={walletType}
            setWaletType={setWaletType}
            giftCardType={giftCardType}
            setGiftCardType={setGiftCardType}
            debitCreditCardType={debitCreditCardType}
            setDebitCreditCardType={setDebitCreditCardType}
            amount={amount}
            setAmount={setAmount}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            handleFilterOffer={handleFilterOffer}
            isFilterLoading={isFilterLoading}
            setIsPriceSort={setIsPriceSort}
            isPriceSort={isPriceSort}
            setIsTimeSort={setIsTimeSort}
            isTimeSort={isTimeSort}
            isAllOffer={isAllOffer}
            setIsAllOffer={setIsAllOffer}
            isOnlineOffer={isOnlineOffer}
            setIsOnlineOffer={setIsOnlineOffer}
            handleResetFilter={handleResetFilter}
            setClearFilter={setClearFilter}
          />
        </div>

        <div className="flex flex-col gap-[15px]  rounded-[12px]">
          <div className="flex flex-col gap-[15px]">
            <div className=" sticky md:top-[128px] top-[125px] flex bg-tradeOrange px-[12px] py-[4px] lg:rounded-[px] rounded-[px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Promoted Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px] ">
              <div className=" md:flex hidden bg-tradeAshLight px-[12px] py-[4px] rounded-[px]">
                <p className="flex-1 text-neutral-400 text-[14px] ">Vendor</p>
                <p className="flex-1 text-neutral-400 text-[14px]">Details</p>
                <p className="flex-1 text-neutral-400 text-[14px]">
                  Rate & Performance
                </p>
              </div>
              <div className="grid grid-cols-1 gap-[5px] items-center">
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
                    {/* <div
                      className={`${
                        index < promotedOffers.length - 1
                          ? "border-tradeAshLight"
                          : "border-transparent"
                      } border-b`}
                    ></div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <div className="sticky md:top-[128px] top-[125px] flex bg-white px-[12px] py-[4px] lg:rounded-[px] rounded-[px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Other Offers
              </p>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className=" md:flex hidden bg-tradeAshLight px-[12px] py-[4px] rounded-[px]">
                <p className="flex-1 text-neutral-400 text-[14px] font-[500]">
                  Vendor
                </p>
                <p className="flex-1 text-neutral-400 text-[14px] font-[500]">
                  Details
                </p>
                <p className="flex-1 text-neutral-400 text-[14px] font-[500]">
                  Rate & Performance
                </p>
              </div>
              <div className="grid grid-cols-1 gap-[5px] items-center">
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
                    {/* <div
                      className={`${
                        index < unPromotedOffers.length - 1
                          ? "border-tradeAshLight"
                          : "border-transparent"
                      } border-b`}
                    ></div> */}
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
