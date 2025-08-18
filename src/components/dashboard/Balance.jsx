import React, { useState } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const Balance = ({ dashboard, loading }) => {
  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight ">
        <p className="text-lg font-semibold text-tradeFadeWhite flex items-center gap-1">
          Welcome back,{" "}
          <span className=" text-white">
            {dashboard?.profile?.username || "User"}
          </span>
        </p>
      </div>

      <div className="flex flex-1 min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px] bg-tradeAsh rounded-[15px] border border-tradeAshLight p-[12px]"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
