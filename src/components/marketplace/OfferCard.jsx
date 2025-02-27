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
      {/* <div
        onClick={() => handleOfferClick(props.id)}
        className=" border-b border-tradeAshLight hover:bg-tradeAshLight p-[10px] flex cursor-pointer transition-all duration-300 "
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
              <p className="text-[13px] lg:text-[13px] text-tradeFadeWhite font-[400]">
                Min Purchase :{" "}
                <small className="text-[13px] lg:text-[13px] font-[600] text-white">
                  {`20`} {props.currency}
                </small>
              </p>
              <p className="text-[13px] lg:text-[13px] text-tradeFadeWhite font-[400]">
                Max Purchase :{" "}
                <small className="text-[13px] lg:text-[13px] font-[600] text-white">
                  {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
                  {props.currency}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[10px]">
          <div>
            {" "}
            <p className="text-[13px] lg:text-[14px] font-[400]">
              <small className="text-[14px] font-[600] text-white">
                {props.service}
              </small>
            </p>
          </div>
          <div className="flex flex-col gap-[3px]">
            <p className="hidden sm:flex gap-[2px] text-[13px] lg:text-[14px] font-[400]">
              {" "}
              <small className=" text-[13px] lg:text-[13px] font-[500] text-white">
                Online Wallet Transfer
              </small>
            </p>
            <p className="flex text-[13px] lg:text-[13px] text-tradeFadeWhite font-[400] gap-[2px]">
              Avg. trade speed :{" "}
              <small className="text-[13px] lg:text-[13px] font-[500] text-white">
                60 Minutes
              </small>
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[10px]">
          <div>
            <p className="text-[13px] lg:text-[14px] font-[600] text-white">
              1 {props.currency} = 0.93 USD of BTC
            </p>
          </div>
        </div>
      </div> */}

      <div className="flex justify-between p-[10px]">
        <div className="flex flex-col gap-[4px]">
          <p className=" text-[12px] text-white font-[600] w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
            {props.username}
          </p>
          <p className="text-[13px] lg:text-[14px] font-[400]">
            <small className="text-[16px] font-[600] text-white">
              {props.service}
            </small>
          </p>
          <small className=" text-[11px] font-[500] text-white">
            Online Wallet Transfer
          </small>
          <p className="text-[12px] font-[600] text-white">
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
          
          <p className="flex text-[11px] text-tradeFadeWhite font-[400] gap-[2px]">
            Avg. trade speed :{" "}
            <small className="text-[11px] font-[500] text-white">60 Min</small>
          </p>

          <p className="text-[11px]  text-tradeFadeWhite font-[400]">
            Min Purchase :{" "}
            <small className="text-[11px]  font-[600] text-white">
              {`20`} {props.currency}
            </small>
          </p>
          <p className="text-[11px] text-tradeFadeWhite font-[400]">
            Max Purchase :{" "}
            <small className="text-[11px]  font-[600] text-white">
              {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
              {props.currency}
            </small>
          </p>
        </div>
      </div>

      {/* <div className="bg-white  p-[10px] rounded-[8px]">
        <div className="flex gap-[5px] sm:gap-[10px]">
          <div className="hidden sm:flex items-start">
            <img className="w-[40px] rounded-full" src={landingImg4} alt="" />
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center gap-[3px]">
                <div className="flex sm:hidden">
                  {props?.verified ? (
                    <>
                      <div
                        id="vendorVerified"
                        className="w-max flex items-center gap-[4px] rounded-[3px] cursor-pointer "
                      >
                        <MdOutlineVerified className="text-neutral-600 text-[12px]" />
                        <p className="text-neutral-600 font-[600] text-[12px]">
                          Verified
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="hidden sm:flex">
                  {props.availability == "online" ? (
                    <>
                      <p className="text-[13px] lg:text-[14px] flex font-[600] text-tradeGreen">
                        &#x2022; Online
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] lg:text-[14px] flex font-[600] text-tradeAshExtraLight">
                        &#x2022; Offline
                      </p>
                    </>
                  )}
                </div>
                <div className=" flex items-center gap-[4px]">
                  <div className="flex sm:hidden">
                    {props.availability == "online" ? (
                      <RiRadioButtonLine className="text-[10px] font-[600] flex items-center text-tradeGreen" />
                    ) : (
                      <RiRadioButtonLine className="text-[10px] font-[600] flex items-center text-tradeFadeWhite" />
                    )}
                  </div>
                  <p className=" text-[13px]  sm:text-[14px] font-[600] w-[90px] overflow-hidden sm:overflow-visible text-ellipsis whitespace-nowrap">
                    {props.username}
                  </p>
                </div>
                <div className="flex flex-co gap-[10px] ">
                  <div className="">
                    <p className="text-[13px] lg:text-[14px] flex items-center gap-[4px] font-[600]">
                      {" "}
                      <IoMdThumbsUp className="text-[13px] lg:text-[14px] text-tradeGreen" />{" "}
                      {`${parseInt(props.reviews).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[13px] lg:text-[14px] flex items-center gap-[4px] font-[600]">
                      {" "}
                      <SiTrustpilot className="text-[13px] lg:text-[14px] text-tradeOrange" />{" "}
                      {`${props.trustScore}%`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col gap-[3px]">
                <div>
                  {props?.verified ? (
                    <>
                      <div
                        id="vendorVerified"
                        className="w-max flex items-center gap-[3px] rounded-[3px] cursor-pointer "
                      >
                        <MdOutlineVerified className="text-neutral-600 text-[13.5px]" />
                        <p className="text-neutral-600 font-[600] text-[13.5px] sm:text-[13px]">
                          Verified
                        </p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <p className="hidden sm:flex gap-[2px] text-[13px] lg:text-[14px] font-[400]">
                  Type :{" "}
                  <small className=" text-[13px] lg:text-[14px] font-[600] text-black">
                    Online Wallet Trf
                  </small>
                </p>

                <p className="text-[13px] lg:text-[14px] font-[400]">
                  Service :{" "}
                  <small className="text-[14px] font-[700] text-black">
                    {props.service}
                  </small>
                </p>
              </div>

              <div className=" flex flex-col gap-[3px] ">
                <small className=" flex sm:hidden text-[13px] lg:text-[14px] font-[600] text-black">
                  Online Wallet Trf
                </small>
                <small className="sm:hidden flex text-[14px] font-[700] text-black">
                  {props.service}
                </small>

                <p className="text-[13px] lg:text-[14px] font-[600] text-black">
                  1 {props.currency} = 0.93 USD of BTC
                </p>
                <p className="hidden sm:flex text-[13px] lg:text-[14px] font-[400] gap-[2px]">
                  Avg. trade speed :{" "}
                  <small className="text-[13px] lg:text-[14px] font-[600] text-black">
                    60 Min
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-[10px] border-t"></div>
        <div className="flex items-center justify-between">
          <div className=" flex flex-col gap-[3px]">
            <p className="text-[13px] lg:text-[14px] font-[400]">
              Min Purchase :{" "}
              <small className="text-[13px] lg:text-[14px] font-[600] text-black">
                {`20`} {props.currency}
              </small>
            </p>
            <p className="text-[13px] lg:text-[14px] font-[400]">
              Max Purchase :{" "}
              <small className="text-[13px] lg:text-[14px] font-[600] text-black">
                {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
                {props.currency}
              </small>
            </p>
            <p className=" sm:hidden flex text-[13px] lg:text-[14px] font-[400] gap-[2px]">
              Avg. trade speed :{" "}
              <small className="text-[13px] lg:text-[14px] font-[600] text-black">
                60 Min
              </small>
            </p>
          </div>

          <div className="w-[100px] sm:w-[150px] flex flex-col sm:flex-row gap-[3px]">
            <p
              onClick={() => handleOfferClick(props.id)}
              className="flex items-center gap-[3px] sm:w-[100px] py-[6px] justify-center rounded-[4px] border border-white hover:border-tradeGreen bg-tradeGreen hover:bg-white text-[13px] lg:text-[14px] font-[600] cursor-pointer"
            >
              View
              <small className="sm:flex hidden sm:text-[13px] lg:text-[14px] font-[600]">
                Offer
              </small>
            </p>
            <div
              id="vendorFavourite"
              className="  sm:w-[50px] py-[6px] justify-center flex items-center border rounded-[5px] hover:bg-neutral-100 cursor-pointer"
            >
              <FaRegStar className="text-[18px] text-neutral-600" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OfferCard;
