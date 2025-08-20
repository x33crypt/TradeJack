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
    <div className="flex flex-1 md:sticky top-[64px] md:max-h-max  md:border border-t-0 border-tradeAshLight flex-col">
      <div className="flex items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Wallet</p>
      </div>

      <div className="relative p-[15px] gap-[20px] flex flex-col md:h-[460px] min-h-[120px] h-full">
        <div className="flex flex-1">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-1">
              {balance?.available_balance?.USD == null ? (
                <NetworkError />
              ) : (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px] h-full">
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

                      <div className="flex w-full h-[45px]">
                        <div className="flex items-center w-full ">
                          {balance?.currency === "USD" ? (
                            <p
                              className={`text-white text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
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
                              className={`text-white text-[30px] font-semibold transition-all duration-300 ease-in-out transform ${
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
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px] items-center border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
                      <div className="flex flex-row flex-wrap w-full items-cente gap-[10px]">
                        <div
                          onClick={Deposit}
                          className="flex-1 flex-grow flex-shrink-0 flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                        >
                          <FaPlus className="text-[14px] text-tradeFadeWhite" />
                          <p className="text-white font-semibold  text-[13px]">
                            Deposit
                          </p>
                        </div>
                        <div
                          onClick={Transfer}
                          className="flex-1 flex-grow flex-shrink-0 flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                        >
                          <RiSendPlaneLine className="text-[14px] text-tradeFadeWhite" />
                          <p className="text-white font-semibold  text-[13px]">
                            Transfer
                          </p>
                        </div>
                        <div
                          onClick={Withdraw}
                          className="flex-1 flex-grow flex-shrink-0 flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight px-[8px] py-[5px]  rounded-[6.5px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                        >
                          <FaArrowUp className="text-[14px] text-tradeFadeWhite" />
                          <p className="text-white font-semibold  text-[13px]">
                            Withdraw
                          </p>
                        </div>

                        <SmallButton onClick={refetch}>
                          <MdOutlineRefresh
                            className={`${
                              loading && "animate-spin"
                            } text-[16px] text-black`}
                          />
                        </SmallButton>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[10px] border border-tradeAshLight rounded-[15px] p-[12px] bg-tradeAsh">
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
                            <p className="text-xs font-semibold">Learn More</p>
                          </div>
                          <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
                            <FaQuestionCircle className="text-sm text-tradeOrange" />
                          </div>
                        </div>
                      </div>

                      <div className="flex h-[30px]">
                        {balance?.currency === "USD" ? (
                          <p
                            className={`text-white text-[20px] font-semibold transition-all duration-300 ease-in-out transform ${
                              showBalance
                                ? "opacity-100 scale-100"
                                : "opacity-50 scale-95"
                            }`}
                          >
                            {showBalance
                              ? `$${toDecimal(balance.escrow_balance.USD)}`
                              : "****"}
                          </p>
                        ) : (
                          <p
                            className={`text-white text-[20px] font-semibold transition-all duration-300 ease-in-out transform ${
                              showBalance
                                ? "opacity-100 scale-100"
                                : "opacity-50 scale-95"
                            }`}
                          >
                            {showBalance
                              ? `#${toDecimal(balance.escrow_balance.NGN)}`
                              : "****"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button variant="outline">View Escrow Activity</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
