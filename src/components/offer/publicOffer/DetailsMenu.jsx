import React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/userContext/DashboardContext";
import { IoMdArrowDropright } from "react-icons/io";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import toDecimal from "@/utils/toDecimal";
import withComma from "@/utils/withComma";
import Button from "@/components/buttons/Button";
import { usePublicOffers } from "@/context/publicContext/OffersContext";
import { useFetchAboutOffers } from "@/hooks/publicHooks/useFetchAboutOffer";
import { useCalculator } from "@/context/publicContext/CalculatorContext";
import { useTrade } from "@/context/publicContext/TradeContext";

const DetailsMenu = () => {
  const { aboutOffer, setAboutOffer } = usePublicOffers();
  const { setPreTradeCheck } = useTrade();
  const { loading } = useFetchAboutOffers();
  const { calculator, setCalculator } = useCalculator();

  const offer = aboutOffer?.data?.offerDetails;

  const close = () => {
    setCalculator((prev) => ({
      ...prev,
      state: false,
      loading: false,
      amount: "",
      receive: "",
    }));
  };

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^\d.-]/g, "");
    setCalculator((prev) => ({
      ...prev,
      amount: val,
    }));
  };

  const handlePreTradeCheck = () => {
    setCalculator((prev) => ({ ...prev, state: false }));
    setPreTradeCheck((prev) => ({ ...prev, checking: true }));

    // Simulate async check (optional delay)
    setTimeout(() => {
      const keys = [
        "limitEligible",
        "activeNow",
        "collacteralSecured",
        "kycCompliant",
      ];

      let result = {};

      // 30% chance everything passes ✅
      const allPass = Math.random() < 0.3;

      if (allPass) {
        keys.forEach((key) => (result[key] = true));
      } else {
        const failKey = keys[Math.floor(Math.random() * keys.length)];
        result = keys.reduce((acc, key) => {
          acc[key] = key === failKey ? false : true;
          return acc;
        }, {});
      }

      if (allPass) {
        setPreTradeCheck((prev) => ({
          ...prev,
          time: 300,
          isCounting: true,
          checking: false,
          success: true,
          result,
        }));
      } else {
        setPreTradeCheck((prev) => ({
          ...prev,
          checking: false,
          failed: true,
          details: false,
          result,
        }));
      }
    }, 1500);
  };

  const amountList = ["100", "200", "500", "800", "1000", "2000", "5000"];

  return (
    <div className="hidden lg:flex sticky top-[70px] h-max lg:w-[250px] gap-[10px] flex-col mb-[15px]">
      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[15px] rounded-[15px] border border-tradeAsh">
        <div
          onClick={() => navigateTo("/offers")}
          className="flex items-center gap-2"
        >
          <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
          <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
            AMOUNT
          </p>
        </div>

        <div className="flex gap-[10px]">
          <div className="flex px-2.5 py-1.5 gap-2 items-center justify-between bg-tradeAsh  border border-tradeAshExtraLight  flex-1 rounded-[10px] ">
            <div>
              <input
                type="text"
                placeholder="00.00"
                className="bg-transparent w-[150px] h-full text-[13px] font-semibold outline-none text-white placeholder:text-tradeFadeWhite"
              />
            </div>
          </div>

          <div className="flex border border-tradeAshExtraLight px-1.5 py-1.5 gap-2 items-center justify-between bg-transparent flex-1 rounded-[10px] ">
            <div className="text-[13px] font-semibold text-tradeFadeWhite">
              <p>{offer?.preferredCurrency?.code ?? "USD"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-[15px] bg-tradeAshLight gap-[15px] rounded-[15px] border border-tradeAsh">
        <div className="flex flex-col gap-[15px]">
          <div
            onClick={() => navigateTo("/offers")}
            className="flex items-center gap-2"
          >
            <IoMdArrowDropright className="text-lg text-tradeFadeWhite" />
            <p className="text-tradeFadeWhite hover:text-white text-[15px] font-bold transition-all duration-300 cursor-pointer">
              RETURN
            </p>
          </div>

          <div className="flex justify-between items-center gap-[10px]">
            <div className="flex px-2.5 py-1.5 gap-2 items-center justify-between bg-tradeAsh border border-tradeAshExtraLight flex-1 rounded-[10px] ">
              <div>
                <input
                  type="text"
                  readOnly
                  placeholder="00.00"
                  className="bg-transparent w-[150px] h-full text-[13px] font-semibold outline-none text-white placeholder:text-tradeFadeWhite cursor-default"
                />
              </div>
            </div>

            <div className="flex border border-tradeAshExtraLight px-1.5 py-1.5 gap-2 items-center justify-between bg-transparent rounded-[10px] ">
              <div className="text-[13px] font-semibold text-tradeFadeWhite">
                <p>{offer?.preferredCurrency?.code ?? "USD"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              Service Fee : <span className="text-white">23.00</span> USD
            </p>
            <p className="text-[13px] text-tradeFadeWhite font-semibold">
              1 USD = #234,000.78 (<span className="text-white">23.00</span>{" "}
              USD)
            </p>
          </div>
        </div>
      </div>

      <Button>SWAP</Button>
    </div>
  );
};

export default DetailsMenu;
