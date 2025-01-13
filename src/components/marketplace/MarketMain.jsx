import React, { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import VendorCard from "./VendorCard";
import axios from "axios";

const MarketMain = () => {
  const [offers, setOffers] = useState();
  const [defaultOffers, setDefaultOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const [isLoading, setIsLoading] = useState();

  // Filter options
  const [selectedAsset, setSelectedAsset] = useState(""); // Cashapp, Zelle, PayPal
  const [selectedSort, setSelectedSort] = useState(""); // Rate: Low to High, High to Low
  const [selectedOffer, setSelectedOffer] = useState(""); // Online Vendors, Verified Vendors

  const baseUrl = import.meta.env.BASE_URL;

  const assetFilterOptions = [
    { name: "All", value: "" },
    { name: "Cashapp", value: "Cashapp" },
    { name: "Apple Pay", value: "Apple Pay" },
    { name: "Canada E-transfer", value: "Canada Etransfer" },
    { name: "Western Union", value: "Western Union" },
    { name: "Zelle", value: "Zelle" },
    { name: "PayPal", value: "PayPal" },
    { name: "Venmo", value: "Venmo" },
  ];

  const sortFilterOptions = [
    { name: "Default", value: "" },
    { name: "Trade Rate: Lowest to Highest", value: "TradeRate-Low-to-High" },
    { name: "Trade Rate: Highest to Lowest", value: "TradeRate-High-to-Low" },
    { name: "Trust Score: Lowest to Highest", value: "TrustScore-Low-to-High" },
    {
      name: "Trust Score: Highest to Lowest",
      value: "TrustScore-High-to-Low",
    },
  ];

  const offerFilterOption = [
    { name: "Default", value: "" },
    { name: "Online vendors", value: "online" },
    { name: "Verified vendors", value: "verified" },
  ];

  // Main Offer Provider
  const getOffers = async () => {
    try {
      const response = await axios.get(`/fakeData.json`);
      console.log(response.data); // Log the actual data from the response
      setOffers(response.data.offers);
    } catch (error) {
      console.error("Error fetching the offers:", error);
    }
  };

  const handleSearchOffer = () => {
    let filtered = [...offers];

    // Apply Asset Filter (if selected)
    if (selectedAsset) {
      filtered = filtered.filter((offer) => offer.service === selectedAsset);
    }

    // Apply Sorting (if selected)
    if (selectedSort) {
      const sorted = filtered.sort((a, b) => {
        if (selectedSort === "TrustScore-Low-to-High") {
          return parseFloat(a.trustScore) - parseFloat(b.trustScore);
        } else if (selectedSort === "TrustScore-High-to-Low") {
          return parseFloat(b.trustScore) - parseFloat(a.trustScore);
        }
      });
      filtered = sorted;
    }

    // Apply Offer Filter (if selected)
    if (selectedOffer) {
      if (selectedOffer === "online") {
        filtered = filtered.filter((offer) => offer.availability === "online");
      } else if (selectedOffer === "verified") {
        filtered = filtered.filter((offer) => offer.verified === true);
      }
    }

    // Update the filtered offers
    setDefaultOffers(filtered);
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
    <div className="flex flex-col gap-[35px]">
      <div className="px-[20px] py-[15px] bg-tradeAsh flex gap-[3px] flex-col rounded-[5px]">
        <p className="text-[24px] text-white font-[600] ">
          Explore and Trade Assets Seamlessly
        </p>
        <p className="text-neutral-500 text-[15px]">
          A trusted marketplace where connections thrive, trades excel, and
          opportunities abound.
        </p>
      </div>
      <div className="flex items-center justify-between border border-neutral-600 rounded-[8px] p-[15px]">
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <p className="font-[800] text-[15px] text-neutral-500">Asset :</p>
            <div className="rounded-[5px] overflow-hidden">
              <select
                className=" py-[4px] px-[5px]  text-[15px] outline-none cursor-pointer"
                onChange={(e) => setSelectedAsset(e.target.value)}
              >
                {assetFilterOptions.map((option, index) => (
                  <option id={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <p className="font-[800] text-[15px] text-neutral-500">Sort :</p>
            <div className=" rounded-[5px] overflow-hidden">
              <select
                className="py-[4px] px-[5px] text-[15px] outline-none cursor-pointer"
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                {sortFilterOptions.map((option, index) => (
                  <option id={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <p className="font-[800] text-[15px] text-neutral-500">Offer :</p>
            <div className=" bg-white rounded-[5px] overflow-hidden">
              <select
                className="py-[4px] px-[5px] text-[15px] outline-none cursor-pointer"
                onChange={(e) => setSelectedOffer(e.target.value)}
              >
                {offerFilterOption.map((option, index) => (
                  <option id={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleSearchOffer()}
          className="flex items-center text-[15px] px-[20px] py-[4px] gap-[15px] border border-tradePurple bg-tradePurple hover:bg-white text-white hover:text-tradePurple font-[400] rounded-[5px] cursor-pointer"
        >
          <p>Search Offers</p>
          <TbReload />
        </div>
      </div>
      <div className="flex flex-col gap-[20px] border border-neutral-600 rounded-[10px] p-[15px]">
        <div className="bg-tradeOrange px-[20px] py-[5px]">
          <p className="font-[600]">Promoted Offers</p>
        </div>
        <div className="grid grid-cols-3 gap-x-[15px] gap-y-[30px] items-center">
          {promotedOffers?.map((offer, index) => (
            <div key={index}>
              <VendorCard
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
      </div>
      <div className="flex flex-col gap-[20px] border border-neutral-600 rounded-[10px] p-[15px]">
        <div className="bg-[rgb(231,206,109)] px-[20px] py-[5px]">
          <p className="font-[600]">Other Offers</p>
        </div>
        <div className="grid grid-cols-3 gap-[15px] gap-y-[30px] items-center">
          {unPromotedOffers?.map((offer, index) => (
            <div key={index}>
              <VendorCard
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
      </div>
    </div>
  );
};

export default MarketMain;
