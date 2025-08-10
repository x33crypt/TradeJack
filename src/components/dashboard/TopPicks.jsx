import React from "react";

const TopPicks = () => {
  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Top Picks</p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        <div className="p-[12px] bg-tradeAsh h-[100px] rounded-[15px]"></div>
      </div>
    </div>
  );
};

export default TopPicks;
