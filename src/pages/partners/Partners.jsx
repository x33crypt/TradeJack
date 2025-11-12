import React from "react";
import { useNavigate } from "react-router-dom";
import PartnersMenu from "@/components/partners/PartnersMenu";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import image from "../../assets/landingImg4.JPG";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import { TbArrowsSort } from "react-icons/tb";
import { IoGrid } from "react-icons/io5";
import MiniButton from "@/components/buttons/MiniButton";

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
     <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[10px] min-h-svh flex bg-black">
        <div className="flex flex-col flex-1">
          {false ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {false ? (
                <NetworkError />
              ) : (
                <div className="flex flex-1 lg:flex-row flex-col gap-[25px] ">
                  {/* <PartnersMenu /> */}
                  <div className="flex flex-1 flex-col gap-[30px] lg:mx-[22.8%] p-[15px]">
                    <div className="flex  items-center justify-between ">
                      <p className="text-lg font-semibold text-white flex items-center gap-1">
                        TRADE PARTNERS
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col gap-[25px]">
                      {/* top Filter */}
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <MiniButton>RECENT</MiniButton>
                        </div>

                        <MiniButton>GRID</MiniButton>
                      </div>

                      <div className="flex flex-wrap gap-x-4 md:gap-x-6  gap-y-12">
                        {parts?.map((p, index) => (
                          <div className="flex flex-1 items-center flex-col gap-2 leading-none  ">
                            <div
                              onClick={() => navigateTo("/:username")}
                              className=" w-[80px] md:w-[100px] rounded-full overflow-hidden cursor-pointer"
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
