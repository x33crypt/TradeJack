import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import OfferFeedback from "@/components/offer/global/OfferFeedback";
import OfferDetails from "@/components/offer/myOffer/OfferDetails";
import OfferInstruction from "@/components/offer/myOffer/OfferInstruction";
import LimitMargin from "@/components/offer/myOffer/OfferLimitMargin";
import OfferPerformance from "@/components/offer/myOffer/OfferPerformance";
import OfferStats from "@/components/offer/myOffer/OfferStats";
import OfferTag from "@/components/offer/myOffer/OfferTag";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import { useParams } from "react-router-dom";
import { useFetchAboutOffers } from "@/hooks/useFetchAboutOffer";
import { useAboutOffer } from "@/context/offer/AboutOfferContext";
import StateHandler from "@/components/stateHandler/StateHandler";
import { useNavigate } from "react-router-dom";

const AboutMyOffer = () => {
  const { id } = useParams();
  const { loading, error } = useFetchAboutOffers(id);
  const { aboutOffer, setAboutOffer } = useAboutOffer();

  const navigateTo = useNavigate();

  const handleEdit = () => {
    const id = aboutOffer?.offerId;

    if (!id) {
      console.error("Offer ID is missing. Cannot navigate.");
      return;
    }

    navigateTo(`/offers/myoffers/${id}/edit`);
  };

  console.log(aboutOffer);

  return (
    <>
      <InAppNav />
      <StateHandler loading={loading} error={error}>
        <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex flex-col gap-[10px] bg-black ">
          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <OfferDetails aboutOffer={aboutOffer} />
            <LimitMargin aboutOffer={aboutOffer} />
          </div>

          <div className="flex-1 flex lg:flex-row flex-col gap-[10px]">
            <OfferTag aboutOffer={aboutOffer} />
            <OfferInstruction />
            <OfferStats />
          </div>

          <div className="px-[15px] md:p-[15px] lg:px-0 ">
            <Button onClick={handleEdit} variant="primary">
              Edit Offer
            </Button>
          </div>

          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <OfferPerformance />
            <OfferFeedback />
          </div>
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default AboutMyOffer;
