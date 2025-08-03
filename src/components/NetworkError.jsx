import React from "react";
import { TbFaceIdError } from "react-icons/tb";

const NetworkError = ({ text }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-[10px]">
      <TbFaceIdError className="text-[55px] text-tradeAshLight leading-none" />
      <p className="text-lg font-semibold text-white leading-none">
        No internet connection
      </p>
      <p className="text-xs font-medium text-tradeFadeWhite text-center">
        Check your connection or refresh.
      </p>
    </div>
  );
};

export default NetworkError;
