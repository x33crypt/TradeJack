import React from "react";

const TopLayer = () => {
  return (
    <div className="lg:pt-[40px] pt-[60px] lg:pb-[100px] pb-[80px] flex flex-col px-[5%]">
      <div className="flex flex-col justify-center items-center">
        <p className="lg:text-[90px]  text-[45px] text-center text-white font-[500] lg:leading-[100px] leading-[55px] lg:w-[800px]">
          Trade smarter, safer, and faster
        </p>
        <p className="mt-[25px] lg:w-[700px] font-[500] lg:text-[19px] text-[17px] text-center text-neutral-400">
          Empowering global transactions with unmatched security, transparency,
          and ease. Explore a marketplace designed for seamless trades and
          profitable opportunities.
        </p>
        <div className="mt-[30px] lg:px-[30px] py-[10px] w-[100%] border border-tradeAsh bg-tradeGreen rounded-[8px] flex justify-center">
          <p className="font-[600] text-black">Get Started Now</p>
        </div>
      </div>
    </div>
  );
};

export default TopLayer;
