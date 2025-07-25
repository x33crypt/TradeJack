import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ profile }) => {
  const navigateTo = useNavigate();

  return (
    <div className="flex-1 md:border border-tradeAshLight flex flex-col ">
      <div className="flex p-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Personal Information</p>
      </div>

      <div className="flex p-[15px] flex-col gap-[10px] ">
        <div className="flex flex-col bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          {/* Username */}
          <div
            className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/settings/account/name")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Username</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.userName || "Not set"}
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Full Name */}
          <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Full name</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.lastName || profile?.firstName
                  ? `${profile?.lastName || ""} ${
                      profile?.firstName || ""
                    }`.trim()
                  : "Not set"}
              </p>
            </div>
            <div className="text-white text-[22px] opacity-0">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Email */}
          <div
            className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/settings/account/email")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Email address</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.email || "Not set"}
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          {/* KYC */}
          <div
            className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/account/kycStatus")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">KYC status</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.kycStatus || "Not verified"}
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Gender</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.gender || "Not set"}
              </p>
            </div>
            <div className="text-tradeAsh text-[22px] opacity-0">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Date of birth</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.dateOfBirth || "Not set"}
              </p>
            </div>
            <div className="text-white text-[22px] opacity-0">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Mobile */}
          <div
            className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/settings/account/mobile")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Mobile number</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.phone || "Not set"}
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Address */}
          <div
            className="flex items-center py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/account/address")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Address</p>
              {/* <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.address || "Not set"}
              </p> */}
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>

        {/* <div className=" flex flex-col  bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          <div className="flex items-center  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight   cursor-pointer transition-all duration-300 ">
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-[13px] font-[600] text-white">
                Manage account
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PersonalInfo;
