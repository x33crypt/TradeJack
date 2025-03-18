import DashSideNav from "@/components/dashboard/DashSideNav";
import InAppNav from "@/components/InAppNav";
import React from "react";
import landingImg4 from "./../assets/landingImg4.JPG";
import { GoDotFill } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { IoAttach } from "react-icons/io5";

const TradeChat = () => {
  return (
    <>
      <InAppNav />
      <div className=" lg:pt-[80px] md:pt-[85px] pt-[67px] flex gap-[15px] min-h-screen bg-black lg:p-[2%] md:p-[2.5%] ">
        <DashSideNav />
        <div className="flex-1 flex justify-between flex-col md:border border-tradeAshLight md:rounded-[10px]">
          <div className=" flex justify-between items-center gap-[10px] p-[15px]  border-b border-tradeAshLight ">
            <div className="flex items-center gap-[10px]">
              <div className="w-[35px]">
                <img className="rounded-full" src={landingImg4} alt="" />
              </div>

              <div className="flex gap-[10px]">
                <p className=" text-[18px] text-white font-[700] cursor-pointer">
                  0xSanityy
                </p>
                <div className="flex items-center gap-[2px]">
                  <GoDotFill className=" text-[14px] text-tradeGreen" />
                  <p className="text-tradeFadeWhite text-[13px] font-[600]">
                    Online
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex borde border-tradeAshLight p-[5px] rounded-[6px]">
              <SlOptionsVertical className="text-white text-[16px]" />
            </div>
          </div>
          <div className="bg- px-[15px] h-full overflow-y-auto">hello</div>
          <div className="flex items-center gap-[10px] p-[15px] border-t border-tradeAshLight">
            <div className="p-[6px] rounded-full bg-white text-[20px] text-black cursor-pointer">
              <IoAttach />
            </div>
            <div className="flex-1 flex gap-[20px] bg-tradeAsh border border-tradeAshExtraLight p-[6px] rounded-[10px]">
              <input
                className="w-full outline-none px-[4px]  py-[2px] text-[15px] text-white placeholder:text-tradeFadeWhite bg-tradeAsh caret-tradeGreen"
                type="text"
                placeholder="Write a message..."
              />
            </div>
            <div className="p-[6px] rounded-full bg-white text-[20px] text-black cursor-pointer">
              <TbBrandTelegram />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeChat;
