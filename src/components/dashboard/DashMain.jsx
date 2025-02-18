import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdReportGmailerrorred } from "react-icons/md";

const DashMain = () => {
  return (
    <div className="flex flex-1 flex-col lg:gap-[10px] gap-[30px]">
      <div className="lg:p-[10px] p-[5px] bg-tradeAsh flex items-center rounded-[6px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <MdReportGmailerrorred className="lg:text-[25px] md:text-[23px] text-[20px] text-tradeOrange" />
          </div>
          <p className="lg:text-[13.5px] md:text-[12px] text-[11px] text-white font-[400]">
            You have an active trade with{" "}
            <small className="lg:text-[13.5px] md:text-[12px] text-[11px] font-[800]">
              Hayjay Exchange
            </small>
            . The transaction is ongoing and requires your attention to proceed
            smoothly.{" "}
            <small className="lg:text-[13.5px] md:text-[12px] text-[11px] font-[500] underline cursor-pointer">
              {" "}
              Return to Chat
            </small>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[14px]  bg- rounded-[8px]">
        <div className="flex gap-[14px] ">
          <div className="flex-1 flex flex-col justify-between gap-[10px]">
            <div className="flex lg:hidden flex-col items-center  border-tradeAshLight p-[px] gap-[30px] rounded-[8px]">
              <div className="flex flex-col items-center gap-[8px]">
                <div className="flex items-center flex-col gap-[2px]">
                  <p className="text-tradeFadeWhite text-[13px] font-[600]">
                    Total Balance
                  </p>
                  <p className="text-white lg:text-[28px] text-[35px] font-[700]">
                    $19,280.01
                  </p>
                </div>
                <div className="flex bg-tradeAsh  w-max gap-[7px] border border-tradeGreen px-[10px] py-[4px] rounded-[10px]">
                  <p className="text-[12px] text-white font-[500]">Escrow</p>
                  <p className="text-[12px] font-[500] text-tradeGreen">
                    $4,990.00
                  </p>
                </div>
              </div>

              <div className="hidden">
                <p className="text-white text-[14px] font-[500]">
                  Minimim limit : <small className="text-[14px]">20 USD</small>{" "}
                </p>
                <p className="text-white text-[14px] font-[500]">
                  Maximum limit :{" "}
                  <small className="text-[14px] font-[500]">1,000 USD</small>{" "}
                </p>
              </div>
              <div className="flex flex-col w-full gap-[10px]">
                <div className="flex-1 flex items-center justify-center gap-[5px] py-[8px] rounded-[8px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer">
                  {/* <IoMdArrowRoundDown className="text-white" /> */}
                  <p className="text-white text-[14px] font-[500]">Deposit</p>
                </div>
                <div className="flex-1 flex items-center justify-center gap-[5px] py-[8px] rounded-[8px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer">
                  {/* <IoMdArrowRoundUp className="text-white" /> */}
                  <p className="text-white text-[14px] font-[500]">Withdraw</p>
                </div>
              </div>
            </div>
            <div className="p-[10px] lg:h-[180px] md:h-[140px] h-[100px] rounded-[8px] bg-tradeGreen">
              <p className="text-[10px]">Unlock Higher Transaction Limits!</p>
            </div>
            <div className=" lg:flex grid grid-cols-2 gap-[14px]">
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-neutral-800 transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">2,335</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Total Trades
                </p>
              </div>
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-neutral-800 transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">10</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Active Offers
                </p>
              </div>
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-neutral-800 transition-all duration-300  flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">5</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Pending Trades
                </p>
              </div>

              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-neutral-800 transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">1</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Disputed Trades
                </p>
              </div>
            </div>
          </div>
          <div className="w-[300px] lg:flex hidden flex-col border border-tradeAshLight p-[14px] gap-[20px] rounded-[8px]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col gap-[2px]">
                <p className="text-white text-[13px] font-[400]">
                  Total Balance
                </p>
                <p className="text-white text-[28px] font-[700]">$19,280.01</p>
              </div>
              <div className="flex w-max gap-[7px] border border-tradeGreen px-[10px] py-[4px] rounded-[10px]">
                <p className="text-[12px] text-white font-[500]">Escrow</p>
                <p className="text-[12px] font-[500] text-tradeGreen">
                  $4,990.00
                </p>
              </div>
            </div>
            <div className="border-t border-tradeAshLight"></div>
            <div>
              <p className="text-white text-[14px] font-[500]">
                Minimim limit : <small className="text-[14px]">20 USD</small>{" "}
              </p>
              <p className="text-white text-[14px] font-[500]">
                Maximum limit :{" "}
                <small className="text-[14px] font-[500]">1,000 USD</small>{" "}
              </p>
            </div>
            <div className="flex flex-col w-full gap-[10px]">
              <div className="flex-1 flex items-center justify-center gap-[5px] px-[15px] py-[8px] rounded-[5px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer">
                {/* <IoMdArrowRoundDown className="text-white" /> */}
                <p className="text-white text-[14px] font-[500]">Deposit</p>
              </div>
              <div className="flex-1 flex items-center justify-center gap-[5px] px-[15px] py-[8px] rounded-[5px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer">
                {/* <IoMdArrowRoundUp className="text-white" /> */}
                <p className="text-white text-[14px] font-[500]">Withdraw</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-tradeAsh  border border-tradeAshLight p-[14px] rounded-[8px]">
          <div className="flex  justify-between">
            <p className="text-[18px] text-white font-[600]">
              Transaction Stats
            </p>
            <div className="w-[110px] flex justify-between items-center px-[10px] h-[27px] bg-white rounded-[5px] cursor-pointer">
              <p className="text-[15px] font-[500] text-black">Weekly</p>
              <MdKeyboardArrowDown className="text-[25px] text-black" />
            </div>
          </div>
        </div>
        {/* <div className="bg-tradeAsh border border-tradeAshLight p-[14px] rounded-[8px] flex flex-col ">
          <div className="flex justify-between items-center ">
            <p className="text-[18px] text-white font-[600]">Recent History</p>
            <p className="text-tradeFadeWhite text-[14px] font-[500] cursor-pointer">
              View all
            </p>
          </div>
          <div className=" mt-[15px] flex py-[8px] px-[15px] text-tradeWhite font-[600] text-[14px]">
            <p className=" flex-1 flex items- gap-[5px] font-[700]">
              Service <IoMdArrowRoundDown className="text-white text-[16px]" />{" "}
            </p>
            <p className=" flex-1 flex items- gap-[5px] font-[700]">
              Trade ID <IoMdArrowRoundDown className="text-white text-[16px]" />{" "}
            </p>
            <p className=" flex-1 flex items- gap-[5px] font-[700]">
              Status <IoMdArrowRoundDown className="text-white text-[16px]" />{" "}
            </p>
            <p className=" flex-1 flex items- gap-[5px] font-[700]">
              Amount <IoMdArrowRoundDown className="text-white text-[16px]" />{" "}
            </p>
            <p className=" flex-1 flex items- gap-[5px] font-[700]">
              Date <IoMdArrowRoundDown className="text-white text-[16px]" />{" "}
            </p>
          </div>
          <div className=" flex flex-col ">
            <div className=" flex py-[8px] px-[15px] font-[500] text-white text-[14px] rounded-[4px] hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 ">Cashapp</p>
              <p className=" flex-1 ">#3545671</p>
              <p className=" flex-1 text-tradeGreen">Completed</p>
              <p className=" flex-1 ">$650.00</p>
              <p className=" flex-1 ">8 Jan 2025</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashMain;
