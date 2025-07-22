import React from "react";
import { date } from "@/utils/date";
import { AiOutlineDelete } from "react-icons/ai";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import { TiFlash } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";

const AccountCard = ({ account, index }) => {
  const { manageAccount, setManageAccount } = useLinkedAccount();
  const { state } = manageAccount;

  const selectDeleteAccount = (id) => {
    setManageAccount({
      state: false,
      accountId: id,
    });
  };

  return (
    <>
      <div
        key={index}
        className="flex flex-col p-[12px] gap-[30px] bg-tradeAsh border border-tradeAshLight rounded-[15px]"
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
            <p className="text-base font-semibold text-white leading-relaxed">
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
          {state && (
            <div className="flex gap-2 items-center">
              {account?.isDefault === false && (
                <div
                  onClick={() => selectDeleteAccount(account?.bankId)}
                  className="p-[8px] bg-tradeOrange/20 border border-tradeOrange hover:bg-tradeOrange/50 transition-all duration-300 cursor-pointer rounded-[8px] w-max"
                >
                  <FaArrowUp className="text-tradeOrange  text-sm font-medium " />
                </div>
              )}
              <div
                onClick={() => selectDeleteAccount(account?.bankId)}
                className="p-[8px] bg-red-500/10 border border-red-500 hover:bg-red-500/20 transition-all duration-300 cursor-pointer rounded-[8px] w-max"
              >
                <AiOutlineDelete className="text-red-600  text-sm font-medium " />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountCard;
