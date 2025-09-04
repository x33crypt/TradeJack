import React, { useState } from "react";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const Balance = ({ dashboard, loading }) => {
  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800">
      <div className="flex flex-col md:flex-row px-[15px] py-[12px] md:border-b border-tradeAshLight gap-[2px]">
        <div className="flex  md:flex-row flex-col gap-[2px]">
          <div className="flex  md:flex-row gap-[2px]">
            <p className="md:text-lg text-lg font-semibold text-white">
              Welcome Back,
            </p>
            <p className="md:text-lg text-lg font-semibold text-white">
              {dashboard?.profile?.userName || "User"}
            </p>
          </div>

          <p className="text-[13px] font-medium text-tradeFadeWhite md:hidden flex ">
            Here’s an overview of your dashboard
          </p>
        </div>
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
