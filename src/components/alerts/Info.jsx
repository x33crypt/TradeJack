import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";


const Info = (prop) => {
  return (
    <div className="w-full flex items-center p-2 border border-tradeAshLight gap-3 rounded-[15px]">
      <FaCircleInfo className="text-tradeOrange text-sm flex-shrink-0" />
      <p className="text-xs leading-norma text-tradeAshExtraLight w-full font-medium">
        {prop?.text}
      </p>
    </div>
  );
};

export default Info;
