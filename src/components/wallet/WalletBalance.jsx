import React, { useState } from "react";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import { IoWalletOutline } from "react-icons/io5";
import toDecimal from "@/utils/toDecimal";
import { HiRefresh } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const WalletBalance = () => {
  const { balance, setBalance } = useBalance();
  const { loading, refetch } = useFetchBalance();
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  const selectUSD = () => {
    setBalance((prev) => ({
      ...prev,
      currency: "USD",
    }));
  };

  const selectNGN = () => {
    setBalance((prev) => ({
      ...prev,
      currency: "NGN",
    }));
  };

  return (
    <div className="flex flex-col gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-xs font-semibold text-tradeFadeWhite leading-none p-1 hover:bg-tradeOrange/20 g-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
            AVAILABLE ASSET
          </p>
          <div
            onClick={toggleBalanceVisibility}
            className="flex items-center bg-transparent   w-max cursor-pointer"
          >
            {showBalance ? (
              <FaEye className="text-base text-tradeFadeWhite" />
            ) : (
              <FaEyeSlash className="text-base text-tradeFadeWhite" />
            )}
          </div>
        </div>

        <div
          onClick={refetch}
          className="flex items-center bg-transparent w-max cursor-pointer"
        >
          <HiRefresh className="text-lg text-tradeFadeWhite" />
        </div>
      </div>

      <div className="flex items-center ">
        {balance?.currency === "USD" ? (
          <p
            className={`text-white text-base  font-semibold transition-all duration-300 ease-in-out transform ${
              showBalance ? "opacity-100 scale-100" : "opacity-50 scale-95"
            }`}
          >
            <span className="text-tradeFadeWhite">$</span>{" "}
            {showBalance
              ? `${toDecimal(balance.available_balance.USD)}`
              : "****"}
          </p>
        ) : (
          <p
            className={`text-white text-base font-semibold transition-all duration-300 ease-in-out transform ${
              showBalance ? "opacity-100 scale-100" : "opacity-50 scale-95"
            } `}
          >
            <span className="text-tradeFadeWhite">#</span>{" "}
            {showBalance
              ? `${toDecimal(balance.available_balance.NGN)}`
              : "****"}
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
