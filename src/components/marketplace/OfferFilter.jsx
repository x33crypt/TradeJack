import React, { useState, useEffect, useMemo } from "react";
import Button from "@/components/buttons/Button";
import { useServices } from "@/hooks/others/useServices";
import { IoClose } from "react-icons/io5";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import SmallButton from "../buttons/SmallButton";
import { currencies } from "@/hooks/others/useCurrencies";

const OfferFilter = () => {
  const { filter, setFilter } = usePublicOffers();
  const { serviceTypes, fullData } = useServices();
  const [sorts] = useState([
    "Recently active traders",
    "Top picks",
    "Verified offers",
    "Rate: High to Low",
    "Rate: Low to High",
    "Release: Fast to Slow",
    "Release: Slow to Fast",
    "Transfer: Fast to Slow",
    "Transfer: Slow to Fast",
  ]);
  const { select, setSelect } = useSelectElement();
  const [assetsList, setAssetsList] = useState([
    "Zelle",
    "CashApp",
    "eBay Gift Card",
    "Chase Bank",
    "More",
  ]);
  const [currenciesList, setCurrenciesList] = useState([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "More",
  ]);
  const [sortByList, setSortByList] = useState([
    "Recently active traders",
    "Top picks",
    "Verified offers",
    "Rate: High to Low",
    "More",
  ]);

  const close = () => {
    setFilter((prev) => ({
      ...prev,
      state: false,
    }));
  };

  const clearFilter = () => {
    setFilter({
      state: false,
      loading: false,
      assetType: "",
      asset: "",
      currency: { code: "", name: "" },
      amount: "",
      sortBy: null,
      activeTraders: false,
      verifiedOffers: false,
      topPicks: false,
      clearFilter: false,
    });
  };

  const handleFilterOffer = async () => {
    // 📍 Step 1: Start filtering state
    setOfferFilter((prev) => ({
      ...prev,
      isFiltering: true,
    }));

    try {
      // ⏳ Step 2: Simulate loading delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 📦 Step 3: Fetch offers from mock data
      const response = await axios.get(`/fakeData.json`);
      let filteredOffers = response.data.offers;

      // 🧠 Step 4: Filter by service type (skip if Default)
      if (offerFilter?.serviceType && offerFilter.serviceType !== "") {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.serviceType === offerFilter.serviceType
        );
      }

      // 🧠 Step 5: Filter by service
      if (offerFilter?.service) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.service === offerFilter.service
        );
      }

      // 💱 Step 6: Filter by currency code OR name (accurate currency match)
      if (offerFilter?.currency?.code || offerFilter?.currency?.name) {
        const currencyCode = offerFilter.currency?.code;

        filteredOffers = filteredOffers.filter((offer) => {
          const offerCurrency = offer.currency?.code;
          return offerCurrency === currencyCode;
        });
      }

      // 💰 Step 7: Filter by transaction amount range
      if (offerFilter?.amount) {
        filteredOffers = filteredOffers.filter(
          (offer) =>
            offerFilter.amount >= offer.minimum ||
            offerFilter.amount <= offer.maximum
        );
      }

      // Filter by online status (must assign)
      if (offerFilter?.onlineOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.isOnline === true
        );
      }

      if (offerFilter?.bestMargin) {
        filteredOffers = filteredOffers.sort(
          (a, b) => Number(a.margin) - Number(b.margin)
        );
      }

      if (offerFilter?.topFeedBack) {
        filteredOffers = filteredOffers.sort(
          (a, b) => Number(b.positiveFeedback) - Number(a.positiveFeedback)
        );
      }

      if (offerFilter?.mostTrusted) {
        filteredOffers = filteredOffers.sort(
          (a, b) => (Number(b.trustScore) || 0) - (Number(a.trustScore) || 0)
        );
      }

      // ✅ Step 9: Update filtered offers
      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching or filtering offers:", error);
    } finally {
      // 🛑 Step 10: End filtering state
      setOfferFilter((prev) => ({
        ...prev,
        isFiltering: false,
      }));
    }
  };

  let amountList = ["100", "200", "500", "Enter amount"];

  // handling asset changes if clicks visible assets
  const handleAssetChange = (asset) => {
    setFilter((prev) => ({
      ...prev,
      asset: asset,
    }));
  };

  // handling asset changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "assets" &&
      select?.pick
    ) {
      setAssetsList((prevList) => {
        if (prevList.includes(select.pick)) {
          return prevList; // Already exists
        }

        const moreIndex = prevList.indexOf("More");
        if (moreIndex > 0) {
          const newList = [...prevList];
          newList[moreIndex - 1] = select.pick; // Replace before "More"
          return newList;
        }

        return prevList; // If "More" not found
      });

      setFilter((prev) => ({
        ...prev,
        asset: select.pick,
      }));
    }
  }, [select]);

  // hadling currency changes if clicks visible currencies
  const handleCurrencyChange = (code) => {
    setFilter((prev) => ({
      ...prev,
      currency: code,
    }));
  };

  // handling currency changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "currency" &&
      select?.pick
    ) {
      const selectedCurrency = select.pick; // ✅ correct scope

      if (
        typeof selectedCurrency === "object" &&
        selectedCurrency.code &&
        selectedCurrency.name
      ) {
        setCurrenciesList((prevList) => {
          if (prevList.includes(selectedCurrency.code)) {
            return prevList; // Already exists
          }

          const moreIndex = prevList.indexOf("More");
          if (moreIndex > 0) {
            const newList = [...prevList];
            newList[moreIndex - 1] = selectedCurrency.code; // Replace before "More"
            return newList;
          }

          return prevList; // If "More" not found
        });

        setFilter((prev) => ({
          ...prev,
          currency: selectedCurrency.code,
        }));
      }
    }
  }, [select]);

  // handling amount changes if clicks visible amount
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (!isNaN(rawValue)) {
      setFilter((prev) => ({
        ...prev,
        amount: rawValue,
      }));
    }
  };

  // handling sort changes if clicks visible sort
  const handleSortChange = (sort) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: sort,
    }));
  };

  // handling sort changes if clicks more
  useEffect(() => {
    if (
      select?.page === "offer filter" &&
      select?.element === "sort by" &&
      select?.pick
    ) {
      setSortByList((prevList) => {
        if (prevList.includes(select.pick)) {
          return prevList; // Already exists
        }

        const moreIndex = prevList.indexOf("More");
        if (moreIndex > 0) {
          const newList = [...prevList];
          newList[moreIndex - 1] = select.pick; // Replace before "More"
          return newList;
        }

        return prevList; // If "More" not found
      });

      setFilter((prev) => ({
        ...prev,
        sortBy: select?.pick,
      }));
    }
  }, [select]);

  return (
    <>
      <div className="flex flex- md:w-[300px] h-max flex-col md:border-x md:border-t-0 lg:border-b border-neutral-800 rounded-[15px] lg:rounded-none px-[15px] bg-tradeAsh lg:bg-transparent  ">
        <div className="flex lg:hidden justify-between items-center py-[12px] border-b border-neutral-800 ">
          <p className="text-lg text-white font-[700] cursor-pointer">Filter</p>

          <div
            onClick={close}
            className="w-max flex lg:hidden text-white hover:text-tradeFadeWhite gap-1 items-center justify-center bg-tradeAshLight hover:bg-tradeAsh border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
          >
            <IoClose className="text-[16px]" />
          </div>

          <div className="lg:flex hidden">
            <SmallButton onClick={clearFilter}>
              <p>Reset filter</p>
            </SmallButton>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-between py-[12px] gap-[20px] md:h-[480px]">
          <div className=" flex-1 flex flex-col gap-[15px] md:overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-white text-[13px] font-semibold">Asset</p>
              <div className="flex gap-[10px] flex-wrap">
                <div className="flex gap-[10px] flex-wrap">
                  {assetsList.map((asset, index) => (
                    <button
                      key={index}
                      variant="fadeoutPlus"
                      onClick={
                        asset !== "More"
                          ? () => handleAssetChange(asset)
                          : () =>
                              setSelect({
                                state: true,
                                selectOne: true,
                                selectTwo: false,
                                page: "offer filter",
                                element: "assets",
                                options: assetsList,
                              })
                      }
                      className={`${
                        asset === filter?.asset
                          ? "text-black bg-tradeGreen"
                          : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight "
                      } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                    >
                      {asset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-white text-[13px] font-semibold">Currency</p>

              <div className="flex gap-[10px] flex-wrap">
                {currenciesList.map((currency, index) => (
                  <button
                    key={index}
                    variant="fadeoutPlus"
                    onClick={
                      currency !== "More"
                        ? () => handleCurrencyChange(currency)
                        : () =>
                            setSelect({
                              state: true,
                              selectOne: false,
                              selectTwo: true,
                              page: "offer filter",
                              element: "currency",
                              options: currencies,
                            })
                    }
                    className={`${
                      currency === filter?.currency
                        ? "text-black bg-tradeGreen"
                        : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight "
                    } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-white text-[13px] font-semibold">Amount</p>
              <div className="flex gap-[10px] flex-wrap">
                <div className="flex gap-[10px] flex-wrap">
                  {amountList.map((amount, index) => (
                    <SmallButton
                      key={index}
                      variant="fadeoutPlus"
                      onClick={() => handleSort(amount)}
                    >
                      {amount}
                    </SmallButton>
                  ))}
                </div>

                {/* <SmallButton
                  variant="fadeoutPlus"
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: false,
                      selectTwo: true,
                      page: "offer filter",
                      element: "currency",
                      options: currencies,
                    })
                  }
                >
                  More
                </SmallButton> */}
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-white text-[13px] font-semibold">Sort By</p>

              <div className="flex gap-[10px] flex-wrap">
                {sortByList.map((sort, index) => (
                  <button
                    key={index}
                    variant="fadeoutPlus"
                    onClick={
                      sort !== "More"
                        ? () => handleSortChange(sort)
                        : () =>
                            setSelect({
                              state: true,
                              selectOne: true,
                              selectTwo: false,
                              page: "offer filter",
                              element: "sort by",
                              options: sorts,
                            })
                    }
                    className={`${
                      sort === filter?.sortBy
                        ? "text-black bg-tradeGreen"
                        : "text-tradeFadeWhite hover:text-white active:text-tradeFadeWhite bg-tradeAshLight "
                    } flex border border-tradeAshExtraLight items-center gap-1 w-max px-[8px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] bottom-0 left-0 right-0">
            {/* <Button
              onClick={handleFilterOffer}
              variant="primary"
              disabled={filter?.loading}
            >
              Apply Filter
            </Button> */}

            <div className="lg: flex">
              <Button onClick={clearFilter} variant="outline">
                Reset Filter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferFilter;
