import React from "react";
import { RiBankLine } from "react-icons/ri";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";
import Button from "../buttons/Button";

const LinkedAccount = () => {
  const { linkAccount, setLinkAccount } = useLinkedAccount();

  const handleLinkAccount = () => {
    setLinkAccount({ state: true });
  };

  return (
    <div className="flex flex-col w-full md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>

      <div className="p-[15px]">
        <div className="flex flex-col px-[12px] py-[20px] gap-[20px] h-full bg-tradeAsh rounded-[15px] border border-tradeAshLight">
          <div className="text-tradeFadeWhite w-full justify-center flex">
            <RiBankLine className="lg:text-[40px] text-[40px]" />
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-center gap-2 text-base font-semibold text-white">
              <p>Link Bank Accounts</p>
            </div>
            <p className="text-[13px] md:max-w-[350px] w-[300px] font-medium text-tradeFadeWhite mt-1">
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
        <Button
          variant="primary"
          disabled={linkAccount?.state}
          onClick={handleLinkAccount}
        >
          Connect your Bank
        </Button>
      </div>
    </div>
  );
};

export default LinkedAccount;
