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

  return (
    <>
      <div className="flex-1 flex flex-col md:gap-[20px] ">
        <div className="flex lg:flex-row flex-col flex-1 p-[15px] md:p-0 gap-[20px]">
          <div className="flex-1 flex flex-col md:border border-tradeAshLight">
            <div className="lg:flex hidden md:p-[2.5%] py-[2.5%] border-b border-tradeAshLight">
              <p className="text-lg text-white font-[700]">Accounts</p>
            </div>
            <div className="flex-1 flex flex-col gap-[20px] md:p-[15px] ">
              <div className="rounded-2xl overflow-hidden border border-tradeAshLight">
                {/* Available Balance Section */}
                <div className="bg-tradeGreen p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-black text-xs font-semibold">
                      Available Balance
                    </p>
                    <FaEye className="text-black text-lg cursor-pointer" />
                  </div>

                  <p className="text-black text-3xl md:text-3xl font-extrabold tracking-tight leading-tight">
                    {dashboard?.balances?.available_balance}{" "}
                    <span className="text-tradeAsh">
                      {dashboard?.balances?.currency}
                    </span>
                  </p>
                </div>

                {/* Escrow Wallet Section */}
                <div className="bg-tradeAsh p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <p className="text-tradeFadeWhite text-xs font-semibold">
                      Escrow Wallet
                    </p>
                    <FaRegQuestionCircle className="text-tradeOrange text-sm" />
                  </div>

                  <p className="text-white text-3xl md:text-3xl font-extrabold tracking-tight leading-tight">
                    {dashboard?.balances?.escrow_balance}{" "}
                    <span className="text-white">
                      {dashboard?.balances?.currency}
                    </span>
                  </p>
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
                          ?.$numberDecimal
                          ? new Intl.NumberFormat().format(
                              parseFloat(
                                dashboard.limits.maximum_purchase_limit
                                  .$numberDecimal
                              )
                            )
                          : "00.00"}{" "}
                        {dashboard?.balances?.currency}
                      </p>
                      <div className="flex bg-tradeGreen gap-1 items-center rounded-full px-2 py-[1px]">
                        <FaAward className="text-black text-sm" />
                        <p className=" text-xs font-[600]">Upgrade to Tier 2</p>
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
                      {dashboard?.activitySummary?.active_offers}
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
                      {" "}
                      {dashboard?.activitySummary?.pending_trades}
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
                      {" "}
                      {dashboard?.activitySummary?.successful_trades}
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
                      {" "}
                      {dashboard?.openDisputes}
                    </p>
                    <i class="fa-solid fa-arrow-right text-tradeGreen text-[14px]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  lg:w-[330px] w-full lg:flex flex-col gap-[25px]">
            <Performance />
          </div>
        </div>

        <div className="flex-1 px-[15px] md:p-0 md:border border-tradeAshLight gap-[20px] md:gap-0 flex flex-col bg">
          <div className="flex md:p-[15px] py-[15px]  border-b justify-between border-tradeAshLight">
            <p className="text-lg text-white font-[700]">Trade History</p>

            <p className="text-tradeGreen font-[600] text-[13px] cursor-pointer ">
              View All
            </p>
          </div>

          <div className="flex md:max-h-[500px] h-full md:p-[15px] flex-col gap-[px]">
            <div className="p-[10px]  flex bg-tradeAshExtraLight">
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-[700]">
                <p>Trade ID</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-[700] ">
                <p>Service Type</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-[700] ">
                <p>Service</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite  text-xs font-[700]">
                <p>Status</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite text-xs font-[700] ">
                <p>Amount</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
              <div className="flex-1 flex gap-[5px] text-tradeFadeWhite   text-xs font-[700]">
                <p>Date</p>
                <MdKeyboardArrowDown className="text-[18px]" />
              </div>
            </div>

            <div className=" flex flex-col">
              <div className="p-[10px]  flex border-t border-tradeAshLight bg-tradeAsh hover:bg-black cursor-pointer transition-all duration-300">
                <div className="flex-1 text-tradeFadeWhite text-sm font-[700] ">
                  <p>#238872</p>
                </div>
                <div className="flex-1 text-white text-sm font-[700]">
                  <p>Online Wallet...</p>
                </div>
                <div className="flex-1 text-white text-sm font-[700]">
                  <p>Cash App</p>
                </div>

                <div className="flex-1 text-tradeOrange text-sm font-[700] ">
                  <p>Pending</p>
                </div>
                <div className="flex-1 text-white text-sm font-[700] ">
                  <p>$600.00</p>
                </div>
                <div className="flex-1 text-white text-sm font-[700]">
                  <p>4d 19h ago</p>
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
