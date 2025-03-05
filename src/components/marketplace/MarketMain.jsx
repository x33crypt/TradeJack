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

const MarketMain = () => {
  const [offers, setOffers] = useState();
  const [defaultOffers, setDefaultOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isOfferFilter, setIsOfferFilter] = useState(false);

  const baseUrl = import.meta.env.BASE_URL;

  const getOffers = async () => {
    try {
      const response = await axios.get(`/fakeData.json`);
      console.log(response.data); // Log the actual data from the response
      setOffers(response.data.offers);
      await getOfferVendorsInfo();
    } catch (error) {
      console.error("Error fetching the offers:", error);
    }
  };

  console.log(offers);

  const getPromotedOffers = async () => {
    try {
      const response = await defaultOffers?.filter(
        (offer) => offer.isPromoted === true
      );
      // console.log(response);
      setPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching promoted offers:", error);
    }
  };

  console.log(promotedOffers);

  const getUnPromotedOffers = async () => {
    try {
      const response = await defaultOffers?.filter(
        (offer) => offer.isPromoted === false
      );
      // console.log(response);
      setUnPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching unpromoted offers:", error);
    }
  };

  console.log(unPromotedOffers);

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    if (offers?.length > 0) {
      setDefaultOffers(offers);
    }
  }, [offers]);

  useEffect(() => {
    if (defaultOffers?.length > 0) {
      getPromotedOffers();
      getUnPromotedOffers();
    }
  }, [defaultOffers]);

  return (
    <div className="flex flex-col bg-tradeAsh md:border border-neutral-800 md:rounded-[12px]">
      <div className="flex flex-col justify-between md:p-[20px] px-[20px] py-[16px] border-b border-neutral-800 ">
        <p className="text-[18px] text-white font-[700] cursor-pointer">
          Seamless Asset Trading
        </p>
      </div>
      <div className="flex flex-col md:gap-[10px] gap-[0px] px-[20px]">
        <div className="z-10 sticky top-[65px] md:py-[20px] py-[16px] bg-tradeAsh flex justify-between">
          <div className="max-w-max flex items-center gap-[5px] bg-transparent borde border-neutral-800 rounded-[6.5px]">
            <p className="px-[12px] py-[4px] text-[14px] font-[500] rounded-[6.5px] text-neutral-500 hover:text-white hover:bg-tradeAshExtraLight border border-neutral-800 hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all">
              All
            </p>
            <p className="px-[12px] py-[4px] text-[14px] font-[500] rounded-[6.5px] text-neutral-500 hover:text-white hover:bg-tradeAshExtraLight border border-neutral-800 hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all">
              Active
            </p>
            <p className="px-[12px] py-[4px] text-[14px] font-[500] rounded-[6.5px] text-neutral-500 hover:text-white hover:bg-tradeAshExtraLight border border-neutral-800 hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all">
              Verified
            </p>
          </div>
          <div className="flex justify-between items-center gap-[5px] px-[12px] py-[4px] bg-transparent rounded-[6.5px] text-neutral-500 hover:text-white hover:bg-tradeAshExtraLight border border-neutral-800 hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all">
            <LuSettings2 className="text-[17px]" />
            <p className="flex  text-[14px] font-[500]">Sort by</p>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <div className=" sticky md:top-[135px] top-[127px] flex bg-tradeOrange px-[12px] py-[4px] lg:rounded-[0px] rounded-[0px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Promoted Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className=" md:flex hidden bg-tradeAshLight px-[12px] py-[4px] rounded-[0px]">
                <p className="flex-1 text-neutral-400 text-[14px] ">Vendor</p>
                <p className="flex-1 text-neutral-400 text-[14px]">Details</p>
                <p className="flex-1 text-neutral-400 text-[14px]">
                  Rate & Offer Performance
                </p>
              </div>
              <div className="grid grid-cols-1 items-center">
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
                    <div
                      className={`${
                        index < promotedOffers.length - 1
                          ? "border-tradeAshLight"
                          : "border-transparent"
                      } border-b`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="sticky md:top-[135px] top-[127px] flex bg-white px-[12px] py-[4px] lg:rounded-[0px] rounded-[0px]">
              <p className="flex-1 text-black text-[14px] font-[600] ">
                Other Offers
              </p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className=" md:flex hidden bg-tradeAshLight px-[12px] py-[4px] rounded-[0px]">
                <p className="flex-1 text-neutral-400 text-[14px] ">Vendor</p>
                <p className="flex-1 text-neutral-400 text-[14px]">Details</p>
                <p className="flex-1 text-neutral-400 text-[14px]">
                  Rate & Offer Performance
                </p>
              </div>
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
                    <div
                      className={`${
                        index < promotedOffers.length
                          ? "border-tradeAshLight"
                          : "border-transparent"
                      } border-b`}
                    ></div>
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
