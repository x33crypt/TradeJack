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
import { RiUserCommunityFill } from "react-icons/ri";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const MobileSettings = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex lg:hidden flex-col flex-1 md:border-x md md:border-t border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <div className="flex gap-[15px] items-center">
          <IoMdArrowRoundBack className="text-white  text-[20px]" />

          <p className="text-lg text-white font-[700]">Settings</p>
        </div>
        <FaMagnifyingGlass className="text-white  text-[20px]" />
      </div>

      <div className="flex flex-col p-[15px] gap-[10px] bg-tradeAs">
        <div className="px-[12px] bg-tradeAsh rounded-[15px]">
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div
              onClick={() => navigateTo("/settings/account")}
              className="flex gap-4 items-center"
            >
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <FaUserCircle className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Account
                </p>
              </div>
            </div>

            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <IoWalletOutline className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Manage wallet
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <RiTimerFlashLine className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Promotions
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <MdOutlinePrivacyTip className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Privacy & safety
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <IoNotificationsOutline className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Notifications
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <MdOutlineSecurity className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Security & access
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <BiSupport className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Help & support
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <RiUserCommunityFill className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Community
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border-b border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <IoArrowRedoOutline className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  Refer friends
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="flex justify-between items-center py-[12px] border- border-tradeAshLight">
            <div className="flex gap-4 items-center">
              <div className="">
                <div className="text-tradeGreen text-[20px]">
                  <FaInfoCircle className="" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white text-sm font-semibold leading-none">
                  About
                </p>
              </div>
            </div>
            <div className="text-tradeFadeWhite text-[22px]">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSettings;
