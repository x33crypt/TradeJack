import React from "react";
import { date } from "@/utils/date";
import { AiOutlineDelete } from "react-icons/ai";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import { FaArrowUp } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { FaCheckDouble } from "react-icons/fa";

const AccountCard = ({ account, index }) => {
  const { manageAccount, setManageAccount } = useLinkedAccount();
  const { state } = manageAccount;

  const selectDeleteAccount = (id, bank, digit) => {
    setManageAccount({
      state: false,
      isDelete: true,
      accountId: id,
      bank: bank,
      last4digits: digit,
    });
  };

  const selectSetDefault = (id, bank, digit) => {
    setManageAccount({
      state: false,
      isDefault: true,
      accountId: id,
      bank: bank,
      last4digits: digit,
    });
  };

  return (
    <>
      <div
        key={index}
        className="flex flex-col gap-[10px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh"
      >
        <div className="flex justify-between border-b border-tradeAshLight w-full pb-[10px]">
          <div className="flex gap-1 items-center">
            <FaCheckDouble className="flex text-tradeFadeWhite text-[14px] flex-shrink-0" />
            <p className="text-xs font-medium text-tradeFadeWhite">
              Verified Account
            </p>
          </div>

          <div className="flex gap-1 items-cente">
            <div className="bg-transparent text-tradeFadeWhite flex items-center gap-1 border border-tradeAshExtraLight  h-max bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              {account?.isDefault ? (
                <p className="text-xs font-semibold">Default</p>
              ) : (
                <p className="text-xs font-semibold">Alternative</p>
              )}
            </div>

            <div className="flex items-center gap-1 border border-tradeAshExtraLight bg-transparent bg-tradeAshLight rounded-[8px] p-1 w-max cursor-pointer">
              <FaQuestionCircle className="text-sm text-tradeOrange" />
            </div>
          </div>
        </div>
        {/* Bank Logo and Info */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-tradeAshLight border border-tradeAshExtraLight rounded-xl">
            <img
              className="w-[30px] h-[30px] object-contain"
              src={account?.logo}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-white text-sm font-semibold">
              {account?.bank_name}
            </p>
            <p className="text-tradeFadeWhite text-xs font-medium tracking-wide">
              {account?.account_number}
            </p>
          </div>
        </div>
        {/* Account Holder and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-white text-xs font-semibold">
              {account?.account_holder_name}
            </p>
            <p className="text-tradeFadeWhite text-xs font-medium">
              Linked: {date(account?.createdAt)}
            </p>
          </div>

          <div className="flex gap-2">
            {account?.isDefault && (
              <div className="w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                <TiPin className="text-[16px] text-tradeFadeWhite" />
              </div>
            )}

            {state && (
              <div className="flex items-center gap-2">
                {account?.isDefault === false && (
                  <div
                    onClick={() =>
                      selectSetDefault(
                        account?.bankId,
                        account?.bank_name,
                        account?.account_number.slice(-4)
                      )
                    }
                    className="w-max flex gap-1 items-center justify-center bg-tradeAshLight border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                  >
                    <FaArrowUp className="text-[16px] text-tradeFadeWhite" />
                  </div>
                )}

                <div
                  onClick={() =>
                    selectDeleteAccount(
                      account?.bankId,
                      account?.bank_name,
                      account?.account_number.slice(-4)
                    )
                  }
                  className="w-max flex gap-1 items-center justify-center bg-red-600/5 border border-red-600 p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
                >
                  <AiOutlineDelete className="text-[16px] text-red-600" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCard;
