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
import { useCurrencies } from "@/hooks/others/useCurrencies";
import Button from "@/components/buttons/Button";
import { useToast } from "@/context/otherContext/ToastContext";
import { useAssetTypes } from "@/hooks/others/useAssetTypes";
import LockByScroll from "@/components/others/LockByScroll";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useUserOffer } from "@/context/userContext/OffersContext";
import { publishOffer } from "@/utils/offer/publishOffer";
import CreateMenu from "@/components/offer/userOffer/CreateMenu";
import { CiBank } from "react-icons/ci";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { TbAssemblyFilled } from "react-icons/tb";
import { windowFormatHour } from "@/utils/windowFormatHour";
import Stepper from "@/components/others/Steppers";
import { FaCircleInfo } from "react-icons/fa6";
import { HiGlobeAlt } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import image from "../../../assets/landingImg4.JPG";
import { PiApproximateEqualsBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { TbCubeSpark } from "react-icons/tb";

const CreateOffer = () => {
  const topRef = useRef(null);
  const { createOffer, setCreateOffer } = useUserOffer();
  const { currencies } = useCurrencies();
  const { toast, setToast } = useToast();
  const { select, setSelect } = useSelectElement();
  const { assetTypes, fullData } = useAssetTypes();

  console.log("create offer details", createOffer);

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

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const close = () => {
    setCreateOffer({
      step: 1,
      title: "Basics",
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
      title: "Basics",
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
      title: "Rates & Time",
    }));

    scrollToTop();
  };

  const stepThree = () => {
    const {
      serviceType,
      service,
      currency,
      minimum,
      maximum,
      margin,
      vendorPaymentWindow,
      tradersPaymentWindow,
    } = createOffer;

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

    if (margin <= 3) {
      return showToast(
        "Profit margin must be greater than 3% to publish your offer."
      );
    }

    const isWindowValid = (window) =>
      window && (Number(window?.hours) > 0 || Number(window?.minutes) > 0);

    if (!isWindowValid(tradersPaymentWindow)) {
      return showToast("Missing required field: Transfer window.");
    }

    if (!isWindowValid(vendorPaymentWindow)) {
      return showToast("Missing required field: Release window.");
    }

    setCreateOffer((prev) => ({
      ...prev,
      step: 3,
      title: "Guidelines",
    }));

    scrollToTop();
  };

  const preview = () => {
    const {
      serviceType,
      service,
      currency,
      minimum,
      maximum,
      margin,
      vendorPaymentWindow,
      tradersPaymentWindow,
      termTags,
      instruction,
    } = createOffer;

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

    if (margin <= 3) {
      return showToast(
        "Profit margin must be greater than 3% to publish your offer."
      );
    }

    const isWindowValid = (window) =>
      window && (Number(window?.hours) > 0 || Number(window?.minutes) > 0);

    if (!isWindowValid(tradersPaymentWindow)) {
      return showToast("Missing required field: Transfer window.");
    }

    if (!isWindowValid(vendorPaymentWindow)) {
      return showToast("Missing required field: Release window.");
    }

    if (!termTags || termTags.length === 0) {
      return showToast("Missing required field: Offer terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: Trade instruction");
    }

    setCreateOffer((prev) => ({
      ...prev,
      step: 4,
      title: "Preview",
    }));

    scrollToTop();
  };

  const assetTypeIcons = {
    "Online Wallet Transfer": TbAssemblyFilled,
    "Bank Transfer": CiBank,
    "Gift Cards Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const Icon = assetTypeIcons[createOffer?.serviceType];

  const edit = () => {
    setCreateOffer((prev) => ({
      ...prev,
      step: 1,
      title: "Basics",
    }));
  };

  const handlepublish = async () => {
    setCreateOffer((prev) => ({
      ...prev,
      loading: true,
    }));

    console.log("Publishing offer at summary:", createOffer);

    const result = await publishOffer(createOffer);

    console.log("Offer published:", result);

    if (result.success) {
      const offerId = result.offerId;

      navigateTo("/offers/user/create");

      setCreateOffer((prev) => ({
        ...prev,
        step: 1,
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

  const details = () => {
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

  return (
    <>
      <InAppNav />
      <div
        ref={topRef}
        className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black"
      >
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex flex-1 flex-col gap-[30px]">
            <div className="flex  items-center justify-between ">
              {/* <p className="text-lg font-semibold text-white flex items-center gap-1">
                CREATE A NEW OFFER
              </p> */}

              <p className="text-lg font-semibold text-white flex items-center gap-1">
                {createOffer?.step <= 3
                  ? ` CREATE A NEW OFFER`
                  : "OFFER PREVIEW"}
              </p>

              <p className="text-lg font-semibold text-white flex items-center gap-1">
                {createOffer?.step <= 3 ? `${createOffer?.step}/3` : ""}
              </p>
            </div>

            {/* <Stepper totalSteps={"4"} currentStep={createOffer?.step} /> */}

            <div
              className={` ${
                createOffer?.step === 1 ? "flex" : "hidden"
              } flex-col gap-[30px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  Start by laying the foundation for your offer. Choose the
                  asset you want to trade, select currency, and define your
                  transaction limits.
                </p>

                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Asset Type
                      </p>
                    </div>

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
                            options: assetTypes,
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

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        {" "}
                        {serviceInputLabels[createOffer.serviceType] ||
                          "Select Service"}
                      </p>
                    </div>

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

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Currency
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>

                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer"
                        type="text"
                        readOnly
                        placeholder="Choose a currency"
                        value={
                          createOffer.currency.code
                            ? `${createOffer.currency.code} `
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

                    {/* <Info
                      text={
                        "Select the currency of the asset you want to trade. This defines the value of your offer and ensures accurate rate calculations for all transactions."
                      }
                    /> */}
                  </div>

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Purchase Limit
                      </p>

                      <div className="flex items-center gap-2">
                        <p className="text-tradeFadeWhite text-xs font-medium">
                          20.00 - 5,000,00.00
                        </p>
                        <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
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
                    </div>

                    <div className="flex flex-col gap-2">
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
                    </div>

                    {/* <Info
                      text={`Set your minimum and maximum purchase limits. By default the minimum purchase limit is 10 ${
                        createOffer.currency.code === ""
                          ? "USD"
                          : createOffer.currency.code
                      } while your current maximum purchase limit is 1,000 ${
                        createOffer.currency.code
                          ? "USD"
                          : createOffer.currency.code
                      }. Exceeding it will cause submission errors.`}
                    /> */}
                  </div>
                </div>
              </div>

              <Button onClick={stepTwo} variant="secondary">
                PROCEED
              </Button>
            </div>

            <div
              className={` ${
                createOffer?.step === 2 ? "flex" : "hidden"
              } flex-col gap-[30px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  Set your offer’s timing and pricing. Adjust transfer windows
                  and margins to manage expectations and profitability.
                </p>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Profit Margin
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>

                    <div>
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
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-tradeFadeWhite text-xs font-medium">
                        Rate
                      </p>
                      <p className="text-tradeOrange text-xs font-medium">
                        2,300 / {createOffer?.currency?.code}
                      </p>
                    </div>

                    {/* <Info
                      text={
                        "Set a competitive profit margin that secures your earnings. Note that a service charge typically between 0.5% to 2% applies per trade. To ensure healthy returns, consider starting your margin at 4% or higher."
                      }
                    /> */}
                  </div>

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Transfer Window
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>

                    <div>
                      <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                        <div
                          onClick={handleMinusTraderPaymentWindowHour}
                          className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                        >
                          <FaMinus />
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
                          <FaPlus />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                        <div
                          onClick={handleMinusTraderPaymentWindowMinutes}
                          className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                        >
                          <FaMinus />
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
                          <FaPlus />
                        </div>
                      </div>
                    </div>

                    {/* <Info
                      text={
                        "Set the time limit for traders to transfer assets after a trade begins. If they fail to do so within this window, the trade will be automatically cancelled."
                      }
                    /> */}
                  </div>

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Release Window
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>
                    <div>
                      <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                        <div
                          onClick={handleMinusVendorPaymentWindowHour}
                          className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                        >
                          <FaMinus />
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
                          <FaPlus />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px] overflow-hidden">
                        <div
                          onClick={handleMinusVendorPaymentWindowMinutes}
                          className="w-[60px] flex gap-1 justify-center items-center p-[12px] text-sm font-semibold text-tradeFadeWhite border-r border-tradeAsh hover:bg-tradeAshExtraLight transition-all duration-300 cursor-pointer"
                        >
                          <FaMinus />
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
                          <FaPlus />
                        </div>
                      </div>
                    </div>

                    {/* <Info
                      text={
                        "Set how long you’ll have to confirm and release funds once asset is confirmed. If you don’t act within this window, the trade will be automatically escalated to a dispute."
                      }
                    /> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Button onClick={stepThree} variant="secondary">
                  PROCEED
                </Button>

                <Button onClick={stepOne} variant="outline">
                  PREVIOUS
                </Button>
              </div>
            </div>

            <div
              className={` ${
                createOffer?.step === 3 ? "flex" : "hidden"
              } flex-col gap-[30px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  This final step shapes the trading experience. Use terms to
                  communicate any specific conditions and instructions to guide
                  traders through the process.
                </p>

                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Tags
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>

                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <input
                        className={`bg-transparent flex-1 p-[12px] border-none outline-none placeholder:text-tradeFadeWhite text-sm font-medium leading-none cursor-pointer`}
                        type="text"
                        readOnly
                        placeholder="Select tags"
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

                    <div className="flex  rounded-[10px] ">
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
                          <p className="text-tradeFadeWhite text-xs font-medium">
                            No terms selected
                          </p>
                        </div>
                      )}
                    </div>

                    {/* <Info
                      text={
                        "You can select up to 5 terms or requirements to help clearly communicate the terms of your offer to potential traders."
                      }
                    /> */}
                  </div>

                  <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-[13px] text-tradeFadeWhite font-semibold">
                        Instructions
                      </p>

                      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
                    </div>
                    <div className="flex-1 flex bg-tradeAshLight relative border border-tradeAshLight rounded-[10px] cursor-pointer">
                      <textarea
                        onChange={handleInstruction}
                        value={createOffer?.instruction}
                        className=" min-h-[45px] w-full bg-transparent border-none p-[12px] text-white text-sm font-medium placeholder-tradeFadeWhite focus:outline-none resize-non"
                        placeholder="Write your trade Instructions here."
                      ></textarea>
                    </div>

                    {/* <Info
                      text={
                        "Use this field to share any extra instructions or context that help ensure a smooth, respectful trade. Be clear, helpful, and professional."
                      }
                    /> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Button onClick={preview} variant="secondary">
                  PREVIEW
                </Button>

                <Button onClick={stepTwo} variant="outline">
                  PREVIOUS
                </Button>
              </div>
            </div>

            <div
              className={` ${
                createOffer?.step === 4 ? "flex" : "hidden"
              } flex-col gap-[20px] h-full justify-between`}
            >
              <div className="flex flex-col gap-[25px]">
                <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                  You’re almost there! Take a moment to double-check your offer
                  details and ensure everything’s accurate before going live.
                </p>
                <div className="flex flex-1 flex-col gap-[20px]">
                  <div className="flex items-center gap-2  pb-[12px]">
                    <div>
                      <TbCubeSpark className="text-white text-5xl" />
                    </div>

                    <div className="flex flex-col gap-2 ">
                      <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                        {createOffer?.service || "NA"}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                        {createOffer?.serviceType || "NA"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <div className="flex  items-center gap-1">
                      <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        0 Completed Trade(s)
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        0% Completion Rating
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col justify-between flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex items-center justify-between w-full mt-[1px]">
                        <div className="flex justify-between border-b border-tradeAshLight flex-1 pb-[10px]">
                          <p className="text-[13px] text-white font-semibold">
                            Rate
                          </p>
                        </div>

                        <p className="text-white text-sm font-semibold leading-none">
                          1,250/{createOffer?.currency?.code || "N/A"}
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Margin
                          </p>

                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            {createOffer?.margin || "N/A"}%
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Currency
                          </p>
                          <p className="text-[13px] text-white font-semibold">
                            {createOffer?.currency?.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Purchase limits
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Minimum
                          </p>

                          <p className="text-white text-[13px]  font-semibold">
                            {createOffer?.minimum !== "" &&
                            createOffer?.currency?.code
                              ? `${Number(
                                  createOffer.minimum
                                ).toLocaleString()} ${
                                  createOffer.currency.code
                                }`
                              : "0.00"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Maximum
                          </p>

                          <p className="text-white text-[13px] font-semibold">
                            {createOffer?.maximum !== "" &&
                            createOffer?.currency?.code
                              ? `${Number(
                                  createOffer.maximum
                                ).toLocaleString()} ${
                                  createOffer.currency.code
                                }`
                              : "0.00"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col  justify-between gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Payment Window
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Transfer
                          </p>

                          <p className="text-white text-[13px]  font-semibold">
                            {windowFormatHour(
                              createOffer?.tradersPaymentWindow?.hours,
                              createOffer?.tradersPaymentWindow?.minutes
                            )}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Release
                          </p>

                          <p className="text-white text-[13px] font-semibold">
                            {windowFormatHour(
                              createOffer?.vendorPaymentWindow?.hours,
                              createOffer?.vendorPaymentWindow?.minutes
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex  flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Tags
                        </p>
                      </div>
                      <div className="w-full flex gap-2 flex-grow flex-wrap">
                        {createOffer?.termTags?.length > 0 ? (
                          createOffer.termTags.map((term, index) => (
                            <p
                              key={index}
                              className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAshLight text-[13px] font-semibold text-white"
                            >
                              {term}
                            </p>
                          ))
                        ) : (
                          <p className="text-[13px] font-semibold text-white">
                            N/A
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Instructions
                        </p>
                      </div>

                      <p className="text-[13px] text-white font-semibold">
                        {createOffer?.instruction
                          ? createOffer?.instruction
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm font-semibold">
                    P2P Trading Terms & Agreement
                  </p>
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    By publishing this offer, you agree to the following terms:
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-xs text-tradeFadeWhite font-medium">
                  <p>
                    • Provide accurate offer details and respond quickly to
                    trades.
                  </p>
                  <p>
                    • Use only your verified bank or payment accounts for
                    transactions.
                  </p>
                  <p>
                    • Complete payments and releases within the agreed time
                    frame.
                  </p>
                  <p>
                    • Avoid third-party transfers or fraudulent activity of any
                    kind.
                  </p>
                  <p>
                    • Allow platform review and resolution in case of disputes.
                  </p>
                </div>
                <p className="text-xs text-tradeFadeWhite mt-2">
                  By clicking{" "}
                  <span className="text-white font-semibold">
                    "PUBLISH"
                  </span>
                  , you confirm that you’ve read and agree to these terms.
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Button
                  onClick={handlepublish}
                  variant="secondary"
                  disabled={createOffer?.loading}
                >
                  PUBLISH
                </Button>

                <Button onClick={edit} variant="outline">
                  EDIT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {createOffer?.success && (
        <div>
          <LockByScroll />

          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col px-[15px] bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[250px]">
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
                      YOUR OFFER IS LIVE !
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1 bg-tradeAshLigh rounded-[15px]">
                    <p className="text-xs font-medium text-tradeFadeWhite leading-relaxed text-center">
                      Manage, edit, or pause it whenever you need. Giving you
                      full control over how and when your offer is available.
                    </p>
                  </div>
                </div>

                <Button onClick={details} variant="outline">
                  SEE DETAILS
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
