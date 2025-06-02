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
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { HiStatusOnline } from "react-icons/hi";

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
        <div className="flex flex-1 px-4 py-6 gap-3 items-center border-r border-tradeAshLight">
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
        <div className="flex flex-1 px-4 py-6 gap-3 items-center border-r border-tradeAshLight">
          <HiOutlineUserCircle className="text-tradeAshLight text-[28px] flex-shrink-0" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex-1 flex ">
                <p className=" text-white text-sm font-bold items-center max-w-[70px] inline-block truncate">
                  {props.username}
                </p>
              </div>

              <div
                className={`${
                  props.isOnline ? "text-tradeGreen" : "text-tradeFadeWhite"
                } w-[60px]`}
              >
                <HiStatusOnline />
              </div>
            </div>

            <div className="flex items-center">
              <p className=" flex-1 w-full text-xs text-white flex items-center gap-1 font-semibold">
                <IoMdThumbsUp className="text-tradeGreen text-sm" />
                {parseInt(props.positiveFeedback).toLocaleString()}
              </p>
              <p className="flex-1 w-full  text-xs text-white flex items-center gap-1 font-semibold">
                <AiFillSafetyCertificate className="text-tradeOrange text-sm" />
                {parseInt(props.trustScore).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Limits Section */}
        <div className="flex flex-col justify-center flex-1 px-4 py-6 gap-1 border-r border-tradeAshLight">
          <div className="flex justify-between items-center">
            <p className=" flex md:hidden lg:flex  text-xs font-semibold  text-white">
              Min Purchase
            </p>
            <p className="  hidden md:flex lg:hidden   text-xs font-semibold  text-white">
              Minimum
            </p>

            <p className="text-sm font-bold text-white">
              {props.minimum.toLocaleString()} {props.currency?.code}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" flex md:hidden lg:flex  text-xs font-semibold  text-white">
              Max Purchase
            </p>
            <p className="  hidden md:flex lg:hidden  text-xs font-semibold  text-white">
              Maximum
            </p>
            <p className=" text-sm font-bold text-white">
              {props.maximum.toLocaleString()} {props.currency?.code}
            </p>
          </div>
        </div>

        {/* Rate Info Section */}
        <div className="flex flex-col justify-center items-start flex-1 px-4 py-6 gap-2 border-l border-tradeAshLight">
          <div className="flex flex-col  gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white">
                1 {props.currency?.code}
              </p>
              <FaArrowRightArrowLeft className="text-tradeOrange text-xs" />
              <p className="text-sm font-bold text-white"> 0.4308 USDT</p>
            </div>

            <div className="flex items-center gap-2 p-[0.5px] bg-tradeAshExtraLight">
              <TbArrowBigUpLines className="text-tradeGreen text-xs " />
              <p className="text-xs font-semibold text-tradeGreen">
                +{props.margin}.00% Margin
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="md:hidden flex flex-col bg-tradeAsh border border-tradeAshLight rounded- cursor-pointer transition-all duration-300 hover:bg-black hover:shadow-lg overflow-hidden"
      >
        {/* Top Section: Service + User */}
        <div className="flex justify-between pl-2 pr-4 py-4 border-b border-tradeAshLight">
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2 ">
            <HiOutlineUserCircle className="text-tradeAshLight text-[30px]" />
            <div className="flex gap-1 flex-col items-start w-[100px] overflow-hidden">
              <div className="flex  items-center gap-2">
                <div className="flex-1 flex">
                  <p className=" text-white text-sm font-bold items-center max-w-[70px] inline-block truncate">
                    {props.username}
                  </p>
                </div>

                <div
                  className={`${
                    props.isOnline ? "text-tradeGreen" : "text-tradeFadeWhite"
                  } w-[60px]`}
                >
                  <HiStatusOnline />
                </div>
              </div>

              <div className="flex gap-3 ">
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <IoMdThumbsUp className="text-tradeGreen text-sm" />
                  {parseInt(props.positiveFeedback).toLocaleString()}
                </p>
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <FaStar className="text-tradeOrange text-sm" />
                  {parseInt(props.trustScore).toLocaleString()}
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
              {props.minimum.toLocaleString()} {props.currency?.code}
            </p>
          </div>
          <div>
            <p className="text-xs">Max Purchase</p>
            <p className="font-bold">
              {props.maximum.toLocaleString()} {props.currency?.code}
            </p>
          </div>
          <div>
            <p className="text-xs">Payment Window</p>
            <p className="font-bold">{props.paymentWindow} Hour(s)</p>
          </div>
        </div>

        {/* Bottom Section: Rate Info */}
        <div className="flex justify-between items-center px-4 py-4 text-white">
          <div className="flex items-center gap-2 font-bold text-sm">
            <p>1 {props.currency?.code}</p>
            <FaArrowRightArrowLeft className="text-tradeOrange text-xs" />
            <p>NGN 750.00</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-tradeGreen">
            <TbArrowBigUpLines />
            <p>+{props.margin}.00% Margin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
