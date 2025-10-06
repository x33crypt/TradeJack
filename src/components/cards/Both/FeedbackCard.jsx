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
      <div className=" lg:fle items-center hidden justify-between p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="w-[250px] flex items-center gap-[15px]">
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

        <div className=" w-[200px] flex flex-col justify-between h-full gap-2">
          <div className="p-1 rounded-full bg-red-600/30 w-max">
            <MdThumbDownAlt className="text-red-600 text-sm leading-none" />
          </div>
          <p className="text-white text-[13px] font-semibold">
            Negative Feedback
          </p>
        </div>

        <div className="w-[200px] flex flex-col gap-2 borde border-tradeAshExtraLight bg-tradeAshLigh rounded-[8px] cursor-pointer">
          <div className="bg-transparent text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight h-max bg-tradeAshLight rounded-[8px] p-1 w-max">
            <p className="text-xs font-semibold">Low Amount</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 ">
          <p className="text-xs text-tradeFadeWhite font-semibold">Comment</p>

          <p className="text-white text-[13px] font-semibold leading-normal w-[300px]">
            Absolutely great experience working with you!
          </p>
        </div>

        <div className="flex w-[150px] flex-col gap-2 items-cente">
          <p className="text-xs text-tradeFadeWhite font-semibold">Date</p>

          <p className="text-[13px] text-white font-semibold">
            August 15, 2025
          </p>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="lg:hidde flex flex-col items-start p-[12px] gap-2 bg-tradeAsh rounded-[15px] border border-tradeAshLight">
        <div className="flex w-full items-start justify-between">
          <div className="flex-1 flex items-center gap-[10px]">
            <div className="flex-shrink-0 flex  cursor-pointer">
              <img className="rounded-full w-10" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-transparent text-white flex items-center gap-1 border border-tradeAshExtraLight h-max bg-tradeAshLight rounded-[8px] p-1 w-max">
                <p className="text-xs font-semibold">Low Amount</p>
              </div>

              <p className="flex text-tradeFadeWhite text-xs font-semibold leading-normal">
                August 15, 2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="p-1 rounded-full bg-red-600/30">
              <MdThumbDownAlt className="text-red-600 text-sm leading-none" />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between border- border-dashed border-tradeAshLight pt-2">
          <p className="flex text-white text-[13px] font-semibold leading-normal">
            Absolutely great experience working with you!
          </p>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
