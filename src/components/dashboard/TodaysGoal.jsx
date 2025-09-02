import React from "react";
import OfferCard from "../cards/Mobile/OfferCard";
import Loading from "../others/Loading";
import NetworkError from "../others/NetworkError";

const TodaysGoal = ({ loading, dashboard }) => {
  return (
    <div className="flex flex-1 flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Todays Goals</p>
      </div>

      <div className="flex flex-1 min-h-[120px] p-[15px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {dashboard === null ? (
              <NetworkError />
            ) : (
              <div className="flex flex-1 flex-col gap-[10px] p-[12px]"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysGoal;
