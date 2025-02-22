import React, { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import OfferCard from "./OfferCard";
import axios from "axios";
import { LuFilter } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";

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
      <div className="flex flex-col rounded-[8px] gap-[8px] md:gap-[5px] lg:px-[10px] px-[5px] bg-tra ">
        <p className="text-white lg:text-[30px] md:text-[30px] sm:text-[30px] text-[28px] font-extrabold">
          Seamless Asset Trading
        </p>
        <p className="text-tradeFadeWhite lg:text-[16px] sm:text-[16px] text-[15px]">
          Sell a variety of digital assets to buyers worldwide with ease,
          ensuring secure and hassle-free transactions.
        </p>
      </div>

      <div className="lg:hidden flex flex-col gap-[20px] p-[5px] bg-tradeAs rounded-[5px]">
        <div className="flex px-[10px] py-[6px] bg-tradeAshLight rounded-[5px] justify-between items-center cursor-pointer">
          <p className="text-white font-[600]">Filter Offers</p>
          <div className="p-[6px] border-[1.5px] border-tradeFadeWhite rounded-[3px]">
            <IoFilter className="text-tradeFadeWhite text-[18px] " />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:gap-[20px] gap-[10px] bg-tradeAsh borde border-neutral-800 rounded-[8px] lg:p-[10px] p-[5px]">
        <div className="bg-tradeOrange lg:px-[20px] px-[10px] py-[8px] rounded-[5px]">
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
          <p className="md:w-[130px] w-full py-[7px] sm:py-[7px] flex justify-center bg-tradeAshLight hover:bg-white borde border-transparent text-white hover:text-black font-[600] text-[15px] sm:text-[14px] rounded-[5px] cursor-pointer transition-all duration-300">
            Load More Offers
          </p>

          <p className="md:w-[130px] w-full py-[7px] sm:py-[7px] flex justify-center bg-tradePurple hover:bg-white border border-tradePurple hover:border-tradePurple  text-white hover:text-tradePurple font-[600] text-[15px]  sm:text-[14px] rounded-[5px] cursor-pointer transition-all duration-300">
            Create an Offer
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:gap-[20px] gap-[10px] bg-tradeAsh borde border-neutral-800 rounded-[8px] lg:p-[10px] p-[5px]">
        <div className="bg-[rgb(231,206,109)] lg:px-[20px] px-[10px] py-[8px] rounded-[5px]">
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
          <p className="md:w-[130px] w-full py-[7px] sm:py-[7px] flex justify-center bg-tradeAshLight hover:bg-white borde border-transparent text-white hover:text-black font-[600] text-[15px] sm:text-[14px] rounded-[5px] cursor-pointer transition-all duration-300">
            Load More Offers
          </p>

          <p className="md:w-[130px] w-full py-[7px] sm:py-[7px] flex justify-center bg-tradePurple hover:bg-white border border-tradePurple hover:border-tradePurple  text-white hover:text-tradePurple font-[600] text-[15px]  sm:text-[14px] rounded-[5px] cursor-pointer transition-all duration-300">
            Create an Offer
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketMain;
