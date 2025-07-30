import React from "react";
import { date } from "@/utils/date";
import { AiOutlineDelete } from "react-icons/ai";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import { TiFlash } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";

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
        className="flex flex-col gap-5 p-4 bg-tradeAsh border border-tradeAshLight rounded-2xl"
      >
        {/* Tag */}
        <div className="flex justify-between">
          <span className="px-2 py-0.5 text-xs font-bold text-white border border-tradeAshExtraLight rounded w-max">
            Verified Bank
          </span>
        </div>

        {/* Bank Logo and Info */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-tradeAshLight rounded-xl">
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
            <p className="text-white text-sm font-semibold">
              {account?.account_holder_name}
            </p>
            <p className="text-tradeFadeWhite text-xs font-medium">
              Linked On - {date(account?.createdAt)}
            </p>
          </div>

          <div className="flex gap-2">
            {account?.isDefault && (
              <div className="bg-transparent px-[5px] py-1 border border-tradeAshExtraLight rounded-[8px] w-max">
                <div className="text-[22px] text-tradeOrange">
                  <LuCrown />
                </div>
              </div>
            )}

            {state && (
              <div className="flex items-center gap-2">
                {account?.isDefault === false && (
                  <button
                    onClick={() =>
                      selectSetDefault(
                        account?.bankId,
                        account?.bank_name,
                        account?.account_number.slice(-4)
                      )
                    }
                    className="p-2 rounded-[8px] border border-tradeOrange bg-tradeOrange/10 hover:bg-tradeOrange/30 transition"
                  >
                    <FaArrowUp className="text-tradeOrange text-[22]" />
                  </button>
                )}

                <button
                  onClick={() =>
                    selectDeleteAccount(
                      account?.bankId,
                      account?.bank_name,
                      account?.account_number.slice(-4)
                    )
                  }
                  className="p-2 rounded-[8px] border border-red-500 bg-red-500/10 hover:bg-red-500/20 transition"
                >
                  <AiOutlineDelete className="text-red-600 text-[22]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCard;
