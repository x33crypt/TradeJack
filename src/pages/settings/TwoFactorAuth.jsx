import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const TwoFactorAuth = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              TWO-FACTOR AUTHENTICATION
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Protect your account with an added layer of security. Enable
                two-factor authentication to verify your identity each time you
                sign in and keep your funds safe.
              </p>
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[10px] bg-tradeAsh rounded-[15px] p-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold">
                      Email Address
                    </p>

                    <div className="flex items-center cursor-pointer text-tradeFadeWhite hover:text-white transition-all duration-300">
                      <p className="text-[13px] font-semibold">ade***@****</p>
                      <MdKeyboardArrowRight className="text-[22px] " />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold">
                      Mobile Number
                    </p>

                    <div className="flex items-center cursor-pointer text-tradeFadeWhite hover:text-white transition-all duration-300">
                      <p className=" text-[13px] font-semibold">803****211</p>
                      <MdKeyboardArrowRight className=" text-[22px] " />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Code via Email or SMS
                      </p>

                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Use your phone or email to receive a verification code
                        that you'll enter each time you log in.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300 " />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-[30px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex flex-col gap-[5px]">
                      <p className="text-white text-sm font-semibold">
                        Authentication App
                      </p>

                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Use an authentication app to generate a login code each
                        time you sign in.
                      </p>
                    </div>

                    <div>
                      <BsToggleOff className="text-tradeFadeWhite hover:text-tradeOrange text-4xl cursor-pointer transition-all duration-300" />
                    </div>
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

export default TwoFactorAuth;
