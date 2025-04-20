import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSafeNavigate from "../components/SafeNavigation";

const Logout = () => {
  const safeNavigate = useSafeNavigate();
  const location = useLocation();

  return (
    <div className=" z-50 fixed inset-0 bg-black min-h-svh flex p-[35px] justify-center items-center">
      <div className="flex flex-col items-center lg:p-[20px] p-[15px] md:gap-[40px] gap-[30px] rounded-[16px] bg-tradeAsh border border-tradeAshExtraLight ">
        <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="">
            <p className="text-white text-[20px] sm:w-[250px] text-center font-[700]">
              Confirm Logout
            </p>
          </div>
          <p className="text-tradeFadeWhite text-[14px] sm:w-[250px] text-center font-[500]">
            You’re about to log out. Do you want to continue ?
          </p>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <button
            // onClick={() => safeNavigate("/login")}
            className=" lg:w-[250px] w-full bg-tradeGreen p-[10px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="text-[14px] font-[700] text-black">Log out</p>
          </button>
          <button
            onClick={() => safeNavigate(location?.state?.from || -1)}
            className=" lg:w-[250px] w-full bg-black p-[10px] rounded-[10px] border border-tradeAshExtraLight flex justify-center items-center cursor-pointer hover:bg-tradeAsh transition"
          >
            <p className="text-[14px] font-[700] text-white">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
