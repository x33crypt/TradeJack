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
import SmallButton from "@/components/buttons/SmallButton";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { date } from "@/utils/date";

const OfferCard = ({ offer }) => {
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
    <div
      onClick={() => handleOfferClick(offer?.offerId)}
      className=" flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight hover:bg-tradeAshExtraLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-1 items-center w-full ">
            <div>
              <HiOutlineUserCircle className="flex text-white text-lg flex-shrink-0" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">
                {offer?.Username}
              </p>
              {/* <p className="text-tradeFadeWhite text-xs font-medium">
                     <span className={seen.className}>{seen.text}</span>
                   </p> */}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 justify-betwee w-full">
            {/* {offer?.isVerified ? (
                   <div className="flex gap-1 items-center">
                     <VscVerifiedFilled className="flex text-tradeFadeWhite text-[16px] flex-shrink-0" />
                     <p className="text-xs font-medium text-tradeFadeWhite">
                       Verified offer
                     </p>
                   </div>
                 ) : (
                   <div className="flex gap-1 items-center">
                     <BsStars className="flex text-tradeFadeWhite text-[16px] flex-shrink-0" />
                     <p className="text-xs font-medium text-tradeFadeWhite">
                       New offer
                     </p>
                   </div>
                 )} */}

            <div className="flex  items-center gap-1">
              <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                <span className="text-white">+{offer?.completedTrades}</span>{" "}
                recent trades
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-tradeOrange max-w-[150px] leading-normal">
              {offer?.service}
            </p>
            <p className="text-xs font-semibold text-tradeFadeWhite">
              {offer?.preferredCurrency?.name}
            </p>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-white leading-normal">
                {toDecimal(offer?.marginRate?.ratePrice) || "N/A"}/
                {/* {offer?.preferredCurrency?.code} */}$
              </p>

              <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                {offer?.marginRate?.ratePercent || "N/A"}% M
              </p>
            </div>

            <div className="flex gap-1 items-end">
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-white">
                  {toDecimal(offer?.purchaseLimits?.minimum) || "N/A"}
                </p>
              </div>
              <p className="text-xs font-semibold text-tradeFadeWhite">--</p>
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-white">
                  {toDecimal(offer?.purchaseLimits?.maximum) || "N/A"}
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
            {windowFormatHour(
              offer?.transferWindow?.hours,
              offer?.transferWindow?.minutes
            )}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <IoMdTime className="text-sm text-tradeFadeWhite" />
          <p className="text-xs font-medium text-tradeFadeWhite">Release:</p>
          <p className="text-xs font-semibold text-white whitespace-nowrap">
            {windowFormatHour(
              offer?.releaseWindow?.hours,
              offer?.releaseWindow?.minutes
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
