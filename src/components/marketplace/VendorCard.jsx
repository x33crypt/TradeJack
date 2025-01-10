import React from "react";
import landingImg4 from "../../assets/landingImg4.JPG";
import { MdOutlineVerified } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

const VendorCard = () => {
  return (
    <div className="bg-white border border-neutral-600 p-[15px] rounded-[8px] cursor-pointer">
      <div className="flex gap-[10px]">
        <div>
          <img className="w-[50px] rounded-full" src={landingImg4} alt="" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex justify-between">
            <div className="w-max flex items-center gap-[3px] rounded-[3px] ">
              <MdOutlineVerified className="text-neutral-600 text-[12px]" />
              <p className="text-neutral-600 font-[700] text-[12px]">
                Verified
              </p>
            </div>
            <p className="text-[13px] font-[600] text-tradeGreen">Online</p>
          </div>
          <p className="mt-[5px] text-[15px] font-[600]">X33crypt</p>
          <div className="mt-[5px] flex gap-[20px] items-center">
            <div className=" flex items-center gap-[3px] ">
              <IoMdThumbsUp className="text-[15px] text-tradeGreen" />
              <p className="text-[14px]">5,456</p>
            </div>
            <div className="">
              <p className="text-[14px]">
                Trust Score : <small className="text-[14px]">75%</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px] py-[10px] border-t">
        <p className="text-[15px] font-[400]">
          Service :{" "}
          <small className="text-[15px] font-[700] text-neutral-500 ">
            Cashapp
          </small>
        </p>
        <p className="text-[15px] font-[400]">
          Max Purchase :{" "}
          <small className="text-[15px] font-[700] text-neutral-500">
            500 USD
          </small>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="px-[15px] py-[4px] rounded-[5px] bg-tradeGreen text-[15px] font-[600] w-max">
          View Rate
        </p>

        <div className="px-[10px] py-[4px] border rounded-[4px] hover:bg-neutral-100">
          <FaRegStar className="text-[20px] text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
