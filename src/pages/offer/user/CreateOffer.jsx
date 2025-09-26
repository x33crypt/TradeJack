import React, { useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelectElement } from "@/context/otherContext/SelectElementContext";
import Info from "@/components/alerts/Info";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { currencies } from "@/hooks/others/useCurrencies";
import { useExchangeRate } from "@/hooks/others/useExchangeRate";
import Button from "@/components/buttons/Button";
import { useToast } from "@/context/otherContext/ToastContext";
import { useServices } from "@/hooks/others/useServices";
import CreateSummary from "@/components/offer/userOffer/CreateSummary";
import LockByScroll from "@/components/others/LockByScroll";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useUserOffer } from "@/context/userContext/OffersContext";
import Stepper from "@/components/others/Steppers";
import MarketDepth from "@/components/offer/global/MarketDepth";
import { publishOffer } from "@/utils/offer/publishOffer";
import { CiDiscount1 } from "react-icons/ci";
import { IoDiscOutline } from "react-icons/io5";
import { BiTargetLock } from "react-icons/bi";

const CreateOffer = () => {
  const topRef = useRef(null);
  const { createOffer, setCreateOffer } = useUserOffer();
  const { toast, setToast } = useToast();
  const { select, setSelect } = useSelectElement();
  const { serviceTypes, fullData } = useServices();
  const { rateInfo } = useExchangeRate(
    createOffer.currency.code ? createOffer.currency.code : "USD",
    "NGN",
    createOffer?.margin
  );

  // handling serviceType changes
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "service type") {
      setCreateOffer((prevDetails) => ({
        ...prevDetails,
        serviceType: select.pick,
        service: "", // Reset service when serviceType changes
        serviceId: "", // Reset serviceId when serviceType changes
      }));
    }
  }, [select]);

  // Get services under the selected serviceType
  const services = useMemo(() => {
    if (!createOffer?.serviceType || fullData.length === 0) return [];

    const selected = fullData.find(
      (item) =>
        item.name.toLowerCase() === createOffer.serviceType.toLowerCase()
    );

    return selected?.services.map((service) => service.name) || [];
  }, [createOffer?.serviceType, fullData]);

  // handling service changes
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.pick) return;

    if (select.element === "service") {
      setCreateOffer((prevDetails) => ({
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
        setCreateOffer((prev) => ({
          ...prev,
          serviceId: matchedService.id, // ✅ Update only the ID
        }));
        break;
      }
    }
  };

  useEffect(() => {
    if (createOffer?.service) {
      updateServiceID(createOffer.service);
    }
  }, [createOffer?.service]);

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
        setCreateOffer((prev) => ({
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

        setCreateOffer((prev) => {
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
      setCreateOffer(createOffer);
    }

    // Always update the previous path
    prevLocationRef.current = location.pathname;
  }, [location.pathname]);

  // console.log("select details", select);
  // console.log("offer details", createOffer);
  // console.log(currencies);

  const handleMinLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setCreateOffer((prev) => ({
      ...prev,
      minimum: rawValue,
    }));
  };

  const handleMaxLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setCreateOffer((prev) => ({
      ...prev,
      maximum: rawValue,
    }));
  };

  const handleAddMargin = () => {
    setCreateOffer((prev) => {
      const current = Number(prev.margin || 0);
      const next = current + 1;
      return {
        ...prev,
        margin: next > 80 ? 80 : next,
      };
    });
  };

  const handleMinusMargin = () => {
    setCreateOffer((prev) => {
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
    const current = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusVendorPaymentWindowHour = () => {
    const current = Number(createOffer?.vendorPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      vendorPaymentWindow: {
        ...prev.vendorPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddVendorPaymentWindowMinutes = () => {
    const currentMinutes = Number(
      createOffer?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.vendorPaymentWindow?.hours || 0);

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

    setCreateOffer((prev) => ({
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
      createOffer?.vendorPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.vendorPaymentWindow?.hours || 0);

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

    setCreateOffer((prev) => ({
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
    const current = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    if (current >= 48) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot exceed 48 hours.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current + 1,
      },
    }));
  };

  const handleMinusTraderPaymentWindowHour = (e) => {
    const current = Number(createOffer?.tradersPaymentWindow?.hours || 0);

    if (current <= 0) {
      setToast({
        error: true,
        success: false,
        errorMessage: "Payment window cannot be less than 0 hour.",
      });
      return;
    }

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: current - 1,
      },
    }));
  };

  const handleAddTraderPaymentWindowMinutes = (e) => {
    const currentMinutes = Number(
      createOffer?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.tradersPaymentWindow?.hours || 0);

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

    setCreateOffer((prev) => ({
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
      createOffer?.tradersPaymentWindow?.minutes || 0
    );
    const currentHours = Number(createOffer?.tradersPaymentWindow?.hours || 0);

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

    setCreateOffer((prev) => ({
      ...prev,
      tradersPaymentWindow: {
        ...prev.tradersPaymentWindow,
        hours: newHours,
        minutes: newMinutes,
      },
    }));
  };

  const handleInstruction = (e) => {
    setCreateOffer((prev) => ({
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

  const proceedToSummary = () => {
    const { termTags, instruction } = createOffer;

    const showToast = (message) => {
      setToast({
        ...toast,
        error: true,
        errorMessage: message,
      });
    };

    if (!termTags || termTags.length === 0) {
      return showToast("Missing required field: Offer terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: Trade instruction");
    }

    navigateTo("/offers/user/summary");
  };

  const handlepublish = async () => {
    const { termTags, instruction } = createOffer;

    const showToast = (message) => {
      setToast({
        ...toast,
        error: true,
        errorMessage: message,
      });
    };

    if (!termTags || termTags.length === 0) {
      return showToast("Missing required field: Terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: instruction");
    }

    setCreateOffer((prev) => ({
      ...prev,
      loading: true,
    }));

    console.log("Publishing offer at summary:", createOffer);

    const result = await publishOffer(createOffer);

    console.log("Offer published:", result);

    if (result.success) {
      const offerId = result.offerId;

      console.log("Offer ID:", offerId);

      setCreateOffer((prev) => ({
        ...prev,
        loading: false,
        success: true,
        offerId: offerId,
      }));
    } else {
      setCreateOffer((prev) => ({
        ...prev,
        loading: false,
      }));

      setToast({
        ...toast,
        error: true,
        errorMessage: result.error,
      });
    }
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleViewOffers = () => {
    const id = createOffer?.offerId;

    if (!id) {
      console.error("Offer ID is missing. Cannot navigate.");
      return;
    }

    // Navigate first
    navigateTo(`/offers/user/${id}`);

    // Then reset offer details
    setCreateOffer({
      step: 1,
      serviceType: "Online Wallet Transfer",
      service: "",
      serviceId: "",
      currency: { code: "USD", name: " United States dollar" },
      minimum: "",
      maximum: "",
      margin: 4,
      vendorPaymentWindow: { minutes: 0, hours: 0 },
      tradersPaymentWindow: { minutes: 0, hours: 0 },
      termTags: [],
      instruction: "",
      loading: false,
      success: false,
      offerId: "",
    });
  };

  const close = () => {
    setCreateOffer({
      step: 1,
      serviceType: "Online Wallet Transfer",
      service: "",
      serviceId: "",
      currency: { code: "USD", name: " United States dollar" },
      minimum: "",
      maximum: "",
      margin: 4,
      vendorPaymentWindow: { minutes: 0, hours: 0 },
      tradersPaymentWindow: { minutes: 0, hours: 0 },
      termTags: [],
      instruction: "",
      loading: false,
      success: false,
      offerId: "",
    });
  };

  const stepOne = () => {
    setCreateOffer((prev) => ({
      ...prev,
      step: 1,
    }));

    scrollToTop();
  };

  const stepTwo = () => {
    const { serviceType, service, currency, minimum, maximum } = createOffer;

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

    setCreateOffer((prev) => ({
      ...prev,
      step: 2,
    }));

    scrollToTop();
  };

  const stepThree = () => {
    const { margin, vendorPaymentWindow, tradersPaymentWindow } = createOffer;

    const showToast = (message) => {
      setToast({
        ...toast,
        error: true,
        errorMessage: message,
      });
    };

    const isWindowValid = (window) =>
      window && (Number(window?.hours) > 0 || Number(window?.minutes) > 0);

    if (margin <= 3) {
      return showToast(
        "Profit margin must be greater than 3% to publish your offer."
      );
    }

    if (!isWindowValid(tradersPaymentWindow)) {
      return showToast("Missing required field: Transfer window.");
    }

    if (!isWindowValid(vendorPaymentWindow)) {
      return showToast("Missing required field: Release window.");
    }

    setCreateOffer((prev) => ({
      ...prev,
      step: 3,
    }));

    scrollToTop();
  };

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className="flex gap-[5px] lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[57px]"
      >
        <div className="lg:flex hidden gap-[5px]">
          <MarketDepth />
        </div>
        <div className="flex flex-col min-h-svh w-full md:border-x md:border-t-0 md:border-b border-neutral-800 ">
          <div className="flex flex-col md:flex-row px-[15px] py-[12px] lg:border-b border-tradeAshLight">
            <div className="flex gap-[2px] justify-between w-full items-center ">
              <div className="flex lg:flex-row flex-col md:justify-between gap-[2px] lg:text-lg text-2xl w-full">
                <p className=" font-semibold text-white">Create a New Offer</p>
                <p className=" font-semibold text-tradeFadeWhite">
                  Step {createOffer?.step}
                </p>
              </div>

              <div className="flex items-cente md:hidden h-full flex-row md:gap-2 gap-1 items-en">
                <div className="text-tradeGreen text-5xl fade-pulse">
                  <BiTargetLock />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-[50px] p-[15px]">
            {/* Offer Creation Field */}
            <div
              className={` ${
                createOffer?.step === 1 ? "flex" : "hidden"
              } flex-col gap-[40px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  Start by setting the core details of your offer. Select the
                  asset type you want to trade, choose the specific asset,
                  define the currency and set your purchase limits.
                </p>

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
                          value={createOffer?.serviceType}
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
                        {serviceInputLabels[createOffer.serviceType] ||
                          "Select Service"}
                      </p>
                      <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                        <input
                          className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                          type="text"
                          readOnly
                          placeholder="Choose wallet"
                          value={createOffer?.service}
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
                            createOffer.currency.code &&
                            createOffer.currency.name
                              ? ` ${createOffer.currency.name} - ${createOffer.currency.code} `
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
                            createOffer?.minimum
                              ? Number(createOffer?.minimum).toLocaleString()
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
                            createOffer?.maximum
                              ? Number(createOffer?.maximum).toLocaleString()
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
                          createOffer.currency.code === ""
                            ? "USD"
                            : createOffer.currency.code
                        } while your current maximum purchase limit is 1,000 ${
                          createOffer.currency.code
                            ? "USD"
                            : createOffer.currency.code
                        }. Exceeding it will cause submission errors.`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={stepTwo} variant="primary">
                Proceed
              </Button>
            </div>

            <div
              className={` ${
                createOffer?.step === 2 ? "flex" : "hidden"
              } flex-col gap-[40px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  In this step, you’ll define your offer’s timing and pricing
                  structure. Use transfer and release windows to set clear
                  expectations for both parties, and fine-tune your margin to
                  control profitability.
                </p>
                <div className="flex flex-col gap-[10px]">
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
                              {createOffer.margin > 0 ? "+" : ""}
                              {createOffer.margin}%
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

                      <div className="flex p-[12px] border-dashed border border-tradeAshLight rounded-[10px] ">
                        {createOffer?.currency?.code &&
                          createOffer?.minimum &&
                          createOffer?.maximum && (
                            <div className="flex flex-col gap-1">
                              <p className="text-[13px] text-white font-medium leading-relaxed">
                                Current{" "}
                                <span className="text-tradeGreen font-semibold">
                                  {createOffer.currency.code}
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
                                  {createOffer?.margin}% profit margin
                                </span>
                                . This means for every{" "}
                                <span className="text-tradeGreen font-semibold">
                                  1.00 {createOffer.currency.code}
                                </span>{" "}
                                you trade, your rate is{" "}
                                <span className="text-tradeGreen font-semibold">
                                  {rateInfo.finalRate}/USD
                                </span>
                                , and you’ll earn about{" "}
                                <span className="text-tradeGreen font-semibold">
                                  {rateInfo.profit} {createOffer.currency.code}
                                </span>{" "}
                                which is equivalent to{" "}
                                <span className="text-tradeGreen font-semibold">
                                  0.00 USD
                                </span>{" "}
                                as profit.
                              </p>
                            </div>
                          )}
                      </div>

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
                        Transfer Window
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
                              {createOffer?.tradersPaymentWindow?.hours}
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
                              {createOffer?.tradersPaymentWindow?.minutes}
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
                        Release Window
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
                              {createOffer?.vendorPaymentWindow?.hours}
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
                              {createOffer?.vendorPaymentWindow?.minutes}
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
                          "Set how long you’ll have to confirm and release funds once asset is confirmed. If you don’t act within this window, the trade will be automatically escalated to a dispute."
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Button onClick={stepThree} variant="primary">
                  Proceed
                </Button>

                <Button onClick={stepOne} variant="outline">
                  Previous
                </Button>
              </div>
            </div>

            <div
              className={` ${
                createOffer?.step === 3 ? "flex" : "hidden"
              } flex-col gap-[40px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  This final step shapes the trading experience. Use terms to
                  communicate any specific conditions and instructions to guide
                  traders through the process.
                </p>

                <div className="flex flex-col gap-[10px]">
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

                      <div className="flex p-[8px] border-dashed border border-tradeAshLight rounded-[10px] ">
                        {createOffer?.termTags.length > 0 ? (
                          <div className={`flex gap-[5px] flex-wrap`}>
                            {createOffer?.termTags.map((tag, index) => (
                              <div className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAshLight">
                                <p
                                  key={index}
                                  className="text-[13px] font-semibold text-tradeFadeWhite"
                                >
                                  {tag}
                                </p>
                                <IoClose
                                  className="text-tradeFadeWhite hover:text-red-600 text-[16px] cursor-pointer transition-all duration-300"
                                  onClick={() => {
                                    setCreateOffer((prev) => ({
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
                        ) : (
                          <div>
                            <p className="text-[13px] text-tradeFadeWhite font-semibold">
                              No terms selected. Click above to add some.
                            </p>
                          </div>
                        )}
                      </div>

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
                          value={createOffer?.instruction}
                          className=" min-h-[45px] w-full bg-transparent border-none p-[12px] text-white text-sm font-medium placeholder-tradeFadeWhite focus:outline-none resize-non"
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
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="lg:flex hidden">
                  <Button
                    onClick={handlepublish}
                    disabled={createOffer?.loading}
                    variant="primary"
                  >
                    Go Live
                  </Button>
                </div>

                <div className="flex lg:hidden">
                  <Button onClick={proceedToSummary} variant="primary">
                    Preview Offer
                  </Button>
                </div>

                <div className={`${createOffer?.loading ? "hidden" : "flex"}`}>
                  <Button onClick={stepTwo} variant="outline">
                    Make Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex hidden gap-[5px]">
          <CreateSummary />
        </div>
      </div>

      {createOffer?.success && (
        <div>
          <LockByScroll />

          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[300px]">
              <div className="flex items-center justify-between py-[12.3px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">Offer Created</p>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-[15px] gap-[30px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-[6px] bg-tradeAshLight text-[45px] text-tradeGreen rounded-full">
                      <IoIosCheckmarkCircle />
                    </div>

                    <p className="text-[13px] font-semibold text-white">
                      Your offer is live!
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLigh rounded-[15px]">
                    <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                      Manage, edit, or pause it whenever you need, giving you
                      full control over how and when your offer is available.
                    </p>
                  </div>
                </div>

                <Button onClick={handleViewOffers} variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CreateOffer;
