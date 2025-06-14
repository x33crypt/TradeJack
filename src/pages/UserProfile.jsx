import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import image from "../assets/landingImg4.JPG";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import useSafeNavigate from "@/components/SafeNavigation";
import { GiTopHat } from "react-icons/gi";
import { MdOutlineGppGood } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import { RiEye2Fill } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";

const UserProfile = () => {
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [isBankAccountEdit, setIsBankAccountEdit] = useState(false);
  const [isOnlineWalletEdit, setIsOnlineWalletEdit] = useState(false);

  const profileRef = useRef(null);
  const bankAccountRef = useRef(null);
  const walletRef = useRef(null);

  const navigateTo = useSafeNavigate();

  useEffect(() => {
    if (isBankAccountEdit) {
      bankAccountRef.current?.focus(); // Focuses on the first input field
    }
  }, [isBankAccountEdit]);

  useEffect(() => {
    if (isOnlineWalletEdit) {
      walletRef.current?.focus(); // Focuses on the first input field
    }
  }, [isOnlineWalletEdit]);

  return (
    <>
      <MarketTopNav />

      <div className="md:pt-[80px] pt-[75px] pb-[10px] lg:px-[2%] md:px-[2.5%] p-[15px] min-h-screen flex flex-col gap-[20px] bg-black">
        <div className="flex lg:flex-row flex-col bg-tradePurpl  lg:pb-[15px] md:items-cente gap-[20px]  rounded-[10px] lg:rounded-none">
          <div className="flex-1 bg-tradeGree flex flex-col md:flex-row md:gap-[20px] gap-[20px] items-center ">
            <div className="relative flex lg:w-[200px] md:w-[170px] w-[150px] shrink-0 justify-center cursor-pointer">
              <img className="rounded-full w-full h-auto" src={image} alt="" />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                <TbCameraPlus className="text-white text-[40px]" />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center lg:gap-4 md:gap-[10px] gap-4 lg:border-r border-tradeAshLight">
              <div className="flex flex-col gap-1 ">
                <div className="flex gap-1 items-center text-tradeOrange">
                  <p className=" text-[13px] font-bold">Master Trader</p>
                  <GiTopHat />
                </div>

                <p className="mt-0 text-white lg:text-[40px] md:text-[40px] text-[25px] font-[900] leading-none ">
                  <span className="text-tradeFadeWhite">@</span>Saneghxst
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex  gap-1 items-center ">
                  <FaLocationDot className=" flex text-tradeFadeWhite text-[13px] leading-none" />
                  <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-white">
                    Nigeria
                  </p>
                </div>

                <div className="flex  gap-1 items-center ">
                  <RiEye2Fill className=" flex text-tradeGreen text-[13px] leading-none" />
                  <p className="mt-0 text-tradeGreen text-[14px] font-[600]">
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-tradeAshLight md:flex hidden ">
            <p className="hidden">g</p>
          </div>

          <div className="flex-1 flex items-center bg-tradeOrang p-[12px] lg:p-0 border md:border-0 border-tradeAshLight rounded-[10px] bg-tradeAsh lg:bg-transparent">
            <div className="grid md:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-[35px] bg-tradeOrang w-full h-max">
              <div className="flex w-full flex-col gap-2 bg-tradeGree">
                <p className="text-tradeFadeWhite text-xs md:text-[13px] font-bold">
                  Positive Feedback
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1  rounded-full bg-[#00de82]/30 ">
                    <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-[14px] leading-none" />
                  </div>

                  <p className="text-[20px] md:text-[22px] text-white font-[900] leading-none">
                    1,2K+
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-tradeGree">
                <p className="text-tradeFadeWhite text-xs md:text-[13px] font-bold">
                  Negative Feedback
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1  rounded-full bg-red-600/30">
                    <MdThumbDownAlt className="text-red-600 text-[13px] md:text-[14px] leading-none" />
                  </div>

                  <p className="text-[20px] md:text-[22px] text-white font-[900] leading-none">
                    29
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs md:text-[13px] font-bold">
                  Trust Score
                </p>
                <div className="flex gap-2">
                  <div className="p-1  rounded-full bg-tradeOrange/30">
                    <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-[14px] leading-none" />
                  </div>
                  <p className="text-[20px] md:text-[22px] text-white font-[900] leading-none">
                    56%
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs md:text-[13px] font-bold">
                  Overall Trade
                </p>

                <div className="flex items-end gap-2">
                  <p className="text-[20px] md:text-[22px] text-white font-[900] leading-none">
                    5,9K
                  </p>
                </div>
              </div>

              <div className=" lg:flex hidden flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs md:text-[13px] font-bold">
                  Favourite Vendor
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-[20px] md:text-[22px] text-white font-[900] leading-none">
                    007
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-[20px] ">
          <div className="lg:w-[400px]  md:border border-tradeAshLight gap-[20px] md:gap-0 flex flex-col">
            <div className="flex md:p-[15px] py-[15px]  border-b border-tradeAshLight">
              <p className="text-[17px] text-white font-[700]">Performance</p>
            </div>

            <div className="flex h-[500px] md:h-full md:p-[15px] flex-col gap-[20px]">
              <div className=" flex flex-col gap-[20px] h-full">
                <div className="flex-1 flex flex-col gap-[10px] py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight rounded-[10px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
                  <div className="flex w-full justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-bold">
                      Average Daily Purchase
                    </p>
                    <p className="text-[13px] text-tradeOrange font-bold">
                      0,52%
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[30px] text-white font-[800] leading-none">
                      25,568 NGN
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-[10px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight rounded-[10px] border border-tradeAshLight overflow-hidden cursor-pointer transition-all duration-300 ">
                  <div className="flex w-full justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-bold">
                      Average Daily Purchase
                    </p>
                    <p className="text-[13px] text-tradeGreen font-bold">
                      0,52%
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[30px] text-white font-[800] leading-none">
                      25,568 NGN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1  md:border border-tradeAshLight gap-[20px] md:gap-0 flex flex-col ">
            <div className="flex md:p-[15px] py-[15px]  border-b border-tradeAshLight">
              <p className="text-[17px] text-white font-[700]">
                Personal Information
              </p>
            </div>

            <div className="flex md:p-[15px] flex-col gap-[20px] ">
              <div className=" flex flex-col bg-tradeAsh rounded-[10px] border border-tradeAshLight overflow-hidden">
                <div
                  className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
                  onClick={() => navigateTo("/account/settings/username")}
                >
                  <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
                    <p className="text-[15px] font-[600] text-white">
                      Username
                    </p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
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
                    <p className="text-[15px] font-[600] text-white">
                      Full name
                    </p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
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
                    <p className="text-[15px] font-[600] text-white">Email</p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
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
                  // onClick={() => navigateTo("/account/update/name")}
                >
                  <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
                    <p className="text-[15px] font-[600] text-white">
                      KYC Levels
                    </p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
                      Tier 2
                    </p>
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
                    <p className="text-[15px] font-[600] text-white">Gender</p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
                      Male
                    </p>
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
                    <p className="text-[15px] font-[600] text-white">
                      Date of birth
                    </p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
                      Feb **, **
                    </p>
                  </div>
                  <div className="text-white text-[22px]">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
                <div
                  className="flex items-center gap-[5px]  py-3 px-3  bg-tradeAsh hover:bg-tradeAshLight  border-b border-tradeAshLight cursor-pointer transition-all duration-300 "
                  onClick={() => navigateTo("/account/settings/phone")}
                >
                  <div className="flex-1 flex  justify-between gap-[2px]  bg-tradePurpl ">
                    <p className="text-[15px] font-[600] text-white">
                      Mobile Number
                    </p>

                    <p className="text-tradeFadeWhite text-[15px] font-[600]">
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
                    <p className="text-[15px] font-[600] text-white">Address</p>
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
                    <p className="text-[15px] font-[600] text-white">
                      Wallet Management
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
                    <p className="text-[15px] font-[600] text-white">Vendors</p>
                    <p className="text-tradeFadeWhite text-[13px] font-[600]">
                      Manage your relationship, get benefits
                    </p>
                  </div>
                  <div className="text-white text-[22px]">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
