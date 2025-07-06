import React from "react";
import { MdDateRange } from "react-icons/md";
import { MdGrid3X3 } from "react-icons/md";
import { IoMdArrowRoundUp } from "react-icons/io";
import { CiBank } from "react-icons/ci";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const TradeCard = () => {
  return (
    <>
      <div className="md:flex hidden p-[15px] gap-10 items-center bg-tradeAsh hover:bg-black transition-all duration-300 cursor-pointer">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">123456789</p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">14, Feb, 2024 </p>
          </div>
        </div>

        <div className="flex flex-1 gap-2 items-center">
          <div className="lg:flex hidden text-tradeGreen p-3 text-base rounded-full bg-tradeAshLight">
            <CgArrowsExchangeAlt />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Trade with
              </p>
            </div>
            <p className="text-white text-[13px] font-semibold">
              <span className="text-tradeFadeWhite">@</span> SlickMayor
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-2 items-center">
          <div className="lg:flex hidden text-tradeFadeWhite p-3 text-base rounded-full bg-tradeAshLight">
            <CiBank />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Asset</p>
            </div>
            <p className="text-tradeOrange text-[13px] font-semibold">
              Apple Pay
            </p>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Amount</p>
          </div>
          <p className="text-white text-[13px] font-semibold">$5,600.00 </p>
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Status</p>
          </div>
          <p className="text-tradeGreen text-[13px] font-semibold">Completed</p>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="flex flex-col md:hidden  bg-tradeAsh rounded-[15px] border  border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top: Offer ID and Status */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdGrid3X3 className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">08685568</p>
          </div>
          <div className="flex items-center gap-2 bg-transparent  rounded-[4px] w-max">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-sm text-tradeAshExtraLight" />
            </div>
            <p className="text-white  text-[13px] font-bold">14, Feb, 2024</p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex w-full items-center justify-between  gap-3 px-4 py-3 border-b border-tradeAshLight">
          <div className="flex gap-3 items-center">
            <div className="flex text-tradeGreen p-3 leading-none text-base rounded-full bg-tradeAshLight">
              <CgArrowsExchangeAlt />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-white text-[13px] font-medium">SlickMayor</p>
              <p className="text-tradeOrange text-sm font-semibold">Cash App</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Amount</p>
            </div>
            <p className="text-white text-sm font-semibold">$5,600.00 </p>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex justify-between items-center px-4 py-3 md:border-b border-tradeAshLight">
          <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeFadeWhite text-xs font-medium">Status</p>
          </div>

          <p className="text-tradeGreen text-[13px] font-semibold">Completed</p>
        </div>
      </div>
    </>
  );
};

export default TradeCard;
