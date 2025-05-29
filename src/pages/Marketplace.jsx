import React, { useEffect, useState } from "react";
import InAppNav from "@/components/InAppNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/Footer";
import OfferFilter from "@/components/marketplace/OfferFilter";
import axios from "axios";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { useSelectElement } from "@/context/SelectElementContext";

const Marketplace = () => {
  const [offers, setOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const { offerFilter, setOfferFilter } = useOfferFilter();
  const { select, setSelect } = useSelectElement();

  const baseUrl = import.meta.env.BASE_URL;

  const getOffers = async () => {
    try {
      const response = await axios.get(`/fakeData.json`);
      // console.log(response.data); // Log the actual data from the response
      setOffers(response.data.offers);
    } catch (error) {
      console.error("Error fetching the offers:", error);
    }
  };

  const getPromotedOffers = async () => {
    try {
      const response = await offers?.filter(
        (offer) => offer.isPromoted === true
      );
      // console.log(response);
      setPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching promoted offers:", error);
    }
  };

  const getUnPromotedOffers = async () => {
    try {
      const response = await offers?.filter(
        (offer) => offer.isPromoted === false
      );
      // console.log(response);
      setUnPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching unpromoted offers:", error);
    }
  };

  // const handleFilterOffer = async () => {
  //   setOfferFilter((prev) => ({
  //     ...prev,
  //     loading: true,
  //   }));

  //   // console.log(`Service Type: ${serviceType} `);
  //   // console.log(`Service: ${getSelectedService()} `);
  //   // console.log(`Amount: ${amount} `);
  //   // console.log(`Currency: ${selectedCurrency.code} `);

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

  //     // Fetch offers
  //     const response = await axios.get(`/fakeData.json`);
  //     let filteredOffers = response.data.offers;

  //     if (offerFilter?.timeSort === "fastToSlow") {
  //       filteredOffers = [...filteredOffers].sort(
  //         (a, b) => a.avgTradeTime - b.avgTradeTime
  //       );
  //     }

  //     if (offerFilter?.timeSort === "slowToFast") {
  //       filteredOffers = [...filteredOffers].sort(
  //         (a, b) => b.avgTradeTime - a.avgTradeTime
  //       );
  //     }

  //     if (offerFilter?.priceSort === "highToLow") {
  //       filteredOffers = filteredOffers.sort((a, b) => a.price - b.price);
  //     }

  //     if (offerFilter?.priceSort === "lowToHigh") {
  //       filteredOffers = filteredOffers.sort((a, b) => b.price - a.price);
  //     }

  //     // Reset to full list if 'Default' is selected and 'isAllOffer' is true
  //     if (offerFilter?.serviceType === "Default" && offerFilter?.allOffers) {
  //       setOffers(filteredOffers);
  //       return;
  //     }

  //     // Apply other filters
  //     if (offerFilter?.serviceType && offerFilter?.serviceType !== "Default") {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) => offer?.serviceType === offerFilter?.serviceType
  //       );
  //     }

  //     if (offerFilter?.service) {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) => offer.service === offerFilter?.service
  //       );
  //     }

  //     if (offerFilter?.amount) {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) =>
  //           offerFilter?.amount >= offer.miniPurchase &&
  //           offerFilter?.amount <= offer.maxPurchase
  //       );
  //     }

  //     if (offerFilter?.currency?.code) {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) => offer.currency === offerFilter?.currency?.code
  //       );
  //     }

  //     if (offerFilter?.allOffers) {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) => offer.lastSeen === "online"
  //       );
  //     }

  //     if (offerFilter?.onlineOffers) {
  //       filteredOffers = filteredOffers.filter(
  //         (offer) => offer.lastSeen === "online"
  //       );
  //     }

  //     setOffers(filteredOffers);
  //   } catch (error) {
  //     console.error("Error fetching or filtering offers:", error);
  //   } finally {
  //     setOfferFilter((prev) => ({
  //       ...prev,
  //       loading: false,
  //     }));
  //     setIsOfferFilter(false);
  //   }
  // };

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    getPromotedOffers();
    getUnPromotedOffers();
  }, [offers]);

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col min-h-svh bg-black lg:px-[2%] md:px-[2.5%]">
        <div className="lg:flex lg:sticky top-[-17px] max-h-svh pt-[80px] hidden w-[290px]">
          <OfferFilter
            // handleFilterOffer={handleFilterOffer}
            setSelect={setSelect}
            select={select}
          />
        </div>

        <div className="flex-1 min-h-svh md:pt-[80px] pt-[60px]">
          <MarketMain
            promotedOffers={promotedOffers}
            unPromotedOffers={unPromotedOffers}
            // handleFilterOffer={handleFilterOffer}
            setSelect={setSelect}
            select={select}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
