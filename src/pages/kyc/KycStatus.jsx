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

const KycStatus = () => {
  const { loading, error } = useFetchKycStatus();
  const { status, setStatus } = useKyc();

  const navigateTo = useNavigate();

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
                <p className="text-lg font-[700] text-white ">KYC Status</p>
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
                                Manage your linked accounts with ease. To update
                                details, simply remove an account and add a new
                                one for hassle-free withdrawals.
                              </p>
                            </div>

                            <div className="flex flex-col gap-[30px] h-full justify-between "></div>
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

          <div className="sticky top-[64px] md:flex hidden md:w-[350px] min-h-[600px] ">
            <KycVerify />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KycStatus;
