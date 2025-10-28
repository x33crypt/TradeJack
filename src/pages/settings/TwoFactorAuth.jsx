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
              <div className="flex flex-col gap-[20px]">
                {/* <div className="flex flex-col gap-[10px] bg-tradeAsh rounded-[15px] p-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-[13px] font-semibold">
                      Email Address
                    </p>

                    <div className="flex items-center">
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        ade***@****
                      </p>
                      <MdKeyboardArrowRight className="text-tradeFadeWhite text-[22px] " />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-[13px] font-semibold">
                      Mobile
                    </p>

                    <div className="flex items-center">
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        803****211
                      </p>
                      <MdKeyboardArrowRight className="text-tradeFadeWhite text-[22px] " />
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[15px] bg-tradeAsh rounded-[15px] p-[12px]">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-[13px] font-semibold">
                        Text Message
                      </p>

                      <div className="flex items-center  cursor-pointer ">
                        <p className="text-tradeFadeWhite text-[13px] font-semibold">
                          803****211
                        </p>
                        <MdKeyboardArrowRight className="text-tradeFadeWhite text-[22px] " />
                      </div>
                    </div>
                    <div className="flex items-center gap-[15px]">
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Use your mobile phone to receive a text message with an
                        authentication code to enter when you log in
                      </p>

                      <div>
                        <BsToggleOff className="text-tradeFadeWhite text-3xl cursor-pointer " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-[10px]">
              <Button
                variant="secondary"
                onClick={handleProceed}
                disabled={transfer?.proceed}
              >
                UPDATE
              </Button>

              <div className="flex items-center justify-center">
                <p className="text-[13px] text-tradeFadeWhite hover:text-white font-semibold cursor-pointer transition-all duration-300">
                  Forgotten your password ?
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TwoFactorAuth;
