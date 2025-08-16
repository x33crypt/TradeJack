import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import OfferDetails from "@/components/offer/userOffer/OfferDetails";
import ExchangeCalculator from "@/components/offer/userOffer/ExchangeCalculator";
import AboutVendor from "@/components/offer/userOffer/AboutVendor";
import OfferFeedback from "@/components/offer/global/OfferFeedback";
import Button from "@/components/buttons/Button";
import OfferInstruction from "@/components/offer/userOffer/OfferInstruction";
import OfferTag from "@/components/offer/userOffer/OfferTag";
import { useUserOffer } from "@/context/userContext/OffersContext";
import Feedbacks from "@/components/account/Feedbacks";
import OfferCard from "@/components/cards/Mobile/OfferCard";

const AboutOffer = () => {
  const { aboutOffer } = useUserOffer();
  const [offerDetails, setOfferDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const handleInitiateTrade = () => {};

  return (
    <>
      <MarketTopNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex flex-col md:flex-row md:gap-[5px] gap-[5px] bg-black ">
        <div className="flex-1 flex flex-col gap-[5px]">
          <OfferDetails />
          <Feedbacks heading={"Offer feedback"} />
        </div>
        <div className=" md:w-[350px] flex flex-col md:border border-neutral-800">
          <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-semibold">Related Offers</p>
          </div>
          <div className="flex flex-col gap-[10px] min-h-[120px] p-[15px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <OfferCard />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutOffer;
