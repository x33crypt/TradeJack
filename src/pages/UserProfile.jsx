import Footer from "@/components/Footer";
import MarketTopNav from "@/components/MarketTopNav";
import React, { useState, useEffect, useRef } from "react";
import image from "../assets/landingImg4.JPG";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { LiaChartLineSolid } from "react-icons/lia";

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
      <div className="pt-[70px] flex flex-col  bg-black">
        <div className=" lg:p-[2%] p-[3%] lg:pt-[30px] pt-[20px] flex lg:flex-row flex-col gap-[20px] lg:items-center bg-tradeAshExtraLight">
          <div className="flex-1 flex items-center gap-[15px] rounded-[8px]">
            <div className="rounded-full border-tradeAshExtraLight">
              <img
                className=" lg:w-[180px] sm:w-[150px] w-[120px] rounded-full"
                src={image}
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-[10px]">
                <p className="text-[14px] font-[400]">
                  <small className=" lg:text-[14px] sm:text-[13px] text-[12px] font-[700] flex items-center text-tradeGreen">
                    &#x2022; Online
                  </small>
                </p>
                <p className="text-white lg:text-[14px] sm:text-[13px] text-[12px] font-[600]">
                  #Beginner
                </p>
              </div>
              <p className="text-white lg:text-[50px] sm:text-[38px] text-[28px] font-extrabold">
                0xSanityy
              </p>
              <div className="flex items-center gap-[5px]">
                <div className="flex items-center gap-[5px]">
                  <p className="lg:text-[14px] sm:text-[13px] text-[12px] font-[600] text-tradeFadeWhite">
                    Location :
                  </p>
                  <p className="lg:text-[14px] sm:text-[13px] text-[12px] font-[600] text-white">
                    Nigeria
                  </p>
                </div>
                <div className=" sm:flex hidden gap-[5px]">
                  <p className="lg:text-[14px] sm:text-[13px] text-[12px] font-[700] text-tradeFadeWhite">
                    {" "}
                    &#x2022;
                  </p>
                  <p className="lg:text-[14px] sm:text-[13px] text-[12px] font-[600] text-tradeFadeWhite">
                    Joined{" "}
                    <small className="lg:text-[14px] sm:text-[13px] text-[12px] text-white font-[600]">
                      3 weeks
                    </small>{" "}
                    ago
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-[20px] bg-tradeAshLight rounded-[8px] p-[10px]">
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px] text-tradeFadeWhite font-[600]">
                Total trades
              </p>

              <p className="lg:text-[17px] md:text-[16px] text-[15px]  font-[700] text-white">
                2,335
              </p>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px]  text-tradeFadeWhite font-[600]">
                Minimum limit
              </p>
              <p className="lg:text-[17px] md:text-[16px] text-[15px] font-[700] text-white">
                50 USD
              </p>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px] text-tradeFadeWhite font-[600]">
                Maximum limit
              </p>
              <p className="lg:text-[17px] md:text-[16px] text-[15px] font-[700] text-white">
                1,000 USD
              </p>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px] text-tradeFadeWhite font-[600]">
                Positive feedback
              </p>
              <div className="flex gap-[10px] items-center">
                <FaThumbsUp className="text-tradeGreen" />
                <p className="lg:text-[17px] md:text-[16px] text-[15px] font-[700] text-white">
                  &#43;455
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px] text-tradeFadeWhite font-[600]">
                Negative feedback
              </p>
              <div className="flex gap-[10px] items-center">
                <FaThumbsDown className="text-red-500" />
                <p className="lg:text-[17px] md:text-[16px] text-[15px] font-[700] text-white">
                  &#43;0
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-[3px]">
              <p className="md:text-[12px] text-[10px] text-tradeFadeWhite font-[600]">
                Trust score
              </p>
              <div className="flex gap-[10px] items-center">
                <LiaChartLineSolid className="text-tradeGreen text-[20px]" />
                <p className="lg:text-[17px] md:text-[16px] text-[15px] font-[700] text-white">
                  57&#37;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:py-[40px] md:py-[30px] py-[20px] flex flex-col lg:px-[205px] md:px-[80px] gap-[10px] bg-tradeAsh">
          <div className="flex flex-col lg:p-[2%] p-[3%] gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-[700] text-white">
                  Profile details
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:gap-[30px] gap-[20px] p-[10px] border border-tradeAshLight rounded-[5px]">
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Full name
                  </p>
                  <input
                    ref={profileRef}
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isProfileEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isProfileEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Username
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isProfileEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isProfileEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Email address
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isProfileEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isProfileEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Phone number
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isProfileEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isProfileEdit}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {isProfileEdit ? (
                  <p
                    onClick={() => setIsProfileEdit(false)}
                    className="border border-white bg-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-black text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Save
                  </p>
                ) : (
                  <p
                    onClick={() => setIsProfileEdit(true)}
                    className="border border-tradeAshLight hover:border-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-white text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Edit
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-[700] text-white">
                  Bank Accounts
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:gap-[30px] gap-[20px] p-[10px] border border-tradeAshLight rounded-[5px]">
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Currency
                  </p>
                  <input
                    ref={bankAccountRef}
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isBankAccountEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isBankAccountEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Bank name
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isBankAccountEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isBankAccountEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Account holder's name
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isBankAccountEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isBankAccountEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Account number
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isBankAccountEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isBankAccountEdit}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {isBankAccountEdit ? (
                  <p
                    onClick={() => setIsBankAccountEdit(false)}
                    className="border border-white bg-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-black text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Save
                  </p>
                ) : (
                  <p
                    onClick={() => setIsBankAccountEdit(true)}
                    className="border border-tradeAshLight hover:border-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-white text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Edit
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-[700] text-white">
                  Online Wallets
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:gap-[30px] gap-[20px] p-[10px] border border-tradeAshLight rounded-[5px]">
                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Wallet name
                  </p>
                  <input
                    ref={walletRef}
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isOnlineWalletEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isOnlineWalletEdit}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-[5px]">
                  <p className="text-[13.5px] text-tradeFadeWhite font-[700]">
                    Wallet address
                  </p>
                  <input
                    className={`h-[40px] px-[10px] py-[4px] text-white font-[600] text-[15px] bg-tradeAshLight rounded-[5px] border border-neutral-700 outline-none transition-all duration-300 ${
                      isOnlineWalletEdit
                        ? "cursor-text border-tradeGreen"
                        : "cursor-default"
                    }`}
                    type="text"
                    readOnly={!isOnlineWalletEdit}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                {isOnlineWalletEdit ? (
                  <p
                    onClick={() => setIsOnlineWalletEdit(false)}
                    className="border border-white bg-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-black text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Save
                  </p>
                ) : (
                  <p
                    onClick={() => setIsOnlineWalletEdit(true)}
                    className="border border-tradeAshLight hover:border-white active:border-tradeAshLight rounded-[3px] w-max px-[18px] py-[5px] text-white text-[14px] font-[700] cursor-pointer transition-all duration-300"
                  >
                    Edit
                  </p>
                )}
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
