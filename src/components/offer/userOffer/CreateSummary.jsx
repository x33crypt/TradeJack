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

  const previous = () => {
    setCreateOffer((prev) => ({
      ...prev,
      step: 1,
    }));

    navigateTo("/offers/user/create");
  };

  return (
    <div className="flex md:w-[320px] w-full lg:flex-row gap-[10px] flex-col bg-black  lg:pt-0 md:pt-[64px] pt-[60px]">
      <div className="relative bg-black w-full min-h-svh flex flex-col md:border-x md:border-b md:border-t-0 border-neutral-800">
        <div className="flex flex-col justify-between px-[15px] py-[12px]  border-b border-tradeAshLight w-full">
          <p className="text-lg text-white font-[700]">Offer Summary</p>
        </div>

        <div className="flex flex-1 flex-col p-[15px] gap-[25px]">
          <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
            Double-check all details, terms, and instructions are accurate and clear
            before posting.
          </p>

          <div className="flex flex-1 flex-col gap-[50px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-co gap-[10px] items-cente bg-tradeAs borde rounded-[15px] border-neutral-800 py-[12px">
                <div>
                  {IconComponent && (
                    <IconComponent className="text-tradeFadeWhite text-[50px] leading-none" />
                  )}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <p className="text-tradeOrange text-lg font-semibold md:w-max w-[200px] leading-snug">
                    {createOffer?.service || "NA"}
                  </p>

                  <div>
                    <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                      {createOffer?.serviceType || "Service Type"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <p className="text-[13px] font-semibold text-white">
                      Purchase Limit
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[13px] font-semibold text-tradeFadeWhite">
                      Minimum
                    </p>
                    <p className="text-white text-[13px] font-semibold">
                      {createOffer?.minimum !== "" &&
                      createOffer?.currency?.code
                        ? `${Number(createOffer.minimum).toLocaleString()} ${
                            createOffer.currency.code
                          }`
                        : "0.00"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[13px] font-semibold text-tradeFadeWhite">
                      Maximum
                    </p>
                    <p className="text-white text-[13px] font-semibold">
                      {createOffer?.maximum !== "" &&
                      createOffer?.currency?.code
                        ? `${Number(createOffer.maximum).toLocaleString()} ${
                            createOffer.currency.code
                          }`
                        : "0.00"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                  <div className="flex items-center justify-between w-full mt-[1px]">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Rate
                      </p>
                    </div>

                    <p className="text-white text-xl font-semibold leading-none">
                      1,250/{createOffer?.currency?.code || "N/A"}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                        Margin
                      </p>
                      <div className="flex items-center gap-[2px] text-[13px] font-semibold rounded-[5px] bg-tradeGreen text-black px-[5px] py-[1px] w-max">
                        <p>{createOffer?.margin || "N/A"}%</p>
                      </div>
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

                <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <p className="text-[13px] font-semibold text-white">
                      Payment Window
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[13px] font-semibold text-tradeFadeWhite">
                      Transfer
                    </p>
                    <p className="text-white text-[13px] font-semibold">
                      {createOffer?.tradersPaymentWindow?.hours} hrs{" "}
                      {createOffer?.tradersPaymentWindow?.minutes} min
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[13px] font-semibold text-tradeFadeWhite">
                      Release
                    </p>
                    <p className="text-white text-[13px] font-semibold">
                      {createOffer?.vendorPaymentWindow?.hours} hrs{" "}
                      {createOffer?.vendorPaymentWindow?.minutes} min
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <p className="text-[13px] font-semibold text-white">Tags</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full">
                    {createOffer?.termTags?.length ? (
                      createOffer.termTags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex w-max items-center gap-[8px] px-[8px] py-[2px] rounded-[8px] bg-tradeAshLight border border-tradeAshLight"
                        >
                          <p className="text-[13px] font-semibold text-tradeFadeWhite">
                            {tag}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        No tags specified
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-between bg-tradeAsh border rounded-[15px] border-neutral-800 p-[12px]">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <p className="text-[13px] font-semibold text-white">
                      Instructions
                    </p>
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
            </div>
            <div className="lg:hidden flex flex-col gap-[10px] justify-center items-center">
              <Button
                onClick={handlepublish}
                variant="primary"
                disabled={createOffer?.loading}
              >
                Go Live
              </Button>

              <Button onClick={previous} variant="outline">
                Make Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSummary;
