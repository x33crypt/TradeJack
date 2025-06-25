import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingPage = ({ text }) => {
  console.log("Hey its LoadingPage loading text - ", text);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-svh bg-black text-white">
      <AiOutlineLoading3Quarters className="text-tradeGreen text-xl lg:text-[30px] animate-spin-faster" />
      <p className="text-sm font-semibold">{text}...</p>
    </div>
  );
};

export default LoadingPage;
