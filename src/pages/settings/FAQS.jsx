import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";

const FAQS = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              FAQ
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Your go-to guide for tips, troubleshooting, and all the
                essentials you need to navigate the platform smoothly, resolve
                issues quickly, and make the most of every feature.
              </p>

              <div className="flex flex-1 items-center gap-[10px] overflow-hidden ">
                {[
                  "ABOUT US",
                  "VERIFICATION",
                  "OFFERS",
                  // "TRADING",
                  // "PAYMENT",
                  // "SECURITY",
                  // "DISPUTES",
                  // "SUPPORT",
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    <p className="text-xs font-bold leading-none ">
                      {category}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[10px]">FAQS</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQS;
