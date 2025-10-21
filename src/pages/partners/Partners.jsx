import React from "react";
import { useNavigate } from "react-router-dom";
import PartnersMenu from "@/components/partners/PartnersMenu";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import image from "../../assets/landingImg4.JPG";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";

const Partners = () => {
  const parts = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ];

  const navigateTo = useNavigate();

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {false ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {false ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
                  <PartnersMenu />
                  <div className="flex flex-1 flex-col gap-[20px] lg:mr-[12%] p-[15px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-lg font-semibold text-white flex items-center gap-1">
                        TRADE PARTNERS
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col gap-[25px]">
                      <div className="flex lg:hidden items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            TODAY
                          </p>

                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            YESTERDAY
                          </p>

                          <p className="text-xs font-bold text-tradeFadeWhite hover:text-white leading-none p-1 hover:bg-tradeOrange/30 bg-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                            OLDER
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 md:gap-x-6  gap-y-12">
                        {parts?.map((p, index) => (
                          <div className="flex flex-1 items-center flex-col gap-2 leading-none  ">
                            <div
                              onClick={() => navigateTo("/profile/:username")}
                              className="md:w-[120px] w-[100px] rounded-full overflow-hidden cursor-pointer"
                            >
                              <img src={image} alt="" className="" />
                            </div>

                            <p className="text-white text-[13px] font-semibold ">
                              SaneCorp
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Partners;
