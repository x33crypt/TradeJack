import React, { useRef, useEffect, useState } from "react";
import OfferCard from "../cards/Both/OfferCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import OfferFilter from "./OfferFilter";
import { BiSolidBinoculars } from "react-icons/bi";
import { TbArrowGuide } from "react-icons/tb";
import { RiColorFilterFill } from "react-icons/ri";
import LockByScroll from "../LockByScroll";
import { useExploreOffers } from "@/context/ExploreOffersContext";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { RiFilter3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useFetchPublicOffers } from "@/hooks/useFetchPublicOffers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "../Loading";
import NetworkError from "../NetworkError";

const MarketMain = ({ promotedOffers }) => {
  const topRef = useRef(null);
  const { loading, fetchOffers, pagination, page, displayedCount, next } =
    useFetchPublicOffers();
  const { offers, filter, setFilter } = useExploreOffers();
  const [triggerScroll, setTriggerScroll] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  console.log("Offers", offers);
  console.log("Filter", filter);

  const inputRef = useRef(null);

  const showFilter = () => {
    setFilter((prev) => ({
      ...prev,
      state: true,
    }));
  };

  const showActiveTraders = () => {
    setFilter((prev) => ({
      ...prev,
      activeTraders: !prev.activeTraders,
      verifiedOffers: false,
      topPicks: false,
    }));
  };

  const showVerifiedOffers = () => {
    setFilter((prev) => ({
      ...prev,
      activeTraders: false,
      verifiedOffers: !prev.verifiedOffers,
      topPicks: false,
    }));
  };

  const showTopPicks = () => {
    setFilter((prev) => ({
      ...prev,
      activeTraders: false,
      verifiedOffers: false,
      topPicks: !prev.topPicks,
    }));
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    setFilter({
      state: false,
      loading: false,
      assetType: "",
      asset: "",
      currency: { code: "", name: "" },
      amount: "",
      sortBy: "",
      activeTraders: false,
      verifiedOffers: false,
      topPicks: false,
      clearFilter: false,
    });

    fetchOffers();
  }, []);

  // This Function handles Loading of transactions
  // 👇 Scroll after page changes
  useEffect(() => {
    if (triggerScroll && transactionRef.current) {
      transactionRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false); // reset flag
    }
  }, [page, triggerScroll]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleNext = async () => {
    setLoadingMore(true);
    await next();
    setLoadingMore(false);
  };

  const isEmpty = offers?.data?.length === 0;
  const isEnd = pagination && !pagination.hasNextPage && !isEmpty;
  const message = isEmpty ? "No activity yet" : isEnd ? "End of list" : "";

  return (
    <>
      <div
        ref={topRef}
        className="flex flex-col min-h-svh md:border-x md:border-t-0 lg:border-b border-neutral-800 "
      >
        <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
          <p className="text-lg font-[700] text-white ">
            Secure P2P Marketplace
          </p>
        </div>
        <div className="px-[15px] py-[12px]">
          <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
            Browse through over 10,000 active trade offers from verified users.
            Use filters to quickly find the best rates, trusted traders, and
            secure deals.
          </p>
        </div>

        <div className="flex flex-col flex-1 justify-between ">
          <div className="sticky md:top-[62px] top-[56px] bg-black py-[12px] px-[15px] border-y border-dashed border-tradeAshLight">
            <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] overflow-x-hidden ">
              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  onClick={showFilter}
                  className={`flex lg:hidden  items-center  gap-2 bg-tradeOrange text-black border-tradeOrange  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <RiFilter3Line className=" text-[18px]" />
                  <p>Filter</p>
                </div>
                <div
                  onClick={showActiveTraders}
                  className={`${
                    filter?.activeTraders
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Active Traders</p>
                </div>
                <div
                  onClick={showVerifiedOffers}
                  className={`${
                    filter?.verifiedOffers
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1 w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Verified Offers</p>
                </div>
                <div
                  onClick={showTopPicks}
                  className={`${
                    filter?.topPicks
                      ? "text-white bg-tradeAsh border-tradeGreen"
                      : "text-tradeFadeWhite border-tradeAshLight hover:text-white"
                  } flex items-center gap-1  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Top Picks</p>
                </div>
              </div>

              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={`flex items-center gap-2 bg-tradeAshLight text-tradeOrange border-tradeAshExtraLight w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <BiSolidBinoculars className="lg:text-[14px] text-[14px]" />
                  <p>Explore</p>
                </div>
                <div
                  onClick={() => navigateTo("/offers/create")}
                  className={`bg-tradeGreen text-black inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Create Offer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-[15px] gap-[15px]">
            {loading && offers === null ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {offers === null ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-1">
                    {Array.isArray(offers?.data) && offers?.data.length > 0 ? (
                      <div className="flex flex-col gap-[5px] w-full h-max">
                        {offers?.data?.map((offer, index) => (
                          <div key={offer.id || index}>
                            <OfferCard offer={offer} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 min-h-[150px] flex flex-col gap-[15px] items-center justify-center">
                        <div className=" flex justify-center items-center text-[55px] text-tradeAshLight">
                          {/* <LuFileX2 /> */}
                        </div>

                        <p className="text-lg font-semibold text-white leading-none">
                          No Transaction Record Found
                        </p>

                        <p className="text-xs text-center w-[300px] font-medium text-tradeFadeWhite">
                          You haven’t made any transactions yet. When you do,
                          your recent deposits activity will be shown here for
                          easy tracking.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-black lg:py-[15px] py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
            <div className="custom-x-scrollbar flex justify-between items-center gap-[5px] ">
              <div className="flex items-cente gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div
                  className={` md:flex hidden text-tradeFadeWhite border-tradeAshLight w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Date</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>{displayedCount}</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>of</p>
                </div>
                <div
                  className={` text-tradeFadeWhite border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>{pagination?.totalItems ? pagination?.totalItems : "0"}</p>
                </div>
              </div>

              <div className="flex gap-[5px] bg-transparent flex-shrink-0 py-[1px] px-[2px]">
                <div className="flex">
                  {pagination?.hasNextPage ? (
                    <div
                      onClick={handleNext}
                      className={`flex items-center text-tradeFadeWhite hover:text-white cursor-pointer border-tradeAshLight  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                    >
                      <p>
                        {loadingMore ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-[15px]" />
                        ) : (
                          "Load more"
                        )}
                      </p>
                    </div>
                  ) : (
                    (isEmpty || isEnd) && (
                      <div
                        className={`flex items-center text-tradeFadeWhite hover:text-white cursor-not-allowed border-tradeAshLight  w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                      >
                        <p className="text-[13px] font-semibold">{message}</p>
                      </div>
                    )
                  )}
                </div>

                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={` text-tradeFadeWhite hover:text-white cursor-pointer border-tradeAshLight inline-block w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] border transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                >
                  <p>Scroll to Top</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filter?.state && (
        <div>
          <LockByScroll />
          <div className="flex z-30 fixed top-[57px] md:top-[64px] left-0 right-0 bottom-0 lg:hidden">
            <OfferFilter />
          </div>
        </div>
      )}
    </>
  );
};

export default MarketMain;
