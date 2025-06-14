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

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    getPromotedOffers();
    getUnPromotedOffers();
  }, [offers]);

  const handleFilterOffer = async () => {
    // 📍 Step 1: Start filtering state
    setOfferFilter((prev) => ({
      ...prev,
      isFiltering: true,
    }));

    try {
      // ⏳ Step 2: Simulate loading delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 📦 Step 3: Fetch offers from mock data
      const response = await axios.get(`/fakeData.json`);
      let filteredOffers = response.data.offers;

      // 🧠 Step 4: Filter by service type (skip if Default)
      if (offerFilter?.serviceType && offerFilter.serviceType !== "Default") {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.serviceType === offerFilter.serviceType
        );
      }

      // 🧠 Step 5: Filter by service
      if (offerFilter?.service) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.service === offerFilter.service
        );
      }

      // 💱 Step 6: Filter by currency code OR name (accurate currency match)
      if (offerFilter?.currency?.code || offerFilter?.currency?.name) {
        const currencyCode = offerFilter.currency?.code;

        filteredOffers = filteredOffers.filter((offer) => {
          const offerCurrency = offer.currency?.code;
          return offerCurrency === currencyCode;
        });
      }

      // 💰 Step 7: Filter by transaction amount range
      if (offerFilter?.amount) {
        filteredOffers = filteredOffers.filter(
          (offer) =>
            offerFilter.amount >= offer.minimum ||
            offerFilter.amount <= offer.maximum
        );
      }

      // Filter by online status (must assign)
      if (offerFilter?.onlineOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.isOnline === true
        );
      }

      if (offerFilter?.bestMargin) {
        filteredOffers = filteredOffers.sort(
          (a, b) => Number(a.margin) - Number(b.margin)
        );
      }

      if (offerFilter?.topFeedBack) {
        filteredOffers = filteredOffers.sort(
          (a, b) => Number(b.positiveFeedback) - Number(a.positiveFeedback)
        );
      }

      if (offerFilter?.mostTrusted) {
        filteredOffers = filteredOffers.sort(
          (a, b) => (Number(b.trustScore) || 0) - (Number(a.trustScore) || 0)
        );
      }

      // ✅ Step 9: Update filtered offers
      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching or filtering offers:", error);
    } finally {
      // 🛑 Step 10: End filtering state
      setOfferFilter((prev) => ({
        ...prev,
        isFiltering: false,
      }));
    }
  };

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.onlineOffers]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.mostTrusted]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.topFeedBack]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.bestMargin]);

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col min-h-svh bg-black lg:px-[2%] md:px-[2.5%] gap-[15px]">
        <div className="lg:flex lg:sticky top-[-0px] max-h-svh pt-[64px] hidden w-[290px]">
          <OfferFilter
            handleFilterOffer={handleFilterOffer}
            setSelect={setSelect}
            select={select}
          />
        </div>

        <div className="flex-1 min-h-svh md:pt-[64px] pt-[60px]">
          <MarketMain
            promotedOffers={promotedOffers}
            unPromotedOffers={unPromotedOffers}
            handleFilterOffer={handleFilterOffer}
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
