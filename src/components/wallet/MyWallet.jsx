import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { RiArrowRightUpFill } from "react-icons/ri";
import { RiArrowUpFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchBalance } from "@/hooks/useFetchBalance";
import toDecimal from "@/utils/toDecimal";
import Info from "../alerts/Info";
import { useBalance } from "@/context/BalanceContext";

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
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">My Wallet</p>
      </div>

      
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col justify-between md:h-[190px] h-[210px] p-[12px] gap-[30px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          <div className="bg-tradeGree flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Current balance
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>

            <div className="flex items-cente gap-[5px]">
              <div className="bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-white text-xs font-bold">NGN</p>
              </div>
              <div
                onClick={toggleBalanceVisibility}
                className="flex items-center gap-1 bg-transparent px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer"
              >
                {showBalance ? (
                  <FaEye className="text-sm text-white" />
                ) : (
                  <FaEyeSlash className="text-sm text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {balance?.available_balance.NGN ? (
              <div className="flex flex-col gap-[15px]">
                <p
                  className={`text-white text-[35px] font-semibold transition-all duration-300 ease-in-out transform ${
                    showBalance
                      ? "opacity-100 scale-100"
                      : "opacity-50 scale-95"
                  }`}
                >
                  {showBalance
                    ? `#${toDecimal(balance.available_balance.NGN)}`
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
                <p className="text-tradeFadeWhite text-[13px] font-semibold">
                  Escrow balance
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  {balance?.escrow_balance?.NGN ? (
                    <p
                      className={`text-white text-[13px] font-semibold transition-all duration-300 ease-in-out transform ${
                        showBalance
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-95"
                      }`}
                    >
                      {showBalance
                        ? `#${toDecimal(balance?.escrow_balance?.NGN)}`
                        : "****"}
                    </p>
                  ) : (
                    <p
                      className={`text-white text-[13px] font-semibold transition-all duration-300 ease-in-out transform`}
                    >
                      #0.00
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-co gap-2">
              <div className="flex items-center gap-2">
                <p className="text-tradeFadeWhite text-[13px] font-semibold">
                  Max profit today
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  {balance?.escrow_balance?.NGN ? (
                    <p
                      className={`text-white text-[13px] font-semibold transition-all duration-300 ease-in-out transform ${
                        showBalance
                          ? "opacity-100 scale-100"
                          : "opacity-50 scale-95"
                      }`}
                    >
                      {showBalance
                        ? `#${toDecimal(balance?.escrow_balance?.NGN)}`
                        : "****"}
                    </p>
                  ) : (
                    <p
                      className={`text-white text-[13px] font-semibold transition-all duration-300 ease-in-out transform`}
                    >
                      #0.00
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Move Money Options */}
        <div className="flex flex-col md:pt-[30px] gap-[10px] md:w-[350px bg-tradeAs rounded-[15px] borde border-tradeAshLight">
          <div className="flex  w-full gap-[10px]">
            <div
              onClick={Deposit}
              className="flex cursor-pointer gap-1 items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full bg-tradeGreen text-black hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200"
            >
              <HiPlus className="text-xl" />
              <p>Add Cash</p>
            </div>
            <div
              onClick={Transfer}
              className="flex cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeAshLight text-white hover:bg-tradeAshLight/80 active:bg-tradeAsh active:text-tradeFadeWhite transition-colors duration-200"
            >
              <RiArrowRightUpFill className="text-xl" />
              <p>Transfer</p>
            </div>
            <div
              onClick={Withdraw}
              className="md:flex hidden cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200"
            >
              <RiArrowUpFill className="text-xl" />
              <p>Withdraw</p>
            </div>
          </div>

          <div
            onClick={Withdraw}
            className="flex md:hidden flex-1 cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200"
          >
            <RiArrowUpFill className="text-xl" />
            <p>Withdraw</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
