import InAppNav from "@/components/others/InAppNav";
import Footer from "@/components/others/Footer";
import React from "react";
import NetworkError from "@/components/others/NetworkError";
import Loading from "@/components/others/Loading";
import { useFetchKycStatus } from "@/hooks/userHooks/useFetchKycStatus";
import { useKyc } from "@/context/userContext/KycContext";
import LevelOne from "@/components/kyc/LevelOne";
import LevelTwo from "@/components/kyc/LevelTwo";
import LevelThree from "@/components/kyc/LevelThree";
import LevelZero from "@/components/kyc/LevelZero";

const KycLevels = () => {
  const { loading } = useFetchKycStatus();
  const { levels } = useKyc();
  const { current, details, upgrade } = levels;

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
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              KYC LEVELS
            </p>
          </div>
          <div className="flex-1 flex">
            {/* loading */}
            {false ? (
              <Loading />
            ) : (
              <div className="flex flex-1">
                {/* levels === null */}
                {false ? (
                  <NetworkError />
                ) : (
                  <div className="flex flex-1 flex-col gap-[40px]">
                    {current === 0 ? (
                      <LevelZero details={details} upgrade={upgrade} />
                    ) : current === 1 ? (
                      <LevelOne details={details} upgrade={upgrade} />
                    ) : current === 2 ? (
                      <LevelTwo details={details} upgrade={upgrade} />
                    ) : (
                      <LevelThree details={details} upgrade={upgrade} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KycLevels;
