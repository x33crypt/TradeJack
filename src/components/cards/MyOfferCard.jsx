import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { formatDecimal } from "@/utils/numberFormat/numberFormat";
import { MdGrid3X3 } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

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
        className="hidden md:flex flex-1 border-t bg-tradeAsh border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Left: Main Info Sections */}

        <div className="flex flex-col  px-4 py-6 flex-1 gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white text-[13px] font-bold">{offer?.offerId}</p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">14, Feb, 2024</p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex items-center gap-3 px-4 py-6 flex-1 ">
          <CiBank className="text-[40px] text-tradeFadeWhite" />
          <div className="flex flex-col gap-2">
            <p className="text-tradeOrange text-sm font-bold">
              {offer?.service}
            </p>
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {offer?.serviceType}
              </p>
            </div>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="lg:flex hidden flex-col gap-2 justify-center px-4 py-6 flex-1 ">
          <p className="text-tradeFadeWhite text-sm font-bold">
            Accepted Currency
          </p>

          <div className="flex gap-1">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {offer?.preferredCurrency?.name}
              </p>
            </div>
            <div className="lg:flex hidden items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {offer?.preferredCurrency?.code}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Limits */}
        <div className="flex  flex-col justify-center gap-2 px-4 py-6 flex-1  ">
          <div className="flex gap-[15px] items-center">
            <div className="lg:flex hidden items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Minimum</p>
            </div>

            <div className="lg:hidden flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Min</p>
            </div>

            <p className="text-[13px] font-bold text-white">
              {formatDecimal(offer?.marginRate?.from)} {""}
              {offer?.preferredCurrency?.code}
            </p>
          </div>

          <div className="flex gap-[15px] items-center">
            <div className="lg:flex hidden items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Maximum</p>
            </div>

            <div className="lg:hidden flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Max</p>
            </div>

            <p className=" text-[13px] font-bold text-white">
              {formatDecimal(offer?.marginRate?.to)}{" "}
              {offer?.preferredCurrency?.code}
            </p>
          </div>
        </div>

        {/* Right: Status + Action */}
        <div className="w-[200px] flex flex-col justify-center items-start gap-2 px-4 py-6 ">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[5px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <GoDotFill className="text-sm text-tradeGreen" />
            </div>
            <p className="text-tradeGreen  text-sm font-bold">Active</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Click to view and edit
            </p>
            <FaEdit className="text-tradeOrange text-[12px]" />
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="flex flex-col md:hidden border bg-tradeAsh border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top: Offer ID and Status */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-sm font-bold">{offer?.offerId}</p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[5px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <GoDotFill className="text-sm text-tradeGreen" />
            </div>
            <p className="text-tradeGreen  text-sm font-semibold">Active</p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-tradeAshLight">
          <div>
            <CiBank className="text-tradeAshLight text-[30px]" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-base font-bold">
              {" "}
              {offer?.service}
            </p>
            <p className="text-white text-xs font-medium">
              {offer?.service_type}
            </p>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <p className="text-xs text-tradeFadeWhite font-semibold">
            Accepted Currency
          </p>
          <p className="font-bold text-white text-sm">
            {" "}
            {offer?.preferred_currency?.[0]?.name}
          </p>
        </div>

        {/* Purchase Limits */}

        <div className="flex justify-between px-4 py-4 border-b border-tradeAshLight text-white  font-semibold">
          <div>
            <p className="text-xs text-tradeFadeWhite">Min Purchase</p>
            <p className="font-bold text-sm">
              {" "}
              {formatDecimal(offer?.purchase_limits?.minimum)}{" "}
              {offer?.preferred_currency?.[0]?.code}
            </p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Max Purchase</p>
            <p className="font-bold text-sm">
              {formatDecimal(offer?.purchase_limits?.maximum)}{" "}
              {offer?.preferred_currency?.[0]?.code}
            </p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Profit Margin</p>
            <p className="font-bold text-sm">
              {" "}
              <span className="text-tradeOrange">
                {" "}
                {offer?.normalizedMarginRate?.[0]?.percent}%
              </span>{" "}
              on every trade
            </p>
          </div>
        </div>

        {/* Bottom: Action */}
        <div className="flex justify-between items-center px-4 py-3 bg-tradeAshExtraLight">
          <p className="text-tradeOrange text-xs font-semibold">
            Click to view and edit
          </p>
          <FaEdit className="text-tradeOrange text-sm" />
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
