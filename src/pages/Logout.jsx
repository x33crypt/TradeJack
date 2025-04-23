import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSafeNavigate from "../components/SafeNavigation";
import { IoLogInOutline } from "react-icons/io5";

const Logout = () => {
  const navigateTo = useSafeNavigate();
  const location = useLocation();

  const handleLogout = () => {};

  return (
    <div className="z-50 fixed inset-0 bg-black min-h-svh flex px-[35px] justify-center items-center">
      <div className="flex flex-col items-center lg:p-[20px] p-[15px] md:gap-[30px] gap-[30px] bg- borde border-tradeAshExtraLight ">
        <div className="w-full flex flex-col items-center gap-[5px]">
          <div className="w-full flex items-center justify-center  text-white text-[100px]">
            <IoLogInOutline />
          </div>

          <p className="text-tradeFadeWhite text-[13px] sm:w-[250px] text-center font-[500]">
            You’re about to log out. Do you want to continue ?
          </p>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <button
            onClick={() => navigateTo("/")}
            className=" lg:w-[250px] w-full text-black hover:text-tradeGreen bg-tradeGreen p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-tradeAsh transition-all duration-300"
          >
            <p className="text-[14px] font-[700] ">Yes, log me out</p>
          </button>
          <button
            onClick={() => navigateTo(location?.state?.from || -1)}
            className=" lg:w-[250px] w-full text-tradeFadeWhite hover:text-white bg-transparent  p-[12px] rounded-[10px] border border-tradeAshLight hover:border-tradeAshExtraLight flex justify-center items-center cursor-pointer transition"
          >
            <p className="text-[14px] font-[700]">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
