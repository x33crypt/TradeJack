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
  const [loading, setLoading] = useState(false);

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

  const handleAddPaymentWindow = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      paymentWindow: Math.min(24, Number(prev.paymentWindow || 0) + 1),
    }));
  };

  const handleMinusPaymentWindow = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      paymentWindow: Math.max(1, Number(prev.paymentWindow || 0) - 1),
    }));
  };

  const handleAddConfirmationTime = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      confirmationTime: Math.min(24, Number(prev.confirmationTime || 0) + 1),
    }));
  };

  const handleMinusConfirmationTime = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      confirmationTime: Math.max(1, Number(prev.confirmationTime || 0) - 1),
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

  const NextButton = () => {
    const {
      serviceType,
      service,
      currency,
      minimum,
      maximum,
      margin,
      termTags,
      paymentWindow,
      confirmationTime,
      instruction,
    } = offerDetails;

    const showToast = (message) => {
      setToast({
        ...toast,
        error: true,
        errorMessage: message,
      });
    };

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

    if (!paymentWindow) {
      return showToast("Missing required field: Payment window");
    }

    if (!confirmationTime) {
      return showToast("Missing required field: Confirmation window");
    }

    if (!termTags || termTags.length === 0) {
      return showToast("Missing required field: Offer terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: Trade instruction");
    }

    navigateTo("/offers/create/summary");
  };

  const handleDraft = () => {};

  const cancelButton = () => {
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
      <div className="flex gap-[10px] lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[60px]">
        {/* Main Page */}
        <div className="flex flex-col min-h-svh w-full md:border-x md:border-t-0 md:border-b border-neutral-800 ">
          {/* Heading */}
          <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-lg text-white font-[700]">Create Buy Offer</p>
          </div>

          {/* Note Fields */}
          <div className="flex gap-2 flex-col p-[15px] border-b border-tradeAshLight">
            {/* <div className="w-[80px]">
              <TiInfo className="text-tradeOrange text-[50px]" />
            </div> */}

            <div className="flex flex-col gap-2">
              <p className="text-base text-white font-semibold">
                Please Read Before Creating an Offer
              </p>

              <p className="text-[13px] text-tradeFadeWhite font-medium leading-relaxed">
                Once your offer is created, it will become visible to other
                traders on the platform. Please ensure all details including
                your offer currency, purchase limits, profit margin, and terms
                are accurate and clearly stated before submitting. A
                well-prepared offer not only attracts serious traders but also
                helps prevent misunderstandings and disputes.
              </p>

              {/* <p className="text-[13px] text-tradeFadeWhite font-medium leading-relaxed">
                Remember: You can always edit your offer later, but changes may
                place your offer on temporary hold for verification. Creating
                clear, honest, and competitive offers builds trust and improves
                your trading reputation.
              </p> */}
            </div>
          </div>

          {/* Offer Creation Field */}
          <div className="flex flex-col gap-[0px]">
            {/* Service Type field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-sm font-[500]">Service Type</p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={`${
                    offerDetails?.serviceType
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="Choose wallet"
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
                  onChange={(e) => setOfferDetails.serviceType(e.target.value)}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            {/* Service fields */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-sm font-[500]">
                  {serviceInputLabels[offerDetails.serviceType] ||
                    "Select Service"}
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={`${
                    offerDetails?.service
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-sm text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
            {/* Currency Field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-sm font-[500]">Select Currency</p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={`${
                    offerDetails?.currency?.name
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-sm text-tradeOrange placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="Choose a currency"
                  value={
                    offerDetails.currency.code && offerDetails.currency.name
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
                  onChange={(e) => setOfferDetails.service(e.target.value)}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            {/* Limit Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-sm font-[500]">Purchase Limit</p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex w-full md:flex-row flex-col gap-[15px]">
                  <div className="w-full">
                    <div>
                      <p className="text-tradeFadeWhite text-xs font-[500]">
                        Minimum
                      </p>
                    </div>
                    <div
                      className={`${
                        offerDetails?.minimum
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                    >
                      <input
                        className="text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                        type="text"
                        placeholder="0.00"
                        value={
                          offerDetails?.minimum
                            ? Number(offerDetails?.minimum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMinLimitChange(e)}
                      />
                      <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                        <p className="text-sm text-white font-[700]">
                          {offerDetails.currency.code &&
                          offerDetails.currency.name
                            ? `${offerDetails.currency.code}`
                            : "- -"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div>
                      <p className="text-tradeFadeWhite text-xs font-[500]">
                        Maximum
                      </p>
                    </div>
                    <div
                      className={`${
                        offerDetails?.minimum
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                    >
                      <input
                        className="text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                        type="text"
                        placeholder="0.00"
                        value={
                          offerDetails?.maximum
                            ? Number(offerDetails?.maximum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMaxLimitChange(e)}
                      />
                      <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                        <p className="text-sm text-white font-[700]">
                          {offerDetails.currency.code &&
                          offerDetails.currency.name
                            ? `${offerDetails.currency.code}`
                            : "- -"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <Info
                    text={`Set your minimum and maximum purchase limits. Minimum is 50 ${offerDetails.currency.code}. Your current maximum purchase limit is 1,000 ${offerDetails.currency.code}. Exceeding it will cause submission errors.`}
                  />
                </div>
              </div>
            </div>
            {/* Profit Margine Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-sm font-[500]">Profit Margin</p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row  gap-[15px]">
                  <div
                    onClick={handleMinusMargin}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>

                  <div className="bg-tradeAsh flex justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-sm">
                      <span className="font-bold">
                        {offerDetails.margin > 0 ? "+" : ""}
                        {offerDetails.margin}%
                      </span>{" "}
                      profit margin per trade
                    </p>
                  </div>

                  <div
                    onClick={handleAddMargin}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <div className="flex p-3 bg-tradeAsh rounded-[10px] border border-tradeAshLight flex-col gap-2 text-[13px] text-white leading-relaxed">
                  {offerDetails?.currency?.code ? (
                    <>
                      {/* Market Price */}
                      <div className="flex flex-wrap items-center text-tradeFadeWhite text-[13px] font-medium leading-loose gap-x-1">
                        <span className="align-middle"> Current</span>
                        <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-white text-xs font-medium">
                            {offerDetails.currency.code}
                          </p>
                        </div>
                        <span className="align-middle">exchange rate in</span>
                        <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-white text-xs font-medium">NGN</p>
                        </div>
                        <span className="align-middle">is</span>
                        <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeGreen text-xs font-medium">
                            <span>
                              {rateInfo.baseRate === 0
                                ? "0.00"
                                : rateInfo.baseRate}
                            </span>{" "}
                            <span>NGN</span>
                          </p>
                        </div>
                      </div>

                      {/* Margin Breakdown */}
                      <div className="flex flex-wrap items-center text-tradeFadeWhite text-[13px] font-medium leading-loose gap-x-1">
                        <span className="align-middle">You're offering a</span>

                        <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeOrange text-xs font-medium">
                            {offerDetails?.margin}% profit margin
                          </p>
                        </div>

                        <span className="align-middle">
                          which sets your trade rate at
                        </span>

                        <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeGreen text-xs font-medium">
                            {rateInfo.finalRate} NGN
                          </p>
                        </div>

                        <span className="align-middle">per</span>

                        <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-white text-xs font-medium">
                            1 {offerDetails.currency.code}
                          </p>
                        </div>

                        <span className="align-middle">
                          . You’ll earn about
                        </span>

                        <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-tradeGreen text-xs font-medium">
                            {rateInfo.profit} NGN
                          </p>
                        </div>

                        <span className="align-middle">for every</span>

                        <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                          <p className="text-white text-xs font-medium">
                            1 {offerDetails.currency.code}
                          </p>
                        </div>

                        <span className="align-middle">you trade.</span>
                      </div>

                      {/* Service Charge Note */}
                      <p className="text-tradeFadeWhite font-medium">
                        <span className="text-white font-semibold">Note:</span>{" "}
                        Service charge applies at trade.
                      </p>
                    </>
                  ) : (
                    <p className="text-tradeFadeWhite text-center py-6 font-medium">
                      Your rate breakdown will appear here once you select a
                      currency.
                    </p>
                  )}
                </div>

                <div className="">
                  <Info
                    text={
                      "Set a competitive profit margin that secures your earnings. Note that a service charge typically between 0.5% to 2% applies per trade. To ensure healthy returns, consider starting your margin at 4% or higher."
                    }
                  />
                </div>
              </div>
            </div>
            {/* Payment Window Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-sm font-[500]">Payment Window</p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row gap-[15px]">
                  <div
                    onClick={handleMinusPaymentWindow}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex  justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-sm">
                      <span className="font-bold">
                        {offerDetails?.paymentWindow}
                      </span>{" "}
                      hour&#40;s&#41;
                    </p>
                  </div>
                  <div
                    onClick={handleAddPaymentWindow}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <Info
                  text={
                    "Set how long the seller’s has to make payment after the trade begins. If no payment is made within this period, the trade will be cancelled automatically."
                  }
                />
              </div>
            </div>
            {/* Confirmation Time Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-sm font-[500]">
                  Confirmation Window
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row gap-[15px]">
                  <div
                    onClick={handleMinusConfirmationTime}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex  justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-sm">
                      <span className="font-bold">
                        {offerDetails?.confirmationTime}
                      </span>{" "}
                      hour&#40;s&#41;
                    </p>
                  </div>
                  <div
                    onClick={handleAddConfirmationTime}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <Info
                  text={
                    "Set how long you’ll have to confirm the seller’s payment and release their asset. This helps avoid delays and disputes."
                  }
                />
              </div>
            </div>
            {/* Offer Terms Tag Field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-sm font-[500]">Offer Terms</p>
              </div>

              <div className="flex flex-col gap-[15px]">
                <div
                  className="relative w-full cursor-pointer "
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
                >
                  <div className="">
                    <input
                      className={`${
                        offerDetails?.termTags
                          ? "border-tradeAshLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border hover:border-tradeAshExtraLight outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select terms"
                    />
                  </div>

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>

                <div
                  className={`${
                    offerDetails?.termTags.length == 0 ? "hidden" : "flex"
                  } gap-[10px] flex-wrap`}
                >
                  {offerDetails?.termTags.map((tag, index) => (
                    <div className="flex w-max items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] bg-tradeAshLight">
                      <p
                        key={index}
                        className="text-sm font-medium text-tradeOrange"
                      >
                        {tag}
                      </p>
                      <IoClose
                        className="text-white hover:text-tradeAshExtraLight text-[16px] cursor-pointer transition-all duration-300"
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

                <Info
                  text={
                    "You can select up to 5 terms or requirements to help clearly communicate the terms of your offer to potential traders."
                  }
                />
              </div>
            </div>
            {/* Offer Instruction field Field */}
            <div className="flex flex-col gap-[30px] p-[15px]">
              <div>
                <p className="text-white text-sm font-[500]">
                  Offer Instructions
                </p>
              </div>

              <div className="flex flex-col gap-[15px]">
                <textarea
                  onChange={handleInstruction}
                  value={offerDetails?.instruction}
                  className="h-[150px] w-full bg-tradeAsh border border-tradeAshLight rounded-[10px] p-[12px] text-white text-sm placeholder-tradeFadeWhite focus:outline-none resize-none"
                  placeholder="Write your trade Instructions here."
                ></textarea>

                <Info
                  text={
                    "Use this field to share any extra instructions or context that help ensure a smooth, respectful trade. Be clear, helpful, and professional."
                  }
                />
              </div>
            </div>
          </div>

          {/* Navigate to Offer Summary Mobile & Tablet */}
          <div className="flex lg:hidden flex-col gap-[15px] p-[15px]">
            <Button onClick={NextButton} variant="primary">
              Continue to Summary
            </Button>

            <Button onClick={handleDraft} variant="ghost" disabled={loading}>
              Save in Draft
            </Button>

            <Button onClick={cancelButton} variant="outline">
              Cancel
            </Button>
          </div>
        </div>

        {/* Offer Summary For Desktop */}
        <div className="lg:flex hidden lg:w-[500px]">
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
