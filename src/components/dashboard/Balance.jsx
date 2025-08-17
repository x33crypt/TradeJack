import React, { useState } from "react";

const Balance = ({ dashboard }) => {
  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight ">
        <p className="text-lg font-semibold text-tradeFadeWhite flex items-center gap-1">
          Hello,{" "}
          <span className=" text-white">
            {dashboard?.profile?.username || "User"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        <div className="p-[12px] bg-tradeAsh h-[115px] rounded-[15px]"></div>
      </div>
    </div>
  );
};

export default Balance;
