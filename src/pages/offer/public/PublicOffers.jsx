import React, { useRef, useEffect, useState } from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Filter from "@/components/offer/publicOffer/Filter";
import OfferCard from "@/components/cards/Both/OfferCard";
import LockByScroll from "@/components/others/LockByScroll";
import { useFetchPublicOffers } from "@/hooks/publicHooks/useFetchPublicOffers";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import SmallButton from "@/components/buttons/SmallButton";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { RiLoader4Fill } from "react-icons/ri";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { FcLineChart } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

const PublicOffers = () => {
  const topRef = useRef(null);
  const { loading, fetchOffers, pagination, page, displayedCount, next } =
    useFetchPublicOffers();
  const { offers, stats, setStats, filter, setFilter } = usePublicOffers();
  const [loadingMore, setLoadingMore] = useState(false);
  const [backupAmount, setBackupAmount] = useState("200");

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNext = async () => {
    setLoadingMore(true);
    await next();
    setLoadingMore(false);
  };

  const isEmpty = offers?.data?.length === 0 || offers === null;
  const isEnd = pagination && !pagination.hasNextPage && !isEmpty;
  const message = isEmpty ? "No activity yet" : isEnd ? "End of list" : "";

  const adds = ["+20", "+50", "+100", "+200", "+500"];

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

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className=" relative h-full flex gap-[5px] lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[57px]"
      >
        <div className="lg:flex hidden sticky top-[64px] h-[520px]">
          <Filter />
        </div>
        <div className="flex flex-1 flex-col min-h-svh md:border-x md:border-t-0 lg:border-b border-neutral-800  gap-[15px ">
          <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg font-[700] text-white ">
              Secure P2P Marketplace
            </p>
          </div>

          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col flex-1 justify-between ">
              <div className="sticky flex flex-col items-cente w-full md:top-[62px] top-[56px] bg-black  border-b border-dashed border-tradeAshLight gap-[5px]">
                <div className="flex  items-center justify-between py-[12px] px-[15px] bg-tradeAs gap-[20px] overflow-x-hidden custom-x-scrollbar">
                  <p className="text-base font-semibold text-white shrink-0 ">
                    Top Offers
                  </p>

                  <div className="flex gap-[5px]">
                    <div className="lg:hidden flex">
                      <SmallButton variant="fadeout" onClick={showFilter}>
                        <PiSlidersHorizontalBold className="lg:text-[14px] text-[14px]" />
                        <p>Filter</p>
                      </SmallButton>
                    </div>

                    <SmallButton variant="fadeout" onClick={showStats}>
                      <FcLineChart />
                      <p>Stats</p>
                    </SmallButton>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-[15px] gap-[15px] min-h-[120px]">
                {loading && offers === null ? (
                  <Loading />
                ) : (
                  <div className="flex flex-1">
                    {offers === null ? (
                      <NetworkError />
                    ) : (
                      <div className="flex flex-1">
                        {Array.isArray(offers?.data) &&
                        offers?.data.length > 0 ? (
                          <div className="flex flex-col gap-[10px] w-full h-max">
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
                              You haven’t made any transactions yet. When you
                              do, your recent deposits activity will be shown
                              here for easy tracking.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
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
                          {loadingMore ? (
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

            <div className="flex flex-col flex-1 justify-between ">
              <div className="sticky flex flex-col items-cente w-full md:top-[62px] top-[56px] bg-black  border-y border-dashed border-tradeAshLight gap-[5px]">
                <div className="flex  items-center justify-between py-[12px] px-[15px] bg-tradeAs gap-[20px] overflow-x-hidden custom-x-scrollbar">
                  <p className="text-base font-semibold text-white shrink-0 ">
                    Recent Offers
                  </p>

                  <div className="flex gap-[5px]">
                    <div className="lg:hidden flex">
                      <SmallButton variant="fadeout" onClick={showFilter}>
                        <PiSlidersHorizontalBold className="lg:text-[14px] text-[14px]" />
                        <p>Filter</p>
                      </SmallButton>
                    </div>

                    <SmallButton variant="fadeout" onClick={showStats}>
                      <FcLineChart />
                      <p>Stats</p>
                    </SmallButton>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-[15px] gap-[15px] min-h-[120px]">
                {loading && offers === null ? (
                  <Loading />
                ) : (
                  <div className="flex flex-1">
                    {offers === null ? (
                      <NetworkError />
                    ) : (
                      <div className="flex flex-1">
                        {Array.isArray(offers?.data) &&
                        offers?.data.length > 0 ? (
                          <div className="flex flex-col gap-[10px] w-full h-max">
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
                              You haven’t made any transactions yet. When you
                              do, your recent deposits activity will be shown
                              here for easy tracking.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="h-[55px] w-full flex items-center bg-black py-[12px] px-[15px] border-t border-dashed border-tradeAshLight">
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
                          {loadingMore ? (
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

      {filter?.state && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-40">
            <Filter />
          </div>
        </div>
      )}

      {filter?.enterAmount && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex flex-col gap-[40px] items-center justify-center z-50">
            <div className="flex md:w-[300px] h-max flex-col border-neutral-800 rounded-[15px] p-[15px] gap-[10px] bg-tradeAsh">
              <div
                className={`  flex-1 bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer`}
              >
                <input
                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                  type="text"
                  placeholder="Enter amount"
                  value={filter?.amount || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d.-]/g, "");
                    const newAmount = val === "" ? "" : Number(val);

                    setFilter((prev) => {
                      const prevListRaw = Array.isArray(prev.amountList)
                        ? prev.amountList
                        : [];
                      const prevListNums = prevListRaw.map((it) =>
                        toNumber(it)
                      );
                      const moreIndex = prevListRaw.indexOf("Enter amount");
                      let updatedList = [...prevListRaw];

                      if (val === "") {
                        // ✅ Restore original value if we have a backup
                        if (backupAmount !== null && moreIndex > 0) {
                          updatedList[moreIndex - 1] = backupAmount;
                        }
                        return {
                          ...prev,
                          amount: "",
                          amountList: updatedList,
                        };
                      }

                      const exists = prevListNums.some(
                        (n) => Math.abs(n - newAmount) < 1e-9
                      );

                      if (!exists && moreIndex > 0) {
                        // ✅ Save backup before replacing
                        if (backupAmount === null) {
                          setBackupAmount(updatedList[moreIndex - 1]);
                        }
                        updatedList[moreIndex - 1] = String(newAmount);
                      }

                      return {
                        ...prev,
                        amount: newAmount,
                        amountList: updatedList,
                      };
                    });
                  }}
                />
              </div>
              <div className="flex gap-[10px] flex-wrap">
                {adds.map((add) => (
                  <SmallButton
                    variant="fadeoutPlus"
                    onClick={() =>
                      handleAddAmount(parseFloat(add.replace("+", "")))
                    }
                    key={add}
                  >
                    {add}
                  </SmallButton>
                ))}
              </div>
            </div>

            <div className="flex w-full justify-center">
              <div
                onClick={closeEnterAmount}
                className="w-max flex text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <IoClose className="text-[16px]" />
              </div>
            </div>
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
