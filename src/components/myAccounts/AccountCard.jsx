import React from "react";
import { SiBankofamerica } from "react-icons/si";
import { date } from "@/utils/date";
import { dateTime } from "@/utils/dateTime";
import { MdDateRange } from "react-icons/md";

const AccountCard = ({ account, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col p-[12px] gap-[25px] bg-tradeAsh border border-tradeAshLight rounded-[15px]"
    >
      <div className="flex justify-between">
        <div
          className="
          px-[6px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max cursor-pointer transition-all duration-300"
        >
          <p className="text-white text-xs font-bold">Bank Account</p>
        </div>

        <div className="flex gap-1 items-cente">
          <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeGreen text-xs font-medium ">Verified</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[15px]">
        <div>
          <img className="w-[40px]" src={account?.logo} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-white leading-none">
            {account?.bank_name}
          </p>
          <p className="text-[13px] font-semibold text-tradeFadeWhite">
            {account?.account_number}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[5px]">
          <p className="text-sm text-white font-semibold leading-none">
            {account?.account_holder_name}
          </p>

          <div className="flex gap-1 items-center">
            {/* <div className="flex items-center gap-1 bg-transparent px-[3px] py-0.5 border border-tradeAshExtraLight rounded-[4px] w-max">
              <MdDateRange className="text-[12px] text-tradeAshExtraLight" />
            </div> */}
            <p className="text-tradeFadeWhite text-xs font-medium">
              Account Added On {date(account?.createdAt)}
            </p>
          </div>
        </div>

        {/* <div className="px-[6px] py-0.5 bg-red-500/10 border border-red-500 hover:bg-red-500/20 transition-all duration-300 cursor-pointer rounded-[4px] w-max">
          <p className="text-red-600 text-xs font-medium ">Delete Account</p>
        </div> */}
      </div>
    </div>
  );
};

export default AccountCard;
