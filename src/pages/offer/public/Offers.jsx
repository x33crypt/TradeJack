import React, { useEffect, useState } from "react";
import InAppNav from "@/components/others/InAppNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/others/Footer";
import OfferFilter from "@/components/marketplace/OfferFilter";
import axios from "axios";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePublicOffers } from "@/context/publicContext/OffersContext";

const Marketplace = () => {
  const { filter, setFilter } = usePublicOffers();
  const [offers, setOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const { select, setSelect } = useSelectElement();

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

  return (
    <>
      <InAppNav />
      <div className=" relative h-full flex gap-[5px] lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[57px]">
        <div className="lg:flex hidden sticky top-[64px] h-[520px]">
          <OfferFilter />
        </div>
        <div className="flex-1 min-h-full ">
          <MarketMain
            promotedOffers={promotedOffers}
            unPromotedOffers={unPromotedOffers}
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
