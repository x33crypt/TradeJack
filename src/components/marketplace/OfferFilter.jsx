import React, { useState, useEffect, useMemo } from "react";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import Button from "@/components/buttons/Button";
import { useServices } from "@/hooks/useServices";
import { currencies } from "@/hooks/useCurrencies";

const OfferFilter = ({ handleFilterOffer, select, setSelect }) => {
  const { offerFilter, setOfferFilter } = useOfferFilter();
  const { serviceTypes, fullData } = useServices();
  const [loading, setLoading] = useState(false);

  // handling serviceType changes
  useEffect(() => {
    if (select?.page !== "offer filter" || !select?.pick) return;

    if (select.element === "service type") {
      setOfferFilter((prevDetails) => ({
        ...prevDetails,
        serviceType: select.pick,
        service: "", // Reset service when serviceType changes
      }));
    }
  }, [select]);

  // Get services under the selected serviceType
  const services = useMemo(() => {
    if (!offerFilter?.serviceType || fullData.length === 0) return [];

    const selected = fullData.find(
      (item) =>
        item.name.toLowerCase() === offerFilter.serviceType.toLowerCase()
    );

    return selected?.services.map((service) => service.name) || [];
  }, [offerFilter?.serviceType, fullData]);

  const serviceInputLabels = {
    "Online Wallet Transfer": "Select Online Wallet",
    "Bank Transfer": "Select Bank Account",
    "Gift Cards Exchange": "Select Gift Card",
    "Crypto Trading": "Select Crypto Asset",
    "Card-Based Spending": "Select Debit or Credit Card",
  };

  // handling service changes
  useEffect(() => {
    if (select?.page !== "offer filter" || !select?.pick) return;

    if (select.element === "service") {
      setOfferFilter((prevDetails) => ({
        ...prevDetails,
        service: select.pick,
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
        setOfferFilter((prev) => ({
          ...prev,
          currency: selectedCurrency,
        }));
      }
    }
  }, [select]);

  // console.log("select element", select);
  // console.log("offerFilter", offerFilter);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (!isNaN(rawValue)) {
      setOfferFilter((prev) => ({
        ...prev,
        amount: rawValue,
      }));
    }
  };

  const handleCloseFilter = () => {
    setOfferFilter((prev) => ({
      ...prev,
      showFilter: false,
    }));
  };

  const handleClearFilter = () => {
    setOfferFilter({
      serviceType: "",
      service: "",
      currency: { code: "", name: "" },
      amount: "",
      allOffers: true,
      onlineOffers: false,
      bestMargin: false,
      topFeedBack: false,
      mostTrusted: false,
      clearFilter: true,
      showFilter: true,
      isFiltering: true,
    });
  };

  useEffect(() => {
    setLoading(true);
    handleFilterOffer();

    setOfferFilter((prev) => ({
      ...prev,
      clearFilter: false,
      isFiltering: false,
    }));

    setLoading(false);
  }, [offerFilter.clearFilter]);

  return (
    <div className="flex flex-1 md:w-[320px]  gap-[5px] flex-col bg-black md:border-x md:border-t-0 lg:border-b border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-neutral-800 ">
        <p className="text-lg text-white font-[700] cursor-pointer">
          Filter Offers
        </p>

        <button
          onClick={handleCloseFilter}
          className={` flex lg:hidden px-[12px] py-[4px] rounded-[10px] text-sm font-semibold transition-all duration-300 bg-transparent text-tradeOrange hover:text-tradeOrange underline-offset-4 hover:underline active:text-tradeFadeWhite ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Close Filter
        </button>

        <button
          onClick={handleClearFilter}
          className={`lg:flex hidden px-[12px] py-[4px] rounded-[10px] text-sm font-semibold transition-all duration-300 bg-transparent text-red-500 hover:text-red-600 active:text-red-700 underline-offset-4 hover:underline ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Clear Filter
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between p-[15px] gap-[35px]">
        <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[10px] w-full">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Asset Type
            </p>
            <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
              <input
                className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                type="text"
                readOnly
                placeholder="Choose type"
                value={
                  offerFilter?.serviceType === ""
                    ? "Default"
                    : offerFilter?.serviceType
                }
                onClick={() =>
                  setSelect({
                    state: true,
                    selectOne: true,
                    selectTwo: false,
                    page: "offer filter",
                    element: "service type",
                    options: serviceTypes,
                    pick: "",
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
              {serviceInputLabels[offerFilter.serviceType] || "Select Service"}
            </p>
            <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
              <input
                className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                type="text"
                readOnly
                placeholder="-- --"
                value={offerFilter?.service}
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
            <p className="text-tradeFadeWhite text-xs font-medium">Currency</p>
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
                value={offerFilter?.currency?.name}
              />

              <div className=" absolute right-1.5 top-1/2 -translate-y-1/2  border  border-tradeAsh flex justify-between items-center px-[5px] lg:h-[30px] h-[35px] rounded-[6px]">
                <div>
                  <input
                    className="w-[43px] text-sm  text-white placeholder:text-tradeFadeWhite font-[500] bg-transparent outline-none cursor-pointer"
                    type="text"
                    value={offerFilter?.currency?.code}
                    readOnly
                    placeholder="$€£"
                  />
                </div>
                <MdKeyboardArrowDown className="text-[17px] text-white" />
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
                  offerFilter?.amount
                    ? Number(offerFilter?.amount).toLocaleString()
                    : ""
                }
                onChange={handleAmountChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] border-t border-tradeAshLight  ">
          <Button
            onClick={handleFilterOffer}
            variant="primary"
            disabled={offerFilter?.isFiltering}
          >
            Apply Filter
          </Button>

          <div className="lg:hidden flex">
            <Button
              onClick={handleClearFilter}
              variant="danger"
              disabled={loading}
            >
              Clear Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferFilter;
