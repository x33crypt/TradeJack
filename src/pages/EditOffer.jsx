import React, { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import Info from "@/components/alerts/Info";
import Warning from "@/components/alerts/Warning";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useSelectElement } from "@/context/SelectElementContext";
import { useCreateOfferDetails } from "@/context/CreateOfferDetailsContext";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { LuEqualApproximately } from "react-icons/lu";

const EditOffer = () => {
  const { select, setSelect } = useSelectElement();
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();

  useEffect(() => {
    if (select.element === "terms") {
      const newTag = select.pick?.trim();

      if (newTag) {
        setOfferDetails((prev) => {
          const current = prev.termTags || [];

          if (current.includes(newTag) || current.length >= 5) {
            return prev; // Do not add if already exists or exceeds limit
          }

          return {
            ...prev,
            termTags: [...current, newTag],
          };
        });
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

  const handleAddMargine = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      margin: Math.min(21, Number(prev.margin || 0) + 1),
    }));
  };

  const handleMinusMargine = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      margin: Math.max(0, Number(prev.margin || 0) - 1),
    }));
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

  return (
    <>
      <InAppNav />

      <div className="flex flex-col bg-black gap-[15px] lg:px-[15%] md:px-[5%] pt-[60px] md:pt-[80px] ">
        {/* Header Section */}
        <div className="flex lg:flex-row flex-col w-full gap-[15px] lg:gap-0">
          <div className="flex-1 flex flex-col md:border border-tradeAshLight">
            <div className="flex items-center gap-[10px] p-[15px] border-b border-tradeAshLight">
              <p className="text-[17px] text-white font-[700] cursor-pointer">
                Edit Offer
              </p>
            </div>

            {/* Subheading */}
            <div className="flex justify-between gap-1 items-center px-4 py-2 ">
              <p className="text-tradeFadeWhite text-[14px] font-normal">
                Update key details of your offer to reflect your latest trade
                preferences. You can adjust your limits, margins, timing, or
                trade instructions before saving.
              </p>
            </div>

            {/* Offer Details */}
            <div className="p-[15px]">
              <div className=" flex flex-col bg-tradeAsh border border-tradeAshLight transition-all duration-300 hover:shadow-lg overflow-hidden">
                {/* Offer Id Field */}
                <div className="flex justify-between items-center p-3 border-b border-tradeAshLight">
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    Offer ID
                  </p>

                  <p className="text-tradeFadeWhite text-[14px] font-bold">
                    #128951721826
                  </p>
                </div>
                {/* service Type*/}
                <div className="flex items-center justify-between p-3 border-b border-tradeAshLight">
                  <p className="text-[13px] text-tradeFadeWhite font-semibold">
                    Service Type
                  </p>
                  <p className=" text-white text-sm font-semibold">
                    Direct Bank Transfer
                  </p>
                </div>
                {/* service*/}
                <div className="flex items-center justify-between p-3  border-b border-tradeAshLight">
                  <p className="text-[13px] text-tradeFadeWhite font-semibold">
                    Service
                  </p>
                  <p className="text-tradeOrange text-sm font-bold">
                    Wells Fargo
                  </p>
                </div>
                {/* Accepted Currency */}
                <div className="flex items-center justify-between p-3  border-b border-tradeAshLight">
                  <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                    Accepted Currency
                  </p>
                  <p className=" font-semibold text-tradeGreen text-sm">
                    United State Dollars
                  </p>
                </div>
                {/* Published Date*/}
                <div className="flex items-center justify-between p-3 border-b border-tradeAshLight">
                  <p className="text-[13px] text-tradeFadeWhite font-semibold">
                    Published Date
                  </p>
                  <p className=" text-white text-sm font-semibold">
                    June 14, 2025
                  </p>
                </div>
                {/* Offer Status*/}
                <div className="flex items-center justify-between p-3 border-b border-tradeAshLight">
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
                <div className="flex items-center justify-between p-3  border-b border-tradeAshLight">
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

            {/* Changes Instruction field */}
            <div className="  flex justify-between gap-1 items-center p-4  border-y border-tradeAshLight ">
              <p className="text-white text-[16px] font-semibold">
                Update Offer Details
              </p>
            </div>
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
                <p className="text-white text-[15px] font-[500]">
                  Profit Margin
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">

                <div className="flex items-center w-full flex-row  gap-[15px]">
                  <div
                    onClick={handleMinusMargine}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      {offerDetails?.margin === 0 ? (
                        <span className="text-red-500">No margin applied</span>
                      ) : offerDetails?.margin > 20 ? (
                        <span className="text-red-500">
                          Margin cannot exceed 20%
                        </span>
                      ) : (
                        <>
                          <span className="font-bold">
                            {offerDetails.margin > 0 ? "+" : ""}
                            {offerDetails.margin}%
                          </span>{" "}
                          profit margin per trade
                        </>
                      )}
                    </p>
                  </div>
                  <div
                    onClick={handleAddMargine}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-[14px] text-white leading-relaxed">
                  {/* Market Price */}
                  <div className="flex gap-1 items-center">
                    <p className="text-tradeFadeWhite font-medium">
                      Current{" "}
                      <span className="text-tradeGreen font-bold">USD</span>{" "}
                      Exchange Rate:
                    </p>

                    <p className="text-tradeGreen font-bold">1,560.36 NGN</p>
                    <p className="text-tradeFadeWhite font-medium">per</p>
                    <p className="text-tradeGreen font-bold">1 USD</p>
                  </div>

                  {/* Margin Breakdown */}
                  <p className="text-tradeFadeWhite font-medium">
                    With a{" "}
                    <span className="text-tradeOrange font-bold">5 percent</span>{" "}
                    margin, your final rate is&nbsp;
                    <span className="text-tradeGreen font-bold items-center gap-1 inline-flex">
                      1,380.28 NGN
                    </span>{" "}
                    per{" "}
                    <span className="text-tradeGreen font-bold items-center gap-1 inline-flex">
                      1 USD
                    </span>
                    , and your estimated profit after platform fees is&nbsp;
                    <span className="text-tradeGreen font-bold">
                      7,500 NGN
                    </span>{" "}
                    per&nbsp;
                    <span className="text-tradeGreen font-bold">
                      1 USD
                    </span>{" "}
                    traded.
                  </p>
                </div>

                <div className="">
                  <Info
                    text={
                      "Set a profit margin that attracts traders while still earning. A 5% platform fee applies, so margins below this may yield no profit. For healthy returns, aim for 7–10% while staying competitive."
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

            <div className="flex flex-col gap-[10px] border-t border-tradeAshLight p-[15px]">
              <div
                // onClick={handleFilterOffer}
                className={` ${
                  false
                    ? "bg-tradeAsh text-tradeGreen"
                    : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
              >
                <p className="text-[14px] font-[700] ">
                  {false ? "Updating your offer..." : "Update offer"}
                </p>
              </div>

              <div
                // onClick={handleClearFilter}
                className="flex justify-center bg-transparent hover:bg-tradeAsh border border-tradeAshLight hover:border-red-600  p-[12px] rounded-[10px]  cursor-pointer duration-300 transition-all"
              >
                <p className="text-[14px] font-[700] text-red-600">
                  Terminate Offer
                </p>
              </div>

              <div className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300">
                <p className="text-[14px] font-[700] ">Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditOffer;
