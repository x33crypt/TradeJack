import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";

const Info = (prop) => {
  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] rounded-[10px bg-tradeAshExtraLigh borde border-tradeAshLight">
      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
      <p className="text-xs m-0 leading-normal text-tradeFadeWhite w-full break-words">
        {prop?.text}
      </p>
    </div>
  );
};

export default Info;
