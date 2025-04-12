import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../assets/landingImg4.JPG";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { PiHorseBold } from "react-icons/pi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { PiHandDepositBold } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbAlignBoxRightTop } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import UserProfileNav from "@/components/UserProfileNav";

const UserProfile = () => {
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isBankAccountEdit, setIsBankAccountEdit] = useState(false);
  const [isOnlineWalletEdit, setIsOnlineWalletEdit] = useState(false);

  const profileRef = useRef(null);
  const bankAccountRef = useRef(null);
  const walletRef = useRef(null);

  const navigateTo = useNavigate();
  const location = useLocation();

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

      <div className="lg:pt-[75px] md:pt-[75px] pt-[60px] pb-[10px] lg:px-[2%] md:px-[2.5%] min-h-screen bg-black">
        <div className=" flex md:hidden items-center gap-[10px] p-[15px]  border-b border-tradeAshLight ">
          <p className=" text-[17px] text-white font-[700] cursor-pointer">
            Profile
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-[25px] gap-[20px] p-[15px] md:p-0">
          <div className=" lg:w-[300px] md:w-[250px] flex flex-col gap-[20px]  sm:p-0 borde border-tradeAshLight bg-tradeAs rounded-[14px]">
            <div className="flex justify-center cursor-pointer ">
              <img
                className="rounded-full lg:w-[250px] md:w-[220px] w-[180px]"
                src={image}
                alt=""
              />
            </div>

            <div className="flex flex-col gap-[10px] ">
              <div className="flex items-cente flex-col">
                <p className="text-white lg:text-[24px] sm:text-[22px] text-[23px] font-[700]">
                  Adeleke Lukman
                </p>
                <p className="text-tradeFadeWhite lg:text-[18px] sm:text-[16px] text-[17px] font-[500]">
                  sanityy0x
                </p>
              </div>

              <div className="flex flex-col gap-[2px]">
                <div className="flex gap-[10px]">
                  <div className="flex gap-[3px] items-center">
                    <p className="text-white lg:text-[13px] sm:text-[13px] text-[14px] font-[500]">
                      #TopTrader
                    </p>
                    <PiHorseBold className="text-tradeOrange" />
                  </div>
                  <p className="text-tradeGreen lg:text-[13px] sm:text-[13px] text-[14px] font-[500]">
                    Online
                  </p>
                </div>

                <div className="flex items-center gap-[3px]">
                  <div className="flex items-center gap-[5px]">
                    <p className="lg:text-[13px] sm:text-[13px] text-[14px] font-[500] text-white">
                      Nigeria
                    </p>
                  </div>
                  <p className="lg:text-[14px] sm:text-[13px] text-[14px] font-[700] text-tradeFadeWhite">
                    &#x2022;
                  </p>
                  <p className="lg:text-[13px] sm:text-[13px] text-[14px] font-[500] text-tradeFadeWhite">
                    Joined 3 weeks ago
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setIsProfileEdit((prev) => !prev)}
              className={`${
                isProfileEdit
                  ? "text-black bg-tradeGreen border-tradeAshExtraLight"
                  : "bg-tradeAsh  border-tradeAshLight hover:text-white text-tradeFadeWhite "
              } flex items-center justify-center border gap-[10px]  px-[12px] py-[7px] rounded-[7px] cursor-pointer transition-all duration-300`}
            >
              <p className="text-[14px] font-[500]">
                {" "}
                {isProfileEdit ? "Save Changes" : "Edit Profile"}
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                <div className="flex gap-[5px] items-center">
                  <MdThumbUpAlt className="text-[15px] text-tradeGreen" />
                  <p className=" text-[12px] font-[600] text-white">
                    Positive Feedback
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <p className="text-white text-[15.5px] font-[600]">&#43;0</p>
                </div>
              </div>
              <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                <div className="flex gap-[5px] items-center">
                  <MdThumbDownAlt className="text-[15px] text-red-500" />
                  <p className=" text-[12px] font-[600] text-white">
                    Negative Feedback
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <p className="text-white text-[15.5px] font-[600]">&#43;0</p>
                </div>
              </div>
              <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                <div className="flex gap-[5px] items-center">
                  <FaRegStar className="text-tradeOrange text-[12px]" />
                  <p className=" text-[12px] font-[600] text-white">
                    Trust score
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <p className="text-white text-[15.5px] font-[600]">
                    {" "}
                    57&#37;
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-[20px] lg:p-[15px] md:p-[10px] p-0 md:border border-tradeAshLight bg-tradeAs rounded-[14px]">
            <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[8px]">
              <div className="flex flex-col justify-between p-[10px] border-b border-tradeAshLight">
                <p className="text-[17px] text-white font-[700]">
                  Personal Information
                </p>
              </div>
              <div className="p-[10px]">
                <div className=" flex flex-col  gap-[20px] ">
                  <div className="flex-1 flex flex-col gap-[5px] ">
                    <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                      Full name
                    </p>
                    <input
                      ref={profileRef}
                      className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                        isProfileEdit
                          ? "cursor-text border-tradeAshExtraLight bg-black"
                          : "cursor-default bg-tradeAsh "
                      }`}
                      type="text"
                      readOnly={!isProfileEdit}
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-[5px]">
                    <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                      Username
                    </p>
                    <input
                      className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                        isProfileEdit
                          ? "cursor-text border-tradeAshExtraLight bg-black"
                          : "cursor-default bg-tradeAsh "
                      }`}
                      type="text"
                      readOnly={!isProfileEdit}
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-[5px]">
                    <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                      Email address
                    </p>
                    <input
                      className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                        isProfileEdit
                          ? "cursor-text border-tradeAshExtraLight bg-black"
                          : "cursor-default bg-tradeAsh "
                      }`}
                      type="text"
                      readOnly={!isProfileEdit}
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-[5px]">
                    <p className="text-[12.5px] font-[500] text-tradeFadeWhite">
                      Phone number
                    </p>
                    <input
                      className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px]  rounded-[8px] border border-neutral-700 outline-none transition-all duration-300 ${
                        isProfileEdit
                          ? "cursor-text border-tradeAshExtraLight bg-black"
                          : "cursor-default bg-tradeAsh "
                      }`}
                      type="text"
                      readOnly={!isProfileEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[8px]">
              <div className="flex flex-col justify-between p-[10px] border-b border-tradeAshLight">
                <p className="text-[17px] text-white font-[700]">Badges</p>
              </div>
              <div className="p-[10px]">
                <div className=" flex flex-col gap-[20px] "></div>
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
