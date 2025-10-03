import React from "react";
import { TiWarning } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

const Warning = (prop) => {
  return (
    <div className="w-full flex items-center p-[10px] gap-[10px] rounded-[10px] bg-red-600">
      <div className="text-2xl text-white">
        <MdCancel />
      </div>
      <p className="text-xs m-0 leading-normal text-white w-full break-words">
        {prop?.text}
      </p>
    </div>
  );
};

export default Warning;
