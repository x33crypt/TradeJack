import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

const Info = (prop) => {
  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] rounded-[15px] border border-tradeGreen bg-tradeLightGreen">
      <FaCircleInfo className="text-black text-[14px] flex-shrink-0" />
      <p className="text-[13px] m-0 leading-normal text-black w-full break-words">
        {prop?.text}
      </p>
    </div>
  );
};

export default Info;
