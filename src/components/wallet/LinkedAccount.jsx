import React from "react";
import { SiBankofamerica } from "react-icons/si";
import { SiHdfcbank } from "react-icons/si";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "../buttons/Button";
import { RiBankLine } from "react-icons/ri";

const LinkedAccount = () => {
  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>

      <div>
        <div className="flex flex-col px-[15px] py-[20px] gap-[10px] h-full">
          <div className="text-tradeOrange w-full justify-center flex">
            <RiBankLine className="text-[50px]" />
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-center gap-2 text-lg font-semibold text-white">
              <p>Link Bank Accounts</p>
            </div>
            <p className="text-[13px] max-w-[350px] font-medium text-tradeFadeWhite mt-1">
              Securely connect your bank to withdraw funds. We use bank-level
              security, encryption, and strict data protection.
            </p>
          </div>
        </div>

        {/* <div className="flex flex-col p-[15px] gap-[10px] h-full">
          <div className="flex justify-between items-center p-[12px] border border-tradeAshLight bg-tradeAsh hover:bg-tradeAshLight cursor-pointer rounded-[15px]">
            <div className="flex items-center gap-[15px]">
              <div>
                <SiHdfcbank className="text-[35px] text-orange-600" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white font-semibold text-sm">
                  Bank of America
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  **************9891
                </p>
              </div>
            </div>
            <div>
              <IoMdArrowDropright className="text-xl text-tradeFadeWhite" />
            </div>
          </div>

          <div className="flex justify-between items-center p-[12px] border border-tradeAshLight bg-tradeAsh hover:bg-tradeAshLight cursor-pointer rounded-[15px]">
            <div className="flex items-center gap-[15px]">
              <div>
                <SiHdfcbank className="text-[35px] text-orange-600" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white font-semibold text-sm">
                  Bank of America
                </p>
                <p className="text-tradeFadeWhite text-xs font-medium">
                  **************9891
                </p>
              </div>
            </div>
            <div>
              <IoMdArrowDropright className="text-xl text-tradeFadeWhite" />
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="flex p-[15px]">
        <Button variant="outline">Manage</Button>
      </div> */}

      <div className="flex p-[15px]">
        <Button variant="primary">Connect your Bank</Button>
      </div>
    </div>
  );
};

export default LinkedAccount;
