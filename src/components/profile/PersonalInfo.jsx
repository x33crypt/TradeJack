import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex-1 md:border border-tradeAshLight gap-[20px] md:gap-0 flex flex-col ">
      <div className="flex md:p-[15px] py-[15px]  border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">Personal Information</p>
      </div>

      <div className="flex md:p-[15px] flex-col gap-[20px] ">
        <div className=" flex flex-col bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/username")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Username</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">
                Saneghxst
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/name")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Full name</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">
                Adeleke Lukman
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/email")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Email</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">
                Saneghxst919@gmail.com
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>

        <div className=" flex flex-col  bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/kyc")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">KYC Levels</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">Tier 2</p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            // onClick={() => navigateTo("/account/update/name")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Gender</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">Male</p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            // onClick={() => navigateTo("/account/update/name")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Date of birth</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">
                Feb **, **
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/mobile")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Mobile Number</p>

              <p className="text-tradeFadeWhite text-sm font-[600]">
                0803883211
              </p>
            </div>
            <div className="text-white text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div
            className="flex items-center  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300 "
            onClick={() => navigateTo("/account/settings/address")}
          >
            <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
              <p className="text-sm font-[600] text-white">Address</p>
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
              <p className="text-sm font-[600] text-white">
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
              <p className="text-sm font-[600] text-white">Trade Partner</p>
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
