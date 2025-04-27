import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsPinAngle } from "react-icons/bs";
import { BsChatText } from "react-icons/bs";

const MessageSideNav = () => {
  const navigateTo = useNavigate();
  return (
    <div className="bg-tradeAs lg:flex flex-col hidden w-[280px] gap-[5px]">
      <div className="py-[10px] pr-[15px]">
        <div className="lg:flex hidden items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[6px] gap-[10px] rounded-[12px]">
          <FaMagnifyingGlass className="text-neutral-500 lg:text-[15px] text-[18px]" />
          <input
            className=" bg-transparent outline-none h-[28px] w-[220px]  placeholder:text-tradeFadeWhite text-[12px] text-white"
            type="text"
            placeholder="Search chats"
          />
        </div>
      </div>
      <div className="py-[10px] pr-[15px] flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex items-center gap-[10px]">
            <BsPinAngle className="text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite text-[14px]">Pinned</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[10px] p-[10px] bg-tradeAsh rounded-[16px]">
              <div className="flex justify-between ">
                <p className="text-white text-[14px] font-[500]">Sane</p>
                <p className="text-white text-[12px] font-[500]">4 day ago</p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-tradeFadeWhite text-[13px]">
                  I want to exchnage 500 USD worth of zelle funds..
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] p-[10px] bg-tradeAsh rounded-[16px]">
              <div className="flex justify-between ">
                <p className="text-white text-[14px] font-[500]">Sane</p>
                <p className="text-white text-[12px] font-[500]">4 day ago</p>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-tradeFadeWhite text-[13px]">
                  I want to exchnage 500 USD worth of zelle funds..
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-[10px]">
            <BsChatText className="text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite text-[14px]">All</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MessageSideNav;
