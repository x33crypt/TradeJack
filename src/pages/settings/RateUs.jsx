import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";
import { FaFaceAngry } from "react-icons/fa6";
import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceMeh } from "react-icons/fa6";
import { FaFaceSmile } from "react-icons/fa6";
import { FaFaceGrinHearts } from "react-icons/fa6";
import { FaFaceGrin } from "react-icons/fa6";

const RateUs = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              FEEDBACK
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Rate your experience and help us improve the marketplace for
                you.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[20px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      How would you rate our service ?
                    </p>
                  </div>
                  <div className="flex md:justify-norma justify-around gap-[20px] ">
                    <div className="text-tradeFadeWhite text-3xl">
                      <FaFaceFrown />
                    </div>
                    <div className="text-tradeFadeWhite text-3xl">
                      <FaFaceMeh />
                    </div>
                    <div className="text-tradeFadeWhite text-3xl">
                      <FaFaceSmile />
                    </div>{" "}
                    <div className="text-tradeFadeWhite text-3xl">
                      <FaFaceGrin />
                    </div>{" "}
                    <div className="text-tradeFadeWhite text-3xl">
                      <FaFaceGrinHearts />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      Describe your experience
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <textarea
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      placeholder="Type something here..."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] borde border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      How can we improve your experience
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <textarea
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      placeholder="Type something here..."
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
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RateUs;
