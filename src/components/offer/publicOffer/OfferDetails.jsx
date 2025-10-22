import React from "react";
import image from "../../../assets/landingImg4.JPG";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { useNavigate } from "react-router-dom";
import { useTraderProfile } from "@/context/publicContext/ProfileContext";
import { FaCalendarDay } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import toDecimal from "@/utils/toDecimal";
import lastSeen from "@/utils/lastSeen";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { windowFormatHour } from "@/utils/windowFormatHour";
import { BsStars } from "react-icons/bs";
import { TbCardboards } from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";

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
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          OFFER DETAILS
        </p>
      </div>

      <div className="flex flex-col min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {aboutOffer?.data === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col min-h-[120px] gap-[20px]">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[30px] pb-[12px]">
                    <div className="flex items-center gap-2">
                      <div className="flex cursor-pointer">
                        {false ? (
                          <div className="flex w-[45px] h-[45px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                            <img src={image} alt="" className="" />
                          </div>
                        ) : (
                          <div className="flex w-[45px] h-[45px] rounded-full overflow-hidden cursor-pointer bg-tradeFadeWhite items-center justify-center">
                            <img src={image} alt="" className="" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-[5px] ">
                        <p className="text-tradeOrange text-xl font-semibold md:w-max w-[200px leading-normal">
                          {offer?.serviceName || "N/A"}
                        </p>
                        <p className="text-tradeFadeWhite text-[13px] font-semibold leading-none">
                          {offer?.serviceType || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                      <div className="flex  items-center gap-1">
                        <LuUsers className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          +{offer?.completedTrades ?? "0"} Recent Trades
                        </p>
                      </div>

                      <div className="flex gap-1 items-center">
                        <FaCalendarDay className="flex text-tradeFadeWhite text-sm flex-shrink-0" />
                        <p className="text-xs font-semibold text-white">
                          Last Updated 31 Aug, 2025
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex text-white border border-tradeAshExtraLight text-[20px] p-1 w-max h-max bg-tradeAshLight rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                    <FiMoreVertical />
                  </div>
                </div>

                <div className="flex flex-1 flex-col min-h-[120px]  gap-[10px]">
                  <div className="flex flex-col gap-[10px] w-full ">
                    <div className="flex flex-col justify-between min-w-[200px] flex-1 gap-[20px] p-[12px] rounded-[15px] border border-tradeAshLight bg-tradeAsh">
                      <div className="flex items-center justify-between w-full mt-[1px]">
                        <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                          <p className="text-[13px] text-white font-semibold">
                            Rate
                          </p>
                        </div>

                        <p className="text-white text-sm font-semibold leading-none">
                          {offer?.marginRate?.ratePrice}/
                          {offer?.preferredCurrency?.code || "N/A"}
                        </p>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-tradeFadeWhite text-[13px]  font-semibold">
                            Margin
                          </p>

                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            {offer?.marginRate?.ratePercent || "N/A"}% MARGIN
                          </p>
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
