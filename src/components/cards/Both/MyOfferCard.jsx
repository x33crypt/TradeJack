import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { toDecimal } from "@/utils/toDecimal";
import { MdGrid3X3 } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";

const MyOfferCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/myoffers/${offerId}`);
  };

  if (!offer) return null;

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:flex hidden p-[15px] gap-5 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer"
      >
        <div className=" lg:w-[120px] flex-1 lg:flex-none flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              {offer?.offerId}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-semibold">
              14, Feb, 2024{" "}
            </p>
          </div>
        </div>
        <div className="flex-1 flex gap-[10px] items-center">
          <div className="lg:flex hidden text-tradeGreen p-3 text-base rounded-full bg-tradeAshLight">
            <RiBankFill />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Service</p>
            </div>
            <p className="text-white text-[13px] font-semibold md:w-[130px] truncate  bg-tradeOrang">
              {offer?.service}
            </p>
          </div>
        </div>
        <div className="lg:w-[150px] flex-1  lg:flex-none flex flex-col  gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Currency</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="lg:flex hidden text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.name}
            </p>

            <p className="lg:hidden flex text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.code}
            </p>
          </div>
        </div>
        <div className="lg:w-[150px] flex-1 lg:flex-none flex flex-col justify-center gap-2   ">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Purchase Limits
            </p>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-[13px] font-bold text-white">
              {toDecimal(offer?.marginRate?.from)} {""}
            </p>
            <p className="text-tradeFadeWhite">-</p>
            <p className=" text-[13px] font-bold text-white">
              {toDecimal(offer?.marginRate?.to)}{" "}
            </p>
          </div>
        </div>
        <div className="lg:w-[150px] flex-1 lg:flex-none flex flex-col justify-center gap-2   ">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Profit Margin
            </p>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-[13px] font-bold text-white">
              {offer?.marginRate?.rate}
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:hidden flex flex-col p-[12px] bg-tradeAsh hover:bg-black transition-all duration-300 rounded-[15px] cursor-pointer gap-3 border border-tradeAshLight"
      >
        {/* Top Section: Offer ID and Date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-xs text-tradeFadeWhite font-medium">
              {offer?.offerId}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-[5px] bg-tradeGreen text-black font-medium">
              Active
            </span>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <MdDateRange className="text-sm text-tradeAshExtraLight" />
              </div>
              <p className="text-tradeFadeWhite text-xs">14, Feb, 2024</p>
            </div>
          </div>
        </div>

        {/* Service & Currency */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-tradeFadeWhite text-[11px]">Service</span>
            <p className="text-tradeGreen text-sm font-semibold">
              {offer?.service}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-tradeFadeWhite text-[11px]">Currency</span>
            <p className="text-tradeOrange text-sm font-semibold">
              {offer?.preferredCurrency?.code}
            </p>
          </div>
        </div>

        {/* Purchase Limits */}
        <div className="flex flex-col">
          <span className="text-tradeFadeWhite text-[11px]">
            Purchase Limits
          </span>
          <p className="text-white text-sm font-bold">
            {offer?.preferredCurrency?.code}{" "}
            {toDecimal(offer?.marginRate?.from)} -{" "}
            {offer?.preferredCurrency?.code} {toDecimal(offer?.marginRate?.to)}
          </p>
        </div>

        {/* Profit Margin */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-tradeFadeWhite text-[11px]">
              Profit Margin
            </span>
            <p className="text-white text-sm font-bold">
              {offer?.marginRate?.rate} on every trade
            </p>
          </div>

          <div>
            <span className="text-xs px-4 py-2 rounded-[8px] bg-tradeAshExtraLight text-white font-semibold">
              See Details
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
