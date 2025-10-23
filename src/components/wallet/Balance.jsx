import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchBalance } from "@/hooks/userHooks/useFetchBalance";
import toDecimal from "@/utils/toDecimal";
import Info from "../alerts/Info";
import { useBalance } from "@/context/userContext/BalanceContext";
import { FaQuestionCircle } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import Loading from "../others/Loading";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import SmallButton from "../buttons/SmallButton";
import Button from "../buttons/Button";
import NetworkError from "../others/NetworkError";
import { RiSafe2Fill } from "react-icons/ri";
import { MdMoreVert } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";

const Balance = () => {
  const { balance, setBalance } = useBalance();
  const { loading, error, refetch } = useFetchBalance();
  const [showBalance, setShowBalance] = useState(true);

  console.log("Balance:", balance);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  console.log(showBalance);

  const navigateTo = useNavigate();

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

  const Transfer = () => {
    navigateTo("/wallet/transfer");
  };

  const Deposit = () => {
    navigateTo("/wallet/deposit");
  };

  const Withdraw = () => {
    navigateTo("/wallet/withdraw");
  };

  return (
    <div className="flex flex-1 flex-col gap-[20px]">
      <div className="flex  items-center justify-between">
        <p className="text-lg font-semibold text-white flex items-center gap-1">
          WALLET
        </p>
      </div>

      <div className="flex flex-1">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-1">
            {balance?.available_balance?.NGN == null &&
            balance?.available_balance?.USD == null ? (
              <NetworkError />
            ) : (
              <div className="flex-1 flex flex-col justify-between gap-[25px] ">
                <div className="flex flex-col gap-[15px] bg-tradeAsh p-[12px] rounded-[15px] border border-tradeAshLight">
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-tradeFadeWhite leading-none p-1 hover:bg-tradeOrange/20 g-tradeAshLight/50 w-max rounded-sm transition-all duration-300 cursor-pointer">
                        AVAILABLE ASSET
                      </p>

                      <div
                        onClick={toggleBalanceVisibility}
                        className="flex items-center bg-transparent   w-max cursor-pointer"
                      >
                        {showBalance ? (
                          <FaEye className="text-lg text-tradeFadeWhite" />
                        ) : (
                          <FaEyeSlash className="text-lg text-tradeFadeWhite" />
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

                  <div className="flex gap-3 items-center justify-between w-full h-[45px]">
                    <div className="flex items-center ">
                      {balance?.currency === "USD" ? (
                        <p
                          className={`text-white text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
                            showBalance
                              ? "opacity-100 scale-100"
                              : "opacity-50 scale-95"
                          }`}
                        >
                          <span className="text-tradeFadeWhite">$</span>{" "}
                          {showBalance
                            ? `${toDecimal(balance.available_balance.USD)}`
                            : "****"}
                        </p>
                      ) : (
                        <p
                          className={`text-white text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
                            showBalance
                              ? "opacity-100 scale-100"
                              : "opacity-50 scale-95"
                          }`}
                        >
                          <span className="text-tradeFadeWhite">#</span>{" "}
                          {showBalance
                            ? `${toDecimal(balance.available_balance.NGN)}`
                            : "****"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex lg:hidden flex-col gap-[10px] items-center borde rounded-sm border-neutral-800 p-[12px] bg-tradeAs">
                  <div className="flex flex-row flex-wrap w-full items-center justify-around gap-[10px]">
                    <div
                      onClick={Deposit}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-[12px] h-max rounded-[12px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                        <FaPlus className="text-base" />
                      </div>
                      <p className="text-white text-[13px] font-medium">
                        Deposit
                      </p>
                    </div>

                    <div
                      onClick={Transfer}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-[12px] h-max  rounded-[12px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                        <RiSendPlaneLine className="text-base" />
                      </div>
                      <p className="text-white text-[13px] font-medium">
                        Transfer
                      </p>
                    </div>

                    <div
                      onClick={Withdraw}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-[12px] h-max  rounded-[12px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                        <FaArrowUp className="text-base" />
                      </div>
                      <p className="text-white text-[13px] font-medium">
                        Withdraw
                      </p>
                    </div>

                    <div
                      onClick={() => navigateTo("/wallet/accounts")}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-[12px] h-max rounded-[12px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                        <FaLink className="text-base" />
                      </div>
                      <p className="text-white text-[13px] font-medium">
                        Accounts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
