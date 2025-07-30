import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin md:text-[22px] text-tradeFadeWhite" />
    </div>
  );
};

export default Loading;
