import MarketTopNav from "@/components/InAppNav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import ExchangeCalculator from "@/components/ExchangeCalculator";
import { SlGraph } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import landingImg4 from "../assets/landingImg4.JPG";
import { CiBank } from "react-icons/ci";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoMdThumbsUp } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";

const AboutOffer = () => {
  const [offerDetails, setOfferDetails] = useState("");
  const [offerCurrencyCurrentMarketRate, setOfferCurrencyCurrentMarketRate] =
    useState("");
  const [bitcoinValueInUsd, setBitcoinValueInUsd] = useState("");
  const [offeRateMargin, setOffeRateMargin] = useState({
    status: "",
    percentage: "",
  });

  const [calculatorResult, setCalculatorResult] = useState({
    perUsd: "",
    perBtc: "",
    btcValue: "",
    usdValue: "",
    currencyValue: "",
  });
  const [tradeValue, setTradeValue] = useState("");
  const [exchangeError, setExchangeError] = useState("");

  const { id } = useParams();

  const getOffer = async () => {
    if (!id) {
      console.error("ID parameter is missing.");
      return;
    }

    try {
      const response = await axios.get("/fakeData.json"); // Fetch data from the file

      // Find the offer that matches the ID from the URL params
      const offer = response.data.offers.find((offer) => offer.offerId === id);

      if (offer) {
        setOfferDetails(offer); // Set the offer details if found
        // console.log("Offer details set successfully:", offer);
      } else {
        console.warn(`Offer with ID ${id} not found.`);
      }
    } catch (error) {
      console.error("Error fetching the offers:", error.message || error);
    }
  };

  // Fetching the Bitcoin Current Price in the Specified Currency (e.g., CAD, AUD)
  const getBitcoinValueInOfferCurrency = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${offerDetails?.currency.toLowerCase()}&ids=bitcoin`;

    try {
      const response = await axios.get(url, { timeout: 10000 }); // 10 sec timeout
      setOfferCurrencyCurrentMarketRate(response.data[0].current_price);
    } catch (err) {
      console.error("Error fetching Bitcoin value:", err.message);
    }
  };

  // Fetching the Bitcoin Current Price in USD
  const getBitcoinValueInUsd = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`;

    try {
      const response = await axios.get(url, { timeout: 10000 }); // 10 sec timeout

      setBitcoinValueInUsd(response.data[0].current_price);
    } catch (err) {
      console.error("Error fetching Bitcoin value:", err.message);
    }
  };

  const calculateRateMargin = () => {
    if (!offerDetails || !offerCurrencyCurrentMarketRate) return; // Prevent errors if values are missing

    const percentageChange =
      ((offerDetails.rate - offerCurrencyCurrentMarketRate) /
        offerCurrencyCurrentMarketRate) *
      100;

    // Round up and keep two decimal places
    const formattedPercentage = Math.ceil(Math.abs(percentageChange));

    let newStatus = "equal"; // Default status

    if (percentageChange > 0) {
      newStatus = "above";
    } else if (percentageChange < 0) {
      newStatus = "below";
    }

    // Update state correctly
    setOffeRateMargin({
      status: newStatus,
      percentage: formattedPercentage,
    });
  };

  const getofferRateCapPerUnitAndUSD = () => {
    if (
      tradeValue < offerDetails?.miniPurchase ||
      tradeValue > offerDetails?.maxPurchase
    ) {
      setCalculatorResult((prev) => ({
        ...prev,
        btcValue: "00.00",
        usdValue: "00.00",
        currencyValue: "00.00",
      }));
    }

    if (tradeValue < offerDetails?.miniPurchase) {
      setExchangeError(
        `The minimum purchase amount for this offer is ${offerDetails?.miniPurchase.toLocaleString()} ${
          offerDetails?.currency
        }`
      );
      return;
    }

    if (tradeValue > offerDetails?.maxPurchase) {
      setExchangeError(
        `The maximum purchase amount for this offer is ${offerDetails?.maxPurchase.toLocaleString()} ${
          offerDetails?.currency
        }`
      );
      return;
    }

    setExchangeError("");

    // Get 1 unit rate of the user's cap rate (the cap rate of the user is the current btc rate plus users profit margin e.g 10%)
    const offerRateCapPerUnit = 1 / offerDetails.rate;

    // Convert 1 unit of the user's currency to BTC's
    const offerCurrenyCurrentMarketRateInBtc =
      offerRateCapPerUnit * offerCurrencyCurrentMarketRate;

    // Get how much user receive for their money in BTC
    const userReceivesBTC = tradeValue * offerRateCapPerUnit;

    // Get how much user receive in their original currency
    const currencyValue = userReceivesBTC * offerCurrencyCurrentMarketRate;

    // Get how much user receive in USD currency
    const userReceivesUSD = userReceivesBTC * bitcoinValueInUsd;

    // Update state with calculated values
    setCalculatorResult({
      perBtc: offerRateCapPerUnit.toFixed(8), // 1 unit of currency in BTC
      perUsd: offerCurrenyCurrentMarketRateInBtc.toFixed(2), // 1 unit of currency in USD
      btcValue: userReceivesBTC !== null ? userReceivesBTC.toFixed(8) : "N/A",
      currencyValue: currencyValue.toFixed(2), // Corrected currency value
      usdValue: userReceivesUSD.toFixed(2), // Corrected USD value
    });

    // Debugging logs
    console.log(
      `1 ${offerDetails?.currency} = ${offerRateCapPerUnit.toFixed(8)} BTC`
    );
    console.log(
      `1 ${
        offerDetails?.currency
      } = ${offerCurrenyCurrentMarketRateInBtc.toFixed(2)} USD`
    );
    console.log(`User receives ${userReceivesBTC.toFixed(8)} BTC`);
    console.log(`User receives ${userReceivesUSD.toFixed(2)} USD`);
    console.log(
      `Converted BTC back to currency: ${currencyValue.toFixed(2)} ${
        offerDetails?.currency
      }`
    );
  };

  const handleTradeValueChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas

    if (!isNaN(rawValue) || rawValue === "") {
      // Ensure it's a number or empty string
      setTradeValue(rawValue); // Update the state with raw number
    }
  };

  const handleShowGreenButton = () => {
    if (
      tradeValue === "00.00" ||
      tradeValue < offerDetails?.miniPurchase ||
      tradeValue > offerDetails?.maxPurchase
    ) {
      return false;
    }

    return true;
  };

  const navigateTo = useNavigate();

  const handleInitiateTrade = () => {
    navigateTo(`/chat`);
  };

  useEffect(() => {
    getOffer();
    getBitcoinValueInUsd();
  }, [id]);

  useEffect(() => {
    getBitcoinValueInOfferCurrency();
  }, [offerDetails]);

  useEffect(() => {
    calculateRateMargin();
  }, [offerCurrencyCurrentMarketRate]);

  useEffect(() => {
    getofferRateCapPerUnitAndUSD();
  }, [offeRateMargin?.status]);

  useEffect(() => {
    getofferRateCapPerUnitAndUSD();
  }, [tradeValue]);

  const offerTermTags = [
    "Receipt required",

    "No third-party",
    "Pay exact amount",
    "Fast payment only",
    "Same bank only",
  ];

  return (
    <>
      <MarketTopNav />

      <div className="flex flex-col relative bg-black gap-[15px] lg:px-[15%] md:px-[5%] pt-[60px] md:pt-[80px]">
        <div className="flex lg:flex-row flex-col w-full gap-[15px] lg:gap-0 ">
          <div className="flex-1 flex justify-between flex-col md:border border-tradeAshLight">
            <div className=" flex items-center justify-between gap-[10px] p-[15px]  border-b border-tradeAshLight ">
              <p className=" text-[17px] text-white font-[700] cursor-pointer">
                About Offer
              </p>
            </div>
            {/* Offer Id Field */}
            <div className=" sticky top-[62px] z-20 flex gap-1 items-center px-4 py-2 border-b border-tradeAshLight bg-tradeAshLight">
              <p className="text-tradeFadeWhite text-xs font-semibold">
                OFFER ID
              </p>
              <p className="text-white text-xs font-semibold">-</p>

              <p className="text-tradeFadeWhite text-sm font-semibold">
                #128951721826
              </p>
            </div>

            {/* Offer Details */}
            <div className=" flex flex-col bg-tradeAsh  cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden">
              {/* service Type*/}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Service Type
                </p>
                <p className=" text-white text-sm font-semibold">
                  Direct Bank Transfer
                </p>
              </div>

              {/* service*/}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className="text-[13px] text-tradeFadeWhite font-semibold">
                  Service
                </p>
                <p className="text-tradeOrange text-[16px] font-bold">
                  Wells Fargo
                </p>
              </div>

              {/* Accepted Currency */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                  Accepted Currency
                </p>
                <p className=" font-semibold text-tradeGreen text-sm">
                  United State Dollars
                </p>
              </div>

              {/* Trade Volume */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                  Trade Volume
                </p>
                <p className=" font-semibold text-white text-sm">215 Trades</p>
              </div>

              {/* Feedback Summary */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                  Feedback Summary
                </p>
                <div className="flex gap-3 items-center">
                  <p className=" text-sm text-white flex items-center gap-1 font-semibold">
                    <IoMdThumbsUp className="text-tradeGreen " />
                    {/* {parseInt(props.positiveFeedback).toLocaleString()} */}
                    200
                  </p>

                  <p className="text-sm text-white flex items-center gap-1 font-semibold">
                    <MdThumbDownAlt className="text-red-500" />
                    {/* {parseInt(props.trustScore).toLocaleString()} */}15
                  </p>
                </div>
              </div>

              {/* Feedback Summary */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-tradeAshLight">
                <p className=" text-[13px] text-tradeFadeWhite font-semibold">
                  Vendor
                </p>
                <div className="flex items-center gap-2 cursor-pointer text-tradeFadeWhite hover:text-white transition-all duration-300">
                  <div className="flex flex-col ">
                    <p className="m-0 text-sm font-semibold text-white">
                      0xSanityy
                    </p>
                  </div>
                  <div className="w-[30px] flex-shrink-0 rounded-full">
                    <img
                      className="rounded-full"
                      src={landingImg4}
                      alt="User avatar"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other Offer details*/}
            <div className="w-full flex flex-col gap-[10px]">
              <div className=" flex items-center gap-[10px] px-4 py-2  border-b border-tradeAshLight bg-tradeAshExtraLight">
                <p className=" text-[14px] text-white font-[700] cursor-pointer">
                  Other Details
                </p>
              </div>

              <div className="grid grid-cols-2 lg:flex gap-[15px] p-[15px]">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-tradeFadeWhite text-[13px] font-[500]">
                      Minimum Purchase
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>

                  <div
                    className={` flex mt-[5px] bg-tradeAsh border border-tradeAshLight outline-none w-full rounded-[10px] overflow-hidden`}
                  >
                    <p className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer">
                      5,000
                    </p>
                    <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                      <p className="text-[14px] text-white font-[700]">USD</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex  flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-tradeFadeWhite text-[13px] font-[500]">
                      Maximum Purchase
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>
                  <div
                    className={` flex mt-[5px] bg-tradeAsh border border-tradeAshLight outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                  >
                    <p className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer">
                      5,000
                    </p>
                    <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                      <p className="text-[14px] text-white font-[700]">USD</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex gap-2 items-center">
                    <p className="text-tradeFadeWhite text-[13px] font-[500]">
                      Payment Window
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>
                  <p className=" bg-tradeAsh mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] border border-tradeAshLight w-full p-[12px] rounded-[10px] cursor-pointer">
                    1 Hour(s)
                  </p>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex gap-2 items-center">
                    <p className="text-tradeFadeWhite text-[13px] font-[500]">
                      Confirmation Window
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>
                  <p className=" bg-tradeAsh mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] border border-tradeAshLight w-full p-[12px] rounded-[10px] cursor-pointer">
                    1 Hour(s)
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-[15px] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-tradeFadeWhite text-[13px] font-[500]">
                      Offer Term Tags
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>

                  <div className="flex gap-[10px] flex-wrap ">
                    {offerTermTags.map((tag, index) => (
                      <div className="flex w-max items-center gap-[8px] px-[12px] py-[5px] rounded-[6px] bg-tradeAshLight">
                        <p
                          key={index}
                          className="text-[14px] font-medium text-tradeOrange"
                        >
                          {tag}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-[15px] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-tradeFadeWhite text-[13px] font-[500] mt-0">
                      Trade Instruction
                    </p>

                    <div className="text-tradeFadeWhite hover:text-tradeOrange cursor-pointer text-[14px] transition-all duration-300">
                      <FaInfoCircle />
                    </div>
                  </div>

                  <div className="flex">
                    <p className="text-[14px] text-white bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight">
                      It’s clear, compact, and user-friendly. Let me know the
                      specific context (e.g., banking, crypto, order
                      processing), and I can tailor it further. It’s clear,
                      compact, and user-friendly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ExchangeCalculator
            offerDetails={offerDetails}
            handleTradeValueChange={handleTradeValueChange}
            calculatorResult={calculatorResult}
            exchangeError={exchangeError}
            tradeValue={tradeValue}
            handleInitiateTrade={handleInitiateTrade}
            handleShowGreenButton={handleShowGreenButton}
          />
        </div>

        <div className="flex-1 flex flex-col border-t  md:border-x lg:border-x md:border-y  border-neutral-800">
          <div className="flex items-center justify-between  p-[15px] border-b border-neutral-800 ">
            <p className="text-[17px] text-white font-[700] cursor-pointer">
              Reviews on this Offer
            </p>
          </div>
          <div className="flex items-center justify-between p-[20px] border-neutral-800 "></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutOffer;
