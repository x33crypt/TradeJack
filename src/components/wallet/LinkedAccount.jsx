import React from "react";
import { RiBankLine } from "react-icons/ri";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

const LinkedAccount = () => {
  const navigateTo = useNavigate();

  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between px-[15px] py-[12px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>

      <div className="flex flex-col p-[15px] gap-[10px]">
        <div className="">
          <div className="flex flex-col  items-center text-center gap-3 px-4 py-5 rounded-2xl bg-tradeAsh border border-tradeAshLight w-full ">
            <RiBankLine className="text-[32px] text-tradeFadeWhite" />

            <h3 className="text-white text-base font-semibold">
              Link Bank Account
            </h3>

            <p className="text-tradeFadeWhite text-[13px] font-medium md:max-w-[320px]">
              Securely connect your bank to withdraw funds. Bank-level security
              and encryption applied.
            </p>
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

        <Button
          variant="primary"
          onClick={() => navigateTo("/wallet/accounts")}
        >
          Add New Account
        </Button>
      </div>
    </div>
  );
};

export default LinkedAccount;
