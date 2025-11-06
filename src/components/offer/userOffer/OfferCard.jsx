import React from "react";
import { useNavigate } from "react-router-dom";
import { toDecimal } from "@/utils/toDecimal";
import { monthDate } from "@/utils/monthDate";
import { IoMdTime } from "react-icons/io";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { LuCalendarClock } from "react-icons/lu";
import { GrStatusGoodSmall } from "react-icons/gr";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { MdThumbUp } from "react-icons/md";

const OfferCard = ({ offer }) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/${offerId}`);
  };

  if (!offer) return null;

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
                <LuCalendarClock className="flex text-tradeFadeWhite text-base flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-xs font-semibold text-white">
                  {monthDate(offer?.publishedOn)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <GrStatusGoodSmall className="flex text-tradeGreen text-xs flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  {capitalizeFirst(offer?.status)}
                </p>
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
                  {toDecimal(offer?.marginRate?.from) || "N/A"}
                </p>
              </div>

              <div className="flex gap-[5px] w-max">
                <p className="text-xs font-semibold text-white">
                  <span className="text-tradeFadeWhite">Maximum -- </span>{" "}
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
              <p className="text-sm font-semibold text-white leading-norma">
                {toDecimal(offer?.marginRate?.ratePrice) || "N/A"}/
                {offer?.preferredCurrency?.code}
              </p>
              <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLigh text-tradeFadeWhite px-[5px py-[1px w-max">
                <p>
                  <span className="text-red-60">
                    {offer?.marginRate?.percent || "N/A"}%
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
              <div>
                <LuCalendarClock className="flex text-tradeFadeWhite text-base flex-shrink-0" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  {monthDate(offer?.publishedOn)}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 justify-betwee w-full">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <GrStatusGoodSmall className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                  <p className="text-xs font-semibold text-tradeFadeWhite">
                    {capitalizeFirst(offer?.status)}
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
                  {toDecimal(offer?.marginRate?.fro) || "N/A"}/$
                </p>

                <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                  {offer?.marginRate?.percent || "N/A"}%
                </p>
              </div>

              <div className="flex gap-1 items-end">
                <div className="flex gap-[5px] w-max">
                  <p className="text-xs font-semibold text-white">
                    {toDecimal(offer?.marginRate?.from) || "N/A"}
                  </p>
                </div>
                <p className="text-xs font-semibold text-tradeFadeWhite">--</p>
                <div className="flex gap-[5px] w-max">
                  <p className="text-xs font-semibold text-white">
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
