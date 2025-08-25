import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { useToast } from "@/context/otherContext/ToastContext";
import { publishOffer } from "@/utils/offer/publishOffer";
import Button from "@/components/buttons/Button";
import { useUserOffer } from "@/context/userContext/OffersContext";

const CreateSummary = () => {
  const { createOffer, setCreateOffer } = useUserOffer();
  const { toast, setToast } = useToast();

  console.log(createOffer);

  const serviceTypeIcons = {
    "Online Wallet Transfer": IoWalletOutline,
    "Bank Transfer": CiBank,
    "Gift Cards Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const IconComponent = serviceTypeIcons[createOffer?.serviceType];

  const navigateTo = useNavigate();

  const handlepublish = async () => {
    setCreateOffer((prev) => ({
      ...prev,
      loading: true,
    }));

    console.log("Publishing offer at summary:", createOffer);

    const result = await publishOffer(createOffer);

    console.log("Offer published:", result);

    if (result.success) {
      setCreateOffer((prev) => ({
        ...prev,
        loading: false,
      }));

      setCreateOffer((prev) => ({
        ...prev,
        submitSuccess: true,
      }));
    } else {
      console.error("Publish failed:", result.error);
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

  const handleDraft = () => {};

  const cancelButton = () => {
    navigateTo(location?.state?.from || -1);
  };

  return (
    <div className="flex md:w-[350px] flex-1 lg:flex-row gap-[10px] flex-col bg-black  lg:pt-0 md:pt-[64px] pt-[60px]">
      <div className="relative bg-black w-full min-h-svh flex flex-col md:border-x md:border-b md:border-t-0 border-neutral-800">
        <div className="flex flex-col justify-between px-[15px] py-[12px]  border-b border-tradeAshLight w-full">
          <p className="text-lg text-white font-[700]">Offer Summary</p>
        </div>

        <div className="flex flex-1 flex-col p-[15px] gap-[15px]">
          <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
            Verify your offer information to set clear terms and support a
            transparent, efficient trade.
          </p>

          <div className="flex flex-1 flex-col gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-3 items-cente bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <div>
                  {IconComponent && (
                    <IconComponent className="text-tradeFadeWhite text-[45px] leading-none" />
                  )}
                </div>

                <p className="text-tradeOrange text-2xl font-bold leading-relaxed">
                  {createOffer?.service || "NA"}
                </p>

                <div className="px-[6px] py-0.5 bg-tradeAshLight border border-tradeAsh rounded-[6px] w-max">
                  <p className="text-tradeFadeWhite text-[13px] font-medium ">
                    {createOffer?.serviceType || "Service Type"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <p className="text-[13px] font-semibold text-white">Currency</p>
                <p className="text-tradeFadeWhite text-[13px] font-semibold">
                  {createOffer?.currency?.name
                    ? `${createOffer.currency.name}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Purchase Limit
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[13px] font-semibold text-white">
                    Minimum
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    {createOffer?.minimum !== "" && createOffer?.currency?.code
                      ? `${Number(createOffer.minimum).toLocaleString()} ${
                          createOffer.currency.code
                        }`
                      : "0.00"}
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[13px] font-semibold text-white">
                    Maximum
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    {createOffer?.maximum !== "" && createOffer?.currency?.code
                      ? `${Number(createOffer.maximum).toLocaleString()} ${
                          createOffer.currency.code
                        }`
                      : "0.00"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                <div className="flex items-center justify-between gap-[10px] p-3 border- border-tradeAshLight">
                  <p className="text-[13px] font-semibold text-white">
                    Profit Margin
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    {createOffer?.margin !== undefined
                      ? `${createOffer.margin}%`
                      : "--"}{" "}
                    per trade
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Payment Window
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[13px] font-semibold text-white">
                    Vendor ( You )
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    {createOffer?.vendorPaymentWindow?.hours} hrs{" "}
                    {createOffer?.vendorPaymentWindow?.minutes} min
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[13px] font-semibold text-white">
                    Traders
                  </p>
                  <p className="text-tradeFadeWhite text-[13px] font-semibold">
                    {createOffer?.tradersPaymentWindow?.hours} hrs{" "}
                    {createOffer?.tradersPaymentWindow?.minutes} min
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Terms
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  {createOffer?.termTags?.length ? (
                    createOffer.termTags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex w-max items-center gap-[8px] px-[8px] py-[2px] rounded-[6px] bg-tradeAshLight border border-tradeAshLight"
                      >
                        <p className="text-[13px] font-semibold text-tradeOrange">
                          {tag}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      No terms specified
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                  <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                    <p className="text-tradeGreen text-xs font-medium ">
                      Instructions
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  {createOffer?.instruction ? (
                    <p className="text-white text-[13px] font-semibold">
                      {createOffer?.instruction}
                    </p>
                  ) : (
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      No Instructions set yet
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] justify-center items-center">
              <Button
                onClick={handlepublish}
                variant="primary"
                disabled={createOffer?.loading}
              >
                Publish Offer
              </Button>

              {/* 
              <Button
                onClick={handleDraft}
                variant="ghost"
                disabled={isUpdating}
              >
                Save in Draft
              </Button> */}

              <Button onClick={cancelButton} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSummary;
