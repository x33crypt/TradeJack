import React from "react";

const LinkedAccount = () => {
  return (
    <div className="flex flex-col lg:w-full md:w-[350px] md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col justify-between lg:h-full md:h-[180px] h-[200px] p-[12px] gap-[30px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Bank Account
              </p>
            </div>

            <div className="flex gap-[5px]">
              <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-bold">USD </p>
              </div>

              <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-bold">NGN </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedAccount;
