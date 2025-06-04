import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BiSolidCapsule } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { TbArrowBigUpLines } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";

const MyOfferCard = (props) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/${offerId}/edit`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="hidden md:flex flex-1 border-t bg-tradeAsh border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Left: Main Info Sections */}
        <div className="flex w-[150px] flex-col gap-1 justify-center px-4 py-6 border-r border-tradeAshLight">
          <p className="text-tradeFadeWhite text-xs font-semibold">Offer ID</p>
          <p className="text-white  text-sm font-bold">56719018968</p>
        </div>

        {/* Bank Info */}
        <div className="flex items-center gap-3 px-4 py-6 flex-1 border-r border-tradeAshLight">
          <CiBank className="text-tradeAshLight text-[28px]" />
          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-sm font-bold">Wells Fargo</p>
            <p className="text-white text-xs font-semibold">
              Direct Bank Transfer
            </p>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex flex-col gap-1 justify-center px-4 py-6 flex-1 border-r border-tradeAshLight">
          <p className="text-tradeFadeWhite text-xs font-semibold">
            Accepted Currency
          </p>
          <p className="text-white  text-sm font-bold">United State Dollars</p>
        </div>

        {/* Purchase Limits */}
        <div className="flex flex-col justify-center gap-1 px-4 py-6 flex-1  border-r border-tradeAshLight">
          <div className="flex justify-between items-center">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Min Purchase
            </p>
            <p className="text-white  text-sm font-bold">200 USD</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Max Purchase
            </p>
            <p className="text-white  text-sm font-bold">1,000 USD</p>
          </div>
        </div>

        {/* Profit Margine*/}
        <div className="flex flex-col gap-1 justify-center px-4 py-6 flex-1">
          <p className="text-tradeFadeWhite text-xs font-semibold">
            Profit Margin
          </p>
          <p className="text-white  text-sm font-bold">
            {" "}
            <span className="text-tradeOrange">2%</span> on every trade
          </p>
        </div>

        {/* Right: Status + Action */}
        <div className="flex-1 flex flex-col justify-center items-start gap-2 px-4 py-6 bg-tradeAshExtraLight border-l border-tradeAshLight">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tradeGreen animate-pulse"></span>
            <p className="text-tradeGreen text-xs font-semibold">Active</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-tradeOrange text-xs font-semibold">
              Click to edit this offer
            </p>
            <FaEdit className="text-tradeOrange text-[12px]" />
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="flex flex-col md:hidden border bg-tradeAsh border-tradeAshLight hover:bg-black hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top: Offer ID and Status */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <div className="flex gap-2 items-center">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Offer ID:
            </p>
            <p className="text-white text-sm font-bold">5671908</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tradeGreen animate-pulse"></span>
            <p className="text-tradeGreen text-xs font-semibold">Active</p>
          </div>
        </div>

        {/* Bank Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-tradeAshLight">
          <div>
            <CiBank className="text-tradeAshLight text-[30px]" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-base font-bold">Wells Fargo</p>
            <p className="text-white text-xs font-medium">
              Direct Bank Transfer
            </p>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <p className="text-xs text-tradeFadeWhite font-semibold">
            Accepted Currency
          </p>
          <p className="font-bold text-white text-sm">United State Dollars</p>
        </div>

        {/* Purchase Limits */}

        <div className="flex justify-between px-4 py-4 border-b border-tradeAshLight text-white  font-semibold">
          <div>
            <p className="text-xs text-tradeFadeWhite">Min Purchase</p>
            <p className="font-bold text-sm">200 USD</p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Max Purchase</p>
            <p className="font-bold text-sm">200 USD</p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Profit Margin</p>
            <p className="font-bold text-sm">
              {" "}
              <span className="text-tradeOrange">5%</span> on every trade
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
