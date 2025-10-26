import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/others/Loading";
import NetworkError from "@/components/others/NetworkError";
import { shortenEmail } from "@/utils/shortenEmail";

const Info = ({ loading, info }) => {
  console.log(info);

  const navigateTo = useNavigate();

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between ">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          PROFILE
        </p>
      </div>
      <div className="flex flex-1  min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {info === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px] md:gap-[5px] ">
                {/* Basic Info */}
                <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
                  {/* Username */}
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/settings/account/name")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Username
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.username || "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Full name
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.lastName || info?.firstName
                          ? `${info?.lastName || ""} ${
                              info?.firstName || ""
                            }`.trim()
                          : "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px] opacity-0">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/settings/account/email")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Email Address
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {shortenEmail(info?.email) || "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
                  {/* Gender */}
                  <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Gender
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.gender || "-- --"}
                      </p>
                    </div>
                    <div className="text-tradeAsh text-[22px] opacity-0">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Date of birth
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.dateOfBirth || "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px] opacity-0">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/settings/account/mobile")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Mobile number
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.phone || "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Address */}
                  <div
                    className="flex items-center py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/account/address")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Address
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>

                {/* KYC */}
                <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/kyc/levels")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        KYC Level
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {info?.kycLevel || "-- --"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
