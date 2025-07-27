import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import { toDecimal } from "@/utils/toDecimal";
import Info from "../alerts/Info";
import { useBalance } from "@/context/BalanceContext";

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
        <div className="flex flex-col justify-between md:h-[190px] h-[210px] p-[12px] gap-[30px] bg-tradeGreen rounded-[15px] border border-tradeAshLight">
          <div className="bg-tradeGree flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-black text-[13px] font-semibold">
                Current balance
              </p>

              <div className="text-black hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>

            <div className="flex items-cente gap-[5px]">
              <div className="bg-transparent px-[6px] py-0.5 border border-black rounded-[4px] w-max">
                <p className="text-black text-xs font-bold">USD</p>
              </div>
              <div
                onClick={toggleBalanceVisibility}
                className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-black rounded-[4px] w-max cursor-pointer"
              >
                {showBalance ? (
                  <FaEye className="text-sm text-black" />
                ) : (
                  <FaEyeSlash className="text-sm text-black" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {balance.available_balance.USD ? (
              <div className="flex flex-col gap-[15px]">
                <p
                  className={`text-black text-[35px] font-semibold transition-all duration-300 ease-in-out transform ${
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
              <div className="flex h-[35px] items-center">
                <Info text="Balance unavailable. Check your internet connection or refresh the page to try again." />
              </div>
            )}
          </div>

          <div className="flex gap-2 h-ful  md:flex-row flex-col justify-between bg-tradeGree">
            <div className="flex justify-between flex-co gap-2">
              <div className="flex items-center gap-2">
                <p className="text-black text-[13px] font-semibold">
                  Escrow balance
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  {balance?.escrow_balance?.USD ? (
                    <p
                      className={`text-black text-[13px] font-semibold transition-all duration-300 ease-in-out transform ${
                        showBalance
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-95"
                      }`}
                    >
                      {showBalance
                        ? `$${toDecimal(balance?.escrow_balance?.USD)}`
                        : "****"}
                    </p>
                  ) : (
                    <p
                      className={`text-black text-[13px] font-semibold transition-all duration-300 ease-in-out transform`}
                    >
                      $0.00
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-co gap-2">
              <div className="flex items-center gap-2">
                <p className="text-black text-[13px] font-semibold">
                  Max profit today
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  {balance?.escrow_balance?.USD ? (
                    <p
                      className={`text-black text-[13px] font-semibold transition-all duration-300 ease-in-out transform ${
                        showBalance
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-95"
                      }`}
                    >
                      {showBalance
                        ? `$${toDecimal(balance?.escrow_balance?.USD)}`
                        : "****"}
                    </p>
                  ) : (
                    <p
                      className={`text-black text-[13px] font-semibold transition-all duration-300 ease-in-out transform`}
                    >
                      $0.00
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
