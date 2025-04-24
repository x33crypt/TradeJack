import Footer from "@/components/Footer";
import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect, useRef } from "react";
import image from "../assets/landingImg4.JPG";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import useSafeNavigate from "@/components/SafeNavigation";

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

      <div className="lg:pt-[75px] md:pt-[75px] pt-[60px] pb-[10px] lg:px-[2%] md:px-[2.5%] min-h-screen bg-black">
        {/* <div className=" flex md:hidden items-center gap-[10px] p-[15px]  border-b border-tradeAshLight ">
          <p className=" text-[17px] text-white font-[700] cursor-pointer">
            Your Profile
          </p>
        </div> */}
        <div className="flex flex-col mt-[20px] md:gap-[50px] gap-[20px]">
          <div className=" flex md:flex-row flex-col justify-between md:items-center gap-[30px] md:p-0 p-[15px] ">
            <div className="flex md:gap-[20px] gap-[10px] items-center ">
              <div className="flex lg:w-[190px] md:w-[150px] w-[120px] justify-center cursor-pointer ">
                <img className="rounded-full" src={image} alt="" />
              </div>

              <div className="flex flex-col justify-center lg:gap-[15px] md:gap-[10px] gap-[5px] ">
                <div className="flex flex-col ">
                  <p className="text-white lg:text-[55px] md:text-[45px] text-[30px] font-[900]">
                    0xSanityy
                  </p>

                  <div className="flex flex-col gap-[3px] ml-1">
                    <div className="flex items-center gap-[5px]">
                      <FaLocationDot className="text-tradePurple text-[14px]" />
                      <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-white">
                        Nigeria
                      </p>
                    </div>
                    <div className="flex items-center gap-[3px]">
                      <p className="lg:text-[14px] sm:text-[13px] text-[13px] font-[600] text-tradeFadeWhite">
                        Joined 3 weeks ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[10px] ml-1">
                  <div className=" flex md:flex-col flex-row gap-[5px] lg:py-[5px] lg:px-[10px] py-[4px] px-[6px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                    <div className="flex gap-[10px] items-center">
                      <MdThumbUpAlt className="text-[15px] text-tradeGreen" />
                      <p className=" md:flex hidden  text-[12px] font-[600] text-white">
                        Positive Feedback
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="text-white text-[15px] font-[600]">229</p>
                    </div>
                  </div>
                  <div className=" flex md:flex-col flex-row gap-[5px]  lg:py-[5px] lg:px-[10px] py-[4px] px-[6px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                    <div className="flex gap-[10px] items-center">
                      <MdThumbDownAlt className="text-[15px] text-red-500" />
                      <p className="md:flex hidden text-[12px] font-[600] text-white">
                        Negative Feedback
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="text-white text-[15px] font-[600]">18</p>
                    </div>
                  </div>
                  <div className=" flex md:flex-col flex-row gap-[5px] lg:py-[5px] lg:px-[10px] py-[4px] px-[6px] bg-tradeAsh border border-tradeAshLight  rounded-[8px]">
                    <div className="flex gap-[10px] items-center">
                      <FaRegStar className="text-tradeOrange text-[12px]" />
                      <p className="md:flex hidden text-[12px] font-[600] text-white">
                        Trust score
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="text-white text-[15px] font-[600]">
                        {" "}
                        57&#37;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                isAccountVerified
                  ? "bg-transparent  border-tradeAshLight hover:border-tradeAshExtraLight text-tradeFadeWhite hover:text-white "
                  : " text-black hover:text-tradeGreen bg-tradeGreen hover:bg-tradeAsh border-tradeGreen hover:border-tradeAsh cursor-pointer"
              } flex items-center justify-center border gap-[10px] lg:px-[20px] lg:py-[6px]  px-[12px] py-[10px] rounded-[7px]  transition-all duration-300`}
            >
              <p className="text-[14px] font-[700]">
                {isAccountVerified
                  ? "Verified Account"
                  : "Complete Verification!"}
              </p>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-[20px]">
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

                    <p className="text-white text-[15px] font-[600]">
                      sanityy0x
                    </p>
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

                <div className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300">
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

                <div className="flex items-center py-[5px] px-[10px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeAshLight  rounded-[8px] cursor-pointer transition-all duration-300">
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
                  {/* <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div> */}
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
                  {/* <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div> */}
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
