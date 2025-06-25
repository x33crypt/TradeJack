import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";
import { MdThumbDownAlt } from "react-icons/md";

const LimitMargin = ({ aboutOffer }) => {
  return (
    <div className="flex flex-col lg:w-[400px] w-full  md:border border-neutral-800">
      <div className="flex  items-center justify-between p-[15px] border-b border-tradeAshLight">
        <p className="text-lg font-[700] text-white ">Limits & Margin</p>
      </div>

      <div className="flex-1 flex  flex-col bg-tradeAs p-[15px] gap-[10px]">
        <div className="flex w-full flex-col bg-tradeAsh rounded-[15px]  border border-tradeAshLight">
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Minimum Purchase
            </p>

            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.marginRate?.from}{" "}
              {aboutOffer?.preferredCurrency?.code}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <p className="text-tradeFadeWhite text-[13px] font-semibold">
              Maximum Purchase
            </p>

            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.marginRate?.to} {aboutOffer?.preferredCurrency?.code}
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border-b border-tradeAshLight">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Confirmation Window
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.confirmationWindow} Hour(s)
            </p>
          </div>
          <div className="flex-1 flex p-[12px] justify-between border- border-tradeAshLight ">
            <div className="flex items-center gap-2">
              <p className="text-tradeFadeWhite text-[13px] font-semibold">
                Payment Window
              </p>

              <div className="text-tradeAshExtraLight hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                <FaInfoCircle />
              </div>
            </div>
            <p className="text-white text-[13px] font-semibold">
              {aboutOffer?.paymentWindow} Hour(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitMargin;
