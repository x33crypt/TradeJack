import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiTimerFlashLine } from "react-icons/ri";
import { RiGift2Fill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileSettings = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex lg:hidden flex-col flex-1 md:border-x md:border-b md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <div className="flex gap-[15px] items-center">
          <IoMdArrowRoundBack className="text-white  text-[20px]" />

          <p className="text-lg text-white font-[700]">Settings</p>
        </div>

        <FaMagnifyingGlass className="text-white  text-[20px]" />
      </div>

      <div className="flex flex-col p-[15px] gap-[10px] bg-tradeAs">
        <div className="flex flex-col bg-tradeAsh rounded-[15px] overflow-hidden border border-tradeAshLight">
          <div
            onClick={() => navigateTo("/settings/account")}
            className="flex gap-4 border-b border-tradeAshLight p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <FaUserCircle className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Account
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <IoWalletOutline className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Manage wallet
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-tradeAsh rounded-[15px] overflow-hidden border border-tradeAshLight">
          <div className="flex gap-4 border-b border-tradeAshLight p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <RiTimerFlashLine className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Promotions
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-b border-tradeAshLight p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <MdOutlinePrivacyTip className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Privacy & safety
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
          <div className="flex gap-4 border- border-tradeAshLight p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <IoNotificationsOutline className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Notifications
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-tradeAsh rounded-[15px] overflow-hidden border border-tradeAshLight">
          <div className="flex gap-4 border-b border-tradeAshLight p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <MdOutlineSecurity className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Security & access
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <BiSupport className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                Help & support
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-tradeAsh rounded-[15px] overflow-hidden border border-tradeAshLight">
          <div className="flex gap-4 p-3 items-center shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="">
              <div className="text-tradeFadeWhite text-[30px]">
                <FaInfoCircle className="" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm font-semibold leading-none">
                About
              </p>
              <p className="text-xs font-medium text-tradeFadeWhite">
                sghxvsjhvxs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSettings;
