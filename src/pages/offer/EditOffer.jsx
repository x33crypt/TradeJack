import React, { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import Info from "@/components/alerts/Info";
import Warning from "@/components/alerts/Warning";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useSelectElement } from "@/context/SelectElementContext";
import { useEditOfferDetails } from "@/context/offer/EditOfferContext";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import EditSummary from "../../components/offer/EditSummary";
import Button from "@/components/buttons/Button";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const EditOffer = (props) => {
  const { select, setSelect } = useSelectElement();
  const [loading, setLoading] = useState(false);
  const { offerDetails, setOfferDetails } = useEditOfferDetails();
  const { rateInfo } = useExchangeRate(
    offerDetails.currency.code ? offerDetails.currency.code : "USD",
    "NGN",
    offerDetails?.margin
  );

  // handling terms changes
  useEffect(() => {
    if (select?.page !== "edit offer" || !select?.pick) return;

    if (select.element === "terms") {
      const pickedTerm = select.pick; // ✅ Corrected

      if (typeof pickedTerm === "string") {
        const newTag = pickedTerm.trim();
        if (newTag) {
          setOfferDetails((prev) => {
            const current = prev.termTags || [];
            if (current.includes(newTag) || current.length >= 5) return prev;
            return {
              ...prev,
              termTags: [...current, newTag],
            };
          });
        }
      }
    }
  }, [select]);

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
      return {
        ...prev,
        margin: next < 4 ? 4 : next,
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

  const offerTermTags = [
    "Receipt required",
    "No receipt needed",
    "No third-party",
    "Pay exact amount",
    "Fast payment only",
    "Same bank only",
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
    "Direct Bank Transfer": CiBank,
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

    navigateTo("/offers/:id/edit/summary");
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
          <div className="flex flex-col md:border-x md:border-t-0 md:border-b border-neutral-800 ">
            {/* Heading */}
            <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">Edit Offer</p>
            </div>

            {/* Subheading */}
            <div className="p-[15px]">
              <p className="text-tradeFadeWhite text-sm">
                Update key details of your offer to reflect your latest trade
                preferences. You can adjust your limits, margins, timing, or
                trade instructions before saving.
              </p>
            </div>

            {/* Offer Details */}
            <div className="p-[15px] ">
              <div className=" flex md:grid grid-cols-2 gap-3 flex-col hover:shadow-lg overflow-hidden">
                <div className="flex flex-col bg-tradeAshLight border border-tradeAshExtraLight rounded-[12px]">
                  {/* Offer Id Field */}
                  <div className="flex justify-between items-center p-3 border-b border-black">
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      Offer ID
                    </p>

                    <p className="text-tradeFadeWhite text-[14px] font-bold">
                      #128951721826
                    </p>
                  </div>
                  {/* service Type*/}
                  <div className="flex items-center justify-between p-3 border-b border-black">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Service Type
                    </p>
                    <p className=" text-white text-sm font-semibold">
                      Direct Bank Transfer
                    </p>
                  </div>
                  {/* service*/}
                  <div className="flex items-center justify-between p-3  border-b border-black">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Service
                    </p>
                    <p className="text-tradeOrange text-sm font-bold">
                      Wells Fargo
                    </p>
                  </div>
                  {/* Accepted Currency */}
                  <div className="flex items-center justify-between p-3">
                    <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                      Accepted Currency
                    </p>
                    <p className=" font-semibold text-tradeGreen text-sm">
                      United State Dollars
                    </p>
                  </div>
                </div>
                <div className="flex flex-col bg-tradeAshLight border border-tradeAshExtraLight rounded-[12px]">
                  {/* Published Date*/}
                  <div className="flex items-center justify-between p-3 border-b border-black">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Published Date
                    </p>
                    <p className=" text-white text-sm font-semibold">
                      June 14, 2025
                    </p>
                  </div>
                  {/* Offer Status*/}
                  <div className="flex items-center justify-between p-3 border-b border-black">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Offer Status
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tradeGreen animate-pulse"></span>
                      <p className="text-tradeGreen text-[14px] font-semibold">
                        Active
                      </p>
                    </div>
                  </div>
                  {/* Trade Volume */}
                  <div className="flex items-center justify-between p-3  border-b border-black">
                    <div className="flex items-center gap-2">
                      <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                        Trade Volume
                      </p>

                      <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                        <FaInfoCircle />
                      </div>
                    </div>

                    <p className=" font-semibold text-white text-sm">
                      215 Trades
                    </p>
                  </div>
                  {/* Feedback Summary */}
                  <div className="flex items-center justify-between p-3 ">
                    <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                      Feedback Summary
                    </p>
                    <div className="flex gap-3 items-center">
                      <p className=" text-sm text-white flex items-center gap-1 font-semibold">
                        <IoMdThumbsUp className="text-tradeGreen " />
                        {/* {parseInt(props.positiveFeedback).toLocaleString()} */}
                        200
                      </p>

                      <p className="text-sm text-white flex items-center gap-1 font-semibold">
                        <MdThumbDownAlt className="text-red-500" />
                        {/* {parseInt(props.trustScore).toLocaleString()} */}15
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:border-x md:border-t-0 md:border-b border-neutral-800">
            {/* Changing Field Heading */}
            <div className="  flex justify-between gap-1 items-center p-4  md:border-y border-b border-tradeAshLight ">
              <p className="text-white text-[16px] font-semibold">
                Update Details
              </p>
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
                          offerDetails?.minimum
                            ? "border-tradeAshExtraLight"
                            : "border-tradeAshLight"
                        } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                      >
                        <input
                          className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
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
                          <p className="text-[14px] text-white font-[700]">
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
                        <p className="text-tradeFadeWhite text-[13px] font-[500]">
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
                          className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
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
                          <p className="text-[14px] text-white font-[700]">
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
                    <Warning
                      text={
                        "To make this offer visible, you must have 100% of the minimum amount you’ve set available in your wallet."
                      }
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
                    {/* Market Price */}
                    <div className="flex gap-1 items-center">
                      <p className="text-tradeFadeWhite font-medium">
                        Current Exchange Rate:
                      </p>
                      <p className="text-tradeGreen font-bold">
                        1 <span>{offerDetails.currency.code}</span> ={" "}
                        <span>
                          {rateInfo.baseRate === 0 ? "0.00" : rateInfo.baseRate}
                        </span>{" "}
                        <span>NGN</span>
                      </p>
                    </div>

                    {/* Margin Breakdown */}
                    <p className="text-tradeFadeWhite font-medium">
                      Your offering at{" "}
                      <span className="text-tradeOrange font-bold">
                        {offerDetails?.margin}% profit margin
                      </span>{" "}
                      sets your trade rate at{" "}
                      <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                        {rateInfo.finalRate} NGN
                      </span>{" "}
                      per{" "}
                      <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                        1 {offerDetails.currency.code}
                      </span>
                      . You'll earn about{" "}
                      <span className="text-tradeGreen font-bold">
                        {rateInfo.profit} NGN
                      </span>{" "}
                      per{" "}
                      <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                        1 {offerDetails.currency.code}
                      </span>{" "}
                      traded.
                    </p>

                    {/* Service Charge Note */}
                    <p className="text-tradeFadeWhite font-medium">
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
                    Confirmation Time
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
                  <p className="text-white text-[15px] font-[500]">
                    Offer Terms Tag
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
                          offerDetails?.termTags
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
                      offerDetails?.termTags.length == 0 ? "hidden" : "flex"
                    } gap-[10px] flex-wrap`}
                  >
                    {offerDetails?.termTags.map((tag, index) => (
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
              {/* Trade Instruction field Field */}
              <div className="flex flex-col gap-[30px] p-[15px]">
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Trade Instructions
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
          <EditSummary />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditOffer;
