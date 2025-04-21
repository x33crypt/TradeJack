import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RouteProtector from "./RouteProtector";
import axios from "axios";

const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    setError("");

    try {
      // replace this with your actual verification endpoint
      await axios.post("/auth/verify-password", { password });
      // navigate(redirectTo);
    } catch (err) {
      setError("Incorrect password. Please try again.");
      setVerifying(false);
    }
  };

  return (
    <div className=" z-50 fixed inset-0 bg-black min-h-svh flex p-[35px] justify-center items-center">
      <div className="flex flex-col items-center lg:p-[20px] p-[15px] md:gap-[40px] gap-[30px] rounded-[12px] bg- borde border-tradeAshExtraLight ">
        <div className="w-full flex flex-col items-center gap-[10px]">
          <div className="">
            <p className="text-white text-[20px] sm:w-[250px] text-center font-[600]">
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
            // onClick={() => safeNavigate(location?.state?.from || -1)}
            className=" lg:w-[250px] w-full bg-tradeAsh p-[10px] rounded-[10px] borde flex justify-center items-center cursor-pointer hover:bg-tradeAsh transition"
          >
            <p className="text-[14px] font-[700] text-white">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
