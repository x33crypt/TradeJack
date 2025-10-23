import React from "react";
import NetworkError from "@/components/others/NetworkError";
import toDecimal from "@/utils/toDecimal";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { CgArrowLongRight } from "react-icons/cg";

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

        <CgArrowLongRight className="text-tradeFadeWhite hover:text-tradeOrange text-[30px] leading-none cursor-pointer" />
      </div>

      <div className="flex h-full ">
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
                {excrow?.slice(0, 2).map((ex, index) => (
                  <div className="flex flex-col justify-between bg-tradeAsh border border-tradeAshLight min-w-[140px] h-max p-[12px] rounded-[15px]  gap-1 ">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-white text-xs font-medium leading-none">
                        NGN
                      </p>

                      <div>
                        {ex.status === "Locked" ? (
                          <FaLock className="text-[12px] text-tradeOrange" />
                        ) : (
                          <FaLockOpen className="text-[12px] text-tradeFadeWhite" />
                        )}
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-white">
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
