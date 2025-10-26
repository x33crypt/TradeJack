import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { HiSpeakerphone } from "react-icons/hi";

const AboutMenu = () => {
  const navigateTo = useNavigate();
  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col lg:mb-[15px] ">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div
            onClick={() => navigateTo("/offers")}
            className="flex items-center gap-2"
          >
            <FaEdit className="text-xs text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              EDIT
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaPause className="text-xs text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              PAUSE
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AiFillDelete className="text-sm text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              DELETE
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <HiSpeakerphone className="text-sm text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              MANAGE ADS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaShareAlt className="text-xs text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              SHARE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMenu;
