import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const DashMain = () => {
  return (
    <div className="flex flex-1 flex-col lg:gap-[10px] gap-[30px]">
      {/* <div className="lg:p-[10px] p-[5px] bg-tradeAsh flex items-center rounded-[6px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <MdReportGmailerrorred className="lg:text-[25px] md:text-[23px] text-[22px] text-tradeOrange" />
          </div>
          <p className="lg:text-[13.5px] md:text-[12px] text-[12px] text-white font-[400]">
            You have an active trade with{" "}
            <small className="lg:text-[13.5px] md:text-[12px] text-[12px] font-[800]">
              Hayjay Exchange
            </small>
            . The transaction is ongoing and requires your attention to proceed
            smoothly.{" "}
            <small className="lg:text-[13.5px] md:text-[12px] text-[12px] font-[500] underline cursor-pointer">
              {" "}
              Return to Chat
            </small>
          </p>
        </div>
      </div> */}
      <div className="flex flex-col gap-[15px]  bg- rounded-[8px]">
        <div className="flex gap-[14px] ">
          <div className="flex-1 flex flex-col justify-between gap-[15px]">
            <div className="flex lg:hidden flex-col items-center  border-tradeAshLight p-[px] gap-[15px] rounded-[8px]">
              <div className="flex w-full flex-col items-center gap-[8px] py-[30px] rounded-[8px]">
                <div className="flex items-center flex-col gap-[2px]">
                  <p className="text-tradeFadeWhite text-[14px] font-[500]">
                    Available Balance
                  </p>
                  <p className="text-white lg:text-[28px] text-[40px] font-[700]">
                    $2,280.01
                  </p>
                </div>
                <div className="flex bg-tradeAsh  w-max gap-[7px] border border-tradeGreen px-[12px] py-[4px] rounded-[8px]">
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

              <div className="flex flex-co w-full gap-[10px]">
                <div className="flex-1 flex items-center justify-center gap-[5px] py-[12px] rounded-[8px] bg-tradeAshLight hover:bg-tradeAshExtraLight cursor-pointer transition-all duration-300">
                  <IoMdArrowRoundDown className="text-white" />
                  <p className="text-white text-[15px] font-[600]">Deposit</p>
                </div>
                <div className="flex-1 flex items-center justify-center gap-[5px] py-[12px] rounded-[8px] bg-tradeAshLight hover:bg-tradeAshExtraLight cursor-pointer transition-all duration-300">
                  <IoMdArrowRoundUp className="text-white" />
                  <p className="text-white text-[15px] font-[600]">Withdraw</p>
                </div>
              </div>
            </div>
            <div className="p-[10px] lg:h-[180px] md:h-[140px] h-[110px] rounded-[8px] bg-tradeGreen">
              <p className="text-[14px]">Unlock Higher Transaction Limits!</p>
            </div>
            <div className=" md:flex grid grid-cols-2 gap-[5px] bg-tradeAsh p-[5px] rounded-[8px] borde">
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeOrange transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">2,335</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Total Trades
                </p>
              </div>
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeOrange transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">10</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Active Offers
                </p>
              </div>
              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeOrange transition-all duration-300  flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">5</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Pending Trades
                </p>
              </div>

              <div className="flex-1 h-[90px] bg-tradeAsh hover:bg-tradeAshLight border border-tradeOrange transition-all duration-300 flex flex-col justify-center items-center  rounded-[8px] cursor-pointer">
                <p className="text-[30px] text-white font-[700]">1</p>
                <p className="text-[12px] text-tradeFadeWhite font-[600]">
                  Disputed Trades
                </p>
              </div>
            </div>
          </div>
          <div className="w-[300px] lg:flex hidden flex-col bg-tradeAsh  border-tradeAshLight p-[15px] gap-[20px] rounded-[8px]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col gap-[2px]">
                <p className="text-white text-[13px] font-[400]">
                  Available Balance
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
              <div className="flex-1 flex items-center justify-center gap-[5px] px-[15px] py-[8px] rounded-[5px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer transition-all duration-300">
                {/* <IoMdArrowRoundDown className="text-white" /> */}
                <p className="text-white text-[14px] font-[500]">Deposit</p>
              </div>
              <div className="flex-1 flex items-center justify-center gap-[5px] px-[15px] py-[8px] rounded-[5px] bg-tradeAshExtraLight hover:bg-tradeAshLight cursor-pointer transition-all duration-300">
                {/* <IoMdArrowRoundUp className="text-white" /> */}
                <p className="text-white text-[14px] font-[500]">Withdraw</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-tradeAsh  border-tradeAshLight p-[10px] rounded-[10px]">
          <div className="flex  justify-between p-[10px]">
            <p className="text-[20px] text-white font-[700]">
              Transaction Stats
            </p>
            <div className="flex justify-between items-center gap-[10px] px-[10px] py-[3px]  rounded-[3px] cursor-pointer">
              <p className=" md:flex hidden text-[14px] font-[600] text-white">
                Filters
              </p>
              <FiFilter className="text-[17px] text-white" />
            </div>
          </div>
        </div>
        <div className="bg-tradeAsh border-tradeAshLight p-[10px] gap-[2px] rounded-[10px] sm:flex hidden flex-col ">
          <div className="flex justify-between items-center p-[10px]">
            <p className="text-[20px] text-white font-[700]">Recent History</p>
            <p className="text-tradeFadeWhite text-[14px] font-[600] cursor-pointer">
              View all
            </p>
          </div>
          <div className="mt-[15px] flex lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] text-tradeWhite border-b border-neutral-800 font-[600] lg:text-[14px] text-[13.5px]">
            <p className=" flex-1 lg:flex hidden items- gap-[5px] font-[700]">
              Service Type{" "}
              <IoMdArrowRoundDown className=" md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className=" flex-1 flex  items- gap-[5px] font-[700]">
              Service{" "}
              <IoMdArrowRoundDown className=" md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className="flex-1 sm:flex hidden items- gap-[5px] font-[700]">
              Trade ID{" "}
              <IoMdArrowRoundDown className="md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className="flex-1 sm:flex hidden items- gap-[5px] font-[700]">
              Role{" "}
              <IoMdArrowRoundDown className="md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className=" flex-1 flex  items- gap-[5px] font-[700]">
              Status{" "}
              <IoMdArrowRoundDown className="md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className=" flex-1  flex items- gap-[5px] font-[700]">
              Amount{" "}
              <IoMdArrowRoundDown className="md:flex hidden  text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
            <p className=" flex-1 flex  items- gap-[5px] font-[700]">
              Date{" "}
              <IoMdArrowRoundDown className="md:flex hidden text-white lg:text-[14px] text-[13.5px]" />{" "}
            </p>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className=" flex lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>
              <p className=" flex-1 ">Gift Card</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Buyer</p>
              <p className=" flex-1 text-tradeOrange">Pending</p>
              <p className=" flex-1">$1,050.00</p>
              <p className=" flex-1">15 Feb 2025</p>
            </div>

            <div className=" flex  lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>
              <p className=" flex-1 ">Apple Pay</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Seller</p>
              <p className=" flex-1 text-tradeGreen">Completed</p>
              <p className=" flex-1">$650.00</p>
              <p className=" flex-1">8 Jan 2025</p>
            </div>

            <div className=" flex  lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>

              <p className=" flex-1 ">Cash App</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Seller</p>

              <p className=" flex-1 text-tradeGreen">Completed</p>
              <p className=" flex-1">$650.00</p>
              <p className=" flex-1">8 Jan 2025</p>
            </div>

            <div className=" flex  lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>

              <p className=" flex-1 ">Paypal</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Buyer</p>

              <p className=" flex-1 text-red-500">Cancelled</p>
              <p className=" flex-1">$400.00</p>
              <p className=" flex-1">8 Jan 2025</p>
            </div>

            <div className=" flex  lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>

              <p className=" flex-1 ">Zelle</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Buyer</p>

              <p className=" flex-1 text-tradePurple">Disputed</p>
              <p className=" flex-1">$250.00</p>
              <p className=" flex-1">8 Jan 2025</p>
            </div>

            <div className=" flex  lg:py-[7px] py-[8px] lg:px-[10px] px-[8px] font-[500] text-white lg:text-[14px] text-[13.5px] rounded-[px]  hover:bg-tradeAshLight cursor-pointer">
              <p className=" flex-1 lg:flex hidden ">Online Wallet Tfr</p>

              <p className=" flex-1 ">E-Transfer</p>
              <p className=" flex-1 sm:flex hidden">#3545671</p>
              <p className=" flex-1 sm:flex hidden">Seller</p>

              <p className=" flex-1 text-tradeGreen">Completed</p>
              <p className=" flex-1">$900.00</p>
              <p className=" flex-1">8 Jan 2025</p>
            </div>
          </div>
        </div>
        <div className="bg-tradeAsh border-tradeAshLight p-[10px] gap-[10px] rounded-[10px] sm:hidden flex flex-col ">
          <div className="flex justify-between items-center  p-[10px]">
            <p className="text-[20px] text-white font-[700]">Recent History</p>
            <p className="text-tradeFadeWhite text-[14px] font-[600] cursor-pointer">
              View all
            </p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex p-[10px] gap-[10px] items-center rounded-[10px]  hover:bg-tradeAshLight cursor-pointer">
              <div className="p-[8px] rounded-full max-w-max bg-tradeAshLight">
                <IoMdArrowRoundDown className="text-tradeGreen text-[20px]" />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15px] font-[600]">Paypal</p>
                    <p className="text-white text-[15px]">-</p>
                    <p className="text-tradeFadeWhite text-[12px] font-[600]">
                      Buyer
                    </p>
                  </div>

                  <p className="text-white text-[15px] font-[600]">$1,870.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-tradeFadeWhite text-[12px] font-[500]">
                    10 Jan 2025, 04:22 AM
                  </p>

                  <p className="text-tradeOrange text-[12px] font-[600]  border-tradeOrange px-[6px] py-[2px] rounded-[5px]">
                    Pending
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-[10px] gap-[10px] items-center rounded-[10px]  hover:bg-tradeAshLight cursor-pointer">
              <div className="p-[8px] rounded-full max-w-max bg-tradeAshLight">
                <IoMdArrowRoundDown className="text-tradeGreen text-[20px]" />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15px] font-[600]">Zelle</p>
                    <p className="text-white text-[15px]">-</p>
                    <p className="text-tradeFadeWhite text-[12px] font-[600]">
                      Buyer
                    </p>
                  </div>

                  <p className="text-white text-[15px] font-[600]">$900.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-tradeFadeWhite text-[12px] font-[500]">
                    10 Jan 2025, 04:22 AM
                  </p>

                  <p className="text-red-600 text-[12px] font-[600]  border-red-600 px-[6px] py-[2px] rounded-[5px]">
                    Cancelled
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-[10px] gap-[10px] items-center rounded-[10px]  hover:bg-tradeAshLight cursor-pointer">
              <div className="p-[8px] rounded-full max-w-max bg-tradeAshLight">
                <IoMdArrowRoundDown className="text-tradeGreen text-[20px]" />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15px] font-[600]">
                      Cash App
                    </p>
                    <p className="text-white text-[15px]"> -</p>
                    <p className="text-tradeFadeWhite text-[12px] font-[600]">
                      Buyer
                    </p>
                  </div>

                  <p className="text-white text-[15px] font-[600]">$560.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-tradeFadeWhite text-[12px] font-[500]">
                    8 Jan 2025, 12:59 PM
                  </p>

                  <p className="text-tradeGreen text-[12px] font-[600]  border-tradeGreen px-[6px] py-[2px] rounded-[5px]">
                    Successful
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-[10px] gap-[10px] items-center rounded-[10px]  hover:bg-tradeAshLight cursor-pointer">
              <div className="p-[8px] rounded-full max-w-max bg-tradeAshLight">
                <IoMdArrowRoundDown className="text-tradeGreen text-[20px]" />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15px] font-[600]">
                      Apple Pay
                    </p>
                    <p className="text-white text-[15px]"> -</p>
                    <p className="text-tradeFadeWhite text-[12px] font-[600]">
                      Seller
                    </p>
                  </div>

                  <p className="text-white text-[15px] font-[600]">$1,380.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-tradeFadeWhite text-[12px] font-[500]">
                    8 Jan 2025, 12:59 PM
                  </p>

                  <p className="text-tradeGreen text-[12px] font-[600]  border-tradeGreen px-[6px] py-[2px] rounded-[5px]">
                    Successful
                  </p>
                </div>
              </div>
            </div>
            <div className="flex p-[10px] gap-[10px] items-center rounded-[10px]  hover:bg-tradeAshLight cursor-pointer">
              <div className="p-[8px] rounded-full max-w-max bg-tradeAshLight">
                <IoMdArrowRoundDown className="text-tradeGreen text-[20px]" />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="flex justify-between">
                  <div className="flex items-center gap-[5px]">
                    <p className="text-white text-[15px] font-[600]">
                      D/C Card
                    </p>
                    <p className="text-white text-[15px]"> -</p>
                    <p className="text-tradeFadeWhite text-[12px] font-[600]">
                      Buyer
                    </p>
                  </div>

                  <p className="text-white text-[15px] font-[600]">$3,020.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-tradeFadeWhite text-[12px] font-[500]">
                    8 Jan 2025, 12:59 PM
                  </p>

                  <p className="text-tradePurple text-[12px] font-[600]  border-tradePurple px-[6px] py-[2px] rounded-[5px]">
                    Disputed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashMain;
