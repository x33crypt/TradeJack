import React from "react";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BsStars } from "react-icons/bs";
import { Si2Fas } from "react-icons/si";

const KycBenefits = () => {
  const benefits = [
    {
      icon: <FaSquareArrowUpRight />,
      title: "Higher Purchase Limits",
      description:
        " Transaction limit increases by 1,000 USD upon successful KYC verification.",
    },
    {
      icon: <VscVerifiedFilled />,
      title: "Verification Badge",
      description:
        "Get a verified badge to stand out and build instant trust with potential traders and buyers.",
    },
    {
      icon: <BsStars />,
      title: "Access to Premium Features",
      description:
        "Gain access to exclusive tools, deals, or high-tier trading options.",
    },
    {
      icon: <Si2Fas />,
      title: "Enhanced Account Recovery",
      description:
        " Strengthen your account security and simplify recovery in case of loss or unauthorized access.",
    },
  ];

  return (
    <div className="flex flex-col w-full h-max md:border-x md:border-b md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg text-white font-[700]">KYC Benefit</p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex gap-4 bg-tradeAsh p-3 rounded-[15px] items-center shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="min-w-[50px] min-h-[50px] flex items-center justify-center bg-tradeAshLight rounded-lg">
              <div className="text-tradeOrange text-[30px]">{benefit.icon}</div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                {benefit.title}
              </p>
              <p className="text-xs text-tradeFadeWhite">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KycBenefits;
