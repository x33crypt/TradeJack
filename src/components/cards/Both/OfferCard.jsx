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
import { FaInfoCircle } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaCircle } from "react-icons/fa";
import { IoMdArrowRoundUp } from "react-icons/io";
import { HiArrowCircleUp } from "react-icons/hi";

const MarketCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className=" hidden p-[12px] gap-5 items-center bg-tradeAsh hover:bg-black rounded-[10px] border border-tradeAshLight transition-all duration-300 cursor-pointer"
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

      <div className="flex justify-between p-[12px] gap-5 bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col gap-4 justify-between">
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
            <div className="flex gap-1 items-center">
              <HiOutlineUserCircle className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-white">Collins</p>
            </div>

            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <FaCircle className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                <p className="text-xs font-medium text-white">Online</p>
              </div>

              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">546</p>
              </div>
            </div>
          </div>

          <div className="flex  items-center gap-1">
            <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              <span className="text-white">+45 recent</span> trades
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <VscVerifiedFilled className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Verified
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
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex flex-col gap-1 items-end">
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  2Hrs 30Mins
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  2Hrs 30Mins
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end justify-between">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <p className="text-base font-bold text-white leading-none">
                USD 50,000.00
              </p>
              <div className="text-tradeOrange text-[12px]">
                <FaInfoCircle />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                0.22% above market price
              </p>
              <HiArrowCircleUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            </div>
          </div>

          <div className="flex gap-3 items-end">
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
            <div className="flex gap-[5px]">
              <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <FaStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              </div>
              <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <p>Trade</p>
              </div>
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
          <div className="flex text-tradeFadeWhite bg-tradeAshLight border border-tradeAshExtraLight w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>View Details</p>
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

            <div className="flex items-center gap-1">
              <p className="text-base font-bold text-white leading-none">
                $50,000.00
              </p>
              <div className="text-tradeOrange text-[12px]">
                <FaInfoCircle />
              </div>
            </div>

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
          <div className="flex gap-[5px]">
            <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            </div>
            <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <p>Trade</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
