import React from "react";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdOutlineVerified } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

const VendorCard = (props) => {
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
          <img className="w-[50px] rounded-full" src={landingImg4} alt="" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex justify-between">
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
            <div>
              {props.availability == "online" ? (
                <>
                  <p className="text-[13px] font-[600] text-tradeGreen">
                    &#8226; Online
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[13px] font-[600] text-neutral-600">
                    &#8226; Offline
                  </p>
                </>
              )}
            </div>
          </div>
          <p className="mt-[5px] text-[15px] font-[600]">{props.username}</p>
          <div className="mt-[5px] flex gap-[20px] items-center">
            <div className=" flex items-center gap-[3px] ">
              <IoMdThumbsUp className="text-[15px] text-tradeGreen" />
              <p className="text-[14px]">{`${parseInt(
                props.reviews
              ).toLocaleString()}`}</p>
            </div>
            <div className="">
              <p className="text-[14px]">
                Trust Score :{" "}
                <small className="text-[14px]">{props.trustScore}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] py-[10px] border-t">
        <p className="text-[15px] font-[400]">
          Service :{" "}
          <small className="text-[15px] font-[800] text-neutral-500 ">
            {props.service}
          </small>
        </p>
        <p className="text-[15px] font-[400]">
          Max Purchase :{" "}
          <small className="text-[15px] font-[800] text-neutral-500">
            {`${parseInt(props.purchaseLimit).toLocaleString()}`}{" "}
            {props.currency}
          </small>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p
          onClick={() => handleOfferClick(props.id)}
          className="px-[15px] py-[4px] rounded-[5px] border border-white hover:border-tradeGreen bg-tradeGreen hover:bg-white text-[15px] font-[600] w-max cursor-pointer"
        >
          View Rate
        </p>

        <div
          id="vendorFavourite"
          className="px-[10px] py-[4px] border rounded-[4px] hover:bg-neutral-100 cursor-pointer"
        >
          <FaRegStar className="text-[20px] text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
