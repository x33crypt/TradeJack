import MyOfferCard from "@/components/cards/Both/MyOfferCard";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import React, { useEffect, useState, useRef } from "react";
import { useFetchMyOffers } from "@/hooks/useFetchOffers";
import { useMyOffer } from "@/context/offer/MyOffersContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelectElement } from "@/context/SelectElementContext";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import StateHandler from "@/components/stateHandler/StateHandler";
import DasHboardMenu from "@/components/menuBars/DashboardMenu";
import { TbInvoice } from "react-icons/tb";
import { LuFileX2 } from "react-icons/lu";
import { LuFileSearch } from "react-icons/lu";
import { HiMiniCalendarDateRange } from "react-icons/hi2";

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
        <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[5px] bg-black">
          <DasHboardMenu />
          <div className="flex flex-col flex-1 md:border border-tradeAshLight">
            <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">My Offers</p>
            </div>

            <div className="flex-1 flex ">
              {myOffers && offers.length > 0 ? (
                <div className="flex-1">
                  {/* <div className="sticky md:top-[65px] top-[57px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight overflow-x-auto">
                    <div className="flex justify-between items-center w-full gap-[10px]">
                      <div className="flex items-center gap-2 bg-transparent">
                        <p
                          onClick={handleShowAllOffers}
                          className={`${
                            offerFilter?.allOffers
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          All
                        </p>
                        <p
                          onClick={handleShowActiveOffers}
                          className={`${
                            offerFilter?.activeOffers
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } inline-block w-max px-[12px] py-[4px] text-[14px] font-[600] rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          Active
                        </p>
                        <p
                          onClick={handleShowInActiveOffers}
                          className={`${
                            offerFilter?.inactiveOffers
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium  rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          Inactive
                        </p>
                        <p
                          onClick={handleShowDraftedOffers}
                          className={`${
                            offerFilter?.draftOffers
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } inline-block w-max px-[12px] py-[4px] text-[13px] font-medium  rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          My Draft
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-transparent">
                        <div className="flex  gap-2 bg-transparent">
                          <div className="md:flex hidden items-center gap-1 text-tradeAshLight border-tradeAshLight px-[6px] py-0.5 border rounded-[6.5px] w-max">
                            <HiMiniCalendarDateRange />
                          </div>
                          <div
                            className={`${
                              offerFilter?.draftOffers
                                ? "text-white bg-tradeAsh border-tradeGreen"
                                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                            } relative flex items-center gap-2  px-[12px] py-[4px] text-[13px] font-medium  rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                          >
                            <p>Month</p>
                          </div>

                          <div
                            className={`${
                              offerFilter?.draftOffers
                                ? "text-white bg-tradeAsh border-tradeGreen"
                                : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                            } relative flex items-center gap-2 px-[12px] py-[4px] text-[13px] font-medium  rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                          >
                            <p>Year</p>
                          </div>
                        </div>

                        <div
                          className={`${
                            offerFilter?.draftOffers
                              ? "text-white bg-tradeAsh border-tradeGreen"
                              : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                          } relative flex items-center gap-2 px-[12px] py-[4px] text-[13px] font-medium  rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                        >
                          <p>Clear Filter</p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className=" p-[15px] ">
                    <div className="flex flex-col gap-[5px] md:gap-0 w-full md:overflow-hidden md:bg-tradeAsh md:rounded-[15px] md:border border-tradeAshLight">
                      {offers.map((offer, index) => (
                        <div
                          key={index}
                          className={`${
                            index !== offers.length - 1
                              ? "md:border-b border-tradeAshLight"
                              : ""
                          }`}
                        >
                          <MyOfferCard offer={offer} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col p-[15px] gap-[25px]">
                  <div className="">
                    <p className="text-xs text-tradeFadeWhite font-medium">
                      You currently don’t have any active offers. Creating your
                      first offer is a quick way to connect with trusted
                      traders, expand your trading opportunities, and start
                      growing your activity on the platform.
                    </p>
                  </div>
                  <div className="flex-1 h-full flex items-center justify-center">
                    <LuFileX2 className="text-6xl text-tradeGreen" />
                  </div>
                  <div className="flex w-full">
                    <Button onClick={handleToCreateOffer} variant="primary">
                      Create New Offer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </StateHandler>
      <Footer />
    </>
  );
};

export default MyOffer;
