import React, { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import OfferCard from "./OfferCard";
import axios from "axios";
import { IoFilter } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";

const MarketMain = () => {
  const [offers, setOffers] = useState();
  const [defaultOffers, setDefaultOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const [isLoading, setIsLoading] = useState();

  const baseUrl = import.meta.env.BASE_URL;

  const getOffers = async () => {
    try {
      const response = await axios.get(`/fakeData.json`);
      console.log(response.data); // Log the actual data from the response
      setOffers(response.data.offers);
    } catch (error) {
      console.error("Error fetching the offers:", error);
    }
  };

  const getPromotedOffers = async () => {
    try {
      const response = await defaultOffers?.filter(
        (offer) => offer.promoted === true
      );
      console.log(response);
      setPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching promoted offers:", error);
    }
  };

  const getUnPromotedOffers = async () => {
    try {
      const response = await defaultOffers?.filter(
        (offer) => offer.promoted === false
      );
      console.log(response);
      setUnPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching unpromoted offers:", error);
    }
  };

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
    <div className="flex flex-col gap-[15px] bg-tradeAs rounded-[8px] bg- ">
      <div className="lg:px-[10px] px-[5px] flex flex-col rounded-[8px] bg- gap-[8px]  ">
        <p className="text-white lg:text-[28px] md:text-[25px] sm:text-[25px] text-[25px] font-[900]">
          Seamless Asset Trading
        </p>
        <p className="text-tradeFadeWhite lg:text-[15px] sm:text-[14px] text-[15px]">
          Sell a variety of digital assets to buyers worldwide with ease,
          ensuring secure and hassle-free transactions.
        </p>
      </div>

      <div className="lg:hidden flex flex-col px-[10px] py-[7px] bg-tradeAshLight border border-neutral-700 rounded-[3px] ">
        <div className="flex justify-between items-center cursor-pointer">
          <p className="text-white font-[700]">Filter Offers</p>
          <div className="p-[6px] border border-white rounded-[3px]">
            <LuFilter className="text-tradeFadeWhite text-[18px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:gap-[20px] gap-[15px] bg-tradeAsh borde border-neutral-800 rounded-[8px] lg:p-[10px] p-[5px]">
        <div className="bg-tradeOrange lg:px-[20px] px-[10px] py-[7px] rounded-[5px]">
          <p className="font-[600] text-[15px]">Promoted Offers</p>
        </div>
        <div className="grid grid-cols-1 lg:gap-[10px] gap-[4px] items-center">
          {promotedOffers?.map((offer, index) => (
            <div key={index}>
              <OfferCard
                id={offer.id}
                verified={offer.verified}
                username={offer.username}
                availability={offer.availability}
                service={offer.service}
                purchaseLimit={offer.purchaseLimit}
                trustScore={offer.trustScore}
                reviews={offer.reviews}
                currency={offer.currency}
              />
            </div>
          ))}
        </div>
        <div className="flex md:flex-row  gap-[10px] flex-col justify-between">
          <p className=" md:w-[140px] w-full py-[7px] flex justify-center bg-neutral-400 hover:bg-neutral-200 font-[600] text-[15px] text-neutral-900 rounded-[3px] cursor-pointer">
            Load More Offers
          </p>

          <p className=" md:w-[130px] w-full py-[7px] flex justify-center bg-transparent hover:bg-tradePurple border border-white text-white font-[600] text-[15px] rounded-[3px] cursor-pointer">
            Create an Offer
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:gap-[20px] gap-[4px] bg-tradeAsh borde border-neutral-800 rounded-[8px] lg:p-[10px] p-[5px]">
        <div className="bg-[rgb(231,206,109)] lg:px-[20px] px-[10px] py-[7px] rounded-[5px]">
          <p className="font-[600] text-[15px]">Other Offers</p>
        </div>
        <div className="grid grid-cols-1 lg:gap-[10px] gap-[4px] items-center">
          {unPromotedOffers?.map((offer, index) => (
            <div key={index}>
              <OfferCard
                id={offer.id}
                verified={offer.verified}
                username={offer.username}
                availability={offer.availability}
                service={offer.service}
                purchaseLimit={offer.purchaseLimit}
                trustScore={offer.trustScore}
                reviews={offer.reviews}
                currency={offer.currency}
              />
            </div>
          ))}
        </div>
        <div className="flex md:flex-row  gap-[10px] flex-col justify-between">
          <p className=" md:w-[140px] w-full py-[7px] flex justify-center bg-neutral-400 hover:bg-neutral-200 font-[600] text-[15px] text-neutral-900 rounded-[3px] cursor-pointer">
            Load More Offers
          </p>

          <p className=" md:w-[130px] w-full py-[7px] flex justify-center bg-transparent hover:bg-tradePurple border border-white text-white font-[600] text-[15px] rounded-[3px] cursor-pointer">
            Create an Offer
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketMain;
