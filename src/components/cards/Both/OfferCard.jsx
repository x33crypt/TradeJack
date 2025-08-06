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
import { FiTrendingUp } from "react-icons/fi";
import { LuEqualApproximately } from "react-icons/lu";
import { MdSendToMobile } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { MdGppGood } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";

const MarketCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:flex hidden p-[12px] gap-5 items-center bg-tradeAsh hover:bg-black rounded-[10px] border border-tradeAshLight transition-all duration-300 cursor-pointer"
      >
        {/* Bank Info Section */}
        <div className="flex flex-1 gap-3 items-center ">
          <CiBank className=" text-[40px] text-tradeFadeWhite" />

          <div className="flex flex-col gap-2">
            <p className="text-tradeOrange text-[13px] font-bold">
              {offer?.service}
            </p>
            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                {offer?.serviceType}
              </p>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex flex-1 gap-3 items-center border-rt">
          <HiOutlineUserCircle className="hidden lg:flex text-tradeAshLight text-[40px] flex-shrink-0" />

          <div className="flex flex-col gap-2  justify-between">
            <div className="flex-1 flex ">
              <p className=" text-white text-[13px] font-bold items-center max-w-[85px] inline-block truncate">
                {offer?.username}
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <GoDotFill className=" flex text-tradeGreen text-xs leading-none" />
                <p className="text-tradeFadeWhite text-xs font-semibold">
                  Active
                </p>
              </div>
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <MdGppGood className=" text-base text-tradeFadeWhite" />
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Limits Section */}
        <div className="flex flex-1  flex-col justify-center gap-2 ">
          <div className="flex gap-[15px] items-center">
            <div className="lg:flex hidden items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Minimum</p>
            </div>

            <div className="lg:hidden flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">Min</p>
            </div>

            <p className="text-[13px] font-bold text-white">
              {offer?.minimum.toLocaleString()} {offer?.currency?.code}
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
              {offer?.maximum.toLocaleString()} {offer?.currency?.code}
            </p>
          </div>
        </div>

        {/* Rate Info Section */}
        <div className="flex flex-1  flex-col justify-between gap-2 ">
          <div className="flex items-center justify-between">
            <p className="text-[17px] font-bold text-tradeFadeWhite leading-none">
              123,968.44 {offer?.currency?.code}
            </p>
          </div>

          <div className="flex gap-[10px] items-center">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <MdTimer className=" text-base text-tradeOrange" />
              </div>
              <p className="text-tradeFadeWhite text-xs font-semibold">
                65 M's
              </p>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <FaBusinessTime className=" text-base text-tradeGreen" />
              </div>
              <p className="text-tradeFadeWhite text-xs font-semibold">4 H's</p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="hidden flex-col bg-tradeAsh border border-tradeAshLight rounded- cursor-pointer transition-all duration-300 hover:bg-black hover:shadow-lg overflow-hidden"
      >
        {/* Top Section: Service + User */}
        <div className="flex justify-between pl-2 pr-4 py-4 border-b border-tradeAshLight">
          <div className="flex items-center gap-2">
            <CiBank className="text-tradeAshLight text-[30px]" />
            <div className="flex flex-col gap-1">
              <p className="text-tradeOrange text-base font-bold">
                {offer?.service}
              </p>
              <p className="text-white text-xs font-medium">
                {offer?.serviceType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <HiOutlineUserCircle className="text-tradeAshLight text-[30px]" />
            <div className="flex gap-1 flex-col items-start w-[100px] overflow-hidden">
              <div className="flex  items-center gap-2">
                <div className="flex-1 flex">
                  <p className=" text-white text-[13px] font-bold items-center max-w-[70px] inline-block truncate">
                    {offer?.username}
                  </p>
                </div>

                <div
                  className={`${
                    offer?.isOnline ? "text-tradeGreen" : "text-tradeFadeWhite"
                  } w-[60px]`}
                >
                  <HiStatusOnline />
                </div>
              </div>

              <div className="flex gap-3 ">
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <IoMdThumbsUp className="text-tradeGreen text-[13px]" />
                  {parseInt(offer?.positiveFeedback).toLocaleString()}
                </p>
                <p className="text-xs text-white flex items-center gap-1 font-semibold">
                  <FaStar className="text-tradeOrange text-[13px]" />
                  {parseInt(offer?.trustScore).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Currency */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-tradeAshLight">
          <p className="text-xs text-tradeFadeWhite font-semibold">
            Accepted Currency
          </p>
          <p className="font-bold text-white text-[13px]">
            United State Dollars
          </p>
        </div>

        {/* Middle Section: Purchase Limits */}
        <div className="flex justify-between px-4 py-4 border-b border-tradeAshLight text-white text-[13px] font-semibold">
          <div>
            <p className="text-xs text-tradeFadeWhite">Min Purchase</p>
            <p className="font-bold">
              {offer?.minimum.toLocaleString()} {offer?.currency?.code}
            </p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Max Purchase</p>
            <p className="font-bold">
              {offer?.maximum.toLocaleString()} {offer?.currency?.code}
            </p>
          </div>
          <div>
            <p className="text-xs text-tradeFadeWhite">Payment Window</p>
            <p className="font-bold">{offer?.paymentWindow} Hour(s)</p>
          </div>
        </div>

        {/* Bottom Section: Rate Info */}
        <div className="flex justify-between items-center px-4 py-4 text-white bg-tradeAshLight">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold text-white">
              123,968.44 {offer?.currency?.code}
            </p>

            <FiTrendingUp className="text-tradeGreen text-[13px] " />
            <p className="text-[13px] font-bold text-tradeGreen">
              {offer?.margin}.00%
            </p>
          </div>
          <div className="flex gap-3 justify-between items-center">
            <div className="flex items-center gap-1">
              <MdTimer className="text-tradeOrange text-[13px]" />
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                65 Min(s)
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaBusinessTime className="text-tradeOrange text-[13px]" />
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                4 Hour(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-between p-[12px] gap-5 bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  April 20
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdAccessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  5:00 PM
                </p>
              </div>
            </div>
            <p className="text-base font-bold text-tradeOrange leading-none">
              Cash App
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                United State Dollars
              </p>
              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span className="text-white">+45 recent</span> trades
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[12px] py-[4px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaBookmark className="flex text-tradeGreen text-[14px] flex-shrink-0" />
              <p className="text-white text-[13px] font-semibold">Bookmark</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">546</p>
              </div>
              <div className="flex gap-1 items-center">
                <HiOutlineUserCircle className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeGreen">Online</p>
              </div>
            </div>

            <p className="text-base font-bold text-white leading-none">
              $50,000.00
            </p>
            <div className="flex flex-col gap-1 items-end">
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  Min -- USD 383
                </p>
              </div>
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  Max -- USD 5,000
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[4px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <p>Trade</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
