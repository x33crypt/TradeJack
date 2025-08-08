import React from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../context/ProfileNavContext";
import { IoClose } from "react-icons/io5";
import landingImg4 from "./../assets/landingImg4.JPG";
import Button from "./buttons/Button";
import { useNavigate } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";

const ProfileNav = () => {
  const { show, setShow } = useProfileNav();

  const toAccount = () => {
    setShow(false);
    navigateTo("/account");
  };

  const close = () => {
    setShow(false);
  };

  const navigateTo = useNavigate();

  return (
    <>
      {show && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex flex-col gap-[10px] items-center justify-center z-40">
            <div className="flex p-[12px] bg-tradeAsh border border-tradeAshLight items-center justify-between rounded-[15px] w-[300px]">
              <div className="flex items-center  gap-3 ">
                <div className="cursor-pointer w-[40px]">
                  <img src={landingImg4} alt="" className="rounded-full" />
                </div>

                <div className="flex flex-col gap-[5px] bg">
                  <p className="text-base leading-none text-white font-semibold">
                    0xsanityy
                  </p>
                  <p className="text-xs font-semibold text-tradeFadeWhite leading-none">
                    adeleke@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center text-tradeGreen border border-tradeAshExtraLight text-[20px] p-2 w-max h-max bg-tradeAshLight rounded-[10px]">
                <FaUserCheck />
              </div>
            </div>

            <div className="flex flex-col  bg-tradeAsh border border-tradeAshLight rounded-[15px] shadow-lg w-[300px] ">
              <div className="flex flex-1 flex-col justify-between gap-[15px] p-[12px]">
                <div className="bg-tradeAsh p-[12px rounded-[15px] shadow-lg flex flex-col gap-[5px] borde border-tradeAshLight">
                  <Button variant="outline" onClick={toAccount}>
                    Account
                  </Button>
                  <Button variant="outline">Settings</Button>
                  <Button variant="danger">Log Out</Button>
                </div>

                <div className="flex items-center justify-center">
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    TradeJack Version 1.0
                  </p>
                </div>
              </div>
            </div>

            <div onClick={close} className=" w-[300px]">
              <Button variant="Fadeout">Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
