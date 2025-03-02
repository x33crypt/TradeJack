import React from "react";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdOutlineVerified } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import { SiTrustpilot } from "react-icons/si";
import { RiRadioButtonLine } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";

const OfferCard = (props) => {
  tippy("[data-tippy-content]");

  tippy("#vendorFavourite", {
    content: "Add to favourite offers!",
    theme: "custom1", // Use the custom theme defined in CSS
  });

  tippy("#vendorVerified", {
    content: "This offer is from a verified, trusted vendor.",
    theme: "custom2", // Use the custom theme defined in CSS
  });

  tippy("#vendorNotVerified", {
    content: "Trade with caution, this vendor is not verified.",
    theme: "custom3", // Use the custom theme defined in CSS
  });

  const navigateTo = useNavigate();

  const handleOfferClick = (id) => {
    navigateTo(`/offer/${id}`);
  };

  return (
    <>
      <div
        onClick={() => handleOfferClick(props.id)}
        className=" md:flex hidden border-b border-tradeAshLight hover:bg-tradeAshLight p-[10px] cursor-pointer transition-all duration-300 "
      >
        <div className="flex-1 flex gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[15px]">
              <p className=" text-[13px] text-white sm:text-[14px] font-[600] w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
                {props.username}
              </p>
              <div className="flex flex-co gap-[10px] ">
                <div className="">
                  <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
                    {" "}
                    <IoMdThumbsUp className="text-[13px] lg:text-[14px] text-tradeGreen" />{" "}
                    {`${parseInt(props.reviews).toLocaleString()}`}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex">
                {props.availability == "online" ? (
                  <>
                    <div className="flex items-center gap-[4px] py-[px] px-[8px] border border-tradeAshExtraLight rounded-full">
                      <p className="text-[13px] lg:text-[13px] text-tradeGreen">
                        <GoDotFill />
                      </p>
                      <p className="text-[13px] text-white lg:text-[12px] flex font-[600] ">
                        Online
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-[4px] py-[px] px-[8px] border border-tradeAshExtraLight rounded-full">
                      <p className="text-[13px] lg:text-[13px] text-tradeAshExtraLight">
                        <GoDotFill />
                      </p>
                      <p className="text-[13px] text-white lg:text-[12px] flex font-[600] ">
                        Offline
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <div className="flex gap-[10px]">
                <p className="flex text-[13px] text-tradeFadeWhite font-[400] gap-[2px]">
                  Min Purchase
                </p>

                <p className="text-[13px] font-[500] text-white">
                  {`20`} {props.currency}
                </p>
              </div>

              <div className="flex gap-[10px]">
                <p className="flex text-[13px] text-tradeFadeWhite font-[400] gap-[2px]">
                  Max Purchase
                </p>

                <p className="text-[13px] font-[500] text-white">
                  {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
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
              <p className="flex text-[13px] text-tradeFadeWhite font-[400] gap-[2px]">
                Avg. trade speed
              </p>

              <p className="text-[13px] font-[500] text-white">60 Minutes</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[10px]">
          <div>
            <p className="text-[15px] lg:text-[14px] font-[700] text-white">
              1 {props.currency} = 0.93 USD of BTC
            </p>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleOfferClick(props.id)}
        className="flex md:hidden justify-between border-b border-tradeAshLight hover:bg-tradeAshLight p-[10px] cursor-pointer transition-all duration-300"
      >
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-[10px]">
            <p className=" text-[12px] text-white font-[600] w-[70px] overflow-hidden text-ellipsis whitespace-nowrap">
              {props.username}
            </p>
            <div className="flex">
              {props.availability == "online" ? (
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
          <p className="text-[13px] font-[800] text-white">
            1 {props.currency} = 0.93 USD of BTC
          </p>
        </div>
        <div className="flex flex-col justify-between gap-[4px]">
          <div className="flex gap-[15px] ">
            <p className="text-[13px] lg:text-[13px] text-white flex items-center gap-[4px] font-[600]">
              {" "}
              <IoMdThumbsUp className="text-[13px] lg:text-[14px] text-tradeGreen" />{" "}
              {`${parseInt(props.reviews).toLocaleString()}`}
            </p>
          </div>
          <div className="flex gap-[15px]">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Avg. trade speed
            </p>

            <p className="text-[11px] font-[500] text-white">60 Min</p>
          </div>

          <div className="flex gap-[15px]">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Min Purchase
            </p>

            <p className="text-[11px] font-[500] text-white">
              {`20`} {props.currency}
            </p>
          </div>

          <div className="flex gap-[15px]">
            <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
              Max Purchase
            </p>

            <p className="text-[11px] font-[500] text-white">
              {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
              {props.currency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
