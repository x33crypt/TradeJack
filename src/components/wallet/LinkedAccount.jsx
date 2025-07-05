import React from "react";
import { SiBankofamerica } from "react-icons/si";
import { SiHdfcbank } from "react-icons/si";
import { IoMdArrowDropright } from "react-icons/io";
import Button from "../buttons/Button";

const LinkedAccount = () => {
  return (
    <div className="flex flex-col lg:w-full md:w-[350px] md:border border-neutral-800 bg-tradeAs">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Linked Account</p>
      </div>
      <div className="flex flex-col p-[15px] gap-[10px] h-full">
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

        <Button variant="outline">Manage</Button>
      </div>
    </div>
  );
};

export default LinkedAccount;
