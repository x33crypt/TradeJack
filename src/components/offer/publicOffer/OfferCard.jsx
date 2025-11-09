import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { VscVerifiedFilled } from "react-icons/vsc";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import lastSeen from "@/utils/lastSeen";
import toDecimal from "@/utils/toDecimal";
import { IoMdTime } from "react-icons/io";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { BsStars } from "react-icons/bs";
import { WiStars } from "react-icons/wi";
import { MdThumbUp } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { RiArrowLeftRightLine } from "react-icons/ri";
import lastSeenDot from "@/utils/lastSeenDot";

const OfferCard = ({ offer }) => {
  const { setAboutOffer } = usePublicOffers();
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/explore/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="hidden md:fle flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight hover:bg-tradeAshExtraLight rounded-[15px] border border-tradeAshLight transition-all duration-300 cursor-pointer "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center border-b border-dashed border-tradeAshLight pb-2">
            <div className="flex gap-1 items-center">
              <div>
                <HiOutlineUserCircle className="flex text-white text-base flex-shrink-0" />
              </div>
              <p className="text-[13px] font-semibold text-white">
                {offer?.Username}
              </p>
              {true ? (
                <div className="flex gap-1 items-center">
                  <RiVerifiedBadgeFill className="flex text-tradeFadeWhite text-s flex-shrink-0" />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="flex  items-center gap-1">
                  <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    <span className="text-white">{offer?.completedTrades}</span>{" "}
                    trades
                  </p>
                </div>
                <p className="text-tradeAshLight leading-none">|</p>

                <div className="flex  items-center gap-1">
                  <MdThumbUp className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-white">99%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  items-center w-full">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm font-semibold text-tradeOrange md:max-w-[120px] lg:max-w-[140px] leading-normal">
                {offer?.service}
              </p>
              <p className="text-xs font-semibold text-white">
                {offer?.preferredCurrency?.name}
              </p>
            </div>

            <div className="flex flex-col gap-1 flex-1 ">
              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-white">
                  <span className="text-tradeFadeWhite">Minimum -- </span>{" "}
                  {toDecimal(offer?.purchaseLimits?.minimum) || "N/A"}
                </p>
              </div>

              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-white">
                  <span className="text-tradeFadeWhite">Maximum -- </span>{" "}
                  {toDecimal(offer?.purchaseLimits?.maximum) || "N/A"}
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
              <p className="text-sm font-semibold text-white leading-norma">
                {toDecimal(offer?.marginRate?.ratePrice) || "N/A"}/
                {offer?.preferredCurrency?.code}
              </p>
              <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLigh text-tradeFadeWhite px-[5px py-[1px w-max">
                <p>
                  <span className="text-red-60">
                    {offer?.marginRate?.ratePercent || "N/A"}%
                  </span>{" "}
                  Margin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:hidde flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight hover:bg-tradeAshExtraLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-1 items-center w-full ">
              <div>{lastSeenDot(offer?.lastSeen)}</div>

              <p className="text-[13px] font-semibold text-white">
                {offer?.Username}
              </p>

              <div className="flex gap-1 items-center">
                <RiVerifiedBadgeFill className="flex text-tradeGreen text-sm flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 justify-betwee w-full">
              <div className="flex items-center gap-1">
                <div className="flex  items-center gap-1">
                  <RiArrowLeftRightLine className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    <span className="text-white">{offer?.completedTrades}</span>{" "}
                    trades
                  </p>
                </div>
                <p className="text-tradeAshLight leading-none">|</p>

                <div className="flex  items-center gap-1">
                  <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-white">99%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full items-start">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-tradeOrange max-w-[150px] md:max-w-full leading-normal">
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
                  {offer?.marginRate?.ratePercent || "N/A"}%
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
    </>
  );
};

export default OfferCard;
