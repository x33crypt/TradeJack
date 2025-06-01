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
      <div className="flex flex-col gap-[15px] bg-tradeAsh border border-tradeAshLight rounded-[12px] p-[16px] w-full">
        {/* Top: Header with Service Name and Edit Button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-tradeOrange text-[15px] font-[700]">wsww</p>
            <p className="text-tradeFadeWhite text-[13px] font-[500]">wsww</p>
          </div>

          <button
            // onClick={() => handleEdit(offer.id)}
            className="text-[13px] text-tradeGreen font-semibold border border-tradeGreen rounded-[8px] px-[10px] py-[5px] hover:bg-tradeGreen hover:text-black transition-all duration-300"
          >
            Edit
          </button>
        </div>

        {/* Middle: Currency & Limit */}
        <div className="grid grid-cols-2 gap-y-[10px] text-[13px]">
          <div>
            <p className="text-tradeFadeWhite font-medium">Currency</p>
            <p className="text-white font-semibold">wsww</p>
          </div>
          <div>
            <p className="text-tradeFadeWhite font-medium">Profit Margin</p>
            <p className="text-tradeGreen font-semibold">5%</p>
          </div>
          <div>
            <p className="text-tradeFadeWhite font-medium">Min</p>
            <p className="text-white font-semibold">wsww USD</p>
          </div>
          <div>
            <p className="text-tradeFadeWhite font-medium">Max</p>
            <p className="text-white font-semibold">wsww USD</p>
          </div>
        </div>

        {/* Bottom: Status or any additional tags */}
        <div className="flex justify-between items-center pt-[10px] border-t border-tradeAshLight mt-[10px]">
          <p className="text-[13px] text-tradeFadeWhite font-medium">
            Status:{" "}
            <span className="text-white font-semibold capitalize">Active</span>
          </p>

          {/* Optional: Add timestamp or other tag */}
          <p className="text-[12px] text-tradeAshLighter">Today</p>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
