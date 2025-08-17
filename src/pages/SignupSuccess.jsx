import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useSafeNavigate from "../components/others/SafeNavigation";

const SignupSuccess = () => {
  const navigateTo = useSafeNavigate();

  return (
    <div className="z-50 fixed inset-0 bg-black min-h-svh flex p-[35px] justify-center items-center">
      <div className="flex flex-col items-center lg:p-[20px] p-[15px] md:gap-[30px] gap-[30px] rounded-[12px] bg- borde border-tradeAshExtraLight ">
        <div className="w-full flex flex-col items-center gap-[5px]">
          <div className="w-full flex items-center justify-center  text-white text-[100px]">
            <IoMdCheckmarkCircleOutline />
          </div>

          <p className="text-tradeFadeWhite text-[13px] sm:w-[250px] text-center font-[500]">
            Your account has been successfully created. Please log in to access
            your dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <button
            onClick={() => navigateTo("/login")}
            className=" lg:w-[250px] w-full text-black hover:text-tradeGreen bg-tradeGreen  p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-tradeAsh transition-all duration-300"
          >
            <p className="text-[14px] font-[700] ">Proceed to log in</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
