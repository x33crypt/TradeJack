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
            onClick={() => navigateTo("/account/settings/username")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Username</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.username || "Choose a unique username"}
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
                  : "Full name not added yet"}
              </p>
            </div>
            <div className="text-white text-[22px] opacity-0">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Email */}
          <div
            className="flex items-center py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/account/settings/email")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Email</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.email || "Email not linked yet"}
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
            onClick={() => navigateTo("/account/settings/kycVerification")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">KYC Verification</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.kycStatus || "Verification not started"}
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
                {profile?.gender || "Not specified"}
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
                {profile?.dateOfBirth || "Birth date not provided"}
              </p>
            </div>
            <div className="text-white text-[22px] opacity-0">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Mobile */}
          <div
            className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/account/settings/mobile")}
          >
            <div className="flex-1 flex justify-between gap-[2px]">
              <p className="text-[13px] font-[600] text-white">Mobile Number</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                {profile?.phone || "Mobile number not added"}
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>

          {/* Address */}
          <div
            className="flex items-center py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300"
            onClick={() => navigateTo("/account/settings/address")}
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

        <div className=" flex flex-col  bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          <div
            className="flex items-center  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight   cursor-pointer transition-all duration-300 "
            // onClick={() => navigateTo("/account/update/name")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-[13px] font-[600] text-white">
                Management of Account
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>

        <div className=" flex flex-col  bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          <div
            className="flex items-center  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300 "
            // onClick={() => navigateTo("/account/update/name")}
          >
            <div className="flex-1 flex flex-col justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-[13px] font-[600] text-white">Trade Partner</p>
              <p className="text-tradeFadeWhite text-[13px] font-[600]">
                Manage your relationship
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
