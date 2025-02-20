import React from "react";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdOutlineVerified } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";
import { SiTrustpilot } from "react-icons/si";

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
     
      <div className="bg-white border border-neutral-600 p-[10px] rounded-[8px]">
        <div className="flex gap-[5px] sm:gap-[10px]">
          <div className="hidden sm:flex items-start">
            <img className="w-[40px] rounded-full" src={landingImg4} alt="" />
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex items- justify-between">
              <div className="flex flex-col gap-[px]">
                <div className="flex sm:hidden">
                  {props?.verified ? (
                    <>
                      <div
                        id="vendorVerified"
                        className="w-max flex items-center gap-[3px] rounded-[3px] cursor-pointer "
                      >
                        <MdOutlineVerified className="text-neutral-600 text-[12px]" />
                        <p className="text-neutral-600 font-[700] text-[12px]">
                          Verified Offer
                        </p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="hidden sm:flex">
                  {props.availability == "online" ? (
                    <>
                      <p className="text-[13px] font-[400]">
                        <small className="text-[13px] font-[700] flex items-center text-tradeGreen">
                          &#x2022; Online
                        </small>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] font-[400]">
                        <small className="text-[13px] font-[700] flex items-center text-tradeFadeWhite">
                          &#x2022; Offline
                        </small>
                      </p>
                    </>
                  )}
                </div>
                <div className=" flex items-center gap-[2px]">
                  <div className="flex sm:hidden">
                    {props.availability == "online" ? (
                      <>
                        <p className="text-[13px] font-[400]">
                          <small className="text-[18px] font-[700] flex items-center text-tradeGreen">
                            &#x2022;
                          </small>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[13px] font-[400]">
                          <small className="text-[18px] font-[700] flex items-center text-tradeFadeWhite">
                            &#x2022;
                          </small>
                        </p>
                      </>
                    )}
                  </div>
                  <p className=" text-[13px] font-[600]">{props.username}</p>
                </div>
                <div className="flex flex-co gap-[10px] ">
                  <div className="">
                    <p className="text-[13px] flex items-center gap-[3px] font-[600]">
                      {" "}
                      <IoMdThumbsUp className="text-[13px] text-tradeGreen" />{" "}
                      {`${parseInt(props.reviews).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-[13px] flex items-center gap-[3px] font-[600]">
                      {" "}
                      <SiTrustpilot className="text-[13px] text-tradeOrange" />{" "}
                      {`${props.trustScore}%`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col">
                <div>
                  {props?.verified ? (
                    <>
                      <div
                        id="vendorVerified"
                        className="w-max flex items-center gap-[3px] rounded-[3px] cursor-pointer "
                      >
                        <MdOutlineVerified className="text-neutral-600 text-[12px]" />
                        <p className="text-neutral-600 font-[700] text-[12px]">
                          Verified Offer
                        </p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-[13px] font-[400]">
                  Buying :{" "}
                  <small className="text-[13px] font-[600] text-black">
                    {props.service} Funds
                  </small>
                </p>
                <p className="text-[13px] font-[400]">
                  Avg. trade speed:{" "}
                  <small className="text-[13px] font-[600] text-black">
                    60 Minutes
                  </small>
                </p>
              </div>

              <div className=" flex flex-col justify-between">
                <p className=" flex sm:hidden text-[13px] font-[400]">
                  Buying : {""}
                  <small className="text-[13px] font-[600] text-black">
                    {props.service} Funds
                  </small>
                </p>
                <p className="text-[13px] font-[400]">
                  Min Purchase :{" "}
                  <small className="text-[13px] font-[600] text-black">
                    {`20`} {props.currency}
                  </small>
                </p>
                <p className="text-[13px] font-[400]">
                  Max Purchase :{" "}
                  <small className="text-[13px] font-[600] text-black">
                    {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
                    {props.currency}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-[10px] border-t"></div>
        <div className="flex items-end  justify-between">
          <div className="">
            <p className="text-[13px] font-[400]">
              Min Purchase :{" "}
              <small className="text-[13px] font-[600] text-black">
                {`20`} {props.currency}
              </small>
            </p>
            <p className="text-[13px] font-[400]">
              Max Purchase :{" "}
              <small className="text-[13px] font-[600] text-black">
                {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
                {props.currency}
              </small>
            </p>
          </div>

          <div className="flex flex-co gap-[5px]">
            <p
              onClick={() => handleOfferClick(props.id)}
              className="px-[20px] py-[6px] rounded-[5px] border border-white hover:border-tradeGreen bg-tradeGreen hover:bg-white text-[14px] font-[600] w-max cursor-pointer"
            >
              Sell
            </p>
            <div
              id="vendorFavourite"
              className="max-w-max px-[8px] py-[6px] flex items-center border rounded-[5px] hover:bg-neutral-100 cursor-pointer"
            >
              <FaRegStar className="text-[18px] text-neutral-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferCard;
