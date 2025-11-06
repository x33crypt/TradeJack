import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/others/Footer";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import Feedbacks from "@/components/offer/Feedbacks";
import DetailsMenu from "@/components/offer/publicOffer/DetailsMenu";
import InAppNav from "@/components/others/InAppNav";

const AboutOffer = () => {
  const topRef = useRef(null);
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { loading } = useFetchAboutOffers();

  console.log("aboutOffer:", aboutOffer);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <DetailsMenu /> */}
          <div className="flex flex-1 flex-col gap-[40px] lg:mx-[22.8%] p-[15px]">
            <OfferDetails aboutOffer={aboutOffer} loading={loading} />
            <Feedbacks feedbacks={aboutOffer} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
