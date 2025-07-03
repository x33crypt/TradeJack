import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsSafe2Fill } from "react-icons/bs";
import { formatDecimal } from "@/utils/numberFormat/numberFormat";
import { LuFileCheck2 } from "react-icons/lu";
import { LuFileX2 } from "react-icons/lu";
import { LuFileClock } from "react-icons/lu";
import { LuFileSearch } from "react-icons/lu";

const Balance = ({ dashboard }) => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  console.log(showBalance);

  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-semibold text-tradeFadeWhite flex items-center gap-1">
          Welcome back,{" "}
          <span className=" text-white ">
            {dashboard?.profile?.username || "User"}
          </span>
        </p>
      </div>
      <p className="flex flex-col gap-[10px] p-[15px]">
        <div className="flex flex-col justify-betwee h-[190px] p-[12px] gap-[10px] bg-tradeGreen rounded-[15px] border border-tradeAshLight">
          {/* Available Balance Section */}
          <div className="flex-1 flex flex-col gap-[10px] ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-black text-[13px] font-semibold">
                  Current balance
                </p>

                <div className="text-black hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                  <FaInfoCircle />
                </div>
              </div>

              <div className="flex items-cente gap-[5px]">
                <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-black text-xs font-bold">USD </p>
                </div>
                <div
                  onClick={toggleBalanceVisibility}
                  className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer"
                >
                  {showBalance ? (
                    <FaEye className="text-sm text-black" />
                  ) : (
                    <FaEyeSlash className="text-sm text-black" />
                  )}
                </div>
              </div>
            </div>

            <div>
              {dashboard?.balances ? (
                <p
                  className={`text-black text-[30px] font-bold leading-none transition-all duration-300 ease-in-out transform ${
                    showBalance
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-95"
                  }`}
                >
                  {showBalance
                    ? `$${formatDecimal(
                        dashboard?.balances?.available_balance
                      )}`
                    : "****"}
                </p>
              ) : (
                <p className="text-black text-3xl md:text-3xl font-extrabold tracking-tight">
                  --.--
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-tradeAshLight"></div>
          {/* Escrow Account Section */}
          <div className="flex-1 flex flex-col gap-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="text-black text-[13px] font-semibold">
                  Escrow balance
                </p>

                <div className="text-black hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                  <FaInfoCircle />
                </div>
              </div>
            </div>

            <div>
              {dashboard?.balances ? (
                <p
                  className={`text-black text-[30px] font-bold leading-none transition-all duration-300 ease-in-out transform ${
                    showBalance
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-95"
                  }`}
                >
                  {showBalance
                    ? `$${formatDecimal(dashboard.balances.escrow_balance)}`
                    : "****"}
                </p>
              ) : (
                <p className="text-black text-3xl md:text-3xl font-extrabold tracking-tight">
                  --.--
                </p>
              )}
            </div>
          </div>
        </div>

        {/* <div className=" grid grid-cols-2 gap-[10px] rounded-[15px] p-[8px bg-tradeAs">
          <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[15px] p-[12px] rounded-2xl cursor-pointer ho-traborder-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-2">
              <LuFileCheck2 className="text-base text-tradeGreen" />

              <p className="text-xs font-semibold text-tradeFadeWhite">
                Successful Trades
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white text-[24px] font-bold leading-tight">
                {dashboard?.activitySummary?.successful_trades ?? "0"}
              </p>
              <span className="text-xs text-tradeGreen bg-tradeGreen/10 px-2 py-[2px] rounded-md font-medium">
                Great job!
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[15px] p-[12px] rounded-2xl cursor-pointer ho-traborder-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-2">
              <LuFileX2 className="text-base text-red-600" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Unsuccessful Trades
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white text-[24px] font-bold leading-tight">
                {dashboard?.activitySummary?.successful_trades
                  ? dashboard?.activitySummary?.successful_trades
                  : "0"}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[15px] p-[12px] rounded-2xl cursor-pointer ho-traborder-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-2">
              <LuFileClock className="text-base text-tradeOrange" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Pending Trades
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white text-[24px] font-bold leading-tight">
                {dashboard?.activitySummary?.pending_trades
                  ? dashboard?.activitySummary?.pending_trades
                  : "0"}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col border border-tradeAshLight bg-tradeAsh gap-[15px] p-[12px] rounded-2xl cursor-pointer ho-traborder-tradeAshLight transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center gap-2">
              <LuFileSearch className="text-base text-tradeFadeWhite" />
              <p className="text-xs font-semibold text-tradeFadeWhite">
                Disputed Trades
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-white text-[24px] font-bold leading-tight">
                {dashboard?.openDisputes ? dashboard?.openDisputes : "0"}
              </p>
            </div>
          </div>
        </div> */}
      </p>
    </div>
  );
};

export default Balance;
