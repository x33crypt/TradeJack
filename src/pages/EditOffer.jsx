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
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";

import { CiBank } from "react-icons/ci";

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
            <div className="flex flex-col md:gap-[15px] gap-[10px] p-[15px] py-[30px]  md:py-[40px] lg:py-[50px] bg-tradeAsh md:justify-center items-center">
              <div className="lg:w-[500px] sm:w-[550px] w-full flex gap-[15px] bg-tradeAshLight border border-tradeAshExtraLight p-[12px] rounded-[10px]">
                <div className="flex-1 flex flex-col gap-[20px]">
                  {/* Rating, Reviews & Offer ID */}
                  <div className="flex justify-between  items-center">
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-[13px] font-[500] text-tradeFadeWhite">
                        OFFER ID
                      </p>
                      <p className="text-[14px] font-[600] text-white">
                        #128w51721826
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-[13px] font-[500] text-tradeFadeWhite">
                        Status
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tradeGreen animate-pulse"></span>
                        <p className="text-tradeGreen text-xs font-semibold">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="flex justify-between  items-center">
                    <div className="flex flex-1 flex-col gap-[2px]">
                      <p className="text-tradeOrange text-[15px] font-bold">
                        Wells Fargo
                      </p>
                      <p className="text-white text-[14px] font-[600]">
                        Direct Bank Transfer
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-[13px] font-[500] text-tradeFadeWhite">
                        Accepted Currency
                      </p>
                      <p className="text-[14px] font-[600] text-white">
                        United State Dollars
                      </p>
                    </div>
                  </div>

                  {/* Rating, Reviews & Offer ID */}
                  <div className="flex justify-between  items-center">
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-[13px] font-[500] text-tradeFadeWhite">
                        Trade Volume
                      </p>
                      <p className="text-[14px] font-[600] text-white">
                        20 Trades
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-[13px] font-[500] text-tradeFadeWhite">
                        Overall Feedbacks
                      </p>
                      <div className="flex gap-6 items-center">
                        <p className=" text-sm text-white flex items-center gap-1 font-semibold">
                          <IoMdThumbsUp className="text-tradeGreen " />
                          {/* {parseInt(props.positiveFeedback).toLocaleString()} */}
                          18
                        </p>

                        <p className="text-sm text-white flex items-center gap-1 font-semibold">
                          <MdThumbDownAlt className="text-red-500" />
                          {/* {parseInt(props.trustScore).toLocaleString()} */}2
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Offer Id Field */}
            <div className=" sticky top-[62px] z-20 flex justify-between items-center px-4 py-2 border-b border-tradeAshLight bg-tradeAshExtraLight">
              <p className="text-white text-xs font-semibold">
                UPDATING OFFER WITH ID
              </p>
              <p className="text-tradeOrange text-sm font-semibold">
                #128w51721826
              </p>
            </div>
            {/* Limit Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Trade Limit Range
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
                      "To make this offer visible, you must have at least 50% of the minimum amount you've set available in your wallet."
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

                <div className="">
                  <Info
                    text={
                      "Set a fair and competitive margin (2–5%) to attract traders. Too high a margin may deter users. A balanced rate boosts appeal and trade volume."
                    }
                  />
                </div>

                {/* <div className="flex flex-col gap-[5px]">
                  <p className="text-tradeFadeWhite text-[14px] font-[500]">
                    Current USDT Market Price:{" "}
                    <span className="text-tradeGreen font-[600]">
                      1,586.95 NGN / USDT
                    </span>
                  </p>

                  <p className="text-tradeFadeWhite text-[14px] font-[500]">
                    Setting margin at{" "}
                    <span className="text-tradeOrange font-[600]">5%</span>{" "}
                    means you will be trading at a rate of{" "}
                    <span className="text-tradeGreen font-[600]">
                      1,666.30 NGN / USDT
                    </span>
                    , which translates to an earnings of approximately{" "}
                    <span className="text-tradeGreen font-[600]">
                      7,935 NGN
                    </span>{" "}
                    for every 1 USDT traded.
                  </p>
                </div> */}
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
                    <div className="flex w-max items-center gap-[8px] px-[12px] py-[5px] rounded-[6px] bg-tradeAshLight">
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
                    "Use this field to add any extra Instructions or context that can help ensure a smooth and transparent trade. This could include how quickly you'll respond, reminders to be respectful, or steps sellers should follow during communication. Be clear, helpful, and professional."
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
                  Would you like to terminate this offer ?
                </p>
              </div>

              <div
                // onClick={handleClearFilter}
                className="flex justify-center bg-transparent  text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeFadeWhite  p-[12px] rounded-[10px] cursor-pointer duration-300 transition-all"
              >
                <p className="text-[14px] font-[700]">Cancel</p>
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
