import React from "react";
import image from "../../../assets/landingImg4.JPG";
import { FaUser } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FaCircle } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { RiShare2Fill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { TbClockEdit } from "react-icons/tb";
import { MdThumbUpAlt, MdThumbDownAlt } from "react-icons/md";
import { MdOutlineSafetyCheck } from "react-icons/md";
import SmallButton from "@/components/buttons/SmallButton";
import Button from "@/components/buttons/Button";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { useNavigate } from "react-router-dom";
import { useTraderProfile } from "@/context/publicContext/ProfileContext";
import { MdOutlineDateRange } from "react-icons/md";
import { date } from "@/utils/date";
import { dateTime } from "@/utils/dateTime";
import { FaCheckDouble } from "react-icons/fa";
import { time } from "@/utils/time";
import { FaCalendarDay } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { TiChartLine } from "react-icons/ti";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaArrowLeftLong } from "react-icons/fa6";
import toDecimal from "@/utils/toDecimal";
import lastSeen from "@/utils/lastSeen";
import { MdVerifiedUser } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { BsStars } from "react-icons/bs";

const OfferDetails = ({ loading, aboutOffer }) => {
  const { setProfile } = useTraderProfile();

  console.log("offer details :", aboutOffer);

  const navigateTo = useNavigate();

  const offer = aboutOffer?.data?.offerDetails;
  const user = aboutOffer?.data?.traderInfo;
  const feedback = aboutOffer?.data?.offerFeedback?.data;

  const seen = lastSeen(user?.lastSeen);

  console.log("last seen :", seen);

  const handleTraderClick = (username) => {
    setProfile((prev) => ({
      ...prev,
      username: username,
    }));
    navigateTo(`/user/${username}`);
  };

  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Offer Details</p>
      </div>

      <div className="flex flex-col min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer?.data === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px]  gap-[20px] p-[15px]">
                <div className="flex min-h-[150px] flex-col gap-[15px] pb-[12px]">
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-tradeAshLight p-[12px] bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Trader Info
                      </p>
                    </div>

                    <div className="flex gap-[10px] items-center justify-between  w-full">
                      <div className="flex gap-1 items-center">
                        <div className="flex   cursor-pointer">
                          {false ? (
                            <div className="w-[25px] md:w-[30px] h-[25px] md:h-[30px] border-[2px] border-tradeFadeWhite rounded-[8px] overflow-hidden shrink-0 justify-center items-center">
                              <img
                                className="rounded-[10px] w-full h-auto"
                                src={image}
                                alt=""
                              />
                            </div>
                          ) : (
                            <HiOutlineUserCircle className="flex text-white text-xl flex-shrink-0" />
                          )}
                        </div>
                        <p
                          onClick={() => handleTraderClick(user?.username)}
                          className=" flex text-[13px] gap-1 items-center text-white font-semibold leading-none cursor-pointer w-max hover:underline transition-all duration-300"
                        >
                          @{user?.username}
                        </p>
                      </div>

                      <div className="flex gap-1 ">
                        {seen && (
                          <p className="text-white text-[13px] font-semibold">
                            Last seen :{" "}
                            <span className={seen.className}>{seen.text}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px] ">
                    <div className="flex flex-col gap-[10px] ">
                      <p className="text-white text-3xl font-semibold md:w-max w-[200px leading-normal">
                        {offer?.serviceName || "N/A"}
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                        {offer?.serviceType || "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <div className="flex gap-4 flex-wrap">
                        {offer?.isVerifiedOffer ? (
                          <div className="flex gap-1 items-center">
                            <VscVerifiedFilled className="flex text-tradeFadeWhite text-base flex-shrink-0" />
                            <p className="text-xs font-semibold text-white">
                              Verified Offer
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-1 items-center">
                            <BsStars className="flex text-tradeFadeWhite text-base flex-shrink-0" />
                            <p className="text-xs font-semibold text-white">
                              New Offer
                            </p>
                          </div>
                        )}
                        <div className="flex  items-center gap-1">
                          <LuUsers className="flex text-tradeGreen text-[14px] flex-shrink-0" />
                          <p className="text-xs font-semibold text-white">
                            +{offer?.completedTrades ?? "0"} Recent Trades
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1 items-center">
                        <FaCalendarDay className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          Last Updated 31 Aug, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col min-h-[120px]  gap-[10px]">
                  <div className="flex lg:flex-row flex-col gap-[10px] w-full ">
                    <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex items-center justify-between w-full mt-[1px]">
                        <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                          <p className="text-[13px] text-white font-semibold">
                            Rate
                          </p>
                        </div>

                        <p className="text-white text-xl font-semibold leading-none">
                          {offer?.marginRate?.ratePrice}/
                          {offer?.preferredCurrency?.code || "N/A"}
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Margin
                          </p>
                          <div className="flex items-center gap-[2px] text-[13px] font-semibold rounded-[5px] bg-tradeGreen text-black px-[5px] py-[1px] w-max">
                            <p>{offer?.marginRate?.ratePercent || "N/A"}%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Currency
                          </p>
                          <p className="text-[13px] text-white font-semibold">
                            {offer?.preferredCurrency?.name}
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
                            {toDecimal(offer?.purchaseLimit?.minimum) || "N/A"}{" "}
                            {offer?.preferredCurrency?.code || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Maximum
                          </p>

                          <p className="text-white text-[13px] font-semibold">
                            {toDecimal(offer?.purchaseLimit?.maximum) || "N/A"}{" "}
                            {offer?.preferredCurrency?.code || "N/A"}
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
                              offer?.paymentWindow?.transfer?.hours,
                              offer?.paymentWindow?.transfer?.minutes
                            )}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Release
                          </p>

                          <p className="text-white text-[13px] font-semibold">
                            {windowFormatHour(
                              offer?.paymentWindow?.release?.hours,
                              offer?.paymentWindow?.release?.minutes
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
                      {offer?.tags ? (
                        offer?.tags?.map((term, index) => (
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
                        {offer?.instructions || "N/A"}
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
