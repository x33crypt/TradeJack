import React, { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import Info from "@/components/alerts/Info";
import Warning from "@/components/alerts/Warning";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useSelectElement } from "@/context/SelectElementContext";
import { useEditOfferDetails } from "@/context/offer/EditOfferContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import EditSummary from "../../../components/offer/myOffer/EditSummary";
import Button from "@/components/buttons/Button";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { FaInfoCircle } from "react-icons/fa";
import { useAboutOffer } from "@/context/offer/AboutOfferContext";
import { useToast } from "@/context/ToastContext";
import { TiInfo } from "react-icons/ti";

const EditMyOffer = (props) => {
  const { aboutOffer, setAboutOffer } = useAboutOffer();
  const { select, setSelect } = useSelectElement();
  const { toast, setToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { offerDetails, setOfferDetails } = useEditOfferDetails();
  const { rateInfo } = useExchangeRate(
    offerDetails?.preferredCurrency?.code
      ? offerDetails?.preferredCurrency?.code
      : "USD",
    "NGN",
    offerDetails?.marginRate?.percent
  );

  useEffect(() => {
    setOfferDetails(aboutOffer);
  }, [aboutOffer]);

  // handling terms changes
  useEffect(() => {
    // Only run when we’re on the edit-offer page and a pick exists
    if (select?.page !== "edit offer" || !select?.pick) return;

    if (select.element === "terms") {
      const pickedTerm = select.pick;

      if (typeof pickedTerm === "string") {
        const newTag = pickedTerm.trim();
        if (!newTag) return; // empty string guard

        setOfferDetails((prev) => {
          const currentTags = prev.terms || [];

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
            terms: [...currentTags, newTag],
          };
        });
      }
    }
  }, [select]);

  const handleMinLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      marginRate: {
        ...prev.marginRate,
        from: rawValue,
      },
    }));
  };

  const handleMaxLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      marginRate: {
        ...prev.marginRate,
        to: rawValue,
      },
    }));
  };

  const handleAddMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.marginRate?.percent || 0);
      const next = current + 1;
      return {
        ...prev,
        marginRate: {
          ...prev.marginRate,
          percent: next > 80 ? 80 : next,
        },
      };
    });
  };

  const handleMinusMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.marginRate?.percent || 0);
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
        marginRate: {
          ...prev.marginRate,
          percent: next,
        },
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
      confirmationWindow: Math.min(
        24,
        Number(prev.confirmationWindow || 0) + 1
      ),
    }));
  };

  const handleMinusConfirmationTime = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      confirmationWindow: Math.max(1, Number(prev.confirmationWindow || 0) - 1),
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

  const handleInstruction = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      instruction: e.target.value,
    }));
  };

  // Map full service type string to corresponding icon
  const serviceTypeIcons = {
    "Online Wallet Transfer": IoWalletOutline,
    "Bank Transfer": CiBank,
    "Gift Card Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const IconComponent = serviceTypeIcons[offerDetails?.serviceType];

  const navigateTo = useNavigate();

  const nextButton = () => {
    const {
      serviceType,
      service,
      preferredCurrency,
      marginRate,
      terms,
      paymentWindow,
      confirmationWindow,
      instruction,
    } = offerDetails || {};

    const { from, to, percent } = marginRate || {};
    const { name, code } = preferredCurrency || {};

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

    if (!code) {
      return showToast("Missing required field: Select Currency");
    }

    if (from == null || from === "") {
      return showToast("Missing required field: marginRate?.from trade limit");
    }

    if (to == null || from === "") {
      return showToast("Missing required field: Maximum trade limit");
    }

    if (typeof percent !== "number" || percent <= 4) {
      return showToast(
        "Profit margin must be greater than 4% to publish your offer."
      );
    }

    if (!paymentWindow) {
      return showToast("Missing required field: Payment window");
    }

    if (!confirmationWindow) {
      return showToast("Missing required field: Confirmation window");
    }

    if (!terms || (Array.isArray(terms) && terms.length === 0)) {
      return showToast("Missing required field: Offer terms tag");
    }

    if (!instruction) {
      return showToast("Missing required field: Trade instruction");
    }

    if (!offerDetails?.offerId) {
      return showToast("Missing offer ID. Cannot proceed.");
    }

    navigateTo(`/offers/myoffers/${offerDetails?.offerId}/edit/summary`);
  };

  const handleClose = () => {};

  const cancelButton = () => {
    navigateTo(location?.state?.from || -1);
  };

  return (
    <>
      <InAppNav />

      <div className="flex  gap-[10px] lg:flex-row flex-col  lg:px-[2%] md:px-[2.5%] md:pt-[64px] pt-[60px] bg-black">
        {/* Header Section */}
        <div className="flex flex-col  min-h-svh w-full gap-[10px]">
          <div className="flex flex-col md:border-x md:border-t-0 md:border-b border-neutral-800">
            {/* Changing Field Heading */}
            <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">Edit Offer</p>
            </div>

            {/* Note Fields */}
            <div className="flex gap-2 flex-col p-[15px] border-b border-tradeAshLight">
              {/* <div className="w-[80px]">
                <TiInfo className="text-tradeOrange text-[50px]" />
              </div> */}

              <div className="flex flex-col gap-2">
                <p className="text-base text-white font-semibold">
                  Please Read Before Editing Your Offer
                </p>

                <p className="text-[13px] text-tradeFadeWhite font-medium leading-relaxed">
                  <span className="text-white font-medium">
                    Your offer will be temporarily placed on hold for 30
                    minutes.
                  </span>{" "}
                  During this time, it will not be visible to other traders on
                  the platform. This pause helps ensure that all updates are
                  reviewed and reflected correctly, maintaining a safe and
                  reliable trading experience for everyone.
                </p>
              </div>
            </div>

            {/* Changes Fields */}
            <div className="flex flex-col">
              {/* Limit Field */}
              <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
                <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                  <p className="text-white text-[15px] font-[500]">
                    Purchase Limit
                  </p>
                </div>

                <div className="w-full flex flex-col gap-[15px] p-[15px]">
                  <div className="flex w-full md:flex-row flex-col gap-[15px]">
                    <div className="w-full">
                      <div>
                        <p className="text-tradeFadeWhite text-[13px] font-[500]">
                          Minimum
                        </p>
                      </div>
                      <div
                        className={`${
                          offerDetails?.marginRate?.from
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                      >
                        <input
                          className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                          type="text"
                          placeholder="0.00"
                          value={
                            offerDetails?.marginRate?.from
                              ? Number(
                                  offerDetails?.marginRate?.from
                                ).toLocaleString()
                              : ""
                          }
                          onChange={(e) => handleMinLimitChange(e)}
                        />
                        <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                          <p className="text-[14px] text-white font-[700]">
                            {offerDetails?.preferredCurrency?.code &&
                            offerDetails?.preferredCurrency?.name
                              ? `${offerDetails?.preferredCurrency?.code}`
                              : "- -"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div>
                        <p className="text-tradeFadeWhite text-[13px] font-[500]">
                          Maximum
                        </p>
                      </div>
                      <div
                        className={`${
                          offerDetails?.marginRate?.to
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                      >
                        <input
                          className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                          type="text"
                          placeholder="0.00"
                          value={
                            offerDetails?.marginRate?.to
                              ? Number(
                                  offerDetails?.marginRate?.to
                                ).toLocaleString()
                              : ""
                          }
                          onChange={(e) => handleMaxLimitChange(e)}
                        />
                        <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                          <p className="text-[14px] text-white font-[700]">
                            {offerDetails?.preferredCurrency?.code &&
                            offerDetails?.preferredCurrency?.name
                              ? `${offerDetails?.preferredCurrency?.code}`
                              : "- -"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <Info
                      text={`Set your minimum and maximum purchase limits. Minimum is 50 ${offerDetails?.preferredCurrency?.code}. Your current maximum purchase limit is 1,000 ${offerDetails?.preferredCurrency?.code}. Exceeding it will cause submission errors.`}
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
                          {offerDetails?.marginRate?.percent > 0 ? "+" : ""}
                          {offerDetails?.marginRate?.percent}%
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
                    {/* Market Price */}
                    <div className="flex flex-wrap items-center text-tradeFadeWhite text-[13px] font-medium leading-loose gap-x-1">
                      <span className="align-middle"> Current</span>
                      <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                        <p className="text-white text-xs font-medium">
                          {offerDetails?.preferredCurrency?.code}
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
                          {offerDetails?.marginRate?.percent}% profit margin
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
                          1 {offerDetails?.preferredCurrency?.code}
                        </p>
                      </div>

                      <span className="align-middle">. You’ll earn about</span>

                      <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                        <p className="text-tradeGreen text-xs font-medium">
                          {rateInfo.profit} NGN
                        </p>
                      </div>

                      <span className="align-middle">for every</span>

                      <div className="flex items-center gap-1 px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                        <p className="text-white text-xs font-medium">
                          1 {offerDetails?.preferredCurrency?.code}
                        </p>
                      </div>

                      <span className="align-middle">you trade.</span>
                    </div>

                    {/* Service Charge Note */}
                    <p className="text-tradeFadeWhite text-[13px] font-medium">
                      <span className="text-white font-semibold">Note:</span>{" "}
                      Service charge applies at trade.
                    </p>
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
                  <p className="text-white text-[15px] font-[500]">
                    Payment Window
                  </p>
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
                      <p className="text-white text-[14px]">
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
                  <p className="text-white text-[15px] font-[500]">
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
                      <p className="text-white text-[14px]">
                        <span className="font-bold">
                          {offerDetails?.confirmationWindow}
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
                  <p className="text-white text-[15px] font-[500]">
                    Offer Terms
                  </p>
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
                        page: "edit offer",
                        options: offerTermTags,
                      })
                    }
                  >
                    <div className="">
                      <input
                        className={`${
                          offerDetails?.terms
                            ? "border-tradeAshLight"
                            : "border-tradeAshLight"
                        } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border hover:border-tradeAshExtraLight outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                      offerDetails?.terms?.length == 0 ? "hidden" : "flex"
                    } gap-[10px] flex-wrap`}
                  >
                    {offerDetails?.terms?.map((tag, index) => (
                      <div
                        key={index}
                        className="flex w-max items-center gap-[8px] px-[12px] py-[5px] rounded-[6px] bg-tradeAshLight"
                      >
                        <p
                          key={index}
                          className="text-[14px] font-medium text-tradeOrange"
                        >
                          {tag}
                        </p>
                        <IoClose
                          className="text-white hover:text-tradeAshExtraLight text-[16px] cursor-pointer transition-all duration-300"
                          onClick={() => {
                            setOfferDetails((prev) => ({
                              ...prev,
                              terms: prev.terms.filter((_, i) => i !== index),
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
              {/* Trade Instruction field Field */}
              <div className="flex flex-col gap-[30px] p-[15px]">
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Offer Instructions
                  </p>
                </div>

                <div className="flex flex-col gap-[15px]">
                  <textarea
                    onChange={handleInstruction}
                    className="h-[150px] w-full bg-tradeAsh border border-tradeAshLight rounded-[10px] p-[12px] text-white text-[14px] placeholder-tradeFadeWhite focus:outline-none resize-none"
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
          </div>

          {/* Buttons Mobile and Tabs */}
          <div className="flex lg:hidden flex-col gap-[15px] md:border border-t border-neutral-800 p-[15px]">
            <Button onClick={nextButton} variant="primary">
              Continue to Summary
            </Button>

            <Button onClick={handleClose} variant="danger" disabled={loading}>
              {loading ? "Closing Offer..." : "Close this Offer"}
            </Button>

            <Button onClick={cancelButton} variant="outline">
              Cancel
            </Button>
          </div>
        </div>

        {/* Offer Summary For Desktop */}
        <div className="lg:flex hidden lg:w-[500px]">
          <EditSummary offerDetails={offerDetails} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditMyOffer;
