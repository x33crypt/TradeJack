import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InAppNav from "@/components/InAppNav";
import Button from "@/components/buttons/Button";
import Footer from "@/components/Footer";
import SideNav from "@/components/account/nav/SideNav";
import Loading from "@/components/Loading";
import { LuFileX2 } from "react-icons/lu";
import KycVerify from "@/components/kyc/KycVerify";
import { useKyc } from "@/context/KycContext";
import { useFetchKycStatus } from "@/hooks/useFetchKycStatus";
import KycBenefits from "@/components/kyc/KycBenefits";
import NetworkError from "@/components/NetworkError";
import { capitalizeFirst } from "@/utils/capitalizeFirst";

const KycStatus = () => {
  const { loading, error } = useFetchKycStatus();
  const { status, setStatus } = useKyc();

  const navigateTo = useNavigate();

  const formatDOB = (dob) => {
    if (!dob || typeof dob !== "object") return "Invalid date";

    const { day, month, year } = dob;

    if (!day || !month || !year) return "Invalid date";

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDay = String(day).padStart(2, "0");
    const monthName = months[month - 1]; // month is 1-indexed

    return `${monthName} ${formattedDay}, ${year}`;
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[5px] bg-black ">
        <SideNav />
        <div className="flex-1 flex flex-col md:flex-row gap-[5px]">
          {/*Kyc Information */}
          <div className="flex flex-col flex-1 gap-[5px]">
            <div className="flex flex-col flex-1 md:border border-neutral-800">
              <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white ">
                  KYC Information
                </p>
              </div>
              <div className="flex flex-1 h-full">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex-1 flex w-full h-full">
                    {status?.state === null ? (
                      <NetworkError text={"KYC Status"} />
                    ) : (
                      <div className="w-full h-full">
                        {status?.state === "not_submitted" ? (
                          <div className="h-full flex flex-col p-[15px] gap-[25px]">
                            <div className="">
                              <p className="text-xs text-tradeFadeWhite font-medium">
                                It looks like you haven’t verified your identity
                                yet. Completing your KYC helps secure your
                                account, enables faster processing, and unlocks
                                full access to all features. Get verified in
                                just a few steps.
                              </p>
                            </div>
                            <div className="flex-1 h-full flex items-center justify-center">
                              <LuFileX2 className="text-[55px] text-tradeGreen" />
                            </div>
                            <div className="md:hidden flex w-full">
                              <Button
                                variant="primary"
                                onClick={() =>
                                  navigateTo("/account/kyc/verification")
                                }
                              >
                                Start Verification
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col p-[15px] gap-[25px]">
                            <div className="">
                              <p className="text-xs text-tradeFadeWhite font-medium">
                                Your KYC details have been submitted and are
                                currently under review. While updates aren’t
                                allowed during this process, you’ll be able to
                                resubmit if your verification is declined.
                              </p>
                            </div>

                            <div className="flex flex-col gap-[10px] h-full justify-between ">
                              <div className="flex flex-col gap-[10px]">
                                {/* Status */}
                                <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                                  <div className="flex items-center justify-between gap-[10px] p-3 border- border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Verification status
                                    </p>
                                    <div>
                                      {(() => {
                                        if (status?.state === "not_submitted") {
                                          return <NotSubmittedComponent />;
                                        } else if (
                                          status?.state === "pending"
                                        ) {
                                          return (
                                            <p className="text-[13px] font-semibold text-tradeOrange">
                                              Pending
                                            </p>
                                          );
                                        } else if (
                                          status?.state === "verified"
                                        ) {
                                          return <VerifiedComponent />;
                                        } else {
                                          return <UnknownStateComponent />;
                                        }
                                      })()}
                                    </div>
                                  </div>
                                </div>

                                {/* Profile Information */}
                                <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      First Name
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.firstName}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Last Name
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.lastName}
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between gap-[10px] p-3 border- border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Gender
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {capitalizeFirst(status?.data?.gender)}
                                    </p>
                                  </div>
                                </div>
                                {/* Address Information */}
                                <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Country
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.address?.country}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      State/Province
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.address?.state}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      City/Area
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.address?.city}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between gap-[10px] p-3 border- border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Street
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.address?.street}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col bg-tradeAsh border border-tradeAshLight rounded-[15px] w-full">
                                  <div className="flex items-center justify-between gap-[10px] p-3 border-b border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Date of birth
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {formatDOB(status?.data?.dateOfBirth)}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between gap-[10px] p-3 border- border-tradeAshLight">
                                    <p className="text-[13px] font-semibold text-white">
                                      Document Type
                                    </p>
                                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                                      {status?.data?.documentType}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="md:hidden flex w-full">
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    navigateTo("/account/kyc/verification")
                                  }
                                >
                                  Submission Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* <KycBenefits /> */}
          </div>

          <div className=" md:flex hidden md:w-[350px] ">
            <KycVerify />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KycStatus;
