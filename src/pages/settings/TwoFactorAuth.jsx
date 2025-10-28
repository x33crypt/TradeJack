import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";

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
              <div className="flex flex-col gap-[10px]"></div>
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
