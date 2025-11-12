import React, { useState, useEffect, useRef } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Feedbacks from "@/components/offer/Feedbacks";
import OfferDetails from "@/components/offer/userOffer/OfferDetails";
import { useParams } from "react-router-dom";
import { useFetchAboutOffers } from "@/hooks/userHooks/useFetchAboutOffer";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { useNavigate } from "react-router-dom";
import AboutMenu from "@/components/offer/userOffer/AboutMenu";
import TradeHistory from "@/components/offer/TradeHistory";

const AboutOffer = () => {
  const { id = "" } = useParams();
  const { loading } = useFetchAboutOffers(id);
  const { aboutOffer, setAboutOffer } = useUserOffer();
  const { feedback } = aboutOffer || {};

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
          {/* <AboutMenu /> */}
          <div className="flex flex-1 flex-col gap-[40px] lg:mx-[22.8%] p-[15px]">
            <OfferDetails aboutOffer={aboutOffer} loading={loading} id={id} />
            <TradeHistory loading={loading} />
            <Feedbacks loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
