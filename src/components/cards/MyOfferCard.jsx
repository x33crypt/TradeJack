import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { formatDecimal } from "@/utils/numberFormat/numberFormat";
import { MdGrid3X3 } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";

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
        className="md:flex hidden p-[15px] gap-10 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer"
      >
        <div className=" flex flex-col  gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">
              {offer?.offerId}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">14, Feb, 2024 </p>
          </div>
        </div>
        <div className="flex-1 flex gap-2 items-center">
          <div className="lg:flex hidden text-tradeFadeWhite p-3 text-base rounded-full bg-tradeAshLight">
            <CiBank />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {offer?.serviceType}
              </p>
            </div>
            <p className="text-tradeOrange text-[13px] font-semibold">
              {offer?.service}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col  gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Offer Currency
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.name}
            </p>
            <p className="text-tradeFadeWhite">-</p>
            <p className="text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.code}
            </p>
          </div>
        </div>
        <div className="w-[200px] bg-tradeGree flex flex-col justify-center gap-2   ">
          <div className="flex gap-[15px] items-center">
            <div className="lg:flex hidden items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Minimum</p>
            </div>

            <div className="lg:hidden flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Min</p>
            </div>

            <p className="text-[13px] font-bold text-white">
              ${formatDecimal(offer?.marginRate?.from)} {""}
              {/* {offer?.preferredCurrency?.code} */}
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
              ${formatDecimal(offer?.marginRate?.to)}{" "}
              {/* {offer?.preferredCurrency?.code} */}
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="flex flex-col md:hidden  bg-tradeAsh rounded-[15px] border border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top: Offer ID and Status */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className=" flex gap-[10px]">
            <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
              </div>
              <p className="text-white  text-[13px] font-bold">
                {offer?.offerId}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <MdDateRange className="text-sm text-tradeAshExtraLight" />
              </div>
              <p className="text-white  text-[13px] font-bold">
                14, Feb, 2024{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[5px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <RiRadioButtonLine className="text-sm text-tradeGreen" />
            </div>
            <p className="text-white  text-sm font-semibold">Active</p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-tradeAshLight">
          <div className="flex text-tradeFadeWhite p-3 text-base rounded-full bg-tradeAshLight">
            <CiBank />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-sm font-semibold">
              {" "}
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
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">
              Offer Currency
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.name}
            </p>
            <p className="text-tradeFadeWhite">-</p>
            <p className="text-white text-[13px] font-semibold">
              {offer?.preferredCurrency?.code}
            </p>
          </div>
        </div>

        {/* Purchase Limits */}
        <div className="flex justify-between px-4 py-4 border- border-tradeAshLight text-white  font-semibold">
          <div className="flex flex-col gap-1">
            <div className="flex  items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Min Purchase
              </p>
            </div>
            <p className="text-[13px] font-bold text-white">
              ${formatDecimal(offer?.marginRate?.from)} {""}
              {/* {offer?.preferredCurrency?.code} */}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex  items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Max Purchase
              </p>
            </div>
            <p className=" text-[13px] font-bold text-white">
              ${formatDecimal(offer?.marginRate?.to)}{" "}
              {/* {offer?.preferredCurrency?.code} */}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex  items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Profit Margin
              </p>
            </div>
            <p className="font-bold text-[13px] text-white">
              {" "}
              <span className="text-tradeOrange">
                {" "}
                {offer?.marginRate?.percent}%
              </span>{" "}
              on every trade
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
