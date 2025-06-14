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
import { TbEye } from "react-icons/tb";
import { TbEyeFilled } from "react-icons/tb";
import { RiEye2Fill } from "react-icons/ri";

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
        <div className="flex lg:flex-row flex-col  lg:pb-[15px] md:items-cente gap-[20px]  border-0 lg:border-0 lg:border-b border-tradeAshLight rounded-[10px] lg:rounded-none">
          <div className="flex-1 bg-tradeGree flex flex-col md:flex-row md:gap-[20px] gap-[20px] items-center ">
            <div className="flex lg:w-[200px] md:w-[170px] w-[150px] shrink-0 justify-center cursor-pointer ">
              <img className="rounded-full" src={image} alt="" />
            </div>

            <div className="flex w-full flex-col justify-center lg:gap-4 md:gap-[10px] gap-4 lg:border-r border-tradeAshLight">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-tradeOrange">
                  <p className=" text-xs font-bold">MASTER TRADER</p>
                  <GiTopHat />
                </div>

                <p className="mt-0 text-white lg:text-[55px] md:text-[45px] text-[30px] font-[900] leading-none ">
                  0xHabib
                </p>
              </div>

              <div className="flex items-center md:gap-5 gap-3">
                <div className="flex md:flex-col gap-1 items-center">
                  <p className="md:flex hidden text-tradeFadeWhite text-xs font-bold">
                    LOCATION
                  </p>
                  <FaLocationDot className="md:hidden flex text-tradeFadeWhite text-[13px] leading-none" />
                  <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-white">
                    Nigeria
                  </p>
                </div>

                <div className="flex md:flex-col gap-1 items-center">
                  <p className="md:flex hidden text-tradeFadeWhite text-xs font-bold">
                    LAST SEEN
                  </p>
                  <RiEye2Fill className="md:hidden flex text-tradeGreen text-[13px] leading-none" />
                  <p className="mt-0 text-tradeGreen text-[14px] font-[600]">
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-tradeAshLight ">
            <p className="hidden">g</p>
          </div>

          <div className="flex-1 flex items-center bg-tradeOrang p-[12px] lg:p-0 border md:border-0 border-tradeAshLight rounded-[10px] bg-tradeAsh lg:bg-transparent">
            <div className="grid md:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-[35px] bg-tradeOrang w-full h-max">
              <div className="flex w-full flex-col gap-2 bg-tradeGree">
                <p className="text-tradeFadeWhite text-xs font-bold">
                  POSITIVE FEEDBACK
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1  rounded-full bg-[#00de82]/30 ">
                    <MdThumbUpAlt className="text-tradeGreen text-[16px] leading-none" />
                  </div>

                  <p className="text-[25px] text-white font-[900] leading-none">
                    1,2K+
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-tradeGree">
                <p className="text-tradeFadeWhite text-xs font-bold">
                  NEGATIVE FEEDBACK
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1  rounded-full bg-red-600/30">
                    <MdThumbDownAlt className="text-red-600 text-[16px] leading-none" />
                  </div>

                  <p className="text-[25px] text-white font-[900] leading-none">
                    29
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs font-bold">
                  TRUST SCORE
                </p>
                <div className="flex gap-2">
                  <div className="p-1  rounded-full bg-tradeOrange/30">
                    <MdOutlineGppGood className="text-tradeOrange text-[17px] leading-none" />
                  </div>
                  <p className="text-[25px] text-white font-[900] leading-none">
                    56%
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs font-bold">
                  OVERALL TRADES
                </p>

                <div className="flex items-end gap-2">
                  <p className="text-[25px] text-white font-[900] leading-none">
                    5,9K
                  </p>
                </div>
              </div>

              <div className=" lg:flex hidden flex-col gap-2">
                <p className="text-tradeFadeWhite text-xs font-bold">
                  FAVOURITE VENDORS
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-[25px] text-white font-[900] leading-none">
                    9
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex lg:flex-row flex-col gap-[20px]">
          <div className="flex-1 flex flex-col md:border border-tradeAshLight  rounded-[14px]">
            <div className="flex p-[15px] border-b border-neutral-800 ">
              <p className="text-[17px] text-white font-[600] cursor-pointer">
                Personal Information
              </p>
            </div>

            <div className=" flex flex-col p-[15px] gap-[20px] ">
              <div
                className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight rounded-[8px] cursor-pointer transition-all duration-300 "
                onClick={() => navigateTo("/account/update/name")}
              >
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Full name
                  </p>

                  <p className="text-white text-[15px] font-[600]">
                    Adeleke Lukman
                  </p>
                </div>
                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300"
                onClick={() => navigateTo("/account/update/username")}
              >
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Username
                  </p>

                  <p className="text-white text-[15px] font-[600]">sanityy0x</p>
                </div>
                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300"
                onClick={() => navigateTo("/account/update/email")}
              >
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Email address
                  </p>

                  <p className="text-white text-[15px] font-[600]">
                    sanityy0x@gmail.com
                  </p>
                </div>
                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300"
                onClick={() => navigateTo("/account/update/phone")}
              >
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Phone number
                  </p>

                  <p className="text-white text-[15px] font-[600]">
                    08039921211
                  </p>
                </div>
                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300"
                onClick={() => navigateTo("/account/update/address")}
              >
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Address
                  </p>

                  <p className="text-white text-[15px] font-[600]">
                    Igwe Orizu Rd, Nnewi, Anambra
                  </p>
                </div>
                <div className="text-white text-[22px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] transition-all duration-300">
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Country
                  </p>

                  <p className="text-white text-[15px] font-[600]">Nigeria</p>
                </div>
              </div>
              <div className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] transition-all duration-300">
                <div className="flex-1 flex flex-col gap-[2px]  ">
                  <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                    Currency
                  </p>

                  <p className="text-white text-[15px] font-[600]">
                    Nigeria Naira
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[400px] h-[200px] flex flex-col md:flex-row gap-[20px] md:border border-tradeAshLight bg-tradeAs rounded-[14px]">
            <div className="w-full flex flex-col rounded-[8px]">
              <div className="flex p-[15px]  lg:border-b lg:border-t-0 border-y border-neutral-800 ">
                <p className="text-[17px] text-white font-[600] cursor-pointer">
                  Trade Badges
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
