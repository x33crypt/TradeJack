import React from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../context/ProfileNavContext";
import { IoClose } from "react-icons/io5";
import landingImg4 from "./../assets/landingImg4.JPG";
import Button from "./buttons/Button";
import { useNavigate } from "react-router-dom";

const ProfileNav = () => {
  const { show, setShow } = useProfileNav();

  const close = () => {
    setShow(false);
  };

  const navigateTo = useNavigate();

  const toAccount = () => {
    setShow(false);
    navigateTo("/account");
  };

  return (
    <>
      {show && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col  bg-tradeAsh borde border-tradeAshLight rounded-[15px] shadow-lg w-[350px] min-h-[400px]">
              <div className="flex justify-between items-center gap-[15px] px-[15px] py-[12.3px]  border-b border-tradeAshLight">
                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-[25px] p-[15px]">
                <div className="flex flex-col items-center justify-center gap-3 ">
                  <div className="cursor-pointer w-[70px]">
                    <img src={landingImg4} alt="" className="rounded-full" />
                  </div>

                  <p className="text-[13px] font-medium text-white leading-none">
                    adeleke@gmail.com
                  </p>
                </div>

                <div className="bg-tradeAsh p-[12px rounded-[15px] shadow-lg flex flex-col gap-[5px] borde border-tradeAshLight">
                  <p
                    onClick={toAccount}
                    className="p-[12px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-sm font-medium transition-all duration-300 cursor-pointer"
                  >
                    Account
                  </p>
                  <p className="p-[12px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-sm font-medium transition-all duration-300 cursor-pointer">
                    Settings
                  </p>
                  <p className="p-[12px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-sm font-medium transition-all duration-300 cursor-pointer">
                    Referals
                  </p>
                  <p className="p-[12px] bg-red-600 text-white text-sm font-medium rounded-[10px] transition-all duration-300 cursor-pointer">
                    Log Out
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <p className="text-xs font-medium text-tradeFadeWhite">
                    TradeJack Version 1.0
                  </p>
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
