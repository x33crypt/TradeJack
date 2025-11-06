import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import { FaArrowAltCircleDown } from "react-icons/fa";

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

              <div className="flex flex-col gap-[30px]">
                <div className="flex w-fullsxxye items-center justify-between overflow-x-auto gap-[10px] custom-scrollbar">
                  {[
                    "ABOUT US",
                    "VERIFICATION",
                    "OFFERS",
                    "TRADING",
                    "PAYMENT",
                    "SECURITY",
                    "DISPUTES",
                    "SUPPORT",
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="flex shrink-0 items-center gap-2 hover:bg-tradeOrange/30 bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      <p className="text-xs font-bold leading-none ">
                        {category}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-[10px]">
                  <div
                    className={` ${
                      true ? "flex" : "hidden"
                    } flex-col gap-[10px] h-full justify-between`}
                  >
                    <div
                      // onClick={() => handleQuestion1()}
                      className={` ${
                        false ? "bg-tradeOrange" : "bg-tradeAsh"
                      } p-[12px] bg-tradeAsh rounded-[15px] cursor-pointer`}
                    >
                      <div
                        className={`  ${
                          false ? "text-black" : "text-white"
                        }  flex justify-between bg-tradeOrang items-center `}
                      >
                        <p className="text-sm  font-semibold">
                          What is GOGETSWAP ?
                        </p>

                        <div
                          className={`${
                            false ? "rotate-180" : ""
                          } flex p-1  border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
                        >
                          <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
                        </div>
                      </div>
                      <div
                        className={`bg-tradeGree transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                          false
                            ? "max-h-[500px] opacity-100 mt-[10px] text-black"
                            : "max-h-0 opacity-0 mt-0 text-tradeFadeWhite"
                        } `}
                      >
                        <p className="text-xs font-medium leading-normal">
                          GOGETSWAP is a secure, global platform that allows
                          users to trade a variety of digital assets, including
                          cryptocurrencies, fiat currencies, and even bank
                          funds, with verified vendors.
                        </p>
                      </div>
                    </div>

                    <div
                      // onClick={() => handleQuestion1()}
                      className={` ${
                        true ? "bg-tradeOrange" : "bg-tradeAsh"
                      } p-[12px] bg-tradeAsh rounded-[15px] cursor-pointer`}
                    >
                      <div
                        className={`  ${
                          true ? "text-black" : "text-white"
                        }  flex justify-between bg-tradeOrang items-center `}
                      >
                        <p className="text-sm  font-semibold">
                          What is GOGETSWAP ?
                        </p>

                        <div
                          className={`${
                            true ? "rotate-180" : ""
                          } flex p-1  border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
                        >
                          <FaArrowAltCircleDown className="text-xs text-tradeFadeblack" />
                        </div>
                      </div>
                      <div
                        className={`bg-tradeGree transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                          true
                            ? "max-h-[500px] opacity-100 mt-[10px] text-black"
                            : "max-h-0 opacity-0 mt-0 text-tradeFadeWhite"
                        } `}
                      >
                        <p className="text-xs font-medium leading-normal">
                          GOGETSWAP is a secure, global platform that allows
                          users to trade a variety of digital assets, including
                          cryptocurrencies, fiat currencies, and even bank
                          funds, with verified vendors.
                        </p>
                      </div>
                    </div>

                    <div
                      // onClick={() => handleQuestion1()}
                      className={` ${
                        false ? "bg-tradeOrange" : "bg-tradeAsh"
                      } p-[12px] bg-tradeAsh rounded-[15px] cursor-pointer`}
                    >
                      <div
                        className={`  ${
                          false ? "text-black" : "text-white"
                        }  flex justify-between bg-tradeOrang items-center `}
                      >
                        <p className="text-sm  font-semibold">
                          What is GOGETSWAP ?
                        </p>

                        <div
                          className={`${
                            false ? "rotate-180" : ""
                          } flex p-1  border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
                        >
                          <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
                        </div>
                      </div>
                      <div
                        className={`bg-tradeGree transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                          false
                            ? "max-h-[500px] opacity-100 mt-[10px] text-black"
                            : "max-h-0 opacity-0 mt-0 text-tradeFadeWhite"
                        } `}
                      >
                        <p className="text-xs font-medium leading-normal">
                          GOGETSWAP is a secure, global platform that allows
                          users to trade a variety of digital assets, including
                          cryptocurrencies, fiat currencies, and even bank
                          funds, with verified vendors.
                        </p>
                      </div>
                    </div>

                    <div
                      // onClick={() => handleQuestion1()}
                      className={` ${
                        false ? "bg-tradeOrange" : "bg-tradeAsh"
                      } p-[12px] bg-tradeAsh rounded-[15px] cursor-pointer`}
                    >
                      <div
                        className={`  ${
                          false ? "text-black" : "text-white"
                        }  flex justify-between bg-tradeOrang items-center `}
                      >
                        <p className="text-sm  font-semibold">
                          What is GOGETSWAP ?
                        </p>

                        <div
                          className={`${
                            false ? "rotate-180" : ""
                          } flex p-1  border border-tradeAshExtraLight rounded-full  items-center gap-1 cursor-pointer hover:bg-tradeAshLight/30 transition-all duration-300`}
                        >
                          <FaArrowAltCircleDown className="text-xs text-tradeFadeWhite" />
                        </div>
                      </div>
                      <div
                        className={`bg-tradeGree transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                          false
                            ? "max-h-[500px] opacity-100 mt-[10px] text-black"
                            : "max-h-0 opacity-0 mt-0 text-tradeFadeWhite"
                        } `}
                      >
                        <p className="text-xs font-medium leading-normal">
                          GOGETSWAP is a secure, global platform that allows
                          users to trade a variety of digital assets, including
                          cryptocurrencies, fiat currencies, and even bank
                          funds, with verified vendors.
                        </p>
                      </div>
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

export default FAQS;
