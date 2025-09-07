import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaCircle } from "react-icons/fa";
import { HiArrowCircleUp } from "react-icons/hi";
import { FaBusinessTime } from "react-icons/fa6";
import { PiClockCountdownBold } from "react-icons/pi";
import { monthDate } from "@/utils/monthDate";
import { time } from "@/utils/time";
import { HiLocationMarker } from "react-icons/hi";
import { RiExchange2Fill } from "react-icons/ri";
import { CgArrowsExchange } from "react-icons/cg";
import { FaHashtag } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import image from "../../../assets/landingImg4.JPG"
import { FaLocationArrow } from "react-icons/fa";
import { MdThumbDownAlt } from "react-icons/md";

const FeedbackCard = () => {
  return (
    <>
      {/* Desktop Card */}
      <div className=" md:flex hidden justify-between p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col gap-4 justify-between w-[200px] ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <FaHashtag className="flex text-tradeFadeWhite text-[12px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                8bnsvxjvw61s1
              </p>
            </div>

            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <HiOutlineUserCircle className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-white">Sane</p>
              </div>

              <div className="flex gap-1 items-center">
                <HiLocationMarker className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Nigeria
                </p>
              </div>
            </div>

            <div className="flex  items-center gap-1">
              <FaExchangeAlt className="flex text-tradeGreen text-[12px] flex-shrink-0" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                <span className="text-white">5</span> Trades
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[200px]">
          <div className=" flex gap-[5px] items-center">
            <div className="flex gap-1 items-center">
              <VscVerifiedFilled className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                Verified
              </p>
            </div>
          </div>

          <p className="text-base font-bold text-tradeOrange truncate w-[200px] leading-none p-0">
            Cash App
          </p>

          <p className="text-xs font-semibold text-tradeFadeWhite">
            United States dollar
          </p>
        </div>

        <div className="flex flex-col gap-1 items-start w-[200px]">
          <div className="flex gap-1 items-center">
            <HiOutlineUserCircle className="flex text-tradeGreen text-[14px] flex-shrink-0" />
            <p className="text-xs font-medium text-white">Positive Feedback </p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-xs font-semibold text-tradeFadeWhite">
              Here’s a refined desktop and tablet version of your card. I’ve
              spread out the information
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end justify-between w-[230px] ">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex flex-col gap-1 items-end">
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  Min -- USD 383
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-[5px]">
            <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <p>View Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden flex flex-col p-[12px] bg-tradeAsh hover:bg-black transition-all duration-300 rounded-[15px] cursor-pointer gap-3 border border-tradeAshLight">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[15px]">
            <div className="flex-shrink-0 relative flex w-[45px]">
              <img className="rounded-full" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[13px] font-bold leading-none ">
                ChocoMillo
              </p>

              <div className="flex gap-1">
                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <FaLocationArrow className=" flex text-tradeOrange text-xs leading-none" />
                </div>

                <p className="text-tradeFadeWhite text-xs font-semibold">
                  Nigeria
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1  rounded-full bg-red-600/30">
              <MdThumbDownAlt className="text-red-600 text-xs leading-none" />
            </div>
            <p className="text-white text-xs font-semibold">Negative</p>
          </div>
        </div>
        <div className="flex text-white text-xs font-semibold">
          <p className="leading-relaxed ">
            Absolutely great experience working with you!
          </p>
        </div>
        <div className="flex w-full items-center gap-1">
          <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeGreen text-xs font-bold">2 </p>
          </div>
          <p className="text-white text-xs font-semibold">Trade(s)</p>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
