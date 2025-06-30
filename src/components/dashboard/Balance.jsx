import React from "react";
import { FaEye } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { BsSafe2Fill } from "react-icons/bs";
import { formatDecimal } from "@/utils/numberFormat/numberFormat";

const Balance = ({ dashboard }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-tradeAshLight">
      {/* Available Balance Section */}
      <div className="bg-tradeGreen p-[12px] flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-black text-[13px] font-semibold">
              Current balance
            </p>

            <div className="text-black hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
              <FaInfoCircle />
            </div>
          </div>

          <div className="flex gap-1 items-center cursor-pointer">
            <p className="text-[13px] font-semibold">Hide</p>
            <div className="text-black  text-[14px] ">
              <FaEye />
            </div>
          </div>
        </div>

        <div>
          {dashboard?.balances ? (
            <p className="text-black text-[35px] font-bold leading-none">
              ${formatDecimal(dashboard?.balances?.available_balance)}{" "}
              {/* <span className="text-black">
                {dashboard?.balances?.currency ?? ""}
              </span> */}
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
      <div className="bg-tradeAsh p-[12px] flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-white text-[13px] font-semibold">
              Escrow balance
            </p>

            <div className="flex items-center gap-1 bg-transparent px-[4px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <p className="text-tradeFadeWhite text-xs font-medium">
                <BsSafe2Fill />
              </p>
            </div>
          </div>

          <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
            <FaInfoCircle />
          </div>
        </div>

        <div>
          {dashboard?.balances ? (
            <p className="text-white text-[35px] font-bold leading-none">
              ${formatDecimal(dashboard.balances.escrow_balance)}{" "}
              {/* <span className="text-white">
                {dashboard?.balances?.currency ?? ""}
              </span> */}
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
  );
};

export default Balance;
