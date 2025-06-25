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
    <div className="bg-black overflow-hidden w-full h-full flex flex-col md:border md:border-t-0 border-neutral-800">
      <div className="flex  justify-between items-center lg:px-[15px] md:px-[2.5%] p-[15px] border-y border-neutral-800 ">
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

      <div className="flex flex-col  h-full overflow-auto custom-scrollbar">
        <div className="flex flex-col justify-between ">
          {/* Service Type field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px] border-b border-tradeAshLight">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Service Type
              </p>
            </div>

            <div className="bg-tra relative w-full cursor-pointer ">
              <input
                className={` ${
                  offerFilter?.serviceType
                    ? "border-tradeAshExtraLight"
                    : "border-tradeAshLight "
                }  bg-tradeAsh mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                type="text"
                readOnly
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

          {/* Service field */}
          <div
            className={`${
              offerFilter?.serviceType ? "flex" : "hidden"
            }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
          >
            <div>
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  {serviceInputLabels[offerFilter.serviceType] ||
                    "Select Service"}
                </p>
              </div>
            </div>

            <div className="relative w-full cursor-pointer ">
              <input
                className={` ${
                  offerFilter?.service
                    ? "border-tradeAshExtraLight text-tradeGreen"
                    : "border-tradeAshLight text-white"
                } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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

          {/* currency field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px] border-b border-tradeAshLight">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Select Currency
              </p>
            </div>

            <div
              className={` ${
                offerFilter?.currency?.name
                  ? "border-tradeAshExtraLight text-tradeGreen"
                  : "border-tradeAshLight text-white"
              } relative flex mt-[5px] text-sm placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full rounded-[10px] cursor-pointer`}
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
                className="w-full p-[12px] outline-none bg-transparent text-tradeOrange text-sm font-[500] placeholder:text-tradeFadeWhite cursor-pointer"
                placeholder="-- --"
                type="text"
                readOnly
                value={offerFilter?.currency?.name}
              />

              <div className=" absolute right-1.5 top-1/2 -translate-y-1/2  border  border-tradeAshLight flex justify-between items-center px-[10px] lg:h-[30px] h-[35px] rounded-[6px]">
                <div>
                  <input
                    className="w-[43px] text-sm  text-tradeOrange placeholder:text-tradeFadeWhite font-[500] bg-transparent outline-none cursor-pointer"
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

          {/* amount field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px]">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Enter Amount
              </p>
            </div>

            <div className="relative w-full cursor-pointer ">
              <input
                className={` ${
                  offerFilter?.amount
                    ? "border-tradeAshExtraLight text-white"
                    : "border-tradeAshLight text-white"
                } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[600] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
      </div>

      <div className="flex flex-col gap-[10px] border-t border-tradeAshLight  lg:px-[15px] py-[15px] md:px-[2.5%] p-[15px]">
        <Button
          onClick={handleFilterOffer}
          variant="primary"
          disabled={offerFilter?.isFiltering}
        >
          {offerFilter?.isFiltering ? "Filtering..." : "Apply Filter"}
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
  );
};

export default OfferFilter;
