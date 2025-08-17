import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/others/Loading";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import NetworkError from "../others/NetworkError";

const Profile = ({ loading, profile }) => {
  const navigateTo = useNavigate();

  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Profile Information</p>
      </div>
      <div className="flex flex-1 p-[15px] min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {profile === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px]">
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
                        {profile?.userName || "-- --"}
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
                        {profile?.lastName || profile?.firstName
                          ? `${profile?.lastName || ""} ${
                              profile?.firstName || ""
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
                        Email address
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {profile?.email || "-- --"}
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
                        {profile?.gender || "-- --"}
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
                        {profile?.dateOfBirth || "-- --"}
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
                        {profile?.phone || "-- --"}
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
                      {/* <p className="text-tradeFadeWhite text-[13px] font-semibold">
                {profile?.address || "-- --"}
              </p> */}
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>

                {/* KYC */}
                <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
                  {/* KYC */}
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border- border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/account/kyc/status")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        KYC Verification Status
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {capitalizeFirst(profile?.kycStatus) || "-- --"}
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

export default Profile;
