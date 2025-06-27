import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-svh bg-black text-white">
      <AiOutlineLoading3Quarters className="text-tradeGreen text-xl lg:text-[30px] animate-spin-faster" />
    </div>
  );
};

export default LoadingPage;
