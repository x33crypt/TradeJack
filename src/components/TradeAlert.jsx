import React, { useEffect } from "react";
import { useTradeAlert } from "@/context/TradeAlertContext";
import LockByScroll from "./LockByScroll";
import { TbRefreshAlert } from "react-icons/tb";

const TradeAlert = () => {
  const { tradeAlert, setTradeAlert } = useTradeAlert();

  useEffect(() => {
    console.log("Trade alert is", tradeAlert);
  }, [tradeAlert]);

  if (!tradeAlert) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-[50px]">
      <LockByScroll />

      <div className="bg-tradeAsh flex flex-col items-center p-[15px] gap-[30px] rounded-[14px] ">
        <div className="w-full sm:w-[250px] flex items-center flex-col gap-[5px]">
          <div className="w-full flex items-center justify-center text-white text-[60px]">
            <TbRefreshAlert />
          </div>
          <p className="flex text-[22px] text-white font-[700]">Trade Alert</p>
          <p className="text-tradeFadeWhite text-[13px] text-center font-[500]">
            You have a new trade request waiting. View the details now and
            respond quickly to secure the offer.
          </p>
        </div>

        <div>
          <p className="flex text-[30px] text-tradeFadeWhite font-[700]">60</p>
        </div>

        <div className="w-full flex items-center  flex-col gap-[4px] border border-tradeAshLight rounded-[10px] p-[10px]">
          <p className="flex gap-[4px] text-[20px] text-white font-[700]">
            PayPal
          </p>
          <p className="flex gap-[4px] text-[14px] text-tradeFadeWhite font-[500]">
            500.00 USD
          </p>
        </div>

        <div className="flex flex-col gap-[10px] w-full">
          <button
            onClick={() => navigateTo("/")}
            className="w-full text-black hover:text-tradeOrange bg-tradeOrange p-[12px] rounded-[10px] border border-transparent hover:border-tradeOrange flex justify-center items-center cursor-pointer hover:bg-tradeAsh transition-all duration-300"
          >
            <p className="text-[14px] font-[700] ">View Details</p>
          </button>
          <button
            onClick={() => setTradeAlert(false)}
            className="w-full text-tradeFadeWhite hover:text-white bg-transparent  p-[12px] rounded-[10px] border border-tradeAshLight hover:border-tradeAshExtraLight flex justify-center items-center cursor-pointer transition"
          >
            <p className="text-[14px] font-[700]">Cancel</p>
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default TradeAlert;
