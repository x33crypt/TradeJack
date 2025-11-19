import React from "react";
import { date } from "@/utils/date";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";
import { FaCheckDouble } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { TiPinOutline } from "react-icons/ti";
import { dateTime } from "@/utils/dateTime";
import MiniButton from "../buttons/MiniButton";

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
      <div className="flex flex-col gap-[10px]" key={index}>
        <div className="flex flex-col gap-[20px] border rounded-[15px] border-neutral-800 p-[12px] bg-tradeAsh">
          <div className="flex justify-between  w-full items-center">
            <MiniButton>
              <p>Verified </p>
            </MiniButton>

            <MiniButton>
              <p> {account?.isDefault ? " Default" : "Alternative"}</p>
            </MiniButton>
          </div>
          <div className="flex w-full justify-between ">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-tradeAshLight border border-tradeAshExtraLight rounded-xl">
                <img
                  className="w-[20px] h-[20px] object-contain"
                  src={account?.logo}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-white text-[13px] font-semibold">
                  {account?.bank_name}
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium tracking-wide">
                  {account?.account_number}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white text-xs font-semibold">
              {account?.account_holder_name}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2  bg-tradeAshLight/50 p-1 text-tradeFadeWhite hover:text-white w-max rounded-sm transition-all duration-300 cursor-pointer">
            <FaLink className="xs" />
            <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
              {dateTime(account?.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {state && (
              <div>
                {account?.isDefault === false && (
                  <div
                    onClick={() =>
                      selectSetDefault(
                        account?.bankId,
                        account?.bank_name,
                        account?.account_number
                      )
                    }
                    className="flex items-center gap-2 hover:bg-tradeOrange/30 bg-tradeOrange p-1 text-black w-max rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    <TiPinOutline className="xs" />
                    {/* <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                      Set as Default Account
                    </p> */}
                  </div>
                )}
              </div>
            )}
            {state && (
              <div
                onClick={() =>
                  selectDeleteAccount(
                    account?.bankId,
                    account?.bank_name,
                    account?.account_number
                  )
                }
                className="flex items-center gap-2 hover:bg-red-600/30 bg-red-600 p-1  text-white w-max rounded-sm transition-all duration-300 cursor-pointer"
              >
                <AiFillDelete className="xs" />
                {/* <p className="text-xs font-bold leading-none  w-max rounded-sm transition-all duration-300 cursor-pointer">
                  Delete
                </p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCard;
