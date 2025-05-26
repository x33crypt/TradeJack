import React from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BiSolidCapsule } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { MdOutlineDeviceThermostat } from "react-icons/md";
import { TbArrowBigUpLines } from "react-icons/tb";
import { RxDividerVertical } from "react-icons/rx";
import { CiBank } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const MarketCard = (props) => {
  const navigateTo = useNavigate();

  const handleOfferClick = (offerId) => {
    navigateTo(`/offer/${offerId}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(props.offerId)}
        className="md:flex hidden border-t border-tradeAshLight hover:bg-tradeAsh cursor-pointer transition-all duration-500"
      >
        <div className="flex flex-1 px-[10px] py-[25px]  gap-[20px] items-center  h-full border-r border-tradeAshLight">
          <div className="">
            <CiBank className="text-tradeAshLight text-[30px]" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className=" text-tradeOrange text-[14px] font-[700]">
              {props.service}
            </p>
            <p className="text-white text-[12.5px] font-[500]">
              {" "}
              {props.serviceType}
            </p>
          </div>
        </div>
        <div className="flex flex-1 px-[10px] py-[25px]  gap-[20px] items-center  h-full">
          <div className="">
            <HiOutlineUserCircle className="text-tradeAshLight text-[30px]" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className=" text-white text-[14px] font-[500]">
              {props.username}
            </p>
            <div className="flex items-center gap-[10px] ">
              <div className="">
                <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
                  <IoMdThumbsUp className="text-[12px] lg:text-[13px] text-tradeGreen" />{" "}
                  {`${parseInt(props.positiveFeedback).toLocaleString()}`}
                </p>
              </div>
              <div className="">
                <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
                  <FaStar className="text-[12px] lg:text-[13px] text-tradeOrange" />{" "}
                  {`${parseInt(props.positiveFeedback).toLocaleString()}`}
                </p>
              </div>
              <p className="text-[13px] text-tradeGreen font-[500]">Online</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 px-[10px] py-[25px]  gap-[10px] h-full">
          <div className="flex gap-[20px]">
            <p className="text-[13px] font-[500] text-white">Min Purchase </p>
            <p className="text-[13px] font-[500] text-white">
              {`${parseInt(props.miniPurchase).toLocaleString()}`}{" "}
              {props.currency}
            </p>
          </div>

          <div className="flex gap-[20px]">
            <p className="text-[13px] font-[500] text-white">Max Purchase </p>
            <p className="text-[13px] font-[500] text-white">
              {`${parseInt(props.maxPurchase).toLocaleString()}`}{" "}
              {props.currency}
            </p>
          </div>
        </div>
        <div className="flex bg-tradeAsh flex-col flex-1 px-[10px] py-[25px]  gap-[10px]  h-full">
          <div className="flex gap-[5px] items-center ">
            <div className="flex items-center gap-[8px] ">
              <p className="text-[13px] font-[700] text-white">{`1 ${props.currency}`}</p>
              <FaArrowRightArrowLeft className="text-tradeFadeWhite text-[12px] " />
              <p className="text-[13px] font-[700] text-white"> NGN 750.00</p>
            </div>
          </div>

          <div className="flex gap-[4px] items-center">
            <TbArrowBigUpLines className="text-tradeGreen text-[13px]" />
            <p className="text-[13px] font-[700] text-white">+2.00%</p>
          </div>
        </div>
      </div>

      {/* market card for large screens */}
      {/* <div
        onClick={() => handleOfferClick(props.offerId)}
        className=" bg-tradeAs border border-tradeAshLight md:flex hidden hover:bg-tradeAsh p-[10px] cursor-pointer transition-all duration-300 "
      >
        <div className="flex-1 flex gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[5px]">
                <div className="hidden sm:flex">
                  {props.lastSeen == "online" ? (
                    <>
                      <p className="text-[13px] lg:text-[13px] text-tradeGreen p-[1px] border border-tradeAshLight rounded-full">
                        <GoDotFill />
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] lg:text-[13px] text-tradeAshExtraLight p-[1px] border border-tradeAshLight rounded-full">
                        <GoDotFill />
                      </p>
                    </>
                  )}
                </div>

                <p className=" text-[13px] text-white sm:text-[14px] font-[600] w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {props.username}
                </p>
              </div>

              <div className="flex items-center gap-[10px] ">
                <div className="">
                  <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
                    {" "}
                    <IoMdThumbsUp className="text-[13px] lg:text-[14px] text-tradeGreen" />{" "}
                    {`${parseInt(props.positiveFeedback).toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <div className="flex gap-[10px]">
                <p className="flex text-[13px] text-tradeFadeWhite font-[500] gap-[2px]">
                  Min Purchase
                </p>

                <p className="text-[13px] font-[500] text-white">
                  {`${parseInt(props.miniPurchase).toLocaleString()}`}{" "}
                  {props.currency}
                </p>
              </div>

              <div className="flex gap-[10px]">
                <p className="flex text-[13px] text-tradeFadeWhite font-[500] gap-[2px]">
                  Max Purchase
                </p>

                <p className="text-[13px] font-[500] text-white">
                  {`${parseInt(props.maxPurchase).toLocaleString()}`}{" "}
                  {props.currency}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[10px]">
          <div>
            <p className="text-[15px] font-[600] text-tradeOrange">
              {props.service}
            </p>
          </div>
          <div className="flex flex-col gap-[3px]">
            <p className="hidden sm:flex gap-[2px] text-[13px] lg:text-[14px] font-[400]">
              {" "}
              <small className=" text-[13px] lg:text-[13px] font-[500] text-white">
                {props.serviceType}
              </small>
            </p>

            <div className="flex gap-[10px]">
              <p className="flex text-[13px] text-tradeFadeWhite font-[500] gap-[2px]">
                Avg Trade Time
              </p>

              <p className="text-[13px] font-[500] text-white">
                {props.avgTradeTime} Minutes
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex gap-[5px] items-center ">
            <div className="flex items-center gap-[8px] ">
              <p className="text-sm font-[700] text-white">{`1 ${props.currency}`}</p>
              <FaArrowRightArrowLeft className="text-tradeFadeWhite text-[12px] " />
              <p className="text-sm font-[700] text-white"> NGN 750.00</p>
            </div>

            <RxDividerVertical className="text-tradeAshExtraLight text-[12px] " />

            <div className="flex gap-[4px] items-center">
              <TbArrowBigUpLines className="text-tradeGreen text-[12px]" />
              <p className="text-sm font-[700] text-white">+2.00%</p>
            </div>
          </div>
          <div className="flex flex-col gap-[3px]"></div>
        </div>
      </div> */}

      {/* market card for mobile */}
      <div
        onClick={() => handleOfferClick(props.offerId)}
        className=" bg-tradeAsh flex md:hidden justify-between p-[10px] rounded-[px] cursor-pointer transition-all duration-300"
      >
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-[10px]">
            <p className=" text-[12px] text-white font-[600] w-[70px] overflow-hidden text-ellipsis whitespace-nowrap">
              {props.username}
            </p>
            <div className="flex">
              {props.lastSeen === "online" ? (
                <>
                  <div className="flex items-center gap-[4px] py-[px] px-[8px] border border-tradeAshExtraLight rounded-full">
                    <p className="text-[10px] text-tradeGreen">
                      <GoDotFill />
                    </p>
                    <p className="text-[12px] text-white lg:text-[12px] flex font-[600] ">
                      Online
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-[2px] py-[px] px-[6px] border border-tradeAshExtraLight rounded-full">
                    <p className="text-[10px] text-tradeAshExtraLight">
                      <GoDotFill />
                    </p>
                    <p className="text-[12px] text-white lg:text-[12px] flex font-[600] ">
                      Offline
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-[13px] lg:text-[14px] font-[400]">
            <small className="text-[16px] font-[600] text-tradeOrange">
              {props.service}
            </small>
          </p>
          <small className=" text-[11px] font-[500] text-tradeFadeWhite">
            {props.serviceType}
          </small>
          <div className="flex items-center gap-[6px] ">
            <p className="text-[13px] font-[800] text-white">{`1 ${props.currency}`}</p>
            <FaArrowRightArrowLeft className="text-tradeFadeWhite text-[12px] " />
            <p className="text-[13px] font-[800] text-white"> NGN 750.00</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-[4px]">
          <div className="flex w-[140px] items-center justify-between">
            {/* <div>
              <FcApprove className="text-[15px] lg:text-[14px]" />
            </div> */}

            <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
              {" "}
              <IoMdThumbsUp className="text-[13px] lg:text-[14px] text-tradeGreen" />{" "}
              {`${parseInt(props.positiveFeedback).toLocaleString()}`}
            </p>
            <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
              {" "}
              <FaRegStar className="text-[13px] lg:text-[14px] text-tradeOrange" />{" "}
              {props.trustScore}%
            </p>
          </div>

          <div className="flex w-[140px] justify-between">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Avg. trade Time
            </p>

            <p className="text-[11px] font-[500] text-white">
              {props?.avgTradeTime} Min
            </p>
          </div>

          <div className="flex w-[140px] justify-between">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Min Purchase
            </p>

            <p className="text-[11px] font-[500] text-white">
              {`${parseInt(props.miniPurchase).toLocaleString()}`}{" "}
              {props.currency}
            </p>
          </div>

          <div className="flex w-[140px] justify-between">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Max Purchase
            </p>

            <p className="text-[11px] font-[500] text-white">
              {`${parseInt(props.maxPurchase).toLocaleString()}`}{" "}
              {props.currency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketCard;
