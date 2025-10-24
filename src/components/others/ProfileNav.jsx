import React, { useState } from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../../context/otherContext/ProfileNavContext";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "@/context/userContext/LogOutContext";
import { IoMdArrowDropright } from "react-icons/io";

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
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[15px] bg-black backdrop-blur-sm bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col gap-[20px] w-[250px]">
              <div className="flex flex-col gap-[15px]">
                <div
                  onClick={() => {
                    navigateTo("/profile");
                    setShow(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    PROFILE
                  </p>
                </div>
                <div
                  onClick={() => {
                    navigateTo("/kyc/levels");
                    setShow(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    KYC LEVELS
                  </p>
                </div>
                <div
                  onClick={() => {
                    navigateTo("/settings");
                    setShow(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    SETTINGS
                  </p>
                </div>
                <div
                  // onClick={() => {
                  //   navigateTo("/settings");
                  //   setShow(false);
                  // }}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    REWARDS
                  </p>
                </div>
                <div
                  // onClick={() => {
                  //   navigateTo("/settings");
                  //   setShow(false);
                  // }}
                  className="flex items-center gap-2"
                >
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-tradeFadeWhite hover:text-white text-base font-bold transition-all duration-300 cursor-pointer">
                    REFERALS
                  </p>
                </div>
                <div onClick={handleLogout} className="flex items-center gap-2">
                  <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
                  <p className="text-red-600 hover:text-red-600/60 text-base font-bold transition-all duration-300 cursor-pointer">
                    LOG OUT
                  </p>
                </div>
              </div>

              <Button onClick={close} variant="outline">
                CLOSE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
