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
import { SlOptions } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const MyWallet = () => {
  const { balance, setBalance } = useBalance();
  const { loading, error, refetch } = useFetchBalance();
  const [showBalance, setShowBalance] = useState(false);

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
    <div className="flex flex-col flex-1 h-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Wallet</p>
      </div>

      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col gap-[10px] items-center border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <div className="flex gap-1 items-center">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Available balance
              </p>

              <div
                onClick={toggleBalanceVisibility}
                className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent  h-max bg-red-500 rounded-[8px] p-1 w-max cursor-pointer"
              >
                {showBalance ? (
                  <FaEye className="text-sm text-tradeFadeWhite" />
                ) : (
                  <FaEyeSlash className="text-sm text-tradeFadeWhite" />
                )}
              </div>
            </div>

            <div className="flex gap-1 items-cente">
              <div className="flex gap-1">
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

              {/* <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <FaQuestionCircle className="text-sm text-tradeOrange" />
              </div> */}
            </div>
          </div>

          <div className="flex flex-col w-full gap-[20px]">
            <div className="flex md:h-[48px] h-[45px]">
              {loading ? (
                <Loading />
              ) : (
                <div className="flex items-center w-full ">
                  {balance?.available_balance.NGN ? (
                    <div className="flex flex-col gap-[15px]">
                      {balance?.currency === "USD" ? (
                        <p
                          className={`text-white md:text-[35px] text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
                            showBalance
                              ? "opacity-100 scale-100"
                              : "opacity-50 scale-95"
                          }`}
                        >
                          {showBalance
                            ? `$${toDecimal(balance.available_balance.USD)}`
                            : "****"}
                        </p>
                      ) : (
                        <p
                          className={`text-white md:text-[35px] text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
                            showBalance
                              ? "opacity-100 scale-100"
                              : "opacity-50 scale-95"
                          }`}
                        >
                          {showBalance
                            ? `#${toDecimal(balance.available_balance.NGN)}`
                            : "****"}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Info text="Balance unavailable. Check your internet connection or refresh the page to try again." />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex w-full justify-between items-center gap-[10px]">
              <div className="flex gap-[10px] bg-tradeAs rounded-[15px] w-full">
                <div
                  onClick={Deposit}
                  className="w-full md:w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <FaPlus className="text-[14px] text-tradeFadeWhite" />
                  <p className="text-white font-semibold  text-[13px]">
                    Top up
                  </p>
                </div>
                <div
                  onClick={Transfer}
                  className="w-full md:w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight  px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <RiSendPlaneLine className="text-[14px] text-tradeFadeWhite" />
                  <p className="text-white font-semibold  text-[13px]">
                    Transfer
                  </p>
                </div>
                <div
                  onClick={Withdraw}
                  className=" w-full md:w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <FaArrowUp className="text-[14px] text-tradeFadeWhite" />
                  <p className="text-white font-semibold  text-[13px]">
                    Withdraw
                  </p>
                </div>
              </div>

              <div
                onClick={refetch}
                className="w-max flex gap-1 items-center justify-center bg-tradeGreen border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
              >
                <MdOutlineRefresh
                  className={`${
                    loading && "animate-spin"
                  } text-[16px] text-black`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
            <div className="flex gap-1 items-center">
              <p className="text-[13px] text-tradeFadeWhite font-semibold">
                Escrow balance
              </p>
              <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent  h-max bg-red-500 rounded-[8px] p-1 w-max ">
                <FaRegClock className="text-sm text-tradeFadeWhite" />
              </div>
            </div>

            <div className="flex gap-1">
              <div className="bg-transparent text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <p className="text-xs font-semibold">History</p>
              </div>
              <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                <FaQuestionCircle className="text-sm text-tradeOrange" />
              </div>
            </div>
          </div>

          <div className="w-full">
            {balance?.currency === "USD" ? (
              <p className="text-white text-sm font-semibold">
                {showBalance
                  ? `$${toDecimal(balance.escrow_balance.USD)}`
                  : "****"}
              </p>
            ) : (
              <p className="text-white text-sm font-semibold">
                {showBalance
                  ? `#${toDecimal(balance.escrow_balance.NGN)}`
                  : "****"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
