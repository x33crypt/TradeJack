import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsPinAngle } from "react-icons/bs";
import { BsChatText } from "react-icons/bs";

const MessageNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className="lg:flex flex-col hidden w-[300px] max-h-svh pt-[60px]">
      <div className="py-[13px] pr-[15px]">
        <div className="lg:flex hidden items-center bg-tradeAsh border border-tradeAshLight px-[13px] py-[4.2px] gap-[10px] rounded-[10px]">
          <FaMagnifyingGlass className="text-neutral-500 lg:text-[15px] text-[18px]" />
          <input
            className=" bg-transparent outline-none h-[28px] w-[220px]  placeholder:text-tradeFadeWhite text-[13px] text-white"
            type="text"
            placeholder="Search chats"
          />
        </div>
      </div>
      <div className="py-[15px] pr-[15px] flex flex-col gap-[30px] overflow-auto custom-scrollbar">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <BsPinAngle className="text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite text-[14px]">Pinned</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[5px] p-[10px] bg-black hover:bg-tradeAsh cursor-pointer border border-tradeAshLight rounded-[16px]">
              <div className="flex justify-between ">
                <p className="text-white text-[14px] font-[500]">Sane</p>
                <p className="text-white text-[12px] font-[500]">4 day ago</p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-tradeFadeWhite text-[12px]">
                  I want to exchnage 500 USD worth of zelle funds..
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <BsChatText className="text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite text-[14px]">All</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[5px] p-[10px] bg-black hover:bg-tradeAsh cursor-pointer border border-tradeAshLight rounded-[16px]">
              <div className="flex justify-between ">
                <p className="text-white text-[14px] font-[500]">Sane</p>
                <p className="text-white text-[12px] font-[500]">4 day ago</p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-tradeFadeWhite text-[12px]">
                  I want to exchnage 500 USD worth of zelle funds..
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[5px] p-[10px] bg-black hover:bg-tradeAsh cursor-pointer border border-tradeAshLight rounded-[16px]">
              <div className="flex justify-between ">
                <p className="text-white text-[14px] font-[500]">Sane</p>
                <p className="text-white text-[12px] font-[500]">4 day ago</p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-tradeFadeWhite text-[12px]">
                  I want to exchnage 500 USD worth of zelle funds..
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageNav;
