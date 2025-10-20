import React from "react";
import NetworkError from "@/components/others/NetworkError";
import toDecimal from "@/utils/toDecimal";

const EscrowActivity = () => {
  const excrow = [
    { id: 1, amount: 76000, currency: "USD", status: "Locked" },
    { id: 1, amount: 800000, currency: "USD", status: "Unlocked" },
    { id: 1, amount: 23000, currency: "USD", status: "Unlocked" },
    { id: 1, amount: 5000, currency: "USD", status: "Unlocked" },
    { id: 1, amount: 89000, currency: "USD", status: "Unlocked" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-sm font-semibold text-white flex items-center gap-1">
          ESCROW ACTIVITY
        </p>
      </div>

      <div className="flex h-full min-h-[125px] ">
        {/* loading */}
        {false ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {/* transactions === null */}

            {false ? (
              <NetworkError />
            ) : (
              <div className="flex custom-x-scrollbar overflow-x-auto gap-[10px]">
                {excrow?.slice(0, 1).map((ex, index) => (
                  <div className="flex flex-col justify-between bg-tradeAsh border border-tradeAshLight min-w-[140px] h-max p-[12px] rounded-sm  gap-1 ">
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-xs font-medium leading-none">
                        NGN
                      </p>
                    </div>

                    <p className="md:text-2xl text-lg font-semibold text-white">
                      {toDecimal(ex?.amount)}
                    </p>

                    <p className="text-tradeFadeWhite text-xs font-medium">
                      19/Feb/2025
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EscrowActivity;
