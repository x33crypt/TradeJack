import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import OfferFeedback from "@/components/offer/global/OfferFeedback";
import OfferDetails from "@/components/offer/mine/OfferDetails";
import OfferInstruction from "@/components/offer/mine/OfferInstruction";
import LimitMargin from "@/components/offer/mine/OfferLimitMargin";
import OfferPerformance from "@/components/offer/mine/OfferPerformance";
import OfferStats from "@/components/offer/mine/OfferStats";
import OfferTag from "@/components/offer/mine/OfferTag";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import { useParams } from "react-router-dom";
import { useFetchAboutOffers } from "@/hooks/useFetchAboutOffer";
import LoadingPage from "@/components/errorScreens/LoadingPage";
import ReloadPage from "@/components/errorScreens/ReloadPage";
import { useAboutOffer } from "@/context/offer/AboutOfferContext";
import StateHandler from "@/components/stateHandler/StateHandler";

const AboutMyOffer = () => {
  const { id } = useParams();
  const { loading, error } = useFetchAboutOffers(id);
  const { aboutOffer, setAboutOffer } = useAboutOffer();
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {};

  console.log(aboutOffer);

  return (
    <>
      <InAppNav />
      <StateHandler
        loading={loading}
        error={error}
        loadingText="Retrieving the offer information. This won't take long"
      >
        <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%]  min-h-svh flex flex-col gap-[10px] bg-black ">
          <div className="flex lg:flex-row flex-col gap-[10px] ">
            <div className="flex-1 flex flex-col gap-[10px]">
              <OfferDetails aboutOffer={aboutOffer} />
            </div>
            <LimitMargin aboutOffer={aboutOffer} />
          </div>

          <div className="flex-1 flex lg:flex-row flex-col gap-[10px]">
            <OfferTag aboutOffer={aboutOffer} />
            <OfferInstruction />
            <OfferStats />
          </div>

          <div className="px-[15px] md:p-[15px] lg:px-0 ">
            <Button onClick={handleEdit} variant="primary" disabled={editing}>
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
