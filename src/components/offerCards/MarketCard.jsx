import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BiSolidCapsule } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { TbArrowBigUpLines } from "react-icons/tb";
import { RxDividerVertical } from "react-icons/rx";
import { CiBank } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const MarketCard = (props) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="md:flex items-center hidden border-t bg-tradeAsh border-tradeAshLight hover:bg-black cursor-pointer transition-all duration-300 hover:shadow-lg rounded- overflow-hidden"
      >
        {/* Bank Info Section */}
        <div className="flex flex-1 px-4 py-6 gap-5 items-center border-r border-tradeAshLight">
          <CiBank className="text-tradeAshLight text-[28px]" />
          <div className="flex flex-col gap-1">
            <p className="text-tradeOrange text-sm font-bold">
              {props.service}
            </p>
            <p className="text-white text-xs font-medium">
              {props.serviceType}
            </p>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex flex-1 px-4 py-6 gap-5 items-center border-r border-tradeAshLight">
          <HiOutlineUserCircle className="text-tradeAshLight text-[28px]" />
          <div className="flex flex-col gap-1">
            <p className="text-white text-sm font-bold">{props.username}</p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-white flex items-center gap-1 font-semibold">
                <IoMdThumbsUp className="text-tradeGreen text-sm" />
                {parseInt(props.positiveFeedback).toLocaleString()}
              </p>
              <p className="text-xs text-white flex items-center gap-1 font-semibold">
                <FaStar className="text-tradeOrange text-sm" />
                {parseInt(props.positiveFeedback).toLocaleString()}
              </p>
              {/* <span className="text-xs text-tradeGreen font-medium">
                Online
              </span> */}
            </div>
          </div>
        </div>

        {/* Purchase Limits Section */}
        <div className="flex flex-col justify-center flex-1 px-4 py-6 gap-1 border-r border-tradeAshLight">
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold  text-white">Min Purchase</p>
            <p className="text-sm font-bold text-white">
              {parseInt(props.miniPurchase).toLocaleString()} {props.currency}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold  text-white">Max Purchase</p>
            <p className="text-sm font-bold text-white">
              {parseInt(props.maxPurchase).toLocaleString()} {props.currency}
            </p>
          </div>
        </div>

        {/* Rate Info Section */}
        <div className="flex flex-col flex-1 px-4 py-6 gap-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white">1 {props.currency}</p>
            <FaArrowRightArrowLeft className="text-tradeFadeWhite text-xs" />
            <p className="text-sm font-bold text-white">NGN 750.00</p>
          </div>
          <div className="flex items-center gap-1">
            <TbArrowBigUpLines className="text-tradeGreen text-xs" />
            <p className="text-xs font-semibold  text-white">+2.00%</p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="md:hidden flex flex-col bg-tradeAsh border border-tradeAshLight rounded- cursor-pointer transition-all duration-300 hover:bg-black hover:shadow-lg overflow-hidden"
      >
        {/* Top Section: Service + User */}
        <div className="flex justify-between px-4 py-4 border-b border-tradeAshLight">
          <div className="flex items-center gap-3">
            <CiBank className="text-tradeAshLight text-[30px]" />
            <div>
              <p className="text-tradeOrange text-base font-bold">
                {props.service}
              </p>
              <p className="text-white text-xs font-medium">
                {props.serviceType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineUserCircle className="text-tradeAshLight text-[30px]" />
            <div className="flex flex-col items-end">
              <p className="text-white text-base font-bold">{props.username}</p>
              <div className="flex gap-3 mt-1">
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <IoMdThumbsUp className="text-tradeGreen text-sm" />
                  {parseInt(props.positiveFeedback).toLocaleString()}
                </p>
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <FaStar className="text-tradeOrange text-sm" />
                  {parseInt(props.positiveFeedback).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Purchase Limits */}
        <div className="flex justify-between px-4 py-4 border-b border-tradeAshLight text-white text-sm font-semibold">
          <div>
            <p className="text-xs">Min Purchase</p>
            <p className="font-bold">
              {parseInt(props.miniPurchase).toLocaleString()} {props.currency}
            </p>
          </div>
          <div>
            <p className="text-xs">Max Purchase</p>
            <p className="font-bold">
              {parseInt(props.maxPurchase).toLocaleString()} {props.currency}
            </p>
          </div>
        </div>

        {/* Bottom Section: Rate Info */}
        <div className="flex justify-between items-center px-4 py-4 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <p>1 {props.currency}</p>
            <FaArrowRightArrowLeft className="text-tradeFadeWhite text-xs" />
            <p>NGN 750.00</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-tradeGreen">
            <TbArrowBigUpLines />
            <p>+2.00%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
