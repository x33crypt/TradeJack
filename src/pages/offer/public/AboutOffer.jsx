import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/others/Footer";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import OfferFeedback from "@/components/offer/Feedbacks";
import DetailsMenu from "@/components/offer/publicOffer/DetailsMenu";
import InAppNav from "@/components/others/InAppNav";

const AboutOffer = () => {
  const topRef = useRef(null);
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { loading } = useFetchAboutOffers();

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {aboutOffer === null ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
                  <DetailsMenu />
                  <div className="flex flex-1 flex-col gap-[40px] lg:mr-[12%] p-[15px]">
                    <OfferDetails aboutOffer={aboutOffer} loading={loading} />
                    <OfferFeedback
                      heading={"Offer feedback"}
                      profile={aboutOffer}
                      loading={loading}
                    />
                  </div>
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

export default AboutOffer;
