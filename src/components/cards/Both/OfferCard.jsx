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

const MarketCard = ({ offer }) => {
  const { setAboutOffer } = usePublicOffers();
  const navigateTo = useNavigate();

  const seen = lastSeen(offer?.lastSeen);

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
        className="hidden md:flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight hover:bg-tradeAshExtraLight rounded-[15px] border border-tradeAshLight transition-all duration-300 cursor-pointer "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center border-b border-dashed border-tradeAshLight pb-2">
            <div className="flex gap-1 items-center">
              <div>
                <HiOutlineUserCircle className="flex text-white text-base flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[13px] font-semibold text-white">
                  {offer?.Username}
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  <span className={seen?.className}>{seen.dot}</span>
                  {/* Show both dot and text */}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="">
                {offer?.isVerified ? (
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
                )}
              </div>

              <div className="flex items-center gap-1">
                <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span className="text-white">+{offer?.completedTrades}</span>{" "}
                  recent trades
                </p>
              </div>
            </div>
          </div>

          <div className="flex  items-center w-full">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-base font-semibold text-tradeOrange md:max-w-[120px] lg:max-w-[140px] leading-normal">
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
              <p className="text-base font-semibold text-white leading-norma">
                {toDecimal(offer?.marginRate?.ratePrice) || "N/A"}/
                {offer?.preferredCurrency?.code}
              </p>
              <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLigh text-tradeFadeWhite px-[5px py-[1px w-max">
                <p>
                  <span className="text-red-60">
                    {offer?.marginRate?.ratePercent || "N/A"}%
                  </span>{" "}
                  below market price
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(offer?.offerId)}
        className="md:hidden flex flex-col justify-between p-[12px] gap-2  bg-tradeAsh active:bg-tradeAshLight hover:bg-tradeAshExtraLight rounded-[15px] border border-tradeAshLight transition-all duration-300 "
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-1 items-center w-full ">
              <div>
                <HiOutlineUserCircle className="flex text-white text-3xl flex-shrink-0" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">
                  {offer?.Username}
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  <span className={seen.className}>{seen.text}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 justify-betwee w-full">
              {offer?.isVerified ? (
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
              )}

              <div className="flex  items-center gap-1">
                <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                <p className="text-xs font-semibold text-tradeFadeWhite">
                  <span className="text-white">+{offer?.completedTrades}</span>{" "}
                  recent trades
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
                  {toDecimal(offer?.marginRate?.ratePrice) || "N/A"}/
                  {/* {offer?.preferredCurrency?.code} */}$
                </p>
                <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeAshLight text-tradeFadeWhite px-[5px] py-[1px] w-max">
                  <p>-{offer?.marginRate?.ratePercent || "N/A"}%</p>
                </div>
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

export default MarketCard;
