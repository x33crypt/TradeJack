import React, { useState, useEffect, useMemo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/buttons/Button";
import { useServices } from "@/hooks/others/useServices";
import { currencies } from "@/hooks/others/useCurrencies";
import { IoClose } from "react-icons/io5";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { PiToggleLeftFill } from "react-icons/pi";
import { PiToggleRightFill } from "react-icons/pi";
import SmallButton from "../buttons/SmallButton";

const OfferFilter = () => {
  const { filter, setFilter } = usePublicOffers();
  const { serviceTypes, fullData } = useServices();
  const { select, setSelect } = useSelectElement();

  // handling serviceType changes
  useEffect(() => {
    if (select?.page !== "offer filter" || !select?.pick) return;

    if (select.element === "service type") {
      setFilter((prev) => ({
        ...prev,
        assetType: select.pick,
        asset: "", // Reset service when serviceType changes
      }));
    }
  }, [select]);

  // Get services under the selected serviceType
  const services = useMemo(() => {
    if (!filter?.assetType || fullData.length === 0) return [];

    const selected = fullData.find(
      (item) => item.name.toLowerCase() === filter.assetType.toLowerCase()
    );

    return selected?.services.map((service) => service.name) || [];
  }, [filter?.assetType, fullData]);

  const serviceInputLabels = {
    "Online Wallet Transfer": "Select Online Wallet",
    "Bank Transfer": "Select Bank Account",
    "Gift Cards Exchange": "Select Gift Card",
    "Crypto Trading": "Select Crypto Asset",
    "Card-Based Spending": "Select Debit or Credit Card",
  };

  const sortByOptions = [
    "Rate : Highest to lowest",
    "Rate : lowest to highest",
  ];

  // handling service changes
  useEffect(() => {
    if (select?.page !== "offer filter" || !select?.pick) return;

    if (select.element === "service") {
      setFilter((prev) => ({
        ...prev,
        asset: select.pick,
      }));
    }
  }, [select]);

  // handling currency changes
  useEffect(() => {
    if (select?.page !== "offer filter" || !select?.pick) return;

    if (select.element === "currency") {
      console.log("Currency selected:", select.pick);
      const selectedCurrency = select.pick; // ✅ correct scope

      if (
        typeof selectedCurrency === "object" &&
        selectedCurrency.code &&
        selectedCurrency.name
      ) {
        setFilter((prev) => ({
          ...prev,
          currency: selectedCurrency,
        }));
      }
    }
  }, [select]);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (!isNaN(rawValue)) {
      setFilter((prev) => ({
        ...prev,
        amount: rawValue,
      }));
    }
  };

  const closeFilter = () => {
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

  // useEffect(() => {
  //   setLoading(true);
  //   handleFilterOffer();

  //   setOfferFilter((prev) => ({
  //     ...prev,
  //     clearFilter: false,
  //     isFiltering: false,
  //   }));

  //   setLoading(false);
  // }, [offerFilter.clearFilter]);

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

  const showActiveTraders = () => {
    setFilter((prev) => ({
      ...prev,
      activeTraders: !prev.activeTraders,
    }));
  };

  const showVerifiedOffers = () => {
    setFilter((prev) => ({
      ...prev,

      verifiedOffers: !prev.verifiedOffers,
    }));
  };

  return (
    <>
      <div className="flex flex-1 md:w-[300px] flex-col md:border-x md:border-t-0 lg:border-b border-neutral-800 rounded-[15px] lg:rounded-none px-[15px] bg-tradeAsh ">
        <div className="flex justify-between items-center py-[12px] border-b border-neutral-800 ">
          <p className="text-lg text-white font-[700] cursor-pointer">Filter</p>
          <div
            onClick={closeFilter}
            className="md:hidden flex text-tradeFadeWhite hover:text-white text-[25px]"
          >
            <IoClose />
          </div>

          <div className="lg:flex hidden">
            <SmallButton variant="fadeout" onClick={clearFilter}>
              {/* <PiSlidersHorizontalBold className="lg:text-[14px] text-[14px]" /> */}
              <p>Reset filter</p>
            </SmallButton>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-between py-[12px] gap-[20px] md:h-[480px]">
          <div className=" flex-1 flex flex-col gap-[15px] md:overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-tradeFadeWhite text-xs font-medium">Asset</p>
              <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                <input
                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={filter?.assetType}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "offer filter",
                      element: "service",
                      options: services,
                    })
                  }
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Currency
              </p>
              <div
                className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer"
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
                <input
                  className="w-full p-[12px] outline-none bg-transparent text-white text-sm font-[500] placeholder:text-tradeFadeWhite cursor-pointer"
                  placeholder="-- --"
                  type="text"
                  readOnly
                  value={filter?.currency?.code || ""}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] w-full">
              <p className="text-tradeFadeWhite text-xs font-medium">Amount</p>

              <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                <input
                  className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                  type="text"
                  placeholder="00.00"
                  value={
                    filter?.amount
                      ? Number(filter?.amount).toLocaleString()
                      : ""
                  }
                  onChange={handleAmountChange}
                />
              </div>
            </div>

            <div
              onClick={showActiveTraders}
              className="flex justify-between items-center p-[12px] border border-dashed border-tradeAshLight text-white rounded-[12px] cursor-pointer"
            >
              <p className="font-semibold text-[13px]">
                Recently active traders
              </p>

              <div className="">
                {filter?.activeTraders ? (
                  <PiToggleRightFill className="text-tradeGreen text-[25px] hover:text-tradeGreen/50 transition-all duration-300" />
                ) : (
                  <PiToggleLeftFill className="text-tradeAshExtraLight text-[25px] hover:text-tradeAshLight transition-all duration-300" />
                )}
              </div>
            </div>
            <div
              onClick={showVerifiedOffers}
              className="flex justify-between items-center p-[12px] border border-dashed border-tradeAshLight text-white rounded-[12px] cursor-pointer"
            >
              <p className="font-semibold text-[13px]">Verified offers</p>

              <div className="">
                {filter?.verifiedOffers ? (
                  <PiToggleRightFill className="text-tradeGreen text-[25px] hover:text-tradeGreen/50 transition-all duration-300" />
                ) : (
                  <PiToggleLeftFill className="text-tradeAshExtraLight text-[25px] hover:text-tradeAshLight transition-all duration-300" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] md:sticky bottom-0 left-0 right-0">
            <Button
              onClick={handleFilterOffer}
              variant="primary"
              disabled={filter?.loading}
            >
              Apply Filter
            </Button>

            <div className="lg:hidden flex">
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
