import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/others/Footer";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import Feedbacks from "@/components/offer/Feedbacks";
import DetailsMenu from "@/components/offer/publicOffer/DetailsMenu";
import InAppNav from "@/components/others/InAppNav";
import { useParams } from "react-router-dom";

const AboutOffer = () => {
  const { id = "" } = useParams();
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { loading } = useFetchAboutOffers();

  useEffect(() => {
    if (id) {
      setAboutOffer((prev) => ({
        ...prev,
        id: id,
      }));
    }
  }, [id]);

  console.log("Param Offer ID:", id);
  console.log("aboutOffer:", aboutOffer);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <DetailsMenu /> */}
          <div className="flex flex-1 flex-col gap-[40px] lg:mx-[22.8%] p-[15px]">
            <OfferDetails aboutOffer={aboutOffer} id={id} loading={loading} />
            <Feedbacks feedbacks={aboutOffer} id={id} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
