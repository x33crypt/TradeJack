import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";

const Info = (prop) => {
  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] rounded-[10px] bg-tradeAshExtraLight/10 border border-tradeAshLight">
      <FaCircleInfo className="text-tradeOrange text-xl flex-shrink-0" />
      <p className="text-xs m-0 leading-normal text-white w-full break-words">
        {prop?.text}
      </p>
    </div>
  );
};

export default Info;
