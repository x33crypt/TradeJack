import MarketTopNav from "@/components/others/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/others/Footer";
import { useParams } from "react-router-dom";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useUserOffer } from "@/context/userContext/OffersContext";
import Feedbacks from "@/components/account/Feedbacks";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import RelatedOffers from "@/components/offer/publicOffer/RelatedOffers";
import Button from "@/components/buttons/Button";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";

const AboutPublicOffer = () => {
  const topRef = useRef(null);

  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { loading } = useFetchAboutOffers();
  const navigateTo = useNavigate();

  const handleInitiateTrade = () => {};

  console.log("about offer :", aboutOffer);

  const inputRef = useRef(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <MarketTopNav />
      <div
        ref={topRef}
        className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex flex-col md:flex-row md:gap-[5px] gap-[5px] bg-black "
      >
        <div className="flex flex-col flex-1 ">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {aboutOffer === null ? (
                <NetworkError />
              ) : (
                <div className="flex-1 flex flex-col gap-[5px]">
                  <OfferDetails aboutOffer={aboutOffer} loading={loading} />
                  <div className="py-[15px] md:px-0 px-[15px]">
                    <Button>Initiate Trade</Button>
                  </div>
                  <Feedbacks
                    heading={"Offer feedback"}
                    profile={aboutOffer}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPublicOffer;
