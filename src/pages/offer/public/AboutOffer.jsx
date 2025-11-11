import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/others/Footer";
import OfferDetails from "@/components/offer/publicOffer/OfferDetails";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import Feedbacks from "@/components/offer/Feedbacks";
import DetailsMenu from "@/components/offer/publicOffer/DetailsMenu";
import InAppNav from "@/components/others/InAppNav";
import { useParams } from "react-router-dom";
import { SiAdguard } from "react-icons/si";
import { TiWarning } from "react-icons/ti";
import Button from "@/components/buttons/Button";

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
            <div className="flex flex-col gap-[30px] ">
              <div className="flex flex-col gap-3  ">
                <p className="text-xs text-tradeFadeWhite/50 font-medium leading-relaxed">
                  This offer has been carefully reviewed and verified by our
                  system to ensure it meets our standards for fairness,
                  accuracy, and user protection. Every verified offer undergoes
                  automated and manual checks to confirm the vendor’s
                  authenticity, collateral compliance, and transaction
                  reliability. You can trade with confidence knowing that this
                  offer has passed our trust and safety screening.
                </p>

                <p className="text-xs text-tradeFadeWhite/50 font-medium leading-relaxed">
                  If you ever find this offer misleading, biased, or
                  inconsistent with our marketplace standards, please let us
                  know. Your feedback plays an important role in keeping the
                  platform transparent, fair, and trustworthy for everyone. Use
                  the{" "}
                  <span className="text-tradeOrange font-semibold">Report</span>{" "}
                  button to submit your concern — our compliance team will
                  promptly review and take appropriate action.
                </p>
              </div>

              <Button variant="danger">REPORT</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutOffer;
