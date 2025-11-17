import React, { useState } from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../../context/otherContext/ProfileNavContext";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "@/context/userContext/LogOutContext";
import { FaUser } from "react-icons/fa";
import { RiSpeedUpFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const ProfileNav = () => {
  const { show, setShow } = useProfileNav();
  const { state, setState } = useLogOut();

  const close = () => {
    setShow(false);
  };

  const handleLogout = async () => {
    setShow(false);
    setState(true);
  };

  const navigateTo = useNavigate();

  return (
    <>
      {show && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[15px] bg-black backdrop-blur-md bg-opacity-80 z-40">
            <div className="flex relative flex-col flex-1 h-full gap-[20px] items-center justify-center">
              <div
                onClick={close}
                className="absolute top-0 md:top-1 md:right-6 right-0 flex text-tradeFadeWhite hover:text-white gap-1  bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <IoCloseSharp className="text-[16px]" />
              </div>

              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[20px] ">
                  <div
                    onClick={() => {
                      navigateTo("/profile");
                      setShow(false);
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <div className="flex w-max justify-center p-[15px] md:p-[15px] text-tradeFadeWhite md:text-2xl text-xl  rounded-[15px] border items-center">
                      <FaUser />
                    </div>
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      Profile
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigateTo("/kyc/levels");
                      setShow(false);
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <div className="flex w-max justify-center p-[15px] md:p-[15px] text-tradeFadeWhite md:text-2xl text-xl  rounded-[15px] border items-center">
                      <RiSpeedUpFill />
                    </div>
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      Limits
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <div
                    onClick={() => {
                      navigateTo("/settings");
                      setShow(false);
                    }}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <div className="flex w-max justify-center p-[15px] md:p-[15px] text-tradeFadeWhite md:text-2xl text-xl  rounded-[15px] border items-center">
                      <IoMdSettings />
                    </div>
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      Setting
                    </p>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <div className="flex w-max justify-center p-[15px] md:p-[15px] text-tradeFadeWhite md:text-2xl text-xl  rounded-[15px] border items-center">
                      <IoLogOutSharp />
                    </div>
                    <p className="text-tradeFadeWhite text-[13px] font-semibold">
                      Log out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
