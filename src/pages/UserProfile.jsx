import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (isProfileEdit) {
      profileRef.current?.focus(); // Focuses on the first input field
    }
  }, [isProfileEdit]);

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
      <div className=" lg:flex hidden lg:pt-[80px] md:pt-[85px] pt-[67px] pb-[10px]  bg-black gap-[15.5px] lg:px-[2%] md:px-[2.5%]">
        <UserProfileNav />
        <div className="flex-1 flex flex-col min-h-screen max-h-max md:border border-neutral-800 md:rounded-[14px]">
          <div className="flex flex-col justify-between p-[15px] border-b border-neutral-800">
            <p className="text-[18px] text-white font-[700]">Your Info </p>
          </div>

          <div className="flex flex-col">
            <div className="lg:flex hidden md:flex-row flex-col justify-between gap-[15px] md:items-center p-[15px]">
              <div className=" flex items-center gap-[20px] rounded-[8px]">
                <div className=" lg:w-[120px] sm:w-[150px] w-[100px] ">
                  <img className="rounded-full" src={image} alt="" />
                </div>

                <div className="flex flex-col gap-[3px] ">
                  <p className="text-white lg:text-[28px] sm:text-[38px] text-[25px] font-extrabold">
                    0xSanityy
                  </p>

                  <div className="flex gap-[10px]">
                    <div className="flex gap-[3px] items-center">
                      <p className="text-white lg:text-[13px] sm:text-[13px] text-[13px] font-[600]">
                        #TopTrader
                      </p>
                      <PiHorseBold className="text-tradeOrange" />
                    </div>
                    <p className="text-tradeGreen lg:text-[13px] sm:text-[13px] text-[13px] font-[600]">
                      Online
                    </p>
                  </div>

                  <div className="flex items-center gap-[3px]">
                    <div className="flex items-center gap-[5px]">
                      <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[600] text-white">
                        Nigeria
                      </p>
                    </div>
                    <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[700] text-tradeFadeWhite">
                      &#x2022;
                    </p>
                    <p className="lg:text-[13px] sm:text-[13px] text-[13px] font-[600] text-tradeFadeWhite">
                      Joined 3 weeks ago
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px]">
                <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                  <div className="flex gap-[5px] items-center">
                    <MdThumbUpAlt className="text-[15px] text-tradeGreen" />
                    <p className=" text-[12px] font-[600] text-white">
                      Positive Feedback
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15.5px] font-[600]">
                      &#43;0
                    </p>
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
                    <p className="text-white text-[15.5px] font-[600]">
                      &#43;0
                    </p>
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

            <div className="flex flex-col p-[15px] gap-[20px]">
              <div className="lg:flex hidden items-center justify-between">
                <p className="text-[16px] font-[700] text-white">
                  Profile details
                </p>

                <div className="flex justify-end">
                  <p
                    onClick={() => setIsProfileEdit((prev) => !prev)}
                    className={`${
                      isProfileEdit
                        ? "text-black bg-tradeGreen border-tradeAshExtraLight"
                        : "text-neutral-500 bg-transparent border-neutral-800"
                    } text-[14px] font-[600] flex  justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
                  >
                    {isProfileEdit ? "Save Changes" : "Edit Profile"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col  gap-[20px]  borde border-tradeAshLight rounded-[5px]">
                <div className="flex-1 flex flex-col gap-[5px]">
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

              <div className="flex lg:hidden justify-end">
                <p
                  onClick={() => setIsProfileEdit((prev) => !prev)}
                  className={`${
                    isProfileEdit
                      ? "text-black bg-tradeGreen border-tradeAshExtraLight"
                      : "text-neutral-500 bg-transparent border-neutral-800"
                  } text-[14px] font-[600] flex  justify-between items-center gap-[5px] px-[12px] py-[4px] rounded-[6.5px]  border hover:border-tradeAshExtraLight cursor-pointer duration-300 transition-all`}
                >
                  {isProfileEdit ? "Save Changes" : "Edit Profile"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden lg:pt-[80px] md:pt-[85px] pt-[67px] pb-[50px] bg-black  md:p-[15px] gap-[30px] flex-col">
        <div className="flex-1 flex flex-col max-h-max md:border border-neutral-800 md:rounded-[14px]">
          <div className="flex flex-col gap-[30px] p-[15px]">
            <div className="flex flex-col sm:flex-row gap-[30px] sm:justify-between sm:items-center">
              <div className="flex items-center gap-[15px]">
                <div className=" lg:w-[140px] sm:w-[100px] w-[90px] ">
                  <img className="rounded-full" src={image} alt="" />
                </div>

                <div className="flex flex-col gap-[1px]">
                  <p className="text-white lg:text-[40px] sm:text-[38px] text-[22px] font-extrabold">
                    0xSanityy
                  </p>

                  <div className="flex gap-[10px]">
                    <div className="flex gap-[3px] items-center">
                      <p className="text-white lg:text-[14px] sm:text-[13px] text-[13px] font-[600]">
                        #TopTrader
                      </p>
                      <PiHorseBold className="text-tradeOrange" />
                    </div>
                    <p className="text-tradeGreen lg:text-[14px] sm:text-[13px] text-[13px] font-[600]">
                      Online
                    </p>
                  </div>
                  <div className="flex items-center gap-[3px]">
                    <div className="flex items-center gap-[5px]">
                      <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-white">
                        Nigeria
                      </p>
                    </div>
                    <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[700] text-tradeFadeWhite">
                      &#x2022;
                    </p>
                    <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-tradeFadeWhite">
                      Joined 3 weeks ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-[5px]">
                <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                  <div className="flex gap-[5px] items-center">
                    <p className=" text-[12px] font-[600] text-white">
                      Positive Feedback
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <MdThumbUpAlt className="text-[15px] text-tradeGreen" />
                    <p className="text-white text-[15.5px] font-[600]">
                      &#43;0
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                  <div className="flex gap-[5px] items-center">
                    <p className=" text-[12px] font-[600] text-white">
                      Negative Feedback
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <MdThumbDownAlt className="text-[15px] text-red-500" />
                    <p className="text-white text-[15.5px] font-[600]">
                      &#43;0
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col gap-[5px] py-[5px] px-[10px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                  <div className="flex gap-[5px] items-center">
                    <p className=" text-[12px] font-[600] text-white">
                      Trust score
                    </p>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <FaRegStar className="text-tradeOrange text-[12px]" />
                    <p className="text-white text-[15.5px] font-[600]">
                      {" "}
                      57&#37;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-tradeAsh border border-tradeAshLight px-[10px] py-[6px]  gap-[10px] rounded-[12px]">
              <HiMiniMagnifyingGlass className="text-neutral-500 text-[20px]" />
              <input
                className=" bg-transparent outline-none h-[28px] w-[220px] text-[15px] placeholder:text-tradeFadeWhite  text-white"
                type="text"
                placeholder="Find a setting"
              />
            </div>

            <div className="flex flex-col gap-[5px]">
              <div
                onClick={() => handleIsYourInfo()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <CgProfile className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Your Info</p>
              </div>
              <div
                onClick={() => handleIsDeposit()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <PiHandDepositBold className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Deposit & Withdraw</p>
              </div>
              <div
                onClick={() => handleIsSecurity()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <MdOutlineSecurity className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Security & Privacy</p>
              </div>
              <div
                onClick={() => handleIsSubscription()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <TbAlignBoxRightTop className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Subscriptions</p>
              </div>
              <div
                onClick={() => handleIsHelp()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <BiSupport className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Help & Support</p>
              </div>
              <div
                onClick={() => handleIsLogout()}
                className=" flex gap-[15px] items-center p-[10px]  rounded-[12px] "
              >
                <MdLogin className="text-[16px] text-tradeFadeWhite" />
                <p className="text-white text-[16px] ">Logout</p>
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
