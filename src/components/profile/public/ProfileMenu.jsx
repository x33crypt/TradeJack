import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";

const ProfileMenu = () => {
  const navigateTo = useNavigate();

  return (
    <div className="hidden lg:flex sticky top-[70px] h-max w-[250px] gap-[10px] flex-col ">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[20px] rounded-[15px] border border-tradeAsh">
        {/* <div className="flex px-2.5 py-1.5 gap-2 items-center bg-tradeAsh flex-1 rounded-sm ">
          <div className="text-lg text-tradeFadeWhite">
            <HiOutlineMagnifyingGlass />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-[150px] h-full text-[13px] font-medium outline-none text-white placeholder:text-tradeFadeWhite"
            />
          </div>
          <div className="text-lg text-tradeFadeWhite">
            <IoCloseSharp />
          </div>
        </div> */}
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              ACTIVITY STATS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              ACTIVE OFFERS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              TRADE HISTORY
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              FEEDBACKS
            </p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default ProfileMenu;
