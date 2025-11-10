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

const OfferDetails = ({ aboutOffer, loading }) => {
  const { offerDetails, traderInfo } = aboutOffer || {};

  const navigateTo = useNavigate();

  // const handleEdit = (offerId) => {
  //   navigateTo(`/offer/${offerId}`);
  // };

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
                <div className="flex flex-col gap-[30px] pb-[12px]">
                  <div className="flex items-center gap-2">
                    <div>
                      <TbCubeSpark className="text-white text-5xl" />
                    </div>

                    <div className="flex flex-col gap-[10px] ">
                      <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-none">
                        {offerDetails?.serviceName || "N/A"}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold leading-none">
                        {offerDetails?.serviceType || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center flex-1 gap-[10px]">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex  items-center gap-1">
                        <div>{lastSeenDot()}</div>
                        <p className="text-xs font-semibold text-white">Live</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <LuCalendarClock className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          Posted 31 Aug, 2025
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <AiOutlineSafetyCertificate className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          Certified and Secure
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex gap-1 items-center">
                        <GoBookmarkFill className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          123 Bookmarks
                        </p>
                      </div>
                      <div className="flex  items-center gap-1">
                        <RiArrowLeftRightLine className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          {offerDetails?.completedTrades ?? "0"} Completed
                          Trade(s)
                        </p>
                      </div>
                      <div className="flex  items-center gap-1">
                        <FaRegStar className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          99% Completion Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div
                      onClick={() => navigateTo("/offer/:id/edit")}
                      className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      <FaEdit />
                      <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        EDIT
                      </p>
                    </div>

                    <div className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                      <MdOutlinePause />
                      <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        PAUSE
                      </p>
                    </div>
                    <div className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                      <AiFillStop />
                      <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        CLOSE
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 hover:bg-tradeOrange/30 bg-tradeAshLight p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
                      <FaShareAlt />
                      <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                        SHARE
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-[10px]">
                  <div className="flex flex-col gap-[10px] w-full ">
                    <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex items-center justify-between w-full mt-[1px]">
                        <div className="flex justify-between border-b border-tradeAshLight flex-1 pb-[10px]">
                          <p className="text-[13px] text-white font-semibold">
                            Rate
                          </p>
                        </div>

                        <p className="text-white text-sm font-semibold leading-none">
                          1 {offerDetails?.preferredCurrency?.code || "N/A"} = #
                          {toDecimal(offerDetails?.marginRate?.ratePrice)}
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Margin
                          </p>

                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            {offerDetails?.marginRate?.ratePercent || "N/A"}%
                            MARGIN
                          </p>
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
