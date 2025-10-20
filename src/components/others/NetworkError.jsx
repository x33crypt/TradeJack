import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import { MdOutlineRefresh } from "react-icons/md";
import { BiFileBlank } from "react-icons/bi";

const NetworkError = ({ text }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-[10px]">
      <MdOutlineRefresh className="md:text-[22px] text-tradeFadeWhite" />
      <div className="flex flex-col gap-[5px] items-center justify-center ">
        <p className="text-[13px] font-semibold text-white leading-none">
          NO INTERNET
        </p>

        <p className="text-xs font-medium text-tradeFadeWhite text-center">
          ERR_INTERNET_DISCONNECTED
        </p>
      </div>
    </div>
  );
};

export default NetworkError;
