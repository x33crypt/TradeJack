import React from "react";

import image from "../../../assets/landingImg4.JPG";

import { MdThumbDownAlt } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";

const FeedbackCard = () => {
  const formatApprox = (amount) => {
    const value = parseFloat(amount);
    if (isNaN(value)) return "";

    if (value >= 1000) return `$${Math.floor(value / 1000)}K+`;
    if (value >= 100) return `$${Math.floor(value / 100) * 100}+`;
    return `$${Math.floor(value / 10) * 10}+`;
  };

  return (
    <>
      {/* Desktop Card */}
      <div className=" lg:flex items-center hidden justify-between p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="w-[280px] flex items-center gap-[15px]">
          <div className="flex-shrink-0 flex w-[45px]">
            <img className="rounded-full" src={image} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[13px] font-bold leading-none ">
              0xSanityy
            </p>

            <div className="flex gap-1">
              <div className="flex items-center gap-1 w-max cursor-pointer">
                <FaMapPin className="text-xs text-tradeOrange" />
              </div>
              <p className="text-tradeFadeWhite text-xs font-semibold">
                Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="w-[200px] flex flex-col gap-2 borde border-tradeAshExtraLight bg-tradeAshLigh rounded-[8px] cursor-pointer">
          <p className="text-xs text-white font-semibold">$500+</p>
          <p className="text-xs text-tradeFadeWhite font-semibold">Amount</p>
        </div>

        <div className=" w-[200px] flex  items-center gap-2">
          <div className="p-1  rounded-full bg-red-600/30 w-max">
            <MdThumbDownAlt className="text-red-600 text-xs leading-none" />
          </div>
          <p className="text-white text-xs font-semibold">Negative Feedback</p>
        </div>

        <div className="flex-1 flex flex-col gap-2 ">
          <p className="text-white md:text-xs text-[13px] font-semibold leading-normal w-[300px]">
            Absolutely great experience working with you!
          </p>
        </div>

        <div className="flex flex-col gap-2 items-cente">
          <p className="text-xs text-white font-semibold">August 15, 2025</p>

          <p className="text-xs text-tradeFadeWhite font-semibold">Date</p>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="lg:hidden flex flex-col p-[12px] bg-tradeAsh hover:bg-black transition-all duration-300 rounded-[15px] cursor-pointer gap-4 border border-tradeAshLight">
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-[15px]">
            <div className="flex-shrink-0 flex w-[45px]">
              <img className="rounded-full" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[13px] font-bold leading-none ">
                0xSanityy
              </p>

              <div className="flex gap-1">
                <div className="flex items-center gap-1 w-max cursor-pointer">
                  <FaMapPin className="text-xs text-tradeOrange" />
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
        <div className="flex text-white text-[13px] font-semibold">
          <p className="leading-relaxed ">
            Absolutely great experience working with you!
          </p>
        </div>
        <div className="flex  justify-between">
          <div className="flex items-center gap-1 borde border-tradeAshExtraLight bg-tradeAshLigh rounded-[8px] p- w-max cursor-pointer">
            <p className="text-xs text-tradeFadeWhite font-semibold">
              Amount :
            </p>
            <p className="text-xs text-white font-semibold">$500+</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-xs text-tradeFadeWhite font-semibold">
              August 15, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
