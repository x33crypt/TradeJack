import React, { useEffect } from "react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAutoReloadOnReconnect from "@/hooks/useAutoReloadConnection";

const ReloadPage = () => {
  // useAutoReloadOnReconnect();

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center h-svh bg-black text-white">
      <p className="lg:text-sm font-semibold w-[350px] text-center ">
        You're currently offline. We're retrying in the background, please check
        your connection...
      </p>

      <AiOutlineLoading3Quarters className="text-tradeGreen text-xl lg:text-[30px] animate-spin-faster" />
    </div>
  );
};

export default ReloadPage;
