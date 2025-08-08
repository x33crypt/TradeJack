import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { useProfile } from "@/context/ProfileContext";
import { useAccount } from "@/context/AccountContext";
import Loading from "@/components/Loading";
import NetworkError from "@/components/NetworkError";
import Stats from "./Stats";
import { MdThumbUpAlt, MdThumbDownAlt, MdOutlineGppGood } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiRoundKnob } from "react-icons/gi";

const Profile = () => {
  const { loading, error } = useFetchProfile();
  const { profile, setProfile } = useProfile();
  const { account, setAccount } = useAccount();
  const { view } = account;
  const navigateTo = useNavigate();

  return (
    <div
      className={`${view === "Profile" ? "flex" : "hidden"} flex-1 p-[15px]`}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-1">
          {profile === null ? (
            <NetworkError />
          ) : (
            <div className="flex-1 flex flex-col md:flex-row gap-[10px]">
              <div className="lg:flex hidden">
                <div className=" lg:sticky top-[140px] max-h-max md:w-[310px] flex flex-col gap-[8px] ">
                  <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-bold">
                        {profile?.feedback?.positive}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Positive Feedback
                      </p>
                    </div>
                    <div className="p-1  rounded-full bg-[#00de82]/30 ">
                      <MdThumbUpAlt className="text-tradeGreen text-[13px] md:text-sm leading-none" />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-bold">
                        {profile?.feedback?.negative}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Negative Feedback
                      </p>
                    </div>
                    <div className="p-1  rounded-full bg-red-600/30">
                      <MdThumbDownAlt className="text-red-600 text-[13px] md:text-sm leading-none" />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-bold">
                        {profile?.trustScore}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Trust Score
                      </p>
                    </div>
                    <div className="p-1  rounded-full bg-tradeOrange/30">
                      <MdOutlineGppGood className="text-tradeOrange text-[13px] md:text-sm leading-none" />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-bold">
                        {profile?.totalTradePartners}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Trade Partners
                      </p>
                    </div>
                    <div className="p-1 rounded-full bg-tradeAshExtraLight/30 border border-tradeFadeWhite">
                      <FaUserFriends className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-[12px] bg-tradeAsh border border-tradeAshLight rounded-[15px]">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-bold">
                        {profile?.totalTrades}
                      </p>
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Total Trades
                      </p>
                    </div>
                    <div className="p-1 rounded-full bg-tradeAshExtraLight/30 border border-tradeFadeWhite">
                      <GiRoundKnob className="text-tradeFadeWhite text-[13px] md:text-sm leading-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-[10px]">
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
                        {profile?.userName || "Not set"}
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
                          : "Not set"}
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
                        {profile?.email || "Not set"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-col bg-tradeAsh rounded-[15px] border border-tradeAshLight overflow-hidden">
                  {/* KYC */}
                  <div
                    className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight cursor-pointer transition-all duration-300"
                    onClick={() => navigateTo("/account/kyc/status")}
                  >
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        KYC Verification
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {profile?.kycStatus || "NA"}
                      </p>
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-[5px] py-3 px-3 bg-tradeAsh hover:bg-tradeAshLight border-b border-tradeAshLight transition-all duration-300">
                    <div className="flex-1 flex justify-between gap-[2px]">
                      <p className="text-[13px] font-semibold text-white">
                        Gender
                      </p>
                      <p className="text-tradeFadeWhite text-[13px] font-semibold">
                        {profile?.gender || "Not set"}
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
                        {profile?.dateOfBirth || "Not set"}
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
                        {profile?.phone || "Not set"}
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
                {profile?.address || "Not set"}
              </p> */}
                    </div>
                    <div className="text-white text-[22px]">
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
