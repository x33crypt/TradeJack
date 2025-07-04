import Footer from "@/components/Footer";
import InAppNav from "@/components/InAppNav";
import RecentTransaction from "@/components/wallet/RecentTransaction";
import React from "react";

const Transfer = () => {
  return (
    <>
      <InAppNav />
      <div className="md:pt-[64px] pt-[60px] lg:px-[2%] md:px-[2.5%] min-h-svh flex gap-[10px] bg-black ">
        <div className="flex-1 flex flex-col gap-[10px]">
          <div className="flex lg:flex-row flex-col gap-[10px]">
            <div className="flex-1 flex flex-col h-full md:border border-neutral-800 bg-tradeAs">
              <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
                <p className="text-lg font-[700] text-white">Money Transfer</p>
              </div>
              <div className="flex flex-col p-[15px] gap-[10px] h-full">
                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-tradeGreen text-xs font-medium ">
                        Transfer From
                      </p>
                    </div>

                    <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-white text-xs font-bold">NGN</p>
                    </div>
                  </div>

                  <div className="w-full flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-[10px] flex-1">
                      <p className="text-white text-lg font-semibold leading-none">
                        #124,896.00
                      </p>

                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Current balance
                      </p>
                    </div>

                    <div>
                      <p className="text-tradeOrange text-[13px] font-semibold">
                        $54,896.00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
                  <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
                    <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-tradeGreen text-xs font-medium ">
                        Transfer To
                      </p>
                    </div>

                    <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                      <p className="text-white text-xs font-bold">NGN</p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start justify-between gap-[10px]">
                    <div className="flex flex-col pb-[5px] gap-[10px] w-full border-b border-tradeAshLight bg-tradePurpl">
                      <p className="text-tradeFadeWhite text-xs font-semibold">
                        Recipient Username
                      </p>
                      <div className="flex-1 bg-tradeAsh w-full bg-tradePurpl">
                        <input
                          className="bg-transparent w-full border-none outline-none text-white placeholder:text-tradeFadeWhite text-lg font-semibold leading-none"
                          type="text"
                          placeholder="JoneDoe"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-[10px]">
                      <div className="flex flex-col pb-[5px] gap-[10px] w-full border-b border-tradeAshLight bg-tradePurpl">
                        <p className="text-tradeFadeWhite text-xs font-semibold">
                          Amount
                        </p>
                        <div className="flex-1 flex  bg-tradeAsh w-full">
                          <input
                            className="bg-transparent flex-1 border-none outline-none text-white placeholder:text-tradeFadeWhite text-lg font-semibold leading-none"
                            type="text"
                            placeholder="Enter amount (Min: NGN 1,500)"
                          />
                        </div>
                      </div>
                      <div className="">
                        <p className="text-tradeOrange text-[13px] font-semibold">
                          Transfering $23,00.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transfer;
