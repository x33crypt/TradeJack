import React from "react";
import image from "../../../../src/assets/landingImg4.JPG";
import { GiTopHat } from "react-icons/gi";
import { RiEye2Fill } from "react-icons/ri";
import { MdThumbUpAlt, MdOutlineGppGood } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdThumbDownAlt } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { CgArrowsExchange } from "react-icons/cg";

const FeedbackCard = () => {
  return (
    <>
      {/* Desktop Card */}
      <div className="md:flex hidden py-[15px] gap-10 items-center bg-tradeAsh">
        <div className="flex flex-1 items-center gap-[10px]">
          <div className="flex-shrink-0 relative flex w-[45px]">
            <img className="rounded-full" src={image} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[13px] font-bold leading-none ">
              ChocoMillo
            </p>

            <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <FaLocationArrow className=" flex text-tradeOrange text-xs leading-none" />
              <p className="text-tradeFadeWhite text-xs font-semibold">
                Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 text-white text-xs font-semibold">
          <p className="leading-relaxed ">Your approach is solid</p>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <div className="p-1  rounded-full bg-red-600/30">
            <MdThumbDownAlt className="text-red-600 text-xs leading-none" />
          </div>
          <p className="text-white text-xs font-semibold">Negative</p>
        </div>

        <div className="flex flex-1 gap-2 items-center">
          <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeGreen text-xs font-bold">2 </p>
          </div>
          <p className="text-white text-xs font-semibold">Trade(s)</p>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="flex flex-col md:hidden py-[15px] gap-[15px] bg-tradeAsh">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[15px]">
            <div className="flex-shrink-0 relative flex w-[45px]">
              <img className="rounded-full" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[13px] font-bold leading-none ">
                ChocoMillo
              </p>

              <div className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <FaLocationArrow className=" flex text-tradeOrange text-xs leading-none" />
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
