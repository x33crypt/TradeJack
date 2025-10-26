import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import Feedbacks from "@/components/offer/Feedbacks";
import OfferDetails from "@/components/offer/userOffer/OfferDetails";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchAboutOffers } from "@/hooks/userHooks/useFetchAboutOffer";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { useNavigate } from "react-router-dom";
import AboutMenu from "@/components/offer/userOffer/AboutMenu";
import TradeHistory from "@/components/offer/userOffer/TradeHistory";

const AboutOffer = () => {
  const { id } = useParams();
  const { loading } = useFetchAboutOffers(id);
  const { aboutOffer } = useUserOffer();
  const { feedback } = aboutOffer || {};

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
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <AboutMenu />
          <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
            <OfferDetails aboutOffer={aboutOffer} loading={loading} />
            <TradeHistory />
            <Feedbacks feedback={feedback} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
