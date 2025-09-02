import React, { useState } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const Balance = ({ dashboard, loading }) => {
  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800">
      <div className="flex md:flex-row flex-col px-[15px] py-[12px] md:border-b border-tradeAshLight gap-[2px] ">
        <p className="md:text-lg text-xl  font-semibold text-tradeFadeWhite flex items-center">
          Welcome Back,{" "}
        </p>
        <p className="md:text-lg text-xl font-semibold text-white flex items-center">
          {dashboard?.profile?.userName || "User"}.
        </p>
      </div>

      <div className="flex flex-1 min-h-[144.5px] p-[15px]">
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
