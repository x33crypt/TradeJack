import React from "react";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdOutlineVerified } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-white border border-neutral-600 p-[15px] rounded-[8px]">
      <div className="flex gap-[10px]">
        <div>
          <img className="w-[40px] rounded-full" src={landingImg4} alt="" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex items-end justify-between">
            <div>
              <div>
                {props?.verified ? (
                  <>
                    <div
                      id="vendorVerified"
                      className="w-max flex items-center gap-[3px] rounded-[3px] cursor-pointer "
                    >
                      <MdOutlineVerified className="text-neutral-600 text-[12px]" />
                      <p className="text-neutral-600 font-[700] text-[12px]">
                        Verified
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    id="vendorNotVerified"
                    className="w-max flex items-center gap-[3px] rounded-[3px] cursor-pointer"
                  >
                    <p className="text-neutral-600 font-[700] text-[12px]">
                      Not verified
                    </p>
                  </div>
                )}
              </div>
              <div className="">
                <p className=" text-[14px] font-[600]">{props.username}</p>
              </div>
              <div className="flex gap-[10px] ">
                <div className="">
                  <p className="text-[13px] flex items-center gap-[3px]">
                    {" "}
                    <IoMdThumbsUp className="text-[13px] text-tradeGreen" />{" "}
                    {`${parseInt(props.reviews).toLocaleString()}`}
                  </p>
                </div>
                <div className="">
                  <p className="text-[13px]">
                    Trust Score :{" "}
                    <small className="text-[13px]">{props.trustScore}</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                {props.availability == "online" ? (
                  <>
                    <p className="text-[14px] font-[400]">
                      <small className="text-[14px] font-[600] text-tradeGreen">
                        Online
                      </small>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[14px] font-[400]">
                      <small className="text-[14px] font-[600]  text-neutral-600">
                        Offline
                      </small>
                    </p>
                  </>
                )}
              </div>
              <p className="text-[14px] font-[400]">
                Service :{" "}
                <small className="text-[14px] font-[700] text-black">
                  {props.service}
                </small>
              </p>
              <p className="text-[14px] font-[400]">
                Avg. trade speed:{" "}
                <small className="text-[14px] font-[700] text-black">
                  60 Minutes
                </small>
              </p>
            </div>
            <div className="">
              <p className="text-[14px] font-[400]">
                Min Purchase :{" "}
                <small className="text-[14px] font-[700] text-black">
                  {`20`} {props.currency}
                </small>
              </p>
              <p className="text-[14px] font-[400]">
                Max Purchase :{" "}
                <small className="text-[14px] font-[700] text-black">
                  {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
                  {props.currency}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex items-end  justify-between py-[10px] border-t">
        <div className="flex flex-col gap-[4px]">
          <div>
            <p className="text-[14px] font-[400]">Rate(s) </p>
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[13px] font-[700] text-black">
              {`100 - 500 ${props.currency} @ 550 NGN per ${props.currency}`}
            </p>
            <p className="text-[13px] font-[700] text-black">
              {`100 - 500 ${props.currency} @ 550 NGN per ${props.currency}`}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-tradeAshLight font-[400]">
              View offer for more rates.
            </p>
          </div>
        </div>

        <div className="flex gap-[10px]">
          <div
            id="vendorFavourite"
            className="px-[8px] py-[4px] border rounded-[4px] hover:bg-neutral-100 cursor-pointer"
          >
            <FaRegStar className="text-[18px] text-neutral-500" />
          </div>
          <p
            onClick={() => handleOfferClick(props.id)}
            className="px-[15px] py-[4px] rounded-[5px] border border-white hover:border-tradeGreen bg-tradeGreen hover:bg-white text-[14px] font-[600] w-max cursor-pointer"
          >
            View Offer
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
