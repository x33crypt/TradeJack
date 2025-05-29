import React, { useEffect, useState } from "react";
import OfferCard from "../offerCards/MarketCard";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { FaMagnifyingGlass } from "react-icons/fa6";

const MarketMain = ({
  promotedOffers,
  unPromotedOffers,
  handleFilterOffer,
}) => {
  const { offerFilter, setOfferFilter } = useOfferFilter();

  const handleShowAllOffer = () => {
    setOfferFilter((prev) => ({
      ...prev,
      allOffers: !prev.allOffers,
      onlineOffers: !prev.allOffers,
    }));
    handleFilterOffer();
  };

  const handleShowOnlineOffer = () => {
    setOfferFilter((prev) => ({
      ...prev,
      allOffers: !prev.allOffers,
      onlineOffers: !prev.allOffers,
    }));
    handleFilterOffer();
  };

  return (
    <div className="flex flex-col gap-[px] h-full md:border-x md:border-t md:border-b border-neutral-800">
      <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-[17px] text-white font-[700]">
          Seamless Asset Trading
        </p>
      </div>

      <div className="flex flex-col gap-[10px] px-[15px] pb-[15px]">
        <div className="z-10 gap-[10px] sticky top-[60px] py-[15px] flex flex-col bg-black ">
          <div className="flex justify-between w-full">
            <div className="max-w-full overflow-x-auto whitespace-nowrap flex items-center gap-2 bg-transparent px-2 hide-scrollbar">
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
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Online
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Low Rate Margin
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                High Rate Margin
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Top-Rated
              </p>
              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } inline-block px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Most-Trusted
              </p>
            </div>

            <div className=" gap-[5px] lg:flex hidden">
              <div
                onClick={handleShowOnlineOffer}
                className="text-neutral-500 border-neutral-800 hover:border-tradeGreen hover:text-white 
        flex items-center justify-center gap-[4px]
        px-[12px] py-[4px] text-[15px] 
        rounded-[6.5px] border cursor-pointer 
        transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <FaMagnifyingGlass />
                <span className="text-[11px] font-semibold text-tradeGreen">
                  3
                </span>
              </div>

              <p
                onClick={handleShowOnlineOffer}
                className={`${
                  offerFilter?.allOffers
                    ? "text-white bg-tradeAsh border-tradeGreen"
                    : "text-neutral-500 border-neutral-800 hover:text-white"
                } px-[12px] py-[4px] text-[13px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
              >
                Guide Me
              </p>
            </div>
          </div>
        </div>

        {/* <div
          className={` ${
            isOfferFilter ? "flex" : "hidden"
          } z-30 fixed top-[62px] md:top-[59px] left-0 right-0 bottom-0 lg:hidden bg-transparent`}
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
            setIsOfferFilter={setIsOfferFilter}
          />
        </div> */}

        <div className="flex flex-col gap-[15px] rounded-[12px]">
          <div className="flex flex-col gap-[15px]">
            <div className=" sticky top-[118px] flex bg-tradeOrange px-[12px] py-[4px] lg:rounded-[px] rounded-[px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Promoted Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px] ">
              <div className="grid grid-cols-1  items-center">
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
              <div className="grid grid-cols-1 items-center">
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
