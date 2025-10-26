import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useEffect } from "react";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useKyc } from "@/context/userContext/KycContext";

const VerifyLevelTwo = () => {
  const { tierTwo, setTierTwo } = useKyc();

  console.log(tierTwo);

  const navigateTo = useNavigate();

  const handleBvnChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    setTierTwo((prevDetails) => ({
      ...prevDetails,
      bvn: value,
    }));
  };

  const handleNinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    setTierTwo((prevDetails) => ({
      ...prevDetails,
      nin: value,
    }));
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              KYC TIER 2
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Continue your verification by providing your BVN and NIN
                details. This quick Tier 2 step helps confirm your identity,
                strengthen security, and unlock higher transaction limits.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      BVN
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="bvn"
                      placeholder="Enter BVN"
                      value={tierTwo?.bvn}
                      onChange={handleBvnChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-[13px] text-tradeFadeWhite font-semibold">
                      NIN
                    </p>
                  </div>

                  <div className="flex-1 flex bg-tradeAshLight w-full border border-tradeAshLight rounded-[10px]">
                    <input
                      className="bg-transparent flex-1 p-[12px] border-none outline-none text-white placeholder:text-tradeFadeWhite text-sm font-medium leading-none"
                      type="text"
                      name="nin"
                      placeholder="Enter NIN"
                      value={tierTwo?.nin}
                      onChange={handleNinChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigateTo("/kyc/tier/2")}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyLevelTwo;
