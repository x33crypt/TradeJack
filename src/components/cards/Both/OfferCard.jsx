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
import SmallButton from "@/components/buttons/SmallButton";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
// verified user icon
import { TiBusinessCard } from "react-icons/ti";
import { date } from "@/utils/date";
import { FaCheckDouble } from "react-icons/fa";
import { TiChartLine } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

const MarketCard = ({ offer }) => {
  const { setAboutOffer } = usePublicOffers();
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    setAboutOffer((prev) => ({
      ...prev,
      id: offerId,
    }));
    navigateTo(`/offers/explore/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className=" md:flex hidden justify-between p-[12px] bg-tradeAsh hover:bg-tradeAshLight rounded-[12px] border border-tradeAshLight transition-all duration-300 cursor-pointer "
      >
        <div className="flex flex-col justify-between w-[150px]">
          <div className="flex gap-[5px] items-center">
            <div className="flex gap-1 items-center">
              <FaCheckDouble className="flex text-tradeFadeWhite text-[10px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                Active Offer
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <IoMdThumbsUp className="flex text-tradeGreen text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                {offer?.user?.userFeedback?.positiveFeedback}
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <HiOutlineUserCircle className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            <p className="text-[13px] font-semibold text-white">
              {offer?.user?.userName}
            </p>
          </div>

          <div className="flex gap-[5px] items-center">
            <div className="flex gap-1 items-center">
              <p className="text-xs font-medium text-tradeFadeWhite">
                Last seen:
              </p>
              <p className="text-xs font-medium text-tradeGreen">Online</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[200px]">
          <div className=" flex gap-[5px] items-center">
            <div className="flex gap-1 items-center">
              <VscVerifiedFilled className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-medium text-tradeFadeWhite">
                Verified Offer
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

        <div className="flex flex-col gap-1 justify-between w-[150px]">
          <div className="flex flex-col gap-1">
            <div className="flex gap-[5px] w-max">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Minimum -- USD 383
              </p>
            </div>
            <div className="flex gap-[5px] w-max">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Maximum -- USD 5,000
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-1">
            <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
            <p className="text-xs font-semibold text-tradeFadeWhite">
              <span className="text-white">
                +{offer?.user?.userTransactionCount} recent
              </span>{" "}
              trades
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-end justify-between w-[150px] ">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
              <p className="text-base font-bold text-white leading-none">
                2,900/{offer?.preferredCurrency?.code}
              </p>
            </div>

            <div className="flex items-center gap-[2px] text-[13px] font-semibold rounded-[5px] bg-tradeGreen text-black px-[5px] py-[1px] w-max">
              {/* <TiChartLine className="text-[15px] flex-shrink-0" /> */}
              <p>0.22% </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-start w-[110px]">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <PiClockCountdownBold className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  {offer?.transferWindow?.hours}Hrs{" "}
                  {offer?.transferWindow?.minutes}Mins
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
                  {offer?.releaseWindow?.hours}Hrs{" "}
                  {offer?.releaseWindow?.minutes}Mins
                </p>
              </div>

              <div className="text-tradeOrange text-[12px]">
                <FaInfoCircle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:hidden flex flex-col justify-between p-[12px] gap-5  bg-tradeAsh active:bg-tradeAshLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
      >
        <div className="flex justify-between w-full ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-[5px] items-center">
                <div className="flex gap-1 items-center">
                  <FaCheckDouble className="flex text-tradeFadeWhite text-[10px] flex-shrink-0" />
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    Active offer
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <IoMdThumbsUp className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    {offer?.user?.userFeedback?.positiveFeedback}
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
                      +{offer?.user?.userTransactionCount} recent
                    </span>{" "}
                    trades
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-1 items-center">
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Last seen:
                </p>
                <p className="text-xs font-medium text-white">20 mins ago</p>
              </div>

              <div className="flex items-center gap-1">
                <p className="text-base font-bold text-white leading-none">
                  1,200.00/$
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
