import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SmallButton from "./buttons/SmallButton";

const Footer = ({ show }) => {
  const currentYear = new Date().getFullYear();
  const navigateTo = useNavigate();

  const tradingQuotes = [
    "Every trade is a step closer to your next big win.",

    "Opportunities don’t wait — neither should you.",

    "Small swaps lead to big gains.",

    "In every offer, there’s a golden chance waiting to be claimed.",

    "The best traders aren’t lucky — they’re consistent.",

    "Your next profitable move is one click away.",

    "Every trade tells a story — make yours worth reading.",

    "Markets reward the bold, not the hesitant.",

    "One great deal can change everything.",

    "Don’t just watch the market — move it.",

    "Great traders see opportunities where others see risk.",

    "Every offer is a handshake with success.",

    "Timing is everything — and now is your time.",

    "The faster you adapt, the faster you grow.",

    "Your future portfolio is built on the trades you make today.",

    "Winning starts with showing up — and trading smart.",

    "A smart trade today fuels your freedom tomorrow.",

    "Good traders react. Great traders anticipate.",

    "In the world of trading, hesitation costs more than risk.",

    "Every trade is a chance to rewrite your financial story.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) =>
        prevIndex === tradingQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="pt-[5px] bg-black">
      <div className="flex-1 bg-black lg:p-[2%] md:p-[2.5%] p-[15px]  flex flex-col gap-[30px] border-t mt-[5px border-tradeAshLight">
        <div className="flex gap-[30px] lg:flex-row flex-col justify-between items-center w-full bg-tradeAs">
          <div className="flex flex-col gap-sm w-full">
            <div className="flex justify-between items-center gap-[5px] cursor-pointer ">
              <p className="  text-[13px]  font-bold text-tradeGreen">
                Go
                <span className="font-semibold text-tradeOrange">Get</span>
                <span className="font-semibold text-white">Swap</span>
              </p>
            </div>

            <div>
              <p className="text-[25px] text-tradeFadeWhite font-semibold leading-relaxed">
                {tradingQuotes[quoteIndex]}
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-max justify-center md:justify-normal">
            <SmallButton variant="fadeout">FAQs</SmallButton>
            <SmallButton variant="fadeout">Help Center</SmallButton>
            <SmallButton variant="fadeout">Community</SmallButton>
          </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 w-full gap-[20px]">
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Starters
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-[13px]">
                How it Works
              </p>
              <p className="text-white font-semibold text-[13px]">
                Explore Offers
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Products
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-[13px]">Shop</p>
              <p className="text-white font-semibold text-[13px]">
                Marketplace
              </p>

              <p className="text-white font-semibold text-[13px]">
                Escrow Security
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Useful Tools
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-[13px]">
                Trade Tracker
              </p>
              <p className="text-white font-semibold text-[13px]">
                Exchange Calculator
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Platform
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-[13px]">About us</p>
              <p className="text-white font-semibold text-[13px]">Feedbacks</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Legal
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-[13px]">
                Privacy Policy
              </p>
              <p className="text-white font-semibold text-[13px]">
                Terms of Use
              </p>
              <p className="text-white font-semibold text-[13px]">
                Cookie Statement
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-tradeFadeWhite font-medium">
            "GoGetSwap" is an independent platform and is not affiliated with
            any of the payment services mentioned below. "GoGetSwap" is a
            registered trademark of GoGetSwap, Inc., © 2025 GoGetSwap, Inc. All
            Rights Reserved. GoGetSwap has no relationship with, and is not
            endorsed by MoneyGram, Western Union, Payoneer, WorldRemit, Paxum,
            PayPal, Cash App, Amazon, OkPay, Payza, Walmart, Reloadit, Perfect
            Money, WebMoney, Google Wallet, BlueBird, Serve, Square Cash,
            NetSpend, Chase QuickPay, Skrill, Vanilla, MyVanilla, OneVanilla,
            Neteller, Venmo, Apple, ChimpChange, or any other payment method.
            All respective trademarks, wordmarks, and brand names belong to
            their rightful owners.
          </p>
        </div>
        <div className="flex justify-between items-center w-full  pt-[15px] border-t border-tradeAshLight">
          <p className="text-tradeAshExtraLight text-xs font-semibold">
            GetGetSwap Inc, @{currentYear}
          </p>

          <div className="flex gap-3">
            <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaXTwitter className="text-[16px]" />
            </div>
            <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaTelegramPlane className="text-[16px]" />
            </div>
            <div className="w-max flex text-tradeFadeWhite hover:text-white gap-1 items-center justify-center bg- border border-tradeAshExtraLight p-2 h-max rounded-[10px] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
              <FaInstagram className="text-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
