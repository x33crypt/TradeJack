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
import { IoMdTime } from "react-icons/io";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { windowFormatMinutes } from "@/utils/windowFormatM";

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

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="hidden md:flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center border-b border-dashed border-tradeAshLight pb-2">
            <div className="flex gap-1 items-center">
              <div>
                <HiOutlineUserCircle className="flex text-white text-base flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[13px] font-semibold text-white">
                  {offer?.user?.userName}
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  <span className={seen.className}>{seen.dot}</span>
                </p>
              </div>
            </div>

            <div className="flex  gap-2">
              <div className="flex gap-1 items-center">
                <VscVerifiedFilled className="flex text-tradeFadeWhite text-[16px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Verified offer
                </p>
              </div>

              <div className="flex items-center gap-1">
                <LuUsers className="flex text-tradeOrange text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  +{offer?.user?.userTransactionCount} recent trades
                </p>
              </div>
            </div>
          </div>

          <div className="flex  items-center w-full">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-base font-semibold text-tradeOrange md:max-w-[120px] lg:max-w-[140px] leading-normal">
                {offer?.service}
              </p>
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {offer?.preferredCurrency?.name}
              </p>
            </div>

            <div className="flex flex-col gap-1 flex-1 ">
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span>Minimum -- </span>{" "}
                  {toDecimal(offer?.marginRate?.from) || "N/A"}
                </p>
              </div>

              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span>Maximum-- </span>{" "}
                  {toDecimal(offer?.marginRate?.to) || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <IoMdTime className="text-sm text-tradeFadeWhite" />
                <p className="text-xs font-semibold text-white leading-none">
                  {windowFormatHour(
                    offer?.transferWindow?.hours,
                    offer?.transferWindow?.minutes
                  )}
                </p>
              </div>
              <p className="text-xs font-medium text-tradeFadeWhite">
                Transfer window
              </p>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <div className="flex gap-1 items-center">
                <IoMdTime className="text-sm text-tradeFadeWhite" />
                <p className="text-xs font-semibold text-white whitespace-nowrap">
                  {windowFormatHour(
                    offer?.releaseWindow?.hours,
                    offer?.releaseWindow?.minutes
                  )}
                </p>
              </div>

              <p className="text-xs font-medium text-tradeFadeWhite">
                Release window
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-white leading-norma">
                1,200.00/$
              </p>
              <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLight text-tradeGreen px-[5px] py-[1px w-max">
                <p>{offer?.marginRate?.percent || "N/A"}% above market price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:hidden flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-1 items-center w-full ">
              <div>
                <HiOutlineUserCircle className="flex text-white text-3xl flex-shrink-0" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {offer?.user?.userName}
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  <span className={seen.className}>{seen.text}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 justify-betwee w-full">
              <div className="flex gap-1 items-center">
                <VscVerifiedFilled className="flex text-tradeFadeWhite text-[16px] flex-shrink-0" />
                <p className="text-xs font-medium text-tradeFadeWhite">
                  Verified offer
                </p>
              </div>

              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeOrange text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  +{offer?.user?.userTransactionCount} recent trades
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full items-start">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-tradeOrange max-w-[150px] leading-normal">
                {offer?.service}
              </p>
              <p className="text-xs font-semibold text-tradeFadeWhite">
                {offer?.preferredCurrency?.name}
              </p>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <div className="flex items-center gap-1">
                <p className="text-base font-semibold text-white leading-normal">
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
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-dashed border-tradeAshLight pt-2">
          <div className="flex gap-1 items-center">
            <IoMdTime className="text-sm text-tradeFadeWhite" />
            <p className="text-xs font-medium text-tradeFadeWhite">Transfer:</p>
            <p className="text-xs font-semibold text-white whitespace-nowrap">
              {windowFormatMinutes(
                offer?.transferWindow?.hours,
                offer?.transferWindow?.minutes
              )}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <IoMdTime className="text-sm text-tradeFadeWhite" />
            <p className="text-xs font-medium text-tradeFadeWhite">Release:</p>
            <p className="text-xs font-semibold text-white whitespace-nowrap">
              {windowFormatMinutes(
                offer?.releaseWindow?.hours,
                offer?.releaseWindow?.minutes
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
