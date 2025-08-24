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
              <div className="flex flex-1 flex-col min-h-[120px]  gap-[10px">
                <div className="flex lg:flex-row flex-col w-full border- border-tradeAshLight  md:bg-tradeAsh">
                  <div className="flex flex-col min-w-[200px] flex-1 justify-between gap-[15px] border-b md:border-0 rounded-[15px border-neutral-800 p-[15px] bg-tradeAsh">
                    <div className="flex flex-co gap-3">
                      <div className="flex gap-1 items-center">
                        <FaCheckDouble className="flex text-white text-[10px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-tradeFadeWhite">
                          {date(offer?.publishedOn)}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <FaCheckDouble className="flex text-tradeGreen text-[10px] flex-shrink-0" />
                        <p className="text-xs font-medium text-tradeFadeWhite">
                          Active Offer
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-[13px] font-semibold">
                        {offer?.serviceType}
                      </p>
                      <p className="text-tradeOrange text-lg font-semibold leading-none">
                        {offer?.service}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* <p className="text-tradeFadeWhite text-xs font-semibold">
                          Exchange Rate
                        </p> */}
                      <div className="flex items-center gap-2">
                        <p className="text-white text-3xl font-bold leading-none">
                          1,250/$
                        </p>
                        <div className="flex items-center bg-tradeAsh text-tradeFadeWhite gap-1 border border-tradeAshExtraLight  h-max rounded-[8px] p-1 w-max cursor-pointer transition-all duration-300">
                          <p className="text-xs font-semibold">
                            +0.22% premium
                          </p>
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

                  <div className="flex-1 flex justify-between flex-col gap-[15px] borde rounded-[15px md:border-l border- md:border-t-0 border-neutral-800 p-[15px] bg-tradeAsh">
                    <p className="text-xs font-medium text-white">Offer tags</p>
                    <div className="w-full flex gap-2 flex-grow flex-wrap">
                      {offer?.terms?.map((term, index) => (
                        <p className="text-[13px] w-max h-max text-tradeGreen font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                          {term}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* <div className="flex-1 flex justify-between flex-col gap-[15px] borde rounded-[15px md:border-l border-neutral-800 p-[15px] bg-tradeAsh">
                    <p className="text-xs font-medium text-white">
                      Traders Profile
                    </p>
                    <div className="flex items-center gap-[10px]">
                      <div className="flex  md:w-[40px] w-[40px] md:h-[40px] h-[40px] border-[2px] border-tradeAshExtraLight rounded-[15px] overflow-hidden shrink-0 justify-center items-center cursor-pointer">
                        <div>
                          {false ? (
                            <img
                              className="rounded-[10px] w-full h-auto"
                              src={image}
                              alt=""
                            />
                          ) : (
                            <FaUser className="text-tradeAshLight md:text-[20px] text-[20px]" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p
                          onClick={() =>
                            handleTraderClick(offer?.user?.userName)
                          }
                          className="text-sm text-white font-semibold leading-none cursor-pointer"
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
                            <p className="mt-0 text-white text-xs font-semibold">
                              {false
                                ? capitalizeFirst(offer?.user?.status)
                                : "Offline"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <SmallButton variant="fadeout">
                        <MdThumbUpAlt className="text-tradeGreen text-sm" />
                        <p className="text-[13px] font-semibold text-white">
                          {offer?.user?.userFeedback?.positiveFeedback}
                        </p>
                      </SmallButton>
                      <SmallButton variant="fadeout">
                        <MdThumbDownAlt className="text-red-600 text-sm" />
                        <p className="text-[13px] font-semibold text-white">
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
                  </div> */}
                </div>

                <div className="flex flex-1 flex-col gap-[10px] p-[15px] bg-tradeAs">
                  <div className="flex-1 flex md:flex-row flex-col flex-wrap flex-grow gap-[10px]">
                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Overview
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Trade Count
                          </p>

                          <p className="text-white text-[13px]  font-semibold">
                            1130
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-[13px] text-tradeFadeWhite font-semibold">
                            Trade Volume
                          </p>

                          <p className="text-white text-[13px] font-semibold">
                            $34,000.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
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
                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
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
                    <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Offer Instruction
                        </p>
                      </div>
                      <div>
                        <p className="text-[13px] text-white font-semibold">
                          {offer?.instruction ||
                            "Ah, you’re probably referring to the sliders-style icon (like the one used for "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-[20px]">
                  <Button>Initiate Trade</Button>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
