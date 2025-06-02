import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BiSolidCapsule } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { TbArrowBigUpLines } from "react-icons/tb";

const MyOfferCard = (props) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/${offerId}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row border bg-tradeAsh border-tradeAshLight hover:bg-black cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden relative">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Offer ID */}
          <div className="flex justify-between md:flex-col md:justify-center md:gap-1 flex-1 px-4 py-4 md:py-6 border-b md:border-b-0 md:border-r border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-semibold md:block hidden">
              Offer ID
            </p>
            <p className="text-tradeFadeWhite text-sm md:text-[15px] font-medium">
              516w17gasv17
            </p>
          </div>

          {/* Bank Info */}
          <div className="flex gap-4 items-center flex-1 px-4 py-4 md:py-6 border-b md:border-b-0 md:border-r border-tradeAshLight">
            <CiBank className="text-tradeAshLight text-[24px] md:text-[28px]" />
            <div className="flex flex-col gap-1">
              <p className="text-tradeOrange text-sm font-bold">Wells Fargo</p>
              <p className="text-white text-xs font-medium">
                Direct Bank Transfer
              </p>
            </div>
          </div>

          {/* Accepted Currency */}
          <div className="flex justify-between md:flex-col md:justify-center md:gap-1 flex-1 px-4 py-4 md:py-6 border-b md:border-b-0 md:border-r border-tradeAshLight">
            <p className="text-tradeFadeWhite text-xs font-semibold md:block hidden">
              Accepted Currency
            </p>
            <p className="text-white text-sm font-semibold">
              United State Dollars - USD
            </p>
          </div>

          {/* Purchase Limits */}
          <div className="flex justify-center flex-col flex-1 px-4 py-4 md:py-6 border-b md:border-b-0 md:border-r border-tradeAshLight gap-1">
            <div className="flex justify-between items-center ">
              <p className="text-xs text-white font-medium">Min Purchase</p>
              <p className="text-white text-sm font-bold">200 USD</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-white font-medium">Max Purchase</p>
              <p className="text-white text-sm font-bold">1,000 USD</p>
            </div>
          </div>

          {/* Profit Margin */}
          <div className="flex justify-between  md:flex-col md:justify-center md:gap-1 flex-1 px-4 py-4 md:py-6">
            <p className="text-tradeFadeWhite text-xs font-semibold md:block hidden">
              Profit Margin
            </p>
            <p className="text-tradeGreen text-sm md:text-[15px] font-bold">
              5%
            </p>
          </div>
        </div>

        {/* Right side: Edit section */}
        <div className="flex flex-col justify-center items-start  gap-1 px-4 py-4 md:py-6 w-full md:w-[120px] bg-tradeAshExtraLight border-t md:border-t-0 border-tradeAshLight">
          {/* Dot + Status (Visible on mobile) */}
          <div className="flex items-center gap-2 ">
            <span className="w-2 h-2 rounded-full bg-tradeGreen animate-pulse"></span>
            <p className="text-tradeGreen text-xs font-[600]">Active</p>
          </div>

          <p className="text-tradeOrange text-xs font-[500]">
            Click to view and Edit
          </p>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
