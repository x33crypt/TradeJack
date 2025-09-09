import React from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { LuLoader } from "react-icons/lu";


const Loading = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-transparent rounded-[15px]">
      <MdOutlineRefresh className="animate-spin md:text-[22px] text-tradeFadeWhite" />
    </div>
  );
};

export default Loading;
