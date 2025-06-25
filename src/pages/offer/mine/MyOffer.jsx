import MyOfferCard from "@/components/offer/cards/MyOfferCard";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useEffect, useState, useRef } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { useFetchMyOffers } from "@/hooks/useFetchOffers";
import { useMyOffer } from "@/context/offer/MyOffersContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelectElement } from "@/context/SelectElementContext";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import StateHandler from "@/components/stateHandler/StateHandler";

const MyOffer = () => {
  const { loading, error } = useFetchMyOffers();
  const { myOffers, setMyOffers } = useMyOffer();
  const [offerFilter, setOfferFilter] = useState({
    loading: false,
    allOffers: false,
    activeOffers: false,
    inactiveOffers: false,
    dateOffer: { state: false, months: "", year: "" },
    draftOffers: false,
  });
  const [offers, setOffers] = useState("");
  const { select, setSelect } = useSelectElement();

  const handleShowAllOffers = () => {
    setOfferFilter((prev) => ({
      ...prev,
      allOffers: !prev.allOffers,
      activeOffers: false,
      inactiveOffers: false,
      dateOffer: { day: "", months: "", year: "" },
      draftOffers: false,
    }));
  };

  const handleShowActiveOffers = () => {
    setOfferFilter((prev) => ({
      ...prev,
      activeOffers: !prev.activeOffers,
      allOffers: false,
      inactiveOffers: false,
      dateOffer: { day: "", months: "", year: "" },
      draftOffers: false,
    }));
  };

  const handleShowInActiveOffers = () => {
    setOfferFilter((prev) => ({
      ...prev,
      inactiveOffers: !prev.activeOffers,
      allOffers: false,
      activeOffers: false,
      dateOffer: { day: "", months: "", year: "" },
      draftOffers: false,
    }));
  };

  const handleShowDraftedOffers = () => {
    setOfferFilter((prev) => ({
      ...prev,
      draftOffers: !prev.draftOffers,
      allOffers: false,
      activeOffers: false,
      inactiveOffers: false,
      dateOffer: { day: "", months: "", year: "" },
    }));
  };

  const handleFilterOffer = async () => {
    // 📍 Step 1: Start filtering state
    setOfferFilter((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      // ⏳ Step 2: Simulate loading delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let filteredOffers = myOffers;

      if (offerFilter?.allOffers) {
        setOffers(myOffers);
        return;
      }

      if (offerFilter?.activeOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer?.status == "active"
        );
      }

      if (offerFilter?.inactiveOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer?.status != "active"
        );
      }

      if (offerFilter?.dateOffer?.state) {
        const { day, months, year } = offerFilter.dateOffer;

        filteredOffers = filteredOffers.filter((offer) => {
          if (!offer?.createdAt) return false;

          const date = new Date(offer.createdAt);

          const offerDay = String(date.getUTCDate()).padStart(2, "0");
          const offerMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
          const offerYear = String(date.getUTCFullYear());

          // Apply filtering only on fields that are provided
          const matchDay = day ? offerDay === day : true;
          const matchMonth = months ? offerMonth === months : true;
          const matchYear = year ? offerYear === year : true;

          return matchDay && matchMonth && matchYear;
        });
      }

      // ✅ Step 9: Update filtered offers
      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching or filtering offers:", error);
    } finally {
      // 🛑 Step 10: End filtering state
      setOfferFilter((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    handleFilterOffer();
  }, [myOffers]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.allOffers]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter.activeOffers]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter?.dateOffer?.state]);

  const navigateTo = useNavigate();

  const handleToCreateOffer = () => {
    navigateTo("/offers/create");
  };

  return (
    <>
      <InAppNav />
      <StateHandler
        loading={loading}
        error={error}
        loadingText="Loading your offers. Please wait"
      >
        <div className="flex lg:flex-row flex-col min-h-svh bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[60px]">
          <div className="flex flex-col w-full h-full md:border-x md:border-t md:border-b border-neutral-800">
            <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">My Offers</p>
            </div>

            <div className="sticky top-[60px]  bg-black p-[15px] border-b border-dashed border-tradeAshLight overflow-x-auto">
              <div className="flex justify-between min-w-max gap-[10px]">
                <div className="flex items-center gap-2 bg-transparent">
                  <p
                    onClick={handleShowAllOffers}
                    className={`${
                      offerFilter?.allOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    All
                  </p>
                  <p
                    onClick={handleShowActiveOffers}
                    className={`${
                      offerFilter?.activeOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    Active
                  </p>
                  <p
                    onClick={handleShowInActiveOffers}
                    className={`${
                      offerFilter?.inactiveOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    Inactive
                  </p>
                  <p
                    onClick={handleShowDraftedOffers}
                    className={`${
                      offerFilter?.draftOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } inline-block w-max px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    My Draft
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-transparent">
                  <div
                    className={`${
                      offerFilter?.draftOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } relative flex items-center gap-2 min-w-[90px] px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Month</p>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>

                  <div
                    className={`${
                      offerFilter?.draftOffers
                        ? "text-white bg-tradeAsh border-tradeGreen"
                        : "text-neutral-500 border-neutral-800 hover:text-white"
                    } relative flex items-center gap-2 min-w-[70px] px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    <p>Year</p>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-[15px] gap-[15px] flex flex-col ">
              <div className="grid grid-cols-1 gap-1 md:gap-0 items-center bg-tradeOrange border border-tradeAshLight border-t-0">
                {myOffers && offers.length > 0 ? (
                  offers.map((offer) => (
                    <MyOfferCard key={offer.id} offer={offer} />
                  ))
                ) : (
                  <div className="flex  flex-col gap-2 items-center justify-center text-white py-10 bg-tradeGree ">
                    <div className="flex  flex-col gap-2 items-center justify-center text-white py-10">
                      <p className="text-xl font-semibold">No offers found</p>
                      <p className="text-[13px] text-tradeFadeWhite text-center max-w-[300px]">
                        You haven't created any offers yet. Start by creating a
                        new offer to begin trading.
                      </p>
                    </div>

                    <Button onClick={handleToCreateOffer} variant="primary">
                      Create Offer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default MyOffer;
