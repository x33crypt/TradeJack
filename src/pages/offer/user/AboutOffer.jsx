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

const AboutOffer = () => {
  const [offerDetails, setOfferDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const handleInitiateTrade = () => {};

  return (
    <>
      <MarketTopNav />

      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-screen flex flex-col gap-[10px] bg-black ">
        <div className="flex lg:flex-row flex-col gap-[10px] ">
          <div className="flex-1 flex flex-col gap-[10px]">
            <OfferDetails />
            <AboutVendor />
          </div>

          <ExchangeCalculator offerDetails={offerDetails} />
        </div>

        <div className="px-[15px] md:p-[15px] lg:px-0 ">
          <Button
            onClick={handleInitiateTrade}
            variant="primary"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Initiate Trade"}
          </Button>
        </div>

        <div className="flex flex-col gap-[10px] ">
          <div className=" flex md:flex-row flex-col gap-[10px]">
            <OfferTag />
            <OfferInstruction />
          </div>

          <OfferFeedback />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutOffer;
