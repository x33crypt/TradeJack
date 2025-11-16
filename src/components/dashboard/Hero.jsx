import React, { useState, useEffect } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";
import { IoFileTrayStacked } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { RiExchange2Fill } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HiLightningBolt } from "react-icons/hi";

const Hero = ({ dashboard, loading }) => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex flex-1 ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className=" flex flex-1 flex-col gap-[25px]">
                <div className="flex flex-1 min-h-[100px] flex-col gap-[10px] bg-tradeAsh rounded-[15px] border border-tradeAshLight p-[12px]"></div>
                <div className="lg:flex hidden w-full  gap-[10px] items-center">
                  <div
                    onClick={() => navigateTo("/offers")}
                    className="flex flex-1 items-center justify-between bg-tradeAsh hover:bg-tradeOrange text-white hover:text-black border border-tradeAshLight p-[12px] gap-2 rounded-[12px] cursor-pointer duration-300 transition-all"
                  >
                    <p className="text-[13px] font-semibold">My Offers</p>
                    <div className="w-max flex gap-1 items-center justify-center  h-max cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                      <IoFileTrayStacked className="text-base " />
                    </div>
                  </div>

                  <div
                    // onClick={Deposit}
                    className="flex flex-1 items-center justify-between bg-tradeAsh hover:bg-tradeOrange text-white hover:text-black border border-tradeAshLight p-[12px] gap-2 rounded-[12px] cursor-pointer duration-300 transition-all"
                  >
                    <p className="text-[13px] font-semibold">Save(s)</p>
                    <div className="w-max flex gap-1 items-center justify-center  h-max cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                      <IoMdBookmark className="text-base" />
                    </div>
                  </div>
                  <div
                    onClick={() => navigateTo("/partners")}
                    className="flex flex-1 items-center justify-between bg-tradeAsh hover:bg-tradeOrange text-white hover:text-black border border-tradeAshLight p-[12px] gap-2 rounded-[12px] cursor-pointer duration-300 transition-all"
                  >
                    <p className="text-[13px] font-semibold">Trade Partners</p>
                    <div className="w-max flex gap-1 items-center justify-center  h-max cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                      <FaUserFriends className="text-base" />
                    </div>
                  </div>
                  <div
                    // onClick={Deposit}
                    className="flex flex-1 items-center justify-between bg-tradeAsh hover:bg-tradeOrange text-white hover:text-black border border-tradeAshLight p-[12px] gap-2 rounded-[12px] cursor-pointer duration-300 transition-all"
                  >
                    <p className="text-[13px] font-semibold">Advertisement</p>
                    <div className="w-max flex gap-1 items-center justify-center  h-max cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                      <HiLightningBolt className="text-base" />
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

export default Hero;
