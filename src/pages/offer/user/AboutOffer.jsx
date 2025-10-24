import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import OfferFeedback from "@/components/offer/Feedbacks";
import OfferDetails from "@/components/offer/userOffer/OfferDetails";
import OfferInstruction from "@/components/offer/userOffer/OfferInstruction";
import LimitMargin from "@/components/offer/userOffer/OfferLimitMargin";
import OfferPerformance from "@/components/offer/userOffer/OfferPerformance";
import OfferStats from "@/components/offer/userOffer/OfferStats";
import OfferTag from "@/components/offer/userOffer/OfferTag";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import { useParams } from "react-router-dom";
import { useFetchAboutOffers } from "@/hooks/userHooks/useFetchAboutOffer";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import AboutMenu from "@/components/offer/userOffer/AboutMenu";

const AboutOffer = () => {
  const { id } = useParams();
  const { loading, error } = useFetchAboutOffers(id);
  const { aboutOffer } = useUserOffer();

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
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1">
          {aboutOffer === null ? (
            <NetworkError />
          ) : (
            <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
              <AboutMenu />
              <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
                <OfferDetails aboutOffer={aboutOffer} />
                <OfferFeedback />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
