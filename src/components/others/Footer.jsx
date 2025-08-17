import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SmallButton from "../buttons/SmallButton";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";

const Footer = ({ show }) => {
  const [starters, setStarters] = useState(false);
  const [products, setProducts] = useState(false);
  const [tools, setTools] = useState(false);
  const [platform, setPlatform] = useState(false);
  const [legal, setLegal] = useState(false);

  const currentYear = new Date().getFullYear();
  const navigateTo = useNavigate();

  const handleStarters = () => {
    setStarters(!starters);
    setProducts(false);
    setTools(false);
    setPlatform(false);
    setLegal(false);
  };

  const handleProducs = () => {
    setStarters(false);
    setProducts(!products);
    setTools(false);
    setPlatform(false);
    setLegal(false);
  };

  const handleTools = () => {
    setStarters(false);
    setProducts(false);
    setTools(!tools);
    setPlatform(false);
    setLegal(false);
  };

  const handlePlatform = () => {
    setStarters(false);
    setProducts(false);
    setTools(false);
    setPlatform(!platform);
    setLegal(false);
  };

  const handleLegal = () => {
    setStarters(false);
    setProducts(false);
    setTools(false);
    setPlatform(false);
    setLegal(!legal);
  };

  const tradingQuotes = [
    "Every trade is a step closer to your next big win.",

    "Opportunities don’t wait, neither should you.",

    "Small swaps lead to big gains.",

    "In every offer, there’s a golden chance waiting to be claimed.",

    "The best traders aren’t lucky, they’re consistent.",

    "Your next profitable move is one click away.",

    "Every trade tells a story, make yours worth reading.",

    "Markets reward the bold, not the hesitant.",

    "One great deal can change everything.",

    "Don’t just watch the market, move it.",

    "Great traders see opportunities where others see risk.",

    "Every offer is a handshake with success.",

    "Timing is everything, and now is your time.",

    "The faster you adapt, the faster you grow.",

    "Your future portfolio is built on the trades you make today.",

    "Winning starts with showing up, and trading smart.",

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
    <div className="lg:pt-[5px] md:pt-[20px] pt-[5px] bg-black">
      <div className="flex-1 bg-black lg:p-[2%] md:p-[2.5%] p-[15px] flex flex-col gap-[40px] border-t mt-[5px border-tradeAshLight">
        <div className="flex gap-[5px] flex-col w-full">
          <p className="  text-[13px]  font-bold text-tradeGreen">
            Go
            <span className="font-semibold text-tradeOrange">Get</span>
            <span className="font-semibold text-white">Swap</span>
          </p>

          <div className="w-full flex lg:flex-row flex-col lg:justify-between lg:items-center gap-[20px]">
            <div>
              <p className="text-2xl text-tradeFadeWhite font-semibold leading-tight">
                {tradingQuotes[quoteIndex]}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-max ">
              <SmallButton variant="fadeout">Support & Help</SmallButton>
              <SmallButton variant="fadeout">FAQs</SmallButton>
              <SmallButton variant="fadeout">Community</SmallButton>
            </div>
          </div>
        </div>
        <div className="md:grid hidden lg:grid-cols-5 md:grid-cols-3 w-full gap-[20px]">
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Starters
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                How it Works
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Explore Offers
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Products
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Shop
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Marketplace
              </p>

              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Escrow Security
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Useful Tools
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Trade Tracker
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Exchange Calculator
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Platform
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                About us
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Feedbacks
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[10px]">
            <p className="font-semibold text-[13px] text-tradeAshExtraLight">
              Legal
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Privacy Policy
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Terms of Use
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Cookie Statement
              </p>
            </div>
          </div>
        </div>
        <div className="flex md:hidden flex-col gap-[35px]">
          <div className="w-[full]">
            <div
              onClick={() => handleStarters()}
              className="flex justify-between items-center"
            >
              <p className="font-semibold text-[13px] text-tradeAshExtraLight">
                Starters
              </p>

              <div
                className={`text-white transform transition-transform duration-500 ${
                  starters ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={` flex flex-col gap-[10px] transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                starters
                  ? "max-h-[500px] opacity-100 mt-[10px]"
                  : "max-h-0 opacity-0 mt-0"
              } `}
            >
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                How it Works
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Explore Offers
              </p>
            </div>
          </div>
          <div className="w-[full]">
            <div
              onClick={() => handleProducs()}
              className="flex justify-between items-center "
            >
              <p className="font-semibold text-[13px] text-tradeAshExtraLight">
                Products
              </p>
              <div
                className={`text-white transform transition-transform duration-500 ${
                  products ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={` flex flex-col gap-[10px] transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                products
                  ? "max-h-[500px] opacity-100 mt-[10px]"
                  : "max-h-0 opacity-0 mt-0"
              } `}
            >
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Shop
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Marketplace
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Escrow Security
              </p>
            </div>
          </div>
          <div className="w-[full]">
            <div
              onClick={() => handleTools()}
              className="flex justify-between items-center "
            >
              <p className="font-semibold text-[13px] text-tradeAshExtraLight">
                Useful Tools
              </p>
              <div
                className={`text-white transform transition-transform duration-500 ${
                  tools ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={` flex flex-col gap-[10px] transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                tools
                  ? "max-h-[500px] opacity-100 mt-[10px]"
                  : "max-h-0 opacity-0 mt-0"
              } `}
            >
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Trade Tracker
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Exchange Calculator
              </p>
            </div>
          </div>
          <div className="w-[full]">
            <div
              onClick={() => handlePlatform()}
              className="flex justify-between items-center "
            >
              <p className="font-semibold text-[13px] text-tradeAshExtraLight">
                Platform
              </p>
              <div
                className={`text-white transform transition-transform duration-500 ${
                  platform ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={` flex flex-col gap-[10px] transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                platform
                  ? "max-h-[500px] opacity-100 mt-[10px]"
                  : "max-h-0 opacity-0 mt-0"
              } `}
            >
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                About us
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Feedbacks
              </p>
            </div>
          </div>
          <div className="w-[full]">
            <div
              onClick={() => handleLegal()}
              className="flex justify-between items-center "
            >
              <p className="font-semibold text-[13px] text-tradeAshExtraLight">
                Legal
              </p>
              <div
                className={`text-white transform transition-transform duration-500 ${
                  legal ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div
              className={` flex flex-col gap-[10px] transition-[max-height, opacity, margin-top] ease-in-out duration-700 overflow-hidden ${
                legal
                  ? "max-h-[500px] opacity-100 mt-[10px]"
                  : "max-h-0 opacity-0 mt-0"
              } `}
            >
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Privacy Policy
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
                Terms of Use
              </p>
              <p className="text-white hover:text-tradeOrange active:text-tradeOrange/50 font-semibold text-[13px] cursor-pointer transition-all duration-300">
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
            GoGetSwap Inc, @{currentYear}
          </p>

          <div className="flex gap-2">
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
