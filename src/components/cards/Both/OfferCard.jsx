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
import lastSeen from "@/utils/lastSeen";
import toDecimal from "@/utils/toDecimal";
import { FiMapPin } from "react-icons/fi";

const MarketCard = ({ offer }) => {
  const { setAboutOffer } = usePublicOffers();
  const navigateTo = useNavigate();

  const seen = lastSeen(offer?.user?.lastSeen);

  const handleOfferClick = (offerId) => {
    setAboutOffer((prev) => ({
      ...prev,
      id: offerId,
    }));
    navigateTo(`/offers/explore/${offerId}`);
  };

  const formatTimeHybrid = (hours = 0, minutes = 0) => {
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes < 60) {
      return `${totalMinutes} ${totalMinutes === 1 ? "Min" : "Mins"}`;
    }

    const displayHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    let result = `${displayHours} ${displayHours === 1 ? "Hr" : "Hrs"}`;
    if (remainingMinutes > 0) {
      result += ` ${remainingMinutes} ${
        remainingMinutes === 1 ? "Min" : "Mins"
      }`;
    }

    return result;
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
            <p className="text-white text-xs font-medium">
              Last seen: <span className={seen.className}>{seen.text}</span>
            </p>
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
                <span className="text-white">Minimum --</span>{" "}
                {offer?.preferredCurrency?.code}{" "}
                {toDecimal(offer?.marginRate?.from) || "N/A"}
              </p>
            </div>
            <div className="flex gap-[5px] w-max">
              <p className="text-xs font-semibold text-tradeFadeWhite">
                <span className="text-white">Maximum --</span>{" "}
                {offer?.preferredCurrency?.code}{" "}
                {toDecimal(offer?.marginRate?.to) || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-1">
            <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
            <p className="text-xs font-semibold text-white">
              +{offer?.user?.userTransactionCount} recent trades
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

            <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeGreen text-black px-[5px] py-[1px] w-max">
              <p>{offer?.marginRate?.percent || "N/A"}%</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-start w-[110px]">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <PiClockCountdownBold className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">
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
                <p className="text-xs font-semibold text-white">
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

      <div className="md:hidden flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight rounded-[15px] border border-tradeAshLight transition-all duration-300 ">
        <div className="flex flex-col  gap-3 ">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-1 items-center w-full ">
              <div>
                <HiOutlineUserCircle className="flex text-white text-2xl flex-shrink-0" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {offer?.user?.userName}
                </p>
                <p className="text-tradeFadeWhite text-[10px] font-medium">
                  <span className={seen.className}>{seen.text}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 justify-betwee w-full">
              <div className="flex gap-1 items-center">
                <VscVerifiedFilled className="flex text-tradeAshLight text-[16px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">Verified offer</p>
              </div>

              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeAshLight text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  +{offer?.user?.userTransactionCount} recent trades
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-tradeOrange leading-none">
                {offer?.service}
              </p>
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {offer?.preferredCurrency?.name}
              </p>

              {/* <div className="flex  items-center gap-1">
              <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
              <p className="text-xs font-semibold text-white">
                +{offer?.user?.userTransactionCount} recent trades
              </p>
            </div> */}
            </div>

            <div className="flex flex-col gap-1 items-end">
              <div className="flex items-center gap-1">
                <p className="text-base font-semibold text-white leading-none">
                  1,200.00/$
                </p>
                <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLight text-tradeGreen px-[5px] py-[1px] w-max">
                  <p>{offer?.marginRate?.percent || "N/A"}%</p>
                </div>
              </div>

              <div className="flex gap-1 items-end">
                <div className="flex gap-[5px] w-max">
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    {toDecimal(offer?.marginRate?.from) || "N/A"}
                  </p>
                </div>
                <p className="text-xs font-semibold text-tradeFadeWhite">--</p>
                <div className="flex gap-[5px] w-max">
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    {toDecimal(offer?.marginRate?.to) || "N/A"}
                  </p>
                </div>
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  {offer?.preferredCurrency?.code}
                </p>
              </div>

              {/* <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <PiClockCountdownBold className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">48 Mins</p>
              </div>

              <div className="flex gap-1 items-center">
                <FaBusinessTime className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">48 Mins</p>
              </div>
            </div> */}

              {/* <div className="flex items-end gap-2 justify-between w-full">
              <div className="flex gap-1 items-center">
                <VscVerifiedFilled className="flex text-tradeFadeWhite text-[16px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Verified offer
                </p>
              </div>

              <div className="flex gap-1 items-center">
                <IoMdThumbsUp className="flex text-tradeGreen text-[16px] flex-shrink-0" />
                <p className="text-xs font-semibold text-white">
                  {offer?.user?.userFeedback?.positiveFeedback}
                </p>
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-white whitespace-nowrap">
              {formatTimeHybrid(
                offer?.transferWindow?.hours,
                offer?.transferWindow?.minutes
              )}
            </p>
            <p className="text-xs font-medium text-tradeFadeWhite">
              Transfer window
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs font-semibold text-white whitespace-nowrap">
              {formatTimeHybrid(
                offer?.releaseWindow?.hours,
                offer?.releaseWindow?.minutes
              )}
            </p>
            <p className="text-xs font-medium text-tradeFadeWhite">
              Release window
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
