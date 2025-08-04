import React, { useEffect, useState, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelectElement } from "@/context/SelectElementContext";
import { useCreateOfferDetails } from "@/context/offer/CreateOfferContext";
import Info from "@/components/alerts/Info";
import Warning from "@/components/alerts/Warning";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { currencies } from "@/hooks/useCurrencies";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import Button from "@/components/buttons/Button";
import { useToast } from "@/context/ToastContext";
import { useServices } from "@/hooks/useServices";
import CreateSummary from "@/components/offer/myOffer/CreateSummary";
import LockByScroll from "@/components/LockByScroll";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TiInfo } from "react-icons/ti";

const CreateOffer = () => {
  const { toast, setToast } = useToast();
  const { select, setSelect } = useSelectElement();
  const { serviceTypes, fullData } = useServices();
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const { rateInfo } = useExchangeRate(
    offerDetails.currency.code ? offerDetails.currency.code : "USD",
    "NGN",
    offerDetails?.margin
  );

  // handling serviceType changes
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "service type") {
      setOfferDetails((prevDetails) => ({
        ...prevDetails,
        serviceType: select.pick,
        service: "", // Reset service when serviceType changes
        serviceId: "", // Reset serviceId when serviceType changes
      }));
    }
  }, [select]);

  // Get services under the selected serviceType
  const services = useMemo(() => {
    if (!offerDetails?.serviceType || fullData.length === 0) return [];

    const selected = fullData.find(
      (item) =>
        item.name.toLowerCase() === offerDetails.serviceType.toLowerCase()
    );

    return selected?.services.map((service) => service.name) || [];
  }, [offerDetails?.serviceType, fullData]);

  // handling service changes
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "service") {
      setOfferDetails((prevDetails) => ({
        ...prevDetails,
        service: select.pick,
      }));
    }
  }, [select]);

  // This function updates the serviceId based on the selected service name
  const updateServiceID = (selectedServiceName) => {
    for (const type of fullData) {
      const matchedService = type.services.find(
        (service) =>
          service.name.toLowerCase() === selectedServiceName.toLowerCase()
      );

      if (matchedService) {
        setOfferDetails((prev) => ({
          ...prev,
          serviceId: matchedService.id, // ✅ Update only the ID
        }));
        break;
      }
    }
  };

  useEffect(() => {
    if (offerDetails?.service) {
      updateServiceID(offerDetails.service);
    }
  }, [offerDetails?.service]);

  // console.log(serviceTypes);
  // console.log(fullData);
  // console.log(rateInfo);

  // handling currency changes
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "currency") {
      console.log("Currency selected:", select.pick);
      const selectedCurrency = select.pick; // ✅ correct scope

      if (
        typeof selectedCurrency === "object" &&
        selectedCurrency.code &&
        selectedCurrency.name
      ) {
        setOfferDetails((prev) => ({
          ...prev,
          currency: selectedCurrency,
        }));
      }
    }
  }, [select]);

  // handling terms changes
  useEffect(() => {
    // Only run when we’re on the edit-offer page and a pick exists
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "terms") {
      const pickedTerm = select.pick;

      if (typeof pickedTerm === "string") {
        const newTag = pickedTerm.trim();
        if (!newTag) return; // empty string guard

        setOfferDetails((prev) => {
          const currentTags = prev.termTags || [];

          /* -------- Duplicate check -------- */
          if (currentTags.includes(newTag)) {
            setToast({
              error: true,
              errorMessage: "That tag already exists.",
            });
            return prev; // 🛑 Do not add duplicate
          }

          /* -------- Tag-limit check -------- */
          if (currentTags.length >= 5) {
            setToast({
              error: true,
              errorMessage: "You can only add up to 5 offer tags.",
            });

            return prev; // 🛑 Do not exceed limit
          }

          /* -------- Add tag normally -------- */
          return {
            ...prev,
            termTags: [...currentTags, newTag],
          };
        });
      }
    }
  }, [select]);

  const serviceInputLabels = {
    "Online Wallet Transfer": "Select Online Wallet",
    "Bank Transfer": "Select Bank Account",
    "Gift Cards Exchange": "Select Gift Card",
    "Crypto Trading": "Select Crypto Asset",
    "Card-Based Spending": "Select Debit or Credit Card",
  };

  // Reset offer details on page load unless coming from the summary page
  const location = useLocation();
  const prevLocationRef = useRef(null);

  useEffect(() => {
    const prevPath = prevLocationRef.current;

    // Only reset if the previous page was NOT the summary
    if (prevPath !== "/offers/create/summary") {
      setOfferDetails(offerDetails);
    }

    // Always update the previous path
    prevLocationRef.current = location.pathname;
  }, [location.pathname]);

  // console.log("select details", select);
  // console.log("offer details", offerDetails);
  // console.log(currencies);

  const handleMinLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      minimum: rawValue,
    }));
  };

  const handleMaxLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      maximum: rawValue,
    }));
  };

  const handleAddMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.margin || 0);
      const next = current + 1;
      return {
        ...prev,
        margin: next > 80 ? 80 : next,
      };
    });
  };

  const handleMinusMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.margin || 0);
      const next = current - 1;

      if (next < 4) {
        setToast({
          error: true,
          errorMessage: "Profit margin cannot go below 4%",
        });
        return prev; // Return previous state — no update
      }

      return {
        ...prev,
        margin: next,
      };
    });
  };

  // Payment Window Vendor

  const handleAddVendorPaymentWindowHour = () => {
    const current = Number(offerDetails?.vendorPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusVendorPaymentWindowHour = () => {
    const current = Number(offerDetails?.vendorPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddVendorPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      offerDetails?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(offerDetails?.vendorPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes + 10;
    let newHours = currentHours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours += 1;
    }

    if (newHours > 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleMinusVendorPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      offerDetails?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(offerDetails?.vendorPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes - 10;
    let newHours = currentHours;

    if (newMinutes < 0) {
      if (newHours === 0) {
        setToast({
          error: true,
          success: false,
          errorMessage:
            "Payment window cannot be less than 0 hours and 0 minutes.",
        });
        return;
      }
      newHours -= 1;
      newMinutes = 50;
    }

    setOfferDetails((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  // Payment Window Trader
  const handleAddTraderPaymentWindowHour = (e) => {
    const current = Number(offerDetails?.tradersPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusTraderPaymentWindowHour = (e) => {
    const current = Number(offerDetails?.tradersPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddTraderPaymentWindowMinutes = (e) => {
    const currentMinutes = Number(
      offerDetails?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(offerDetails?.tradersPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes + 10;
    let newHours = currentHours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours += 1;
    }

    if (newHours > 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setOfferDetails((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleMinusTraderPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      offerDetails?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(offerDetails?.tradersPaymentWindow?.hours || 0);

    let newMinutes = currentMinutes - 10;
    let newHours = currentHours;

    if (newMinutes < 0) {
      if (newHours === 0) {
        setToast({
          error: true,
          success: false,
          errorMessage:
            "Payment window cannot be less than 0 hours and 0 minutes.",
        });
        return;
      }
      newHours -= 1;
      newMinutes = 50;
    }

    setOfferDetails((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleInstruction = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      instruction: e.target.value,
    }));
  };

  const offerTermTags = [
    "Receipt required",
    "No receipt needed",
    "No third-party",
    "Pay exact amount",
    "Fast payment only",
    "Same bank only",
    "No newly created accounts",
    "No prepaid cards",
    "Instant release",
    "Available during working hours",
    "Available weekends only",
    "Quick responder",
    "Response within 10 mins",
    "Expect 30 min delay",
    "Trusted traders only",
    "KYC compliant",
    "High trust score only",
    "English only",
    "Spanish supported",
    "Polite communication required",
    "Clear instructions required",
    "Large trades accepted",
    "Small trades welcome",
    "New user friendly",
    "Test trades allowed",
  ];

  const getMissingServiceLabel = (type) => {
    switch (type) {
      case "Online Wallet Transfer":
        return "Select Online Wallet";
      case "Direct Bank Transfer":
        return "Select Bank Account";
      case "Gift Card Exchange":
        return "Select Gift Card";
      case "Card-Based Spending":
        return "Select Debit or Credit Card";
      case "Crypto Trading":
        return "Select Crypto Asset";
      default:
        return "Service";
    }
  };

  const navigateTo = useNavigate();

  const proceed = () => {
    const {
      serviceType,
      service,
      currency,
      minimum,
      maximum,
      margin,
      termTags,
      vendorPaymentWindow,
      tradersPaymentWindow,
      instruction,
    } = offerDetails;

    const showToast = (message) => {
      setToast({
        ...toast,
        error: true,
        errorMessage: message,
      });
    };

    const isWindowValid = (window) =>
      window && (Number(window?.hours) > 0 || Number(window?.minutes) > 0);

    if (!serviceType) {
      return showToast("Missing required field: Service Type");
    }

    if (!service) {
      const label = getMissingServiceLabel(serviceType);
      return showToast(`Missing required field: ${label}`);
    }

    if (!currency?.code && !currency?.name) {
      return showToast("Missing required field: Select Currency");
    }

    if (!minimum) {
      return showToast("Missing required field: Minimum trade limit");
    }

    if (!maximum) {
      return showToast("Missing required field: Maximum trade limit");
    }

    if (margin <= 2) {
      return showToast(
        "Profit margin must be greater than 2% to publish your offer."
      );
    }

    if (!isWindowValid(vendorPaymentWindow)) {
      return showToast("Missing or invalid Vendor payment window.");
    }

    if (!isWindowValid(tradersPaymentWindow)) {
      return showToast("Missing or invalid Trader payment window.");
    }

    if (!termTags || termTags.length === 0) {
      return showToast("Missing required field: Offer terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: Trade instruction");
    }

    navigateTo("/offers/create/summary");
  };

  const cancel = () => {
    navigateTo(location?.state?.from || -1);
  };

  const handleViewOffers = () => {
    const id = offerDetails?.OfferId;

    if (!id) {
      console.error("Offer ID is missing. Cannot navigate.");
      return;
    }

    // Navigate first
    navigateTo(`/offers/myoffers/${id}`);

    // Then reset offer details
    setOfferDetails({
      serviceType: "Online Wallet Transfer",
      service: "",
      serviceId: "",
      currency: { code: "", name: "" },
      minimum: "",
      maximum: "",
      margin: 4,
      paymentWindow: 1,
      confirmationTime: 1,
      termTags: [],
      instruction: "",
      submitSuccess: false,
      OfferId: "",
    });
  };

  return (
    <>
      <InAppNav />
      <div className="flex gap-[5px] lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[60px]">
        {/* Main Page */}
        <div className="flex flex-col min-h-svh w-full md:border-x md:border-t-0 md:border-b border-neutral-800 ">
          <div className="flex flex-col px-[15px] py-[12px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-semibold">Create Offer</p>
          </div>

          {/* Note Fields */}

          <div className="flex flex-1 flex-col p-[15px] gap-[15px]">
            <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
              Once your offer is created, it will become visible to other
              traders on the platform. Please ensure all details are accurate
              and clearly stated before submitting.
            </p>

            <div className="flex flex-1 flex-col gap-[50px]">
              {/* Offer Creation Field */}
              <div className="flex flex-col gap-[10px]">
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
                        value={offerDetails?.serviceType}
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            element: "service type",
                            options: serviceTypes,
                            pick: "",
                            page: "create offer",
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      {" "}
                      {serviceInputLabels[offerDetails.serviceType] ||
                        "Select Service"}
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                        type="text"
                        readOnly
                        placeholder="Choose wallet"
                        value={offerDetails?.service}
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            element: "service",
                            options: services,
                            pick: "",
                            page: "create offer",
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Currency
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                        type="text"
                        readOnly
                        placeholder="Choose a currency"
                        value={
                          offerDetails.currency.code &&
                          offerDetails.currency.name
                            ? ` ${offerDetails.currency.name} - ${offerDetails.currency.code} `
                            : ""
                        }
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: false,
                            selectTwo: true,
                            element: "currency",
                            options: currencies,
                            pick: "",
                            page: "create offer",
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>

                    <Info
                      text={
                        "Select the currency of the asset you want to trade. This defines the value of your offer and ensures accurate rate calculations for all transactions."
                      }
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Purchase Limit
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        name="firstName"
                        placeholder="0.00"
                        value={
                          offerDetails?.minimum
                            ? Number(offerDetails?.minimum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMinLimitChange(e)}
                      />
                      <div className="w-[60px] flex justify-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh">
                        <p>Min</p>
                      </div>
                    </div>
                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                        type="text"
                        name="firstName"
                        placeholder="0.00"
                        value={
                          offerDetails?.maximum
                            ? Number(offerDetails?.maximum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMaxLimitChange(e)}
                      />
                      <div className="w-[60px] flex justify-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh">
                        <p>Max</p>
                      </div>
                    </div>
                    <Info
                      text={`Set your minimum and maximum purchase limits. By default the minimum purchase limit is 10 ${
                        offerDetails.currency.code === ""
                          ? "USD"
                          : offerDetails.currency.code
                      } while your current maximum purchase limit is 1,000 ${
                        offerDetails.currency.code
                          ? "USD"
                          : offerDetails.currency.code
                      }. Exceeding it will cause submission errors.`}
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Profit Margin
                    </p>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <div
                        onClick={handleMinusMargin}
                        className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <FaMinus />
                      </div>

                      <div
                        onClick={handleAddMargin}
                        className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                      >
                        <p>
                          <span className="font-bold text-white">
                            {offerDetails.margin > 0 ? "+" : ""}
                            {offerDetails.margin}%
                          </span>{" "}
                          profit margin
                        </p>
                      </div>

                      <div
                        onClick={handleAddMargin}
                        className="w-[60px] flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <FaPlus />
                      </div>
                    </div>

                    {offerDetails?.currency?.code &&
                      offerDetails?.minimum &&
                      offerDetails?.maximum && (
                        <div className="flex flex-col gap-1">
                          <p className="text-[13px] text-white font-medium leading-relaxed">
                            Current{" "}
                            <span className="text-tradeGreen font-semibold">
                              {offerDetails.currency.code}
                            </span>{" "}
                            exchange rate is{" "}
                            <span className="text-tradeGreen font-semibold">
                              {rateInfo.baseRate === 0
                                ? "0.00"
                                : rateInfo.baseRate}
                              / USD
                            </span>{" "}
                          </p>

                          <p className="text-[13px] text-white font-medium leading-relaxed">
                            You’re offering a{" "}
                            <span className="text-tradeGreen font-semibold">
                              {offerDetails?.margin}% profit margin
                            </span>
                            . This means for every{" "}
                            <span className="text-tradeGreen font-semibold">
                              1.00 {offerDetails.currency.code}
                            </span>{" "}
                            you trade, your rate is{" "}
                            <span className="text-tradeGreen font-semibold">
                              {rateInfo.finalRate}/USD
                            </span>
                            , and you’ll earn about{" "}
                            <span className="text-tradeGreen font-semibold">
                              {rateInfo.profit} {offerDetails.currency.code}
                            </span>{" "}
                            which is equivalent to{" "}
                            <span className="text-tradeGreen font-semibold">
                              0.00 USD
                            </span>{" "}
                            as profit.
                          </p>
                        </div>
                      )}

                    <Info
                      text={
                        "Set a competitive profit margin that secures your earnings. Note that a service charge typically between 0.5% to 2% applies per trade. To ensure healthy returns, consider starting your margin at 4% or higher."
                      }
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Payment Window (Yourself)
                    </p>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <div
                        onClick={handleMinusVendorPaymentWindowHour}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <p>- Hr</p>
                      </div>

                      <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                        <p>
                          <span className="font-bold text-white">
                            {offerDetails?.vendorPaymentWindow?.hours}
                          </span>{" "}
                          hour&#40;s&#41;
                        </p>
                      </div>

                      <div
                        onClick={handleAddVendorPaymentWindowHour}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <p>+ Hr</p>
                      </div>
                    </div>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <div
                        onClick={handleMinusVendorPaymentWindowMinutes}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <p>- Min</p>
                      </div>

                      <div className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite">
                        <p>
                          <span className="font-bold text-white">
                            {offerDetails?.vendorPaymentWindow?.minutes}
                          </span>{" "}
                          minutes
                        </p>
                      </div>
                      <div
                        onClick={handleAddVendorPaymentWindowMinutes}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <p>+ Min</p>
                      </div>
                    </div>

                    <Info
                      text={
                        "Set the time you’ll have to confirm the trader’s asset transfer and release payment. If you don’t act within this window, the trade will be automatically escalated to a dispute."
                      }
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Payment Window (Traders)
                    </p>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <div
                        onClick={handleMinusTraderPaymentWindowHour}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        - <p>Hr</p>
                      </div>

                      <div
                        onClick={handleAddMargin}
                        className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                      >
                        <p>
                          <span className="font-bold text-white">
                            {offerDetails?.tradersPaymentWindow?.hours}
                          </span>{" "}
                          hour&#40;s&#41;
                        </p>
                      </div>

                      <div
                        onClick={handleAddTraderPaymentWindowHour}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        + <p>Hr</p>
                      </div>
                    </div>

                    <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                      <div
                        onClick={handleMinusTraderPaymentWindowMinutes}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        <p>- Min</p>
                      </div>

                      <div
                        onClick={handleAddMargin}
                        className="flex-1 flex justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite"
                      >
                        <p>
                          <span className="font-bold text-white">
                            {offerDetails?.tradersPaymentWindow?.minutes}
                          </span>{" "}
                          minutes
                        </p>
                      </div>
                      <div
                        onClick={handleAddTraderPaymentWindowMinutes}
                        className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-l border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                      >
                        + <p>Min</p>
                      </div>
                    </div>

                    <Info
                      text={
                        "Set the time limit for traders to transfer assets after a trade begins. If they fail to do so within this window, the trade will be automatically cancelled."
                      }
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Terms
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className={`bg-transparent flex-1 p-[12px] border-none outline-none placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer`}
                        type="text"
                        readOnly
                        placeholder="Select up to 5 terms"
                        onClick={() =>
                          setSelect({
                            ...select,
                            state: true,
                            selectOne: true,
                            selectTwo: false,
                            element: "terms",
                            pick: "",
                            page: "create offer",
                            options: offerTermTags,
                          })
                        }
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <MdKeyboardArrowDown />
                      </div>
                    </div>

                    {offerDetails?.termTags.length > 0 && (
                      <div className={`flex gap-[10px] flex-wrap`}>
                        {offerDetails?.termTags.map((tag, index) => (
                          <div className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[6px] bg-tradeAshLight">
                            <p
                              key={index}
                              className="text-[13px] font-medium text-tradeGreen"
                            >
                              {tag}
                            </p>
                            <IoClose
                              className="text-tradeFadeWhite hover:text-white text-[16px] cursor-pointer transition-all duration-300"
                              onClick={() => {
                                setOfferDetails((prev) => ({
                                  ...prev,
                                  termTags: prev.termTags.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Info
                      text={
                        "You can select up to 5 terms or requirements to help clearly communicate the terms of your offer to potential traders."
                      }
                    />
                  </div>
                </div>

                <div className="p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px] flex flex-col gap-[15px]">
                  <div className="flex flex-col gap-[10px] w-full">
                    <p className="text-tradeFadeWhite text-xs font-medium">
                      Instructions
                    </p>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <textarea
                        onChange={handleInstruction}
                        value={offerDetails?.instruction}
                        className="h-[150px] w-full bg-transparent border-none p-[12px] text-white text-sm font-medium placeholder-tradeFadeWhite focus:outline-none resize-none"
                        placeholder="Write your trade Instructions here."
                      ></textarea>
                    </div>

                    <Info
                      text={
                        "Use this field to share any extra instructions or context that help ensure a smooth, respectful trade. Be clear, helpful, and professional."
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Navigate to Offer Summary Mobile & Tablet */}
              <div className="flex lg:hidden flex-col gap-[10px]">
                <Button onClick={proceed} variant="primary">
                  Proceed
                </Button>
                <Button onClick={cancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Summary For Desktop */}
        <div className="lg:flex hidden">
          <CreateSummary />
        </div>
      </div>

      {offerDetails?.submitSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-[50px]">
          <LockByScroll />
          <div className="bg-tradeAsh flex flex-col items-center p-[12px] gap-4 rounded-[14px] w-[280px] text-center">
            <IoCheckmarkDoneCircleOutline className="text-tradeAshExtraLight text-5xl lg:text-8xl" />
            <p className="text-white font-bold text-2xl leading-none">
              Great job!
            </p>
            <p className="text-[13px] text-tradeFadeWhite font-medium">
              Your offer has been successfully created and published. You can
              now view it, monitor its activity, or make changes from your
              offers dashboard.
            </p>
            <Button onClick={handleViewOffers} variant="secondary">
              See Offer Details
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CreateOffer;
