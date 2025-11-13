import React, { useRef, useEffect, useState } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Filter from "@/components/offer/publicOffer/Filter";
import OfferCard from "@/components/offer/publicOffer/OfferCard";
import LockByScroll from "@/components/others/LockByScroll";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import SmallButton from "@/components/buttons/SmallButton";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useFetchOffers } from "@/hooks/publicHooks/useFetchOffers";
import { RiLoader4Fill } from "react-icons/ri";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import withComma from "@/utils/withComma";
import { TbScan } from "react-icons/tb";
import FloatingTradeButton from "@/components/others/FloatingTradeButton";
import { TbArrowsSort } from "react-icons/tb";
import { IoNuclearSharp } from "react-icons/io5";
import Button from "@/components/buttons/Button";
import { IoMdArrowDropright } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import MiniButton from "@/components/buttons/MiniButton";
import { useFetchProfile } from "@/hooks/userHooks/useFetchProfile";
import { useProfile } from "@/context/userContext/ProfileContext";

const PublicOffers = () => {
  const topRef = useRef(null);
  const {
    initialLoading,
    recentLoading,
    fetchRecent,
    recentPagination,
    recentDisplayedCount,
    nextRecent,
    topLoading,
    fetchTop,
    topPagination,
    topDisplayedCount,
    nextTop,
  } = useFetchOffers();
  const { loading } = useFetchProfile();
  const { profile } = useProfile();
  const { account } = profile;
  const { offers, stats, setStats, filter, setFilter } = usePublicOffers();
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [backupAmount, setBackupAmount] = useState("200");
  const adds = ["+20", "+50", "+100", "+200", "+500", "+1000", "+2000"];

  // useEffect(() => {
  //   setLoadingOffers(true);
  //   fetchRecent();
  //   fetchTop();
  //   setLoadingOffers(false);
  // }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // helper to check empty/end state for a section (recent or top)
  const getSectionStatus = (section) => {
    const isEmpty = !section?.data || section.data.length === 0;
    const isEnd =
      !isEmpty &&
      section?.pagination &&
      (!section.pagination.hasNextPage ||
        section.data.length >= (section.pagination.totalItems || 0));

    let message = null;
    if (isEmpty) {
      message = "No activity yet";
    } else if (isEnd) {
      message = "End of list";
    }

    return {
      isEmpty, // true if no data
      isEnd, // true if reached end of pagination
      message, // null if neither, avoids React "object as child" error
    };
  };

  const recentStatus = getSectionStatus(offers?.recent);
  const topStatus = getSectionStatus(offers?.top);

  const toNumber = (v) => {
    const n = Number(String(v ?? "").replace(/[^\d.-]/g, ""));
    return Number.isNaN(n) ? 0 : n;
  };

  const handleAddAmount = (add) => {
    // defensive extraction if an event slips in
    let val = add;
    if (val && typeof val === "object") {
      val =
        val.target?.dataset?.value ??
        val.currentTarget?.dataset?.value ??
        val.target?.textContent ??
        val.currentTarget?.textContent ??
        "";
    }

    const addValue = toNumber(val);

    setFilter((prev) => {
      // current amount (normalized)
      const current = toNumber(prev.amount);
      const newAmount = current + addValue;

      const prevListRaw = Array.isArray(prev.amountList) ? prev.amountList : [];
      // normalize list to numbers for comparison
      const prevListNums = prevListRaw.map((it) => toNumber(it));

      // numeric existence check (use a tiny epsilon for float safety)
      const exists = prevListNums.some((n) => Math.abs(n - newAmount) < 1e-9);

      // find index of the literal "Enter amount"
      const moreIndex = prevListRaw.indexOf("Enter amount");

      let updatedList = [...prevListRaw];

      if (!exists && moreIndex > 0) {
        // replace the item before "Enter amount"
        const originalType = typeof prevListRaw[moreIndex - 1];
        updatedList[moreIndex - 1] =
          originalType === "string" ? String(newAmount) : newAmount;
      }

      return {
        ...prev,
        amount: newAmount,
        amountList: updatedList,
      };
    });
  };

  const showFilter = () => {
    setFilter((prev) => ({
      ...prev,
      state: true,
    }));
  };

  const clearFilter = () => {
    setFilter({
      loading: false,
      asset: "",
      currency: "",
      enterAmount: false,
      amount: "",
      amountList: ["50", "100", "200", "500", "1000", "2000", "More"],
      sortBy: "",
    });
  };

  const closeEnterAmount = () => {
    setFilter((prev) => ({
      ...prev,
      enterAmount: false,
    }));
  };

  const showStats = () => {
    setStats(true);
  };

  const closeStats = () => {
    setStats(false);
  };

  console.log("user username:", account?.username);

  return (
    <>
      <InAppNav />

      <div
        ref={topRef}
        className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black"
      >
        <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
          {/* <div className="lg:flex hidden">
            <Filter />
          </div> */}
          <div className="flex flex-1 flex-col gap-[30px] lg:mx-[22.8%] p-[15px]">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-white flex items-center gap-1">
                SECURE P2P TRADING
              </p>

              <div
                onClick={showStats}
                className="text-tradeFadeWhite text-3xl fade-pulse cursor-pointer"
              >
                <TbScan />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <MiniButton active={filter?.status != null}>
                <p>RECENT</p>
              </MiniButton>

              <div className="flex items-center gap-2">
                <MiniButton onClick={showFilter}>
                  <p>FILTER</p>
                </MiniButton>

                <MiniButton onClick={clearFilter}>
                  <p> RESET</p>
                </MiniButton>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-[40px]">
              <div className="flex flex-col flex-1 justify-between gap-[20px]">
                <div className="flex  items-center justify-between">
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    TOP OFFERS
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-[15px]">
                  {initialLoading && offers?.top === null ? (
                    <Loading />
                  ) : (
                    <div className="flex flex-1">
                      {offers?.top === null ? (
                        <NetworkError />
                      ) : (
                        <div className="flex flex-1">
                          {Array.isArray(offers?.top?.data) &&
                          offers?.top?.data?.length > 0 ? (
                            <div className="flex flex-col gap-[10px] w-full h-max">
                              {offers?.top?.data?.map((offer, index) => (
                                <div key={offer.id || index}>
                                  <OfferCard
                                    offer={offer}
                                    vendor={account?.username}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col gap-[10px] items-center justify-center">
                              <p className="text-[13px] font-semibold text-white leading-none">
                                NO OFFER FOUND
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* <div className=" w-full flex items-center pt-[10px]">
                  <div className="custom-x-scrollbar flex justify-between gap-[5px]  overflow-x-auto p-[2px]">
                    <div className="flex gap-[5px] transition-all duration-300 py-[1px]">
                      <SmallButton variant="outline">
                        <p>{topDisplayedCount}</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>of</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>
                          {topPagination?.totalItems
                            ? topPagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                    </div>

                    <div className="flex gap-[5px] py-[1px]">
                      <SmallButton variant="outline">
                        {topPagination?.hasNextPage ? (
                          <div onClick={nextTop}>
                            {topLoading ? (
                              <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                            ) : (
                              <p>Load more</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            {topStatus?.message === null ? (
                              <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                            ) : (
                              <p>{topStatus?.message}</p>
                            )}
                          </div>
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
                </div> */}
              </div>

              <div className="flex flex-col flex-1 justify-between gap-[20px] ">
                <div className="flex items-center justify-between ">
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    OTHER OFFERS
                  </p>
                </div>

                <div className="flex-1 flex flex-col gap-[15px]">
                  {initialLoading && offers?.recent === null ? (
                    <Loading />
                  ) : (
                    <div className="flex flex-1">
                      {offers?.recent === null ? (
                        <NetworkError />
                      ) : (
                        <div className="flex flex-1">
                          {Array.isArray(offers?.recent?.data) &&
                          offers?.recent?.data.length > 0 ? (
                            <div className="flex flex-col gap-[10px] w-full h-max">
                              {offers?.recent?.data?.map((offer, index) => (
                                <div key={offer.id || index}>
                                  <OfferCard
                                    offer={offer}
                                    vendor={account?.username}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex-1  flex flex-col gap-[10px] items-center justify-center">
                              <p className="text-[13px] font-semibold text-white leading-none">
                                NO OFFER FOUND
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
                        <p>{recentDisplayedCount}</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>of</p>
                      </SmallButton>
                      <SmallButton variant="outline">
                        <p>
                          {recentPagination?.totalItems
                            ? recentPagination?.totalItems
                            : "0"}
                        </p>
                      </SmallButton>
                    </div>

                    <div className="flex gap-[5px] py-[1px]">
                      <SmallButton variant="outline">
                        {recentPagination?.hasNextPage ? (
                          <div onClick={nextRecent}>
                            {recentLoading ? (
                              <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                            ) : (
                              <p>Load more</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            {recentStatus?.message === null ? (
                              <RiLoader4Fill className="animate-spin text-[19.5px] text-tradeFadeWhite" />
                            ) : (
                              <p>{recentStatus?.message}</p>
                            )}
                          </div>
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
        <FloatingTradeButton />
      </div>
      <Footer />

      {filter?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-40">
            <Filter />
          </div>
        </div>
      )}

      {stats && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-40">
            <div className="flex items-center md:w-[300px] h-max flex-col border-neutral-800 rounded-[15px] p-[15px] gap-[20px] bg-tradeAs">
              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-white text-4xl">5,068</p>
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Active Offers
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-white text-4xl"> 2,580 </p>
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Online Traders
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-white text-4xl">599</p>
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Active Trades
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center">
              <div
                onClick={closeStats}
                className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <IoClose className="text-[16px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicOffers;
