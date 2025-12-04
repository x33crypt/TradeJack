import React, { useState } from "react";
import { useBalance } from "@/context/userContext/BalanceContext";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import { IoWalletOutline } from "react-icons/io5";
import toDecimal from "@/utils/toDecimal";
import { HiRefresh } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdWallet } from "react-icons/md";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useCurrency } from "@/context/userContext/CurrencyContext";
import { useFetchCurrency } from "@/hooks/userHooks/useFetchCurrency";

const WalletBalance = () => {
  const { loading, refetch } = useFetchCurrency();
  const { currency, setCurrency } = useCurrency();

  console.log(currency);

  const selectCurrency = () => {
    if (currency?.current == "user_currency") {
      setCurrency((prev) => ({
        ...prev,
        current: "default_currency",
      }));
    } else {
      setCurrency((prev) => ({
        ...prev,
        current: "user_currency",
      }));
    }
  };

  return (
    <div className="flex w-full justify-between gap-[10px] p-[12px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
      <div className="w-max flex gap-1 items-center justify-center border border-tradeAshExtraLight p-2 h-max rounded-[10px] ">
        <MdWallet className="text-[16px] text-tradeFadeWhite" />{" "}
        {currency?.current === "user_currency" ? (
          <p className="text-xs text-white font-semibold">
            <span className="text-tradeFadeWhite">
              {currency?.user_currency?.code ?? "N/A"}
            </span>{" "}
            {toDecimal(currency?.user_currency?.purchase_max ?? 0)}
          </p>
        ) : (
          <p className="text-xs text-white font-semibold">
            <span className="text-tradeFadeWhite">
              {currency?.default_currency?.code ?? "N/A"}
            </span>{" "}
            {toDecimal(currency?.default_currency?.purchase_max ?? 0)}
          </p>
        )}
      </div>

      <div
        onClick={selectCurrency}
        className="w-max flex gap-1 items-center justify-center border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
      >
        <CgArrowsExchangeAltV
          className={`${
            loading ? "animate-spin" : null
          } text-[16px] text-tradeFadeWhite`}
        />
        {currency?.current === "user_currency" ? (
          <p className="text-xs text-white font-semibold">
            {currency?.user_currency?.code ?? "N/A"}
          </p>
        ) : (
          <p className="text-xs text-white font-semibold">
            {currency?.default_currency?.code ?? "N/A"}
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
