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
        {/* <SmallButton variant="fadeout">
          <FaArrowLeftLong className="text-base" />
        </SmallButton> */}
      </div>

      <div className="flex flex-col min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px]  gap-[10px] p-[15px]">
                <div className="flex flex-col flex-1 justify-between gap-[10px] borde border-tradeAshLight  rounded-[15px] py-[12px] bg-tradeAs">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="flex  w-[40px] h-[40px] border-[2px] border-tradeAshExtraLight rounded-[10px] overflow-hidden shrink-0 justify-center items-center cursor-pointer">
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
                      <div className="flex flex-col gap-1">
                        <p
                          onClick={() =>
                            handleTraderClick(offer?.user?.userName)
                          }
                          className=" flex text-base gap-1 items-center text-white font-semibold leading-none cursor-pointer w-max hover:underline transition-all duration-300"
                        >
                          @{offer?.user?.userName}
                        </p>

                        <div className="flex items-center gap-2">
                          {/* <div className="flex  gap-1 items-center ">
                            <HiLocationMarker className=" flex text-tradeFadeWhite text-xs leading-none" />
                            <p className="text-[12px] font-semibold text-white">
                              {false ? "Nigeria" : "Clouds"}
                            </p>
                          </div> */}

                          <div className="flex  gap-1 items-center ">
                            <FaCircle
                              className={`${
                                true === "online"
                                  ? "text-tradeGreen"
                                  : true === "offline"
                                  ? "text-tradeAshExtraLight"
                                  : false === "last seen"
                                  ? "text-tradeOrange"
                                  : "text-tradeAshExtraLight"
                              } flex  text-[8px] leading-none`}
                            />
                            <p className="text-white text-xs font-semibold">
                              {false
                                ? capitalizeFirst(offer?.user?.status)
                                : "Offline"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px] ">
                      <p className="text-tradeOrange text-2xl font-semibold leading-none">
                        {offer?.service}
                      </p>
                      <p className="text-white text-[13px] font-semibold leading-none">
                        {offer?.serviceType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-[10px] w-full ">
                  <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                    <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                      <p className="text-[13px] text-white font-semibold">
                        Details
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Status
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          Active
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Created
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          3 days ago
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Margin
                        </p>
                        <div className="flex items-center gap-[2px] text-[13px] font-semibold rounded-[5px] bg-tradeGreen text-black px-[5px] py-[1px] w-max">
                          <p>0.22% </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                    <div className="flex items-center justify-between w-full mt-[1px]">
                      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                        <p className="text-[13px] text-white font-semibold">
                          Exchange rate
                        </p>
                      </div>

                      <p className="text-white text-3xl font-semibold leading-none">
                        1,250/USD
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Transfer window
                        </p>

                        <p className="text-white text-[13px]  font-semibold">
                          30Mins
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-tradeFadeWhite font-semibold">
                          Release window
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
                        Purchase limits
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                          Currency
                        </p>
                        <p className="text-[13px] text-white font-semibold">
                          {offer?.preferredCurrency?.name}
                        </p>
                      </div>
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
                </div>

                <div className="flex min-w-[200px] flex-1 flex-col gap-[10px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <p className="text-[13px] text-white font-semibold">Tags</p>
                  </div>
                  <div className="w-full flex gap-2 flex-grow flex-wrap">
                    {offer?.terms?.map((term, index) => (
                      <p className="text-[13px] w-max h-max text-tradeGreen font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                        {term}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex md:flex-row flex-col flex-wrap flex-grow gap-[10px] ">
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
