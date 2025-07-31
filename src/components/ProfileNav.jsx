import React from "react";
import LockByScroll from "./LockByScroll";
import { useProfileNav } from "../context/ProfileNavContext";
import { IoClose } from "react-icons/io5";
import landingImg4 from "./../assets/landingImg4.JPG";

const ProfileNav = () => {
  const { show, setShow } = useProfileNav();

  const close = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div>
          <LockByScroll />
          <div className="fixed top-0 left-0 right-0 bottom-0 lg:px-[15px] md:px-[2.5%] p-[35px] bg-black bg-opacity-80 flex items-center justify-center z-40">
            <div className="flex flex-col justify-between gap-[10px] bg-tradeAsh borde border-tradeAshLight p-[15px] rounded-[15px] shadow-lg lg:max-w-[350px] w-full">
              {/* <div className="flex justify-between items-center gap-[15px] pb-[15px] md:pt-0 md:p-[15px] lg:pb-[12px] lg:p-0 border-b border-tradeAshLight">
                <div className="flex items-center gap-3">
                  <div className="cursor-pointer lg:w-[32px] sm:w-[30px] w-[32px]">
                    <img src={landingImg4} alt="" className="rounded-full" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white leading-none">
                      adeleke@gmail.com
                    </p>
                  </div>
                </div>

                <div onClick={close}>
                  <IoClose className="text-tradeFadeWhite hover:text-white cursor-pointer text-xl" />
                </div>
              </div> */}
              <div className="bg-tradeAsh p-[12px rounded-[15px] shadow-lg flex flex-col gap-[5px] borde border-tradeAshLight">
                <p className="px-[12px] py-[10px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-[13px] font-medium transition-all duration-300 cursor-pointer">
                  Profile
                </p>
                <p className="p-[12px] py-[10px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-[13px] font-medium transition-all duration-300 cursor-pointer">
                  Invite a friend
                </p>
                <p className="p-[12px] py-[10px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-[13px] font-medium transition-all duration-300 cursor-pointer">
                  Settings
                </p>
                <p className="p-[12px] py-[10px] hover:bg-tradeAshLight border border-tradeAshLight rounded-[10px] text-tradeFadeWhite hover:text-white text-[13px] font-medium transition-all duration-300 cursor-pointer">
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileNav;
