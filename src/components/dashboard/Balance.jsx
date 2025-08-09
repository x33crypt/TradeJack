import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import { toDecimal } from "@/utils/toDecimal";
import Info from "../alerts/Info";
import { useBalance } from "@/context/BalanceContext";
import Loading from "../Loading";
import { FaQuestionCircle } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const Balance = ({ dashboard }) => {
  const { balance, setBalance } = useBalance();
  const { loading, error, refetch } = useFetchBalance();
  const [showBalance, setShowBalance] = useState(false);

  console.log("Balance:", balance);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  console.log(showBalance);

  return (
    <div className="flex flex-col md:border border-neutral-800">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-semibold text-tradeFadeWhite flex items-center gap-1">
          Welcome back,{" "}
          <span className=" text-white ">
            {dashboard?.profile?.username || "User"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-[10px] p-[15px]">
        <div className="flex flex-col gap-[10px] items-center border rounded-[15px] border-neutral-800 p-[12px] bg-tradeGreen">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <div className="flex gap-1 items-center">
              <p className="text-[13px] text-black font-semibold">
                Available balance
              </p>

              <div
                onClick={toggleBalanceVisibility}
                className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent  h-max bg-red-500 rounded-[8px] p-1 w-max cursor-pointer"
              >
                {showBalance ? (
                  <FaEye className="text-sm text-black" />
                ) : (
                  <FaEyeSlash className="text-sm text-black" />
                )}
              </div>
            </div>

            <div className="flex gap-1 items-cente">
              <div className="flex items-center gap-1 text-black border border-tradeAshExtraLight bg-transparent  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <p className="text-xs font-semibold">USD</p>
              </div>

              <div
                onClick={toggleBalanceVisibility}
                className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer"
              >
                <FaQuestionCircle className="text-sm text-tradeOrange" />
              </div>
            </div>
          </div>

          <div className="flex md:h-[48px] h-[45px] w-full">
            {loading ? (
              <Loading />
            ) : (
              <div className="flex items-center w-full ">
                {balance?.available_balance.USD ? (
                  <div className="flex flex-col gap-[15px]">
                    <p
                      className={`text-black md:text-[35px] text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
                        showBalance
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-95"
                      }`}
                    >
                      {showBalance
                        ? `$${toDecimal(balance.available_balance.USD)}`
                        : "****"}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Info text="Balance unavailable. Check your internet connection or refresh the page to try again." />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <div className="flex gap-1 items-center">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Escrow balance
              </p>

              <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <FaQuestionCircle className="text-sm text-tradeOrange" />
              </div>
            </div>

            <div className="flex gap-1">
              <div className="flex items-center gap-1 text-tradeFadeWhite border border-tradeAshExtraLight bg-transparent  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <p className="text-xs font-semibold">USD</p>
              </div>
              <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <SlOptions className="text-sm text-tradeOrange" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-white text-sm font-semibold">
              {showBalance
                ? `$${toDecimal(balance.available_balance.USD)}`
                : "****"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
