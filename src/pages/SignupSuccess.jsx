import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigateTo = useNavigate();
  return (
    <div className="bg-black h-screen flex p-[20px]  justify-center items-center">
      <div className="flex flex-col items-center p-[20px] gap-[30px] rounded-[14px] bg-tradeAsh border border-tradeAshExtraLight ">
        <div className="lg:text-[120px] md:text-[120px] text-[120px] text-tradeGreen">
          <IoMdCheckmarkCircleOutline />
        </div>

        <div className="w-full flex flex-col items-center gap-[25px]">
          <p className="text-tradeFadeWhite text-[14px] sm:w-[250px] text-center font-[500]">
            Your account has been successfully created. Please log in to access
            your dashboard.
          </p>
          <button
            onClick={() => navigateTo("/login")}
            className=" lg:w-[250px] w-full bg-white p-[10px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
          >
            <p className="text-[14px] font-[700] text-black">
              Proceed to Login
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
