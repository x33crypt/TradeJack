import React from "react";
import { PiFediverseLogoFill } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiGlobalFill } from "react-icons/ri";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { PiPiggyBankBold } from "react-icons/pi";
import { AiOutlineSolution } from "react-icons/ai";
import { SiVfairs } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";

const Layer3 = () => {
  return (
    <div className="px-[5%] bg-tradeWhite  pt-[150px] pb-[100px]">
      <div className=" flex flex-col justify-between">
        <div className="">
          <div className=" z-10 relative border border-tradeGreen w-[100px] h-[28.5px] pb-[2px] rounded-[8px]">
            <p className=" absolute top-[-2px] left-[-3px] text-[12px] text-white font-[500] px-[20px] py-[4px] rounded-[6px] bg-tradeGreen w-max">
              FEATURES
            </p>
          </div>
          <p className="mt-[10px] text-[50px] font-[500] w-[600px] leading-[70px]">
            Trade Your Way, Securely and Transparently
          </p>
        </div>
        <div className="flex items-end mt-[20px]">
          <p className="text-neutral-500 text-[18px] leading-[30px] w-[650px]">
            Explore how our platform solves key trading challenges with
            innovative features designed for security, transparency, and global
            accessibility.
          </p>
        </div>
      </div>
      <div className="flex mt-[80px]">
        <div className="flex flex-1 flex-col p-[30px] border-r">
          <BsGlobe className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Global Accessibility</p>
          <p className="mt-[5px] text-neutral-500">
            Break geographical barriers by enabling users worldwide to trade
            digital assets seamlessly, ensuring inclusivity and ease of access
            for everyone.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px] border-r">
          <PiFediverseLogoFill className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Multi-Asset Support</p>
          <p className="mt-[5px] text-neutral-500">
            Diversify your portfolio with our platform’s support for various
            asset types, including cryptocurrencies, fiat currencies, and other
            financial assets.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px] border-r">
          <MdOutlineVerified className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Verified Vendor Network</p>
          <p className="mt-[5px] text-neutral-500">
            Trade confidently with a network of thoroughly verified vendors,
            ensuring safety, transparency, and trust in every transaction.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px]">
          <MdOutlineSecurity className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Advanced Security Protocols</p>
          <p className="mt-[5px] text-neutral-500">
            Protect your trades and data with industry-leading security
            measures, giving you peace of mind at every step.
          </p>
        </div>
      </div>
      <div className="flex border-t">
        <div className="flex flex-1 flex-col p-[30px]  border-r">
          <MdOutlineNotificationAdd className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Instant Notifications</p>
          <p className="mt-[5px] text-neutral-500">
            Get real-time updates on your trades with instant payment alerts,
            ensuring you're always in the loop with every transaction.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px] border-r">
          <SiVfairs className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Transparent Transactions</p>
          <p className="mt-[5px] text-neutral-500">
            Experience zero hidden fees or unclear terms, with every trade
            carried out with absolute transparency and clarity.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px] border-r">
          <PiPiggyBankBold className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold"> Collateral-Backed Offers</p>
          <p className="mt-[5px] text-neutral-500">
            Vendors are required to provide collateral deposits for their
            offers, ensuring added security and reliability in trades.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-[30px]">
          <AiOutlineSolution className="text-[40px] text-tradeGreen" />
          <p className="mt-[20px] font-semibold">Robust Dispute Resolution</p>
          <p className="mt-[5px] text-neutral-500">
            Encounter an issue? Submit a dispute, and our dedicated team will
            resolve it promptly and fairly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layer3;
