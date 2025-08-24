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

const OfferDetails = ({ loading, aboutOffer }) => {
  const { setProfile } = useTraderProfile();

  const offer = aboutOffer?.data;

  const navigateTo = useNavigate();

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

      {/* <div className="h-[50px] bg-"></div> */}

      <div className="flex flex-col min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px]  gap-[10px] p-[15px]">
                <div className="flex lg:flex-row flex-col gap-[10px] w-full ">
                  <div className="flex flex-col min-w-[200px flex-1 justify-between gap-[10px] border border-tradeAshLight  rounded-[15px] p-[12px] bg-tradeAsh">
                    <div className="flex justify-between gap-3 pb-[10px] border-b border-tradeAshLight ">
                      <div className="flex gap-1 items-center">
                        <FaCheckDouble className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                        <p className="text-[13px] font-medium text-white">
                          Active Offer
                        </p>
                      </div>
                      {/* <div className="flex gap-1 items-center">
                        <p className="text-[13px] font-semibold text-white">
                          Posted :
                        </p>
                        <div className="flex gap-1 items-center">
                          <FaCalendarDay className="flex text-white text-[10px] flex-shrink-0" />
                          <p className="text-[13px] font-semibold text-tradeFadeWhite">
                            {date(offer?.publishedOn)}
                          </p>
                        </div>
                      </div> */}
                      <div className="flex gap-1 items-center">
                        <VscVerifiedFilled className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-[13px] font-medium text-tradeFadeWhite">
                          Verified
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-tradeOrange text-lg font-semibold leading-none">
                        {offer?.service}
                      </p>
                      <p className="text-white text-xs font-semibold">
                        {offer?.serviceType}
                      </p>

                      <div className="flex items-center gap-1">
                        {/* <p className="text-xs text-white font-semibold">
                          Currency -{" "}
                        </p> */}
                        <p className="text-tradeFadeWhite text-xs font-semibold">
                          {offer?.preferredCurrency?.name} -{" "}
                          {offer?.preferredCurrency?.code}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* <p className="text-tradeFadeWhite text-xs font-semibold">
                        Exchange Rate
                      </p> */}
                      <div className="flex items-center gap-2">
                        <p className="text-white text-xl font-bold leading-none">
                          1,250/USD
                        </p>
                        <div className="flex items-center gap-2  h-max  cursor-pointer transition-all duration-300">
                          {/* <p className="text-xs font-semibold text-tradeFadeWhite ">
                            Today
                          </p> */}

                          <div className="flex items-center gap-[2px] text-xs font-semibold rounded-[5px] bg-tradeGreen text-black p-[2px] w-max">
                            <TiChartLine className="text-[15px] flex-shrink-0" />
                            <p>0.22%</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex gap-1">
                        <p className="text-tradeFadeWhite text-[13px] font-semibold">
                          Exchange rate :{" "}
                          <span className="text-tradeGreen">NGN1,250/USD </span>
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] md:border- border-neutral-800 p-[12px] bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Overview
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Trade Count
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          1133
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Trade Volume
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          $34,000.00
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[10px] borde rounded-[15px] border border-tradeAshLight p-[12px] bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Trader Profile
                      </p>
                    </div>

                    <div className="flex gap-[10px] h-full">
                      <div className="flex  w-[40px] h-[40px] border-[2px] border-tradeAshExtraLight rounded-[10px] overflow-hidden shrink-0 justify-center items-center cursor-pointer">
                        <div>
                          {false ? (
                            <img
                              className="rounded-[10px] w-full h-auto"
                              src={image}
                              alt=""
                            />
                          ) : (
                            <FaUser className="text-tradeAshLight text-[20px]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-[10px] h-full flex-1">
                        <div className="flex flex-col gap-1">
                          <p
                            onClick={() =>
                              handleTraderClick(offer?.user?.userName)
                            }
                            className=" flex gap-1 items-center text-white font-semibold leading-none cursor-pointer w-max hover:underline transition-all duration-300"
                          >
                            @{offer?.user?.userName}
                          </p>

                          <div className="flex items-center gap-2">
                            <div className="flex  gap-1 items-center ">
                              <HiLocationMarker className=" flex text-tradeFadeWhite text-xs leading-none" />
                              <p className="text-[12px] font-semibold text-white">
                                {false ? "Nigeria" : "Clouds"}
                              </p>
                            </div>

                            <div className="flex  gap-1 items-center ">
                              <FaCircle
                                className={`${
                                  false === "online"
                                    ? "text-tradeGreen"
                                    : true === "offline"
                                    ? "text-tradeAshExtraLight"
                                    : false === "last seen"
                                    ? "text-tradeOrange"
                                    : "text-tradeAshExtraLight"
                                } flex  text-[8px] leading-none`}
                              />
                              <p className="mt-0 text-white text-[13px] font-semibold">
                                {false
                                  ? capitalizeFirst(offer?.user?.status)
                                  : "Offline"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <SmallButton variant="fadeout">
                            <MdThumbUpAlt className="text-tradeGreen text-xs" />
                            <p className="text-xs font-semibold text-white">
                              {offer?.user?.userFeedback?.positiveFeedback}
                            </p>
                          </SmallButton>
                          <SmallButton variant="fadeout">
                            <MdThumbDownAlt className="text-red-600 text-sm" />
                            <p className="text-xs font-semibold text-white">
                              {offer?.user?.userFeedback?.negativeFeedback}
                            </p>
                          </SmallButton>
                          <SmallButton variant="fadeout">
                            <MdOutlineSafetyCheck className="text-tradeOrange text-sm" />
                            <p className="text-[13px] font-semibold text-white">
                              {offer?.user?.trustScore}%
                            </p>
                          </SmallButton>

                          <SmallButton variant="fadeout">
                            <FaUserCheck className="text-tradeGreen text-sm" />
                            <p className="text-[13px] font-semibold text-white">
                              Verified
                            </p>
                          </SmallButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex md:flex-row flex-col flex-wrap flex-grow gap-[10px]">
                  <div className="flex-1 flex justify-between flex-col gap-[15px] border rounded-[15px]  border- md:border-t-0 border-neutral-800 p-[12px] bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Tags
                      </p>
                    </div>
                    <div className="w-full flex gap-2 flex-grow flex-wrap">
                      {offer?.terms?.map((term, index) => (
                        <p className="text-[13px] w-max h-max text-tradeGreen font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                          {term}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex md:flex-row flex-col flex-wrap flex-grow gap-[10px] ">
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
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
                          100 CAD
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Maximum
                        </p>

                        <p className="text-white text-[13px] font-semibold">
                          500 CAD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
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
                          30Mins
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Release
                        </p>

                        <p className="text-white text-[13px] font-semibold">
                          1Hrs 30Mins
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Instructions
                      </p>
                    </div>

                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Ah, you’re probably referring to the sliders-style icon
                      (like the one used for music equalizers or filter
                      adjustments).
                    </p>
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
