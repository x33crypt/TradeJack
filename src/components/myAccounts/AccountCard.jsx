import React from "react";
import { SiBankofamerica } from "react-icons/si";
import { date } from "@/utils/date";
import { dateTime } from "@/utils/dateTime";

const AccountCard = ({ account, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col p-[12px] gap-[20px] bg-tradeAsh border border-tradeAshLight rounded-[15px]"
    >
      <div className="flex justify-between">
        <p className="text-[13px] font-medium text-tradeFadeWhite">
          Bank Account
        </p>

        <div className="flex gap-1 items-cente">
          <div className="px-[6px] py-0.5 bg-tradeGreen/20 borde border-tradeAshExtraLight rounded-[4px] w-max">
            <p className="text-tradeGreen text-xs font-medium ">Verified</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[15px]">
        <div>
          <SiBankofamerica className="text-[40px] text-orange-600" />
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
          <p className="text-[13px] text-white font-semibold leading-none">
            {account?.account_holder_name}
          </p>
          <p className="text-tradeFadeWhite text-xs font-medium">
            Account Added On {date(account?.created_at)}
          </p>
        </div>

        {/* <div className="px-[6px] py-0.5 bg-red-500/10 border border-red-500 hover:bg-red-500/20 transition-all duration-300 cursor-pointer rounded-[4px] w-max">
          <p className="text-red-600 text-xs font-medium ">Delete Account</p>
        </div> */}
      </div>
    </div>
  );
};

export default AccountCard;
