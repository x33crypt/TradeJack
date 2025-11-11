import React from "react";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import image from "../../../assets/landingImg4.JPG";
import { LuCalendarClock } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { FaShareAlt } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { MdReport } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import toDecimal from "@/utils/toDecimal";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { HiSpeakerphone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaRegStopCircle } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa";
import { TbCubeSpark } from "react-icons/tb";
import { BsPauseFill } from "react-icons/bs";
import { MdOutlinePause } from "react-icons/md";
import { AiFillStop } from "react-icons/ai";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import lastSeenDot from "@/utils/lastSeenDot";
import { FaUserFriends } from "react-icons/fa";
import { HiHashtag } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdMoreVert } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const OfferDetails = ({ aboutOffer, loading, id }) => {
  const { offerDetails, traderInfo } = aboutOffer || {};

  console.log("offer details :", aboutOffer);

  const navigateTo = useNavigate();

  const offer = aboutOffer?.offerDetails;
  const user = aboutOffer?.traderInfo;

  const handleEdit = (offerId) => {
    navigateTo(`/offer/${offerId}/edit`);
  };

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          OFFER DETAILS
        </p>
      </div>

      <div className="flex flex-col flex-1 ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer?.data === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px] gap-[30px]">
                {/* Vendor Info */}
                <div className="flex items-center justify-between gap-[10px] bg-tradeAsh border border-tradeAshLight rounded-[15px] p-[12px]">
                  <div className="flex gap-2 items-center">
                    <div className="flex cursor-pointer relative">
                      {false ? (
                        <div className="flex w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                          <img src={image} alt="" className="" />
                        </div>
                      ) : (
                        <div className="flex w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                          <img src={image} alt="" className="" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="text-white text-[13px] font-semibold">
                        {user?.username ?? ""}
                      </p>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <RiVerifiedBadgeFill className="flex text-tradeGreen text-base flex-shrink-0" />
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    <div className="flex items-center gap-1">
                      <div className="p-0.2 border border-tradeAshExtraLight rounded-full">
                        <GrStatusGoodSmall className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                      </div>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                        Live
                      </p>
                    </div>
                    <p className="text-tradeAshLight leading-none">|</p>
                    <div className="flex items-center gap-1">
                      <p className="text-white text-[13px] font-semibold leading-none">
                        1.3k <span className="text-tradeFadeWhite">Saved</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Offer Info */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-[10px] ">
                    <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                      {offerDetails?.serviceName || "N/A"}
                    </p>

                    <div className="flex gap-1 items-center">
                      <div className="flex items-center gap-1">
                        <HiHashtag className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-semibold text-white">
                          {id ?? ""}
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                        {offerDetails?.serviceType || "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-1 items-center">
                        <LuCalendarClock className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          31 Aug, 2045
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex gap-1 items-center">
                        <AiOutlineSafetyCertificate className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          Verified
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      <div className="flex gap-1 items-center">
                        <FaUserFriends className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          {offerDetails?.completedTrades ?? "0"} Trade(s)
                        </p>
                      </div>
                      <p className="text-tradeAshLight leading-none">|</p>
                      <div className="flex gap-1 items-center">
                        <FaRegStar className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          99% Rating
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleEdit(id)}
                    className="text-white hover:text-tradeFadeWhite active:text-tradeOrange md:text-3xl text-2xl cursor-pointer duration-300 transition-all"
                  >
                    <RiEdit2Fill />
                  </div>
                </div>

                {/* Other Info */}
                <div className="flex flex-1 flex-col gap-[10px]">
                  <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex items-center justify-between border-b border-tradeAshLight w-full mt-[1px] pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Rate
                      </p>

                      <div className="flex gap-1 items-center">
                        <p className="text-tradeGreen text-sm font-semibold leading-none">
                          {toDecimal(offerDetails?.marginRate?.ratePrice)}
                        </p>
                        <p className="text-tradeAshLight leading-none">|</p>
                        <p className="text-white text-sm font-semibold leading-none">
                          {offerDetails?.marginRate?.ratePercent || "N/A"}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                        Currency
                      </p>
                      <p className="text-[13px] text-white font-semibold">
                        {offerDetails?.preferredCurrency?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col justify-between gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Purchase limits
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Minimum
                        </p>

                        <p className="text-white text-[13px]  font-semibold">
                          {toDecimal(offerDetails?.purchaseLimit?.minimum) ||
                            "N/A"}{" "}
                          {offerDetails?.preferredCurrency?.code || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Maximum
                        </p>

                        <p className="text-white text-[13px] font-semibold">
                          {toDecimal(offerDetails?.purchaseLimit?.maximum) ||
                            "N/A"}{" "}
                          {offerDetails?.preferredCurrency?.code || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col  justify-between gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Payment Window
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Transfer
                        </p>

                        <p className="text-white text-[13px]  font-semibold">
                          {windowFormatHour(
                            offerDetails?.paymentWindow?.transfer?.hours,
                            offerDetails?.paymentWindow?.transfer?.minutes
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Release
                        </p>

                        <p className="text-white text-[13px] font-semibold">
                          {windowFormatHour(
                            offerDetails?.paymentWindow?.release?.hours,
                            offerDetails?.paymentWindow?.release?.minutes
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Tags
                      </p>
                    </div>
                    <div className="w-full flex gap-2 flex-grow flex-wrap">
                      {offerDetails?.tags?.length > 0 ? (
                        offerDetails?.tags?.map((term, index) => (
                          <p className="flex w-max items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAshLight text-[13px] font-semibold text-white">
                            {term}
                          </p>
                        ))
                      ) : (
                        <p className="text-[13px] font-semibold text-white">
                          N/A
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex md:flex-row flex-col flex-wrap flex-grow gap-[10px] ">
                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Instructions
                        </p>
                      </div>

                      <p className="text-[13px] text-white font-semibold">
                        {offerDetails?.instructions ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
