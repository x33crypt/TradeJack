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

const OfferDetails = () => {
  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex justify-between items-center px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-semibold">Offer Details</p>
      </div>

      <div className="flex lg:flex-row flex-col w-full border-b border-tradeAshLight">
        <div className="flex-1 flex p-[15px] w-full flex-col gap-[20px]">
          <div className="flex ">
            <p className="text-white text-[13px] font-semibold">
              Direct Bank Transfer /{" "}
              <span className="text-tradeOrange text-[13px] font-semibold">
                Wells Fargo
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-tradeFadeWhite text-xs font-semibold">
              Rate value
            </p>
            <div className="flex items-center gap-2">
              <p className="text-white text-3xl font-bold">
                <span className="text-tradeFadeWhite">$</span>
                50,568.89
              </p>
              <div className="flex items-center bg-tradeAsh text-tradeFadeWhite gap-1 border border-tradeAshExtraLight  h-max rounded-[8px] p-1 w-max cursor-pointer transition-all duration-300">
                <p className="text-xs font-semibold">+0.22% premium</p>
              </div>
            </div>
            <div className="flex gap-1">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Exchange Rate :{" "}
                <span className="text-tradeGreen">NGN1,250/USD </span>{" "}
                {/* (+0.22%) */}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:min-w-[300px] flex flex-col gap-4 items-cente justify-between p-[15px] lg:border-l  border-t lg:border-t-0 border-tradeAshLight">
          <div className="flex items-center gap-[10px]">
            <div className="flex  w-[60px] h-[60px] border-[2px] border-tradeAshExtraLight rounded-[15px] overflow-hidden shrink-0 justify-center items-center cursor-pointer">
              <div>
                {false ? (
                  <img
                    className="rounded-[10px] w-full h-auto"
                    src={image}
                    alt=""
                  />
                ) : (
                  <FaUser className="text-tradeAshLight text-[40px]" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-tradeFadeWhite font-bold leading-none">
                @<span className="text-white">Sane</span>
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
                    {false ? capitalizeFirst(profile?.status) : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <SmallButton variant="fadeout">
              <MdThumbUpAlt className="text-tradeGreen text-sm" />
              <p className="text-[13px] font-semibold text-white">400</p>
            </SmallButton>
            <SmallButton variant="fadeout">
              <MdThumbDownAlt className="text-red-600 text-sm" />
              <p className="text-[13px] font-semibold text-white">400</p>
            </SmallButton>
            <SmallButton variant="fadeout">
              <MdOutlineSafetyCheck className="text-tradeOrange text-sm" />
              <p className="text-[13px] font-semibold text-white">400</p>
            </SmallButton>

            <SmallButton variant="fadeout">
              <FaUserCheck className="text-tradeGreen text-sm" />
              <p className="text-[13px] font-semibold text-white">Verified</p>
            </SmallButton>
          </div>
        </div>
      </div>

      <div className="p-[15px] border-b border-tradeAshLight">
        <Button>Initiate Trade</Button>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        <div className="flex-1 flex md:flex-row flex-col bg-tradeAs gap-[10px]">
          <div className="flex flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
            <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Overview
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Number of trades
                </p>
                <p className="text-white text-[13px]  font-semibold">1130</p>
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
          <div className="flex flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
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
                <p className="text-white text-[13px]  font-semibold">100 CAD</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Maximum
                </p>
                <p className="text-white text-[13px] font-semibold">500 CAD</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
            <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Payment Window
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Sender
                </p>
                <p className="text-white text-[13px]  font-semibold">30Mins</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Receiver
                </p>
                <p className="text-white text-[13px] font-semibold">
                  1Hrs 30Mins
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex md:flex-row flex-col bg-tradeAs  gap-[10px]">
          <div className="flex flex-1 flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
            <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Offer tags
              </p>
            </div>
            <div className="w-full flex gap-2 flex-grow flex-wrap">
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                Expect 30 min delay
              </p>
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                Clear instructions required
              </p>
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                High trust score only
              </p>
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                No newly created accounts
              </p>
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                English only
              </p>
              <p className="text-[13px] w-max text-tradeOrange font-semibold py-[4px] px-[10px] border border-tradeAshLight bg-tradeAshLight rounded-[10px]">
                No third-party
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
