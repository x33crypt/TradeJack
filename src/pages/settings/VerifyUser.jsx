import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";

const VerifyUser = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              VERIFY YOUR IDENTITY
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                We just need to verify it’s you. Enter the code sent to your
                email or phone number.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                  {/* <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Password
                    </p>
                  </div> */}

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      placeholder="Enter code"
                      // onChange={handleUsernameChange}
                      // value={transfer?.username}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <Button
                variant="secondary"
                // onClick={handleProceed}
                // disabled={transfer?.proceed}
              >
                CONFIRM
              </Button>

              <div className="flex items-center justify-center">
                <p className="text-[13px] text-tradeFadeWhite hover:text-white font-semibold cursor-pointer transition-all duration-300">
                  Didn't receive the OTP? Resend{" "}
                  <span className="text-tradeOrange">(30s)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyUser;
