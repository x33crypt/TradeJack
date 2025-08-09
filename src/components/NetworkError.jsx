import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import { MdOutlineRefresh } from "react-icons/md";

const NetworkError = ({ text }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-[5px] bg-transparent rounded-[15px]">
      <p className="text-[13px] font-semibold text-white leading-none">
        No internet connection
      </p>
      <p className="text-xs font-medium text-tradeFadeWhite text-center">
        Check your connection or refresh.
      </p>

      <MdOutlineRefresh className="md:text-[22px] text-tradeFadeWhite" />
    </div>
  );
};

export default NetworkError;
