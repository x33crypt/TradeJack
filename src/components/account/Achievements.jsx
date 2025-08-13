import React from "react";
import Loading from "../Loading";
import NetworkError from "../NetworkError";

const Achievements = ({ loading, profile }) => {
  return (
    <div className="flex-1 flex flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Achievements</p>
      </div>
      <div className="flex flex-1 p-[15px] min-h-[120px]">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {profile === null ? <NetworkError /> : <div></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
