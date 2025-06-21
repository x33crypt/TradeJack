import React from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { HiArrowNarrowUp } from "react-icons/hi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { FcProcess } from "react-icons/fc";
import { RiProgress3Line } from "react-icons/ri";
import { MdOutlinePending } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { FaAward } from "react-icons/fa6";
import Performance from "../profile/Performance";
import { useDashboard } from "@/context/DashboardContext";

const DashMain = () => {
  const { dashboard } = useDashboard();

  console.log(dashboard);

  const balanceFormat = (value) => {
    let numericValue;

    if (typeof value === "object" && value?.$numberDecimal) {
      numericValue = parseFloat(value.$numberDecimal);
    } else if (typeof value === "number") {
      numericValue = value;
    }

    if (typeof numericValue === "number") {
      return numericValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return "0.00"; // fallback display for null/invalid/undefined
  };

  return (
    <>
      <div className="flex-1 flex flex-col md:gap-[10px] ">
        <div className="flex lg:flex-row flex-col flex-1 md:p-0 gap-[10px]">
          <div className="flex-1 flex flex-col md:border border-t-0 border-tradeAshLight">
            <div className="flex items-center gap-3 p-[15px] border-b border-tradeAshLight">
              <p className="text-base text-tradeFadeWhite flex items-center gap-1">
                Welcome back,{" "}
                <small className="text-lg text-white font-[700]">
                  {dashboard?.profile?.username || "User"}
                </small>
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-[20px] p-[15px]">
              <div className="rounded-2xl overflow-hidden border border-tradeAshLight">
                {/* Available Balance Section */}
                <div className="bg-tradeGreen p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-black text-xs font-semibold">
                      Available Balance
                    </p>
                    <FaEye className="text-black text-lg cursor-pointer leading-none" />
                  </div>

                  <div>
                    {dashboard?.balances ? (
                      <p className="text-black text-3xl md:text-3xl font-extrabold tracking-tight leading-tight">
                        {balanceFormat(dashboard?.balances?.available_balance)}{" "}
                        <span className="text-black">
                          {dashboard?.balances?.currency ?? ""}
                        </span>
                      </p>
                    ) : (
                      <p className="text-black text-3xl md:text-3xl font-extrabold tracking-tight">
                        --.--{" "}
                        <span className="text-black">
                          {dashboard?.balances?.currency ?? ""}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Escrow Account Section */}
                <div className="bg-tradeAsh  p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Escrow Account
                    </p>
                    <FaRegQuestionCircle className="text-tradeOrange text-sm leading-none" />
                  </div>

                  <div>
                    {dashboard?.balances ? (
                      <p className="text-white text-3xl md:text-3xl font-extrabold tracking-tight leading-tight">
                        {balanceFormat(dashboard.balances.escrow_balance)}{" "}
                        <span className="text-white">
                          {dashboard?.balances?.currency ?? ""}
                        </span>
                      </p>
                    ) : (
                      <p className="text-white text-3xl md:text-3xl font-extrabold tracking-tight">
                        --.--{" "}
                        <span className="text-white">
                          {dashboard?.balances?.currency ?? ""}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[5px] border-tradeAshExtraLight bg-tradeAshLight p-[5px] rounded-[14px]">
                <div className="flex w-full gap-[5px]">
                  <div className="flex-1 flex items-center bg-black gap-[15px] p-[5px] rounded-[14px] cursor-pointer hover:bg-tradeAsh transition-all duration-300">
                    <div className="text-[25px] text-white p-[10px] rounded-[12px] bg-tradeAshLight">
                      <LuPlus />
                    </div>

                    <p className="text-[14px] text-white font-[500]">Deposit</p>
                  </div>
                  <div className="flex-1 flex items-center bg-black gap-[15px] p-[5px] rounded-[14px] cursor-pointer hover:bg-tradeAsh transition-all duration-300">
                    <div className="text-[25px] text-white p-[10px] rounded-[12px] bg-tradeAshLight">
                      <HiArrowNarrowUp />
                    </div>

                    <p className="text-[14px] text-white font-[500]">
                      Withdraw
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex items-center bg-black gap-[15px] p-[5px] rounded-[14px] cursor-pointer hover:bg-tradeAsh transition-all duration-300">
                  <div className="text-[25px] text-white p-[10px] rounded-[12px] bg-tradeOrange">
                    <CgArrowsExchangeAltV />
                  </div>
                  <div className=" flex-1 flex gap-[5px] flex-col justify-between">
                    <p className="text-[12px] text-tradeFadeWhite font-[500]">
                      Maximum Trade Limit
                    </p>
                    <div className="flex items-center gap-[10px]">
                      <p className="text-[14px] text-white font-[600]">
                        {dashboard?.limits?.maximum_purchase_limit
                          ? balanceFormat(
                              dashboard?.limits?.maximum_purchase_limit
                            )
                          : "00.00"}{" "}
                        {dashboard?.balances?.currency}
                      </p>
                      <div className="flex bg-tradeGreen gap-1 items-center rounded-full px-2 py-[1px]">
                        <FaAward className="text-black text-xs" />
                        <p className=" text-xs font-[500]">Upgrade to Tier 2</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-tradeFadeWhite items-end p-[10px]">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>

              <div className="h-[120px] p-[10px] rounded-[16px] bg-white ">
                <p className="text-[12px]">
                  Successfully trade 5 more deal and earn our turbo status{" "}
                </p>
              </div>

              <div className=" grid grid-cols-2 gap-[10px] rounded-[16px]">
                <div className="flex flex-1 flex-col border border-tradeAshExtraLight bg-tradeAsh gap-[10px] p-[10px] rounded-[14px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
                  <div className="flex gap-[5px]">
                    <RiProgress3Line className="text-tradeFadeWhite" />
                    <p className=" text-[12px] font-[600] text-white">
                      Active Offers
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-white text-[23px] font-[700]">
                      {dashboard?.activitySummary?.active_offers
                        ? dashboard?.activitySummary?.active_offers
                        : "0"}
                    </p>
                    <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
                  </div>
                </div>
                <div className="flex flex-1 flex-col border border-tradeAshExtraLight bg-tradeAsh gap-[10px] p-[10px] rounded-[14px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
                  <div className="flex gap-[5px]">
                    <MdOutlinePending className="text-tradeFadeWhite" />
                    <p className=" text-[12px] font-[600] text-white">
                      Pending Trades
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-white text-[23px] font-[700]">
                      {dashboard?.activitySummary?.pending_trades
                        ? dashboard?.activitySummary?.pending_trades
                        : "0"}
                    </p>
                    <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
                  </div>
                </div>
                <div className="flex flex-1 flex-col border border-tradeAshExtraLight bg-tradeAsh gap-[10px] p-[10px] rounded-[14px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
                  <div className="flex gap-[5px]">
                    <GrStatusGood className="text-tradeFadeWhite" />
                    <p className=" text-[12px] font-[600] text-white">
                      Successful Trades
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-white text-[23px] font-[700]">
                      {dashboard?.activitySummary?.successful_trades
                        ? dashboard?.activitySummary?.successful_trades
                        : "0"}
                    </p>
                    <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
                  </div>
                </div>
                <div className="flex flex-1 flex-col border border-tradeAshExtraLight bg-tradeAsh gap-[10px] p-[10px] rounded-[14px] cursor-pointer hover:bg-tradeAshLight transition-all duration-300">
                  <div className="flex gap-[5px]">
                    <IoExtensionPuzzleOutline className="text-tradeFadeWhite" />
                    <p className=" text-[12px] font-[600] text-white">
                      Disputed Trades
                    </p>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <p className="text-white text-[23px] font-[700]">
                      {dashboard?.openDisputes ? dashboard?.openDisputes : "0"}
                    </p>
                    <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[330px] w-full lg:flex flex-col gap-[25px]">
            <Performance />
          </div>
        </div>

        <div className="flex-1 md:p-0 md:border border-tradeAshLight flex flex-col">
          <div className="flex p-[15px]  border-b justify-between border-tradeAshLight">
            <p className="text-lg text-white font-[700]">Trade History</p>

            <p className="text-tradeGreen font-[600] text-[13px] cursor-pointer ">
              View All
            </p>
          </div>

          <div className="md:flex hidden md:max-h-[500px] h-full p-[15px] flex-col">
            <div className="p-[10px] flex bg-tradeAshExtraLight">
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-medium]">
                <p>Trade ID</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-medium ">
                <p>Service Type</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-medium">
                <p>Service</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-medium">
                <p>Status</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite text-xs font-medium ">
                <p>Amount</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite   text-xs font-medium">
                <p>Date</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
            </div>

            <div className=" flex flex-col">
              <div className="p-[10px]  flex border-t border-tradeAshLight bg-tradeAsh hover:bg-black cursor-pointer transition-all duration-300">
                <div className="flex-1 text-tradeFadeWhite text-sm font-semibold ">
                  <p>#238872</p>
                </div>
                <div className="flex-1 text-white text-sm font-semibold]">
                  <p>Online Wallet...</p>
                </div>
                <div className="flex-1 text-white text-sm font-semibold">
                  <p>Cash App</p>
                </div>
                <div className="flex-1 text-tradeOrange text-sm font-semibold ">
                  <p>Pending</p>
                </div>
                <div className="flex-1 text-white text-sm font-bold ">
                  <p>$600.00</p>
                </div>
                <div className="flex-1 text-white text-sm font-semibold">
                  Saturday, Jun 24
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:hidden flex-col p-[15px]">
            <div className="bg-tradeAshExtraLight p-[10px]">
              <p className="text-tradeFadeWhite text-xs font-medium">
                Saturday, Jun 24
              </p>
            </div>
            <div className="flex flex-col p-[10px] w-full gap-1 bg-tradeAsh hover:bg-black border-b border-tradeAshLight transition-all duration-300">
              <div className="flex justify-between">
                <p className="text-sm text-white font-semibold">
                  Cash App - #1651689128278
                </p>
                <p className="text-sm text-white font-bold">$500.00</p>
              </div>

              <p className="text-tradeFadeWhite text-[13px] font-medium">
                Online Wallet Transfer
              </p>

              <div className="flex justify-between">
                <p className="text-tradeOrange text-xs font-semibold">
                  Pending
                </p>

                <div className="w-100px text-tradeFadeWhite flex items-center">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>

            <div className="flex flex-col p-[10px] w-full gap-1 bg-tradeAsh hover:bg-black border-b border-tradeAshLight">
              <div className="flex justify-between">
                <p className="text-sm text-white font-semibold">
                  Wells Fargo - #1651689128278
                </p>
                <p className="text-sm text-white font-bold">$6,000.00</p>
              </div>

              <p className="text-tradeFadeWhite text-[13px] font-medium">
                Direct Bank Transfer
              </p>

              <div className="flex justify-between">
                <p className="text-tradeOrange text-xs font-semibold">
                  Pending
                </p>

                <div className="w-100px text-tradeFadeWhite flex items-center">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>

            <div className="flex flex-col p-[10px] w-full gap-1 bg-tradeAsh hover:bg-black border-b border-tradeAshLight">
              <div className="flex justify-between">
                <p className="text-sm text-white font-semibold">
                  Venmo - #1651689128278
                </p>
                <p className="text-sm text-white font-bold">$980.00</p>
              </div>

              <p className="text-tradeFadeWhite text-[13px] font-medium">
                Online Wallet Transfer
              </p>

              <div className="flex justify-between">
                <p className="text-tradeGreen text-xs font-semibold">
                  Completed
                </p>

                <div className="w-100px text-tradeFadeWhite flex items-center">
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashMain;
