import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { LuArrowUpToLine } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { PiArrowDownFill } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { BsSafe2Fill } from "react-icons/bs";

const MyWallet = () => {
  return (
    <div className="flex flex-col flex-1 h-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">My Wallet</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
        <div className="flex flex-col justify-between lg:h-full md:h-[180px] h-[200px] p-[12px] gap-[30px] bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Current balance
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>

            <div className="flex gap-[5px]">
              <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-bold">USD </p>
              </div>

              <div className="bg-transparent px-[8px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                <p className="text-tradeFadeWhite text-xs font-bold">NGN </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[15px]">
            <p className="text-[35px] text-white font-bold leading-none">
              #162,790.23
            </p>
          </div>

          <div className="flex gap-1 md:flex-row flex-col justify-between">
            <div className="flex flex-co gap-2">
              <div className="flex items-center gap-2">
                <p className="text-tradeFadeWhite text-xs font-semibold">
                  Escrow Balance
                </p>

                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-tradeFadeWhite text-xs font-medium">
                    <BsSafe2Fill />
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <p className="text-white text-sm font-semibold">
                    = #28,352.00
                  </p>
                </div>
                <div></div>
              </div>
            </div>

            <div className="flex flex-co gap-2">
              <div className="flex items-center gap-2">
                <p className="text-tradeFadeWhite text-xs font-semibold">
                  Max Profit Today
                </p>

                <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
                  <p className="text-tradeGreen text-xs font-medium">
                    <FiPlus />
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <p className="text-white text-sm font-semibold">
                    + #28,352.00
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-[12px] gap-[10px] md:w-[350px bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          <div className="flex  w-full gap-[10px]">
            <div className="flex cursor-pointer gap-1 items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full bg-tradeGreen text-black hover:bg-tradeGreen/80 active:bg-tradeAsh active:text-tradeGreen transition-colors duration-200">
              <FiPlus className="text-xl" />
              <p> Top up</p>
            </div>

            <div className="flex cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeAshLight text-white hover:bg-tradeAshLight/80 active:bg-tradeAsh active:text-tradeFadeWhite transition-colors duration-200">
              <LuArrowUpToLine className="text-xl" />
              <p> Payment</p>
            </div>

            <div className="md:flex hidden cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200">
              <CiShop className="text-xl" />
              <p>Tool Store</p>
            </div>
          </div>

          <div className="flex md:hidden flex-1 cursor-pointer gap-1  items-center justify-center p-[12px] rounded-[10px] text-sm font-semibold w-full  bg-tradeOrange text-black hover:bg-tradeOrange/80 active:bg-tradeAsh active:text-tradeOrange transition-colors duration-200">
            <CiShop className="text-xl" />
            <p>Tool Store</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
