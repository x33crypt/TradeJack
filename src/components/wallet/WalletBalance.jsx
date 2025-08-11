import React from "react";
import { useBalance } from "@/context/BalanceContext";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import { IoWalletOutline } from "react-icons/io5";
import toDecimal from "@/utils/toDecimal";

const WalletBalance = () => {
  const { balance, setBalance } = useBalance();
  const { loading } = useFetchBalance();

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
      <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
        <p className="text-[13px] text-tradeFadeWhite font-semibold">
          From Wallet
        </p>

        <div className="flex gap-1 items-cente">
          <div
            onClick={selectNGN}
            className={`${
              balance?.currency === "NGN"
                ? "bg-tradeOrange text-black"
                : "bg-transparent text-tradeFadeWhite"
            } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
          >
            <p className="text-xs font-semibold">NGN</p>
          </div>
          <div
            onClick={selectUSD}
            className={`${
              balance?.currency === "USD"
                ? "bg-tradeOrange text-black"
                : "bg-transparent text-tradeFadeWhite"
            } flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer`}
          >
            <p className="text-xs font-semibold">USD</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[10px] w-full border- border-tradeAshLight">
        <div className="p-[10px] bg-tradeAshLight w-max rounded-[10px]  border border-tradeAshExtraLight">
          <IoWalletOutline className="text-[30px] text-tradeWhite" />
        </div>
        <div className="flex flex-col gap-[3px]">
          <p className="text-tradeFadeWhite text-xs font-medium">
            Current balance
          </p>

          <div>
            {balance?.currency === "NGN" ? (
              <p className="text-white text-[13px] font-semibold">
                NGN{" "}
                {balance?.available_balance?.NGN
                  ? toDecimal(balance?.available_balance?.NGN)
                  : "0.00"}
              </p>
            ) : (
              <p className="text-white text-[13px] font-semibold">
                USD{" "}
                {balance?.available_balance?.USD
                  ? toDecimal(balance?.available_balance?.USD)
                  : "0.00"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
