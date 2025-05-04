import React from "react";
import { TiWarning } from "react-icons/ti";

const Warning = (prop) => {
  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] rounded-[10px] border border-red-400 bg-red-100">
      <TiWarning className="text-black text-[18px] flex-shrink-0" />
      <p className="text-[13px] m-0 leading-normal text-black w-full break-words">
        {prop?.text}
      </p>
    </div>
  );
};

export default Warning;
