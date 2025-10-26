import MyOfferCard from "@/components/offer/userOffer/OfferCard";
import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect, useState, useRef } from "react";
import { useFetchUserOffers } from "@/hooks/userHooks/useFetchOffers";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { useNavigate } from "react-router-dom";
import DasHboardMenu from "@/components/dashboard/DashboardMenu";
import Loading from "@/components/others/Loading";
import SmallButton from "@/components/buttons/SmallButton";
import { FaSort } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import NetworkError from "@/components/others/NetworkError";
import { BiFileBlank } from "react-icons/bi";
import { FaCalendarDay } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
import OfferMenu from "@/components/offer/userOffer/OfferMenu";
import { IoNuclearSharp } from "react-icons/io5";

const MyOffer = () => {
  const {
    pagination,
    page,
    displayedCount,
    loading, // loading for load more
    initialLoading, // only on mount
    next,
    refetchMyOffers,
  } = useFetchUserOffers();
  const { offers, filter, setFilter } = useUserOffer();
  const [triggerScroll, setTriggerScroll] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const { select, setSelect } = useSelectElement();
  const [assets, setAssets] = useState(["All asset"]);

  console.log("offers", offers);
  console.log("Filter", filter);

  useEffect(() => {
    setFilter({
      date: { monthNo: null, monthName: null, year: null },
      asset: null,
      status: null,
    });

    refetchMyOffers();
  }, []);

  const navigateTo = useNavigate();

  const offerStatus = ["All status", "Active", "Paused", "Suspended", "Closed"];

  // handling asset type change
  useEffect(() => {
    if (select?.page !== "my offer" || !select?.pick) return;

    if (select.element === "asset type") {
      const selectedStatus = select.pick === "All asset" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        asset: selectedStatus,
      }));
    }
  }, [select]);

  // handling offer status change
  useEffect(() => {
    if (select?.page !== "my offer" || !select?.pick) return;

    if (select.element === "offer status") {
      console.log("Offer status selected:", select.pick);
      const selectedType = select.pick === "All status" ? null : select.pick;

      setFilter((prev) => ({
        ...prev,
        status: selectedType,
      }));
    }
  }, [select]);

  const join = new Date();
  const now = new Date();

  const min = `${join.getFullYear()}-${String(join.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
  const max = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}`;

  const inputRef = useRef(null);

  const handleDateClick = () => {
    if (!inputRef.current) return;
    if (inputRef.current.showPicker) {
      // works in Chromium ≥ 111
      inputRef.current.showPicker();
    } else {
      // fallback
      inputRef.current.focus();
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value; // format: "YYYY-MM"

    if (!value) {
      // Clear the filter if input is cleared
      setFilter((prev) => ({
        ...prev,
        date: { monthNo: null, monthName: null, year: null },
      }));
      return;
    }

    const [year, month] = value.split("-");
    const monthNum = Number(month);
    const monthName = new Date(`${year}-${month}-01`).toLocaleString(
      "default",
      {
        month: "long",
      }
    );

    setFilter((prev) => ({
      ...prev,
      date: {
        monthNo: monthNum,
        monthName: monthName,
        year: Number(year),
      },
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

  const handleClearFilter = () => {
    setFilter((prev) => ({
      ...prev,
      date: { monthNo: null, monthName: null, year: null },
      asset: null,
      status: null,
      search: null,
    }));
  };

  // This Function handles Loading of transactions
  // 👇 Scroll after page changes
  useEffect(() => {
    if (triggerScroll && transactionRef.current) {
      transactionRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false); // reset flag
    }
  }, [page, triggerScroll]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNext = async () => {
    await next();
  };

  const isEmpty = offers?.data?.length === 0 || offers === null;
  const isEnd = pagination && !pagination.hasNextPage && !isEmpty;
  const message = isEmpty ? "No activity yet" : isEnd ? "End of list" : "";

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          <OfferMenu />
          <div className="flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                MY OFFERS
              </p>
            </div>

            <div className="flex lg:hidden items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <div
                  onClick={() =>
                    setSelect({
                      ...select,
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      element: "asset type",
                      options: assets,
                      pick: "",
                      page: "my offer",
                    })
                  }
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <TbArrowsSort />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    {filter?.asset ? filter?.asset : " ASSET"}
                  </p>
                </div>
                <div
                  onClick={() =>
                    setSelect({
                      ...select,
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      element: "offer status",
                      options: offerStatus,
                      pick: "",
                      page: "my offer",
                    })
                  }
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <TbArrowsSort />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    {filter?.status ? filter?.status : " STATUS"}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center gap-2">
                <div
                  onClick={handleDateClick}
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <LuCalendarClock />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    {filter.date?.monthName ? filter.date?.monthName : "MONTH"},{" "}
                    {filter.date?.year ? filter.date?.year : "YEAR"}
                  </p>
                </div>

                <input
                  type="month"
                  min={min}
                  max={max}
                  onChange={handleDateChange}
                  ref={inputRef}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                />

                {/* <div
                  onClick={handleClearFilter}
                  className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <IoNuclearSharp />
                  <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                    RESET
                  </p>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between gap-[20px]">
              <div className="flex-1 flex flex-col gap-[15px]">
                {initialLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-1">
                    {offers === null ? (
                      <NetworkError />
                    ) : (
                      <div className="flex flex-1">
                        {Array.isArray(offers?.data) &&
                        offers?.data.length > 0 ? (
                          <div className="flex flex-col gap-[5px] w-full h-max">
                            {offers?.data?.map((offer, index) => (
                              <div key={index}>
                                <MyOfferCard offer={offer} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center gap-[10px] bg-transparent">
                            <p className="text-[13px] font-semibold text-white leading-none">
                              {filter?.type ||
                              filter?.status ||
                              filter?.date?.monthName ||
                              (filter?.search && filter.search.trim() !== "")
                                ? "NO OFFER MATCH THE GIVEN CRITERIA"
                                : "NO OFFER FOUND"}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className=" w-full flex items-center pt-[10px]">
                <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                  <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                    <SmallButton variant="outline">
                      <p>{displayedCount}</p>
                    </SmallButton>
                    <SmallButton variant="outline">
                      <p>of</p>
                    </SmallButton>
                    <SmallButton variant="outline">
                      <p>
                        {pagination?.totalItems ? pagination?.totalItems : "0"}
                      </p>
                    </SmallButton>
                  </div>

                  <div className="flex gap-[5px] py-[1px]">
                    <SmallButton variant="outline">
                      {pagination?.hasNextPage ? (
                        <div onClick={handleNext}>
                          {loading ? (
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
      </div>
      <Footer />
    </>
  );
};

export default MyOffer;
