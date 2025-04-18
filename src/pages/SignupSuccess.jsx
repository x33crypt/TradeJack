import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigateTo = useNavigate();
  return (
    <div className="bg-black h-screen flex flex-col  p-[20px] gap-[20px] justify-center items-center">
      <div className="lg:text-[180px] md:text-[120px] text-[120px] text-tradeGreen">
        <IoMdCheckmarkCircleOutline />
      </div>

      <div className="w-full flex flex-col items-center gap-[25px]">
        <p className="text-tradeFadeWhite text-[14px] font-[500]">
          Account created successfully.
        </p>
        <button
          onClick={() => navigateTo("/login")}
          className=" lg:w-[300px] w-full bg-white p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <p className="text-[14px] font-[700] text-black">Go to Login</p>
        </button>
      </div>
    </div>
  );
};

export default SignupSuccess;
