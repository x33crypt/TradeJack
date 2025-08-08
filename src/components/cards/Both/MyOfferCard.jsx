import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { toDecimal } from "@/utils/toDecimal";
import { MdGrid3X3 } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";
import { IoMdThumbsUp } from "react-icons/io";
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
import { FaHashtag } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";

const MyOfferCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offers/myoffers/${offerId}`);
  };

  if (!offer) return null;

  return (
    <>
      <div className=" md:flex hidden justify-between p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col gap-4 justify-between w-[150px] ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {monthDate(offer?.publishedOn)}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdAccessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {time(offer?.publishedOn)}
                </p>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <FaHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                {offer?.offerId}
              </p>
            </div>

            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <FaCircle className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                <p className="text-xs font-medium text-white">Active</p>
              </div>

              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {offer?.user?.userFeedback?.positiveFeedback}
                </p>
              </div>
            </div>
          </div>

          <div className="flex  items-center gap-1">
            <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              <span className="text-white">
                +{offer?.user?.userTransactionCount} total
              </span>{" "}
              trades
            </p>
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
            {offer?.service}
          </p>

          <p className="text-xs font-semibold text-tradeFadeWhite">
            {offer?.preferredCurrency?.name}
          </p>
        </div>

        <div className="flex flex-col gap-1 items-start w-[110px]">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <PiClockCountdownBold className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                2Hrs 30Mins
              </p>
            </div>

            <div className="text-tradeOrange text-[12px]">
              <FaInfoCircle />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <FaBusinessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                2Hrs 30Mins
              </p>
            </div>

            <div className="text-tradeOrange text-[12px]">
              <FaInfoCircle />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end justify-between w-[230px] ">
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <p className="text-base font-bold text-white leading-none">
                {offer?.preferredCurrency?.code} 50,000.00
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
              <div className="flex text-tradeFadeWhite bg-tradeAshLight border border-tradeAshExtraLight w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <p>View Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden p-[12px] gap-5 flex justify-between  bg-tradeAsh rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {monthDate(offer?.publishedOn)}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdAccessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  {time(offer?.publishedOn)}
                </p>
              </div>
            </div>

            <p className="text-base font-bold text-tradeOrange leading-none">
              {offer?.service}
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {offer?.preferredCurrency?.name}
              </p>
              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span className="text-white">
                    +{offer?.user?.userTransactionCount} total
                  </span>{" "}
                  trades
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-tradeFadeWhite bg-tradeAshLight border border-tradeAshExtraLight w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
            <p>View Details</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between items-end">
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-[5px] items-center">
              <div className="flex gap-1 items-center">
                <FaCircle className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">Active</p>
              </div>
              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  {offer?.user?.userFeedback?.positiveFeedback}
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
            <div className="flex gap-1 items-center bg-tradeAshLight border border-tradeAshExtraLight w-max px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <SlOptions className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            </div>
            <div className="flex text-black bg-tradeGreen w-max px-[12px] py-[5px] text-[13px] font-semibold rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <p>Edit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOfferCard;
