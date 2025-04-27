import DashSideNav from "@/components/dashboard/DashSideNav";

import InAppNav from "@/components/InAppNav";
import React from "react";
import landingImg4 from "./../assets/landingImg4.JPG";
import { GoDotFill } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { IoAttach } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import MessageSideNav from "./MessageSideNav";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { RiShare2Line } from "react-icons/ri";

const Messages = () => {
  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col lg:gap-[px] bg-black lg:px-[2%] md:px-[2.5%]">
        <MessageSideNav />

        <div className="relative flex-1 min-h-svh pt-[60px] gap-[5px] flex flex-col md:border-x border-tradeAshLight md:rounde-[14px]">
          <div className="flex justify-between items-center gap-[10px] px-[15px] py-[13px] border-b border-tradeAshLight w-full">
            <div className="flex items-center gap-[10px]">
              <div className="flex md:hidden  bg-tradeAshLight items-center p-[5px] rounded-[6px] border border-tradeAshExtraLight gap-[10px]">
                <TbLayoutSidebarLeftCollapseFilled className="text-white text-[14px] " />
              </div>
              <div className="relative w-[34px]">
                <img className="rounded-full" src={landingImg4} alt="" />
                <div className="absolute top-[21px] right-0 bg-black rounded-full flex items-center gap-[2px]">
                  <GoDotFill className="text-[13px] text-tradeOrange" />
                </div>
              </div>
              <p className="text-[15px] text-white font-[700] cursor-pointer">
                0xSanityy
              </p>
            </div>
            <div className="flex items-center gap-[10px] p-[5px] rounded-[6px]">
              <div className="flex bg-tradeAshLight items-center p-[5px] rounded-[6px] border border-tradeAshExtraLight gap-[5px]">
                <RiShare2Line className="text-white text-[14px] " />
                <p className=" md:flex hidden text-[11px] text-white font-[600] ">
                  Export Chat
                </p>
              </div>
              <div className="flex bg-tradeAshLight items-center p-[5px] rounded-[6px] border border-tradeAshExtraLight gap-[10px]">
                <CgNotes className="text-white text-[14px] " />
              </div>
              <div className="flex md:hidden  bg-tradeAshLight items-center p-[5px] rounded-[6px] border border-tradeAshExtraLight gap-[10px]">
                <SlOptionsVertical className="text-white text-[14px] " />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-tradeOrang p-[15px] overflow-y-auto custom-scrollbar">
            <div className="text-white text-[14px]">heghcghc</div>
          </div>

          <div className=" px-[15px] py-[15px] ">
            <div className="flex items-center gap-[5px] bg-tradeAsh border border-tradeAshLight p-[10px] rounded-[16px]">
              <div className="text-white text-[20px] p-[5px] rounded-full bg-transparent border border-tradeAshExtraLight ">
                <IoAttach />
              </div>
              <div className="flex-1 flex gap-[20px] bg-tradeOrang borde border-tradeAshExtraLight p-[6px] rounded-[10px]">
                <input
                  className="w-full outline-none  py-[2px] text-[14px] font-[500] placeholder:font-[400] text-white placeholder:text-tradeFadeWhite bg-transparent caret-tradeGreen"
                  type="text"
                  placeholder="Type a message..."
                />
              </div>
              <div className="text-black text-[20px] p-[5px] rounded-full bg-white ">
                <TbBrandTelegram />
              </div>
            </div>
          </div>
        </div>

        <div className=" max-h-svh pt-[60px] lg:flex hidden w-[250px] bg-tradePurpl"></div>
      </div>
    </>
  );
};

export default Messages;
