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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiTruenas } from "react-icons/si";
import Info from "@/components/alerts/Info";
import Loading from "@/components/Loading";
import Feedbacks from "@/components/account/Feedbacks";
import { FaSearch } from "react-icons/fa";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import SmallButton from "@/components/buttons/SmallButton";
import { FaSort } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import NetworkError from "@/components/NetworkError";

const MyOffer = () => {
  const topRef = useRef(null);
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

  console.log(myOffers);

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

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex lg:flex-row flex-col gap-[5px] bg-black">
        <DasHboardMenu />
        <div
          ref={topRef}
          className="flex flex-col flex-1 md:border border-tradeAshLight"
        >
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">My Offers</p>
          </div>

          <div className="px-[15px] py-[12px] border-b border-dashed border-tradeAshLight">
            <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
              View, manage, and monitor every offer you’ve created, complete
              with real-time status updates and key trade details to keep you in
              control.
            </p>
          </div>

          <div className="flex flex-col flex-1 ">
            <div className="sticky h-[55px] flex items-center w-full md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-b border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between gap-[5px] overflow-x-hidden p-[2px]">
                <div className="flex gap-[5px]">
                  <div className="flex gap-[5px]">
                    <SmallButton variant="fadeout">
                      <FaSort />
                      <p>All Asset</p>
                    </SmallButton>
                  </div>
                  <div className="flex gap-[5px]">
                    <SmallButton variant="fadeout">
                      <FaSort />
                      <p>All Status</p>
                    </SmallButton>
                  </div>
                </div>

                <div className="flex gap-[5px]">
                  <SmallButton variant="fadeout">
                    <FaMagnifyingGlass />
                  </SmallButton>
                  <SmallButton variant="fadeout">
                    <FaRegCalendarAlt />
                    <p>Month, Year</p>
                  </SmallButton>
                  <SmallButton variant="primary">
                    <p>Create Offer</p>
                  </SmallButton>
                </div>
              </div>
            </div>

            <div className="flex flex-1 p-[15px]">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-1">
                  {myOffers === null ? (
                    <NetworkError />
                  ) : (
                    <div className="flex flex-1">
                      {Array.isArray(myOffers) && myOffers.length > 0 ? (
                        <div className="flex flex-col gap-[5px] w-full h-max">
                          {myOffers.map((offer, index) => (
                            <div key={index}>
                              <MyOfferCard offer={offer} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <Info text="No active offers yet. Create your first offer to start trading and grow your activity." />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:sticky bottom-0 left-0 right-0 h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
              <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                  <SmallButton variant="outline">
                    <p>0</p>
                  </SmallButton>
                  <SmallButton variant="outline">
                    <p>of</p>
                  </SmallButton>
                  <SmallButton variant="outline">
                    <p>0</p>
                  </SmallButton>
                </div>

                <div className="flex gap-[5px] py-[1px]">
                  <SmallButton variant="outline">
                    {true ? (
                      <div>
                        {false ? (
                          <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                        ) : (
                          <p>Load more</p>
                        )}
                      </div>
                    ) : (
                      <div>{(isEmpty || isEnd) && <p>{message}</p>}</div>
                    )}
                  </SmallButton>

                  <SmallButton
                    variant="outline"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <p>Scroll to Top</p>
                  </SmallButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOffer;
