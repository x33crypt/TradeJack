import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { monthDate } from "@/utils/monthDate";
import { time } from "@/utils/time";

const OfferCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/${offerId}`);
  };
  return (
    <div className="flex flex-col  p-[12px] gap-5  bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {offer?.publishedOn
                    ? monthDate(offer?.publishedOn)
                    : "xxxx,xxxx"}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdAccessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {offer?.publishedOn ? time(offer?.publishedOn) : "00.00.00"}
                </p>
              </div>
            </div>

            <p className="text-base font-bold text-tradeOrange leading-none">
              {offer?.service ? offer?.service : "NA"}
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {offer?.preferredCurrency?.name
                  ? offer?.preferredCurrency?.name
                  : "NA"}
              </p>
              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span className="text-white">
                    +
                    {offer?.user?.userTransactionCount
                      ? offer?.user?.userTransactionCount
                      : "NA"}{" "}
                    recent
                  </span>{" "}
                  trades
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <HiOutlineUserCircle className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">Online</p>
              </div>
              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  {offer?.user?.userFeedback?.positiveFeedback
                    ? offer?.user?.userFeedback?.positiveFeedback
                    : "NA"}
                </p>
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
            {/* <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <FaStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
          </div> */}
            {/* <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>Trade</p>
          </div> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[8px] py-[5px] rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
          <FaStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
        </div>
        <div className="flex text-tradeFadeWhite bg-tradeAshLight border border-tradeAshExtraLight w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
          <p>View Details</p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
