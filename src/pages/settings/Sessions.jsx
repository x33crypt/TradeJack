import React from "react";
import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import Button from "@/components/buttons/Button";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { MdOutlineLaptopMac } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

const Sessions = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              SECURITY & ACCESS
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Manage your account's security and keep track of your active
                sessions across decices.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between bg-tradeAsh rounded-[15px] p-[12px]">
                  <div className="flex flex-col gap-[15px] ">
                    <div className="flex items-center gap-2">
                      <HiOutlineDeviceMobile className="text-tradeFadeWhite" />
                      <p className="text-sm text-white font-semibold">
                        SM-A055F
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        Time : 2025-10-27 12:17:53
                      </p>
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        Location : Lagos Nigeria
                      </p>
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        IP Address : Lagos Nigeria
                      </p>
                    </div>
                  </div>
                  <div>
                    <AiFillDelete className="flex text-2xl items-center gap-2 hover:bg-red-600/30 bg-red-600 p-1  text-white w-max rounded-sm transition-all duration-300 cursor-pointer" />
                  </div>
                </div>

                <div className="flex justify-between bg-tradeAsh rounded-[15px] p-[12px]">
                  <div className="flex flex-col gap-[15px] ">
                    <div className="flex items-center gap-2">
                      <MdOutlineLaptopMac className="text-tradeFadeWhite" />
                      <p className="text-sm text-white font-semibold">
                        Safari/537.36 OPR/122.0.0.0
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        Time : 2025-10-27 12:17:53
                      </p>
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        Location : Lagos Nigeria
                      </p>
                      <p className="text-xs text-tradeFadeWhite font-semibold leading-none">
                        IP Address : Lagos Nigeria
                      </p>
                    </div>
                  </div>
                  <div>
                    <AiFillDelete className="flex text-2xl items-center gap-2 hover:bg-red-600/30 bg-red-600 p-1  text-white w-max rounded-sm transition-all duration-300 cursor-pointer" />
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

export default Sessions;
