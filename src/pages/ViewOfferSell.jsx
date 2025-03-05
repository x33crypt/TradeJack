import MarketTopNav from "@/components/MarketTopNav";
import React, { useState, useEffect } from "react";
import { PiStarBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";
import landingImg4 from "./../assets/landingImg4.JPG";
import { IoMdThumbsUp } from "react-icons/io";
import { AiOutlineSafety } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import OfferCalculator from "@/components/aboutOffer/OfferCalculator";
import { GoDotFill } from "react-icons/go";
import { TiTick } from "react-icons/ti";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbDownAlt } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineInfo } from "react-icons/md";
import { FaArrowUpLong } from "react-icons/fa6";
import { HiArrowNarrowUp } from "react-icons/hi";
import { IoMdArrowRoundUp } from "react-icons/io";

const ViewOfferSell = () => {
  const [offerDetails, setOfferDetails] = useState("");
  const [offerRateValue, setOfferRateValue] = useState("");
  const [bitcoinValueInUsd, setBitcoinValueInUsd] = useState("");
  const [offeRateMargin, setOffeRateMargin] = useState({
    status: "",
    percentage: "",
  });
  const [currencyRate, setCurrencyRate] = useState({
    perUsd: "",
    perBtc: "",
    usdValue: "",
    btcValue: "",
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
      setOfferRateValue(response.data[0].current_price);
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

  console.log(` Bitcoin price in ${offerDetails?.currency}: ${offerRateValue}`);
  console.log(` Bitcoin price in USD: ${bitcoinValueInUsd}`);

  const calculateRateMargin = () => {
    if (!offerDetails || !offerRateValue) return; // Prevent errors if values are missing

    const percentageChange =
      ((offerDetails.rate - offerRateValue) / offerRateValue) * 100;

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

  const getCurrencyToBTCAndUSD = () => {
    if (tradeValue) {
      if (
        tradeValue < offerDetails?.miniPurchase ||
        tradeValue > offerDetails?.maxPurchase
      ) {
        setExchangeError("Enter a valid amount within offer purchase limit");
        return;
      }
    }

    setExchangeError("");

    // Convert 1 unit of the user's currency to BTC based on user's rate
    const currencyToBTC = 1 / offerDetails.rate; // where offerDetails.rate is the user's price per BTC in their currency

    // Convert 1 unit of the user's currency to USD using the BTC value in USD
    const currencyToUSD = currencyToBTC * bitcoinValueInUsd;

    // Now calculate the amount the user will receive in USD
    const userReceivesUSD = currencyToUSD * tradeValue;

    // Check if tradeValue exists and is greater than 0 before calculating userReceivesBTC
    const userReceivesBTC =
      tradeValue && tradeValue > 0
        ? (currencyToUSD * tradeValue) / bitcoinValueInUsd
        : null; // set null if tradeValue is not available or zero

    // Update state with the calculated values for BTC and USD
    setCurrencyRate({
      perBtc: currencyToBTC.toFixed(8),
      perUsd: currencyToUSD.toFixed(2),
      usdValue: userReceivesUSD.toFixed(2),
      btcValue: userReceivesBTC !== null ? userReceivesBTC.toFixed(8) : "N/A", // Show N/A or a default value instead of 0.000000
    });

    // Log the values for debugging
    console.log(
      `1 ${offerDetails?.currency} = ${currencyToBTC.toFixed(8)} BTC`
    ); // How much 1 unit of the user's currency is in BTC
    console.log(
      `1 ${offerDetails?.currency} = ${currencyToUSD.toFixed(2)} USD`
    ); // How much 1 unit of the user's currency is in USD
  };

  const handleTradeValueChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(rawValue) || rawValue === "") {
      // Ensure it's a number or empty string
      setTradeValue(rawValue); // Update the state with raw number
    }
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
  }, [offerRateValue]);

  useEffect(() => {
    getCurrencyToBTCAndUSD();
  }, [offeRateMargin?.status]);

  useEffect(() => {
    getCurrencyToBTCAndUSD();
  }, [tradeValue]);

  // console.log(offerDetails);
  // console.log(offerRateValue);
  // console.log(offeRateMargin);

  return (
    <>
      <MarketTopNav />
      <div className=" md:pt-[80px] pt-[67px] flex flex-col bg-black gap-[15.5px] md:p-[1.5%]">
        {/* <div className="flex flex-col justify-between  py-[20px] md:border-b border-neutral-800 ">
          <p className="text-[18px] text-white font-[800] cursor-pointer">
            {id} / {offerDetails.service}
          </p>
        </div> */}

        <div className="flex lg:flex-row flex-col w-full gap-[15.5px] lg:gap-[0.8%]">
          <div className="flex-1 flex  flex-col bg-tradeAsh md:border border-neutral-800 md:rounded-[12px]">
            <div className="flex items-center justify-between  md:p-[20px] px-[20px] py-[16px] border-b border-neutral-800 ">
              <p className="text-[18px] text-white font-[700] cursor-pointer">
                Offer Details
              </p>
              {/* <div className="flex items-center gap-[4px] py-[3px] px-[12px] bg-tradeGreen rounded-[4px]  ">
                <p className="text-[13px] lg:text-[13px] text-black">
                  <TiTick />
                </p>
                <p className="text-[13px] text-black lg:text-[12px] flex font-[600] ">
                  Active
                </p>
              </div> */}
            </div>
            <div className="flex flex-col lg:gap-[30px] gap-[25px] p-[20px]">
              <div className="flex flex-wrap items-center lg:gap-[50px] gap-[25px]">
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Service
                  </p>
                  <p className="text-tradeOrange text-[15.5px] font-[600]">
                    {offerDetails.service}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Service Type
                  </p>
                  <p className="text-[15.5px] font-[600] text-white">
                    {offerDetails.serviceType}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Purchase Limit
                  </p>
                  <div className="flex gap-[10px]">
                    <p className="flex items-center gap-[5px] text-[15.5px] font-[600] text-tradeFadeWhite">
                      Min
                      <small className="text-[15.5px] font-[600] text-white">{`${parseInt(
                        offerDetails?.miniPurchase
                      ).toLocaleString()}  ${offerDetails?.currency}`}</small>
                    </p>
                    <p className="text-white text-[20px] font-[800]">-</p>
                    <p className="flex items-center gap-[5px] text-[15.5px] font-[600] text-tradeFadeWhite">
                      Max
                      <small className="text-[15.5px] font-[600] text-white">{`${parseInt(
                        offerDetails?.maxPurchase
                      ).toLocaleString()}  ${offerDetails?.currency}`}</small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center lg:gap-[50px] gap-[25px]">
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Maximum Trade Time
                  </p>

                  <p className="text-white text-[15.5px] font-[600]">
                    {offerDetails?.maxTradeTime} Minutes
                  </p>
                </div>
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Average Trade Time
                  </p>
                  <p className="text-white text-[15.5px] font-[600]">
                    {offerDetails?.avgTradeTime} Minutes
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Rate Cap
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="flex items-baseline gap-[5px] text-[15.5px] font-[700] text-white">
                      {`${parseInt(offerDetails?.rate).toLocaleString()}  ${
                        offerDetails?.currency
                      }`}
                      <small>&#8226;</small>
                      {offeRateMargin.status && offeRateMargin.percentage ? (
                        offeRateMargin.status === "above" ? (
                          <small className="text-[13px]  text-tradeGreen font-[600]">
                            {`${offeRateMargin.percentage}% ${offeRateMargin.status} bitcoin's market price`}
                          </small>
                        ) : (
                          <small className="text-[13px] text-red-500 font-[600]">
                            {`${offeRateMargin.percentage}% ${offeRateMargin.status} market`}
                          </small>
                        )
                      ) : (
                        <small className="text-[13px] text-tradeAshExtraLight font-[600]">
                          Loading margin...
                        </small>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Network Fee
                  </p>
                  <p className="text-[15.5px] font-[600] text-white">10%</p>
                </div>
              </div>
            </div>
            <div className="flex  flex-col justify-between border-t border-neutral-800">
              <div className="flex items-center justify-between  md:p-[20px] px-[20px] py-[16px] border-b border-neutral-800 ">
                <p className="text-[18px] text-white font-[600] cursor-pointer">
                  About Vendor
                </p>
                {/* <div className="flex items-center gap-[4px] py-[2px] px-[8px] border border-tradeAshExtraLight rounded-full">
                  <p className="text-[13px] lg:text-[13px] text-tradeGreen">
                    <GoDotFill />
                  </p>
                  <p className="text-[13px] text-white lg:text-[12px] flex font-[600] ">
                    Online
                  </p>
                </div> */}
              </div>
              <div className="flex flex-wrap md:justify-between p-[20px] lg:gap-[15.5px] lg:gap-y-[30px] gap-y-[25px] gap-x-[25px] items-center">
                <div className=" flex items-center gap-[15.5px]">
                  <div>
                    <img
                      className="w-[40px] rounded-full"
                      src={offerDetails.profileImage}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-[5px] ">
                    <p className="text-[12px] font-[400] text-tradeFadeWhite">
                      Username
                    </p>

                    <p className="text-white text-[15.5px] font-[600] cursor-pointer">
                      {offerDetails.username}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Location
                  </p>
                  <p className="text-white text-[15.5px] font-[600]">
                    {offerDetails.location}
                  </p>
                </div>

                <div className=" flex md:max-w-max  items-center md:gap-[40px] gap-[25px]">
                  <div className="flex flex-col gap-[5px] ">
                    <p className="text-[12px] font-[400] text-tradeFadeWhite">
                      Positive Feedback
                    </p>
                    <div className="flex items-center gap-[10px]">
                      <MdThumbUpAlt className="text-[15.5px] text-tradeGreen" />
                      <p className="text-white text-[15.5px] font-[600]">
                        {`${parseInt(
                          offerDetails?.positiveFeedback
                        ).toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px] ">
                    <p className="text-[12px] font-[400] text-tradeFadeWhite">
                      Negative Feedback
                    </p>
                    <div className="flex items-center gap-[10px]">
                      <MdThumbDownAlt className="text-[15.5px] text-red-500" />
                      <p className="text-white text-[15.5px] font-[600]">
                        {`${parseInt(
                          offerDetails?.negativeFeedback
                        ).toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Trust Score
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <FaRegStar className="text-[15.5px] text-tradeOrange" />
                    <p className="text-white text-[15.5px] font-[600]">
                      {offerDetails.trustScore}%
                    </p>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12px] font-[400] text-tradeFadeWhite">
                    Avg Trade Speed
                  </p>
                  <p className="text-white text-[15.5px] font-[600]">
                    20 Minutes
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="px-[15.5px] md:p-0">
            <div className=" h-full lg:w-[400px] flex flex-col bg-tradeAshLight md:border border-tradeAsh rounded-[12px]">
              <div className="flex flex-col justify-between p-[20px] border-b border-tradeAsh">
                <p className="text-[18px] text-white font-[700] cursor-pointer">
                  Exchange Calculator
                </p>
              </div>

              <div className="flex flex-col h-full ">
                <div className="flex flex-col gap-[10px] p-[20px]">
                  <div className="flex flex-col gap-[10px] bg-tradeAsh p-[15px] rounded-[15.5px]">
                    <div className="flex justify-between items-center">
                      <p className="text-tradeFadeWhite text-[13px]">Send</p>
                      <div className="flex items-center gap-[10px]">
                        <p className="text-tradeFadeWhite text-[13px] flex gap-[5px]">
                          Min
                          <small className="text-white text-[13px] font-[600]">
                            {`${parseInt(
                              offerDetails?.miniPurchase
                            ).toLocaleString()}`}
                          </small>
                        </p>

                        <p className="text-tradeFadeWhite text-[13px] flex gap-[5px]">
                          Max
                          <small className="text-white text-[13px] font-[600]">
                            {`${parseInt(
                              offerDetails?.maxPurchase
                            ).toLocaleString()}`}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                        {offerDetails?.currency}
                      </p>
                      <input
                        className="h-[20px] max-w-[200px] outline-none border-none bg-transparent text-right text-[20px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[20px] caret-tradeGreen"
                        type="text"
                        placeholder="Enter Amount"
                        value={
                          tradeValue
                            ? parseInt(tradeValue).toLocaleString()
                            : ""
                        }
                        onChange={handleTradeValueChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] bg-tradeAsh p-[15px] rounded-[15.5px]">
                    <div className="flex justify-between">
                      <p className="text-tradeFadeWhite text-[13px]">Receive</p>

                      <p className="text-tradeGreen text-[13px] font-[600]">
                        Fee Applied
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="px-[10px] py-[2px] rounded-full text-[14px] font-[600] bg-white">
                        BTC
                      </p>
                      <input
                        className="h-[20px] max-w-[200px] outline-none border-none bg-transparent text-right text-[20px] text-white font-[600] placeholder:text-tradeFadeWhite placeholder:text-[20px] cursor-default"
                        type="text"
                        value={
                          isNaN(currencyRate?.btcValue) ||
                          currencyRate?.btcValue === null ||
                          currencyRate?.btcValue === undefined
                            ? ""
                            : currencyRate.btcValue
                        }
                        readOnly
                        placeholder="00.00"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col items-center ">
                  {exchangeError ? (
                    <div className="flex h-[10px] items-center gap-[5px]">
                      <p className="text-[12px] text-red-600">
                        {exchangeError}
                      </p>
                    </div>
                  ) : (
                    <div className="flex h-[10px] items-center gap-[5px]"></div>
                  )}
                </div>

                <div className=" flex lg:pb-[px] py-[15.5px] flex-col">
                  <div className="flex justify-between px-[20px] py-[5px] border-t border-black">
                    <p className="text-[14px] font-[500] text-tradeGreen">
                      Rate Breakdown
                    </p>
                    <p className="text-[14px] font-[600] text-white">
                      {`
    1 ${offerDetails?.currency ? offerDetails.currency : "USD"} =  
    ${
      isNaN(currencyRate?.perUsd) ||
      currencyRate?.perUsd === null ||
      currencyRate?.perUsd === undefined
        ? "00.00"
        : currencyRate.perUsd
    }
  `}{" "}
                      USD of BTC
                    </p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[5px] border-t border-black">
                    <p className="text-[14px] font-[500] text-tradeFadeWhite">
                      Your receive in (USD)
                    </p>
                    <p className="text-[14px] font-[600] text-white">
                      <p className="text-[14px] font-[600] text-white">
                        {isNaN(currencyRate?.usdValue) ||
                        currencyRate?.usdValue === null ||
                        currencyRate?.usdValue === undefined
                          ? "00.00"
                          : currencyRate.usdValue}{" "}
                        USD
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:py-[20px]  py-[5px] px-[15.5px]">
          <p className="text-[15.5px] text-center text-black  font-[700]  bg-tradeGreen p-[10px] rounded-[10px] md:w-[25%] w-[100%] cursor-pointer">
            Initiate Trade Now
          </p>
        </div>

        <div className="flex-1 flex flex-col bg-tradeAsh md:border border-neutral-800 md:rounded-[12px]">
          <div className="flex items-center justify-between  p-[20px] border-b border-neutral-800 ">
            <p className="text-[18px] text-white font-[700] cursor-pointer">
              Feedback on this Offer
            </p>
          </div>
          <div className="flex items-center justify-between  p-[20px]  border-neutral-800 "></div>
        </div>
      </div>
      {/* <div className="px-[10%] py-[90px] gap-[60px] bg-white flex flex-col">
        <div className="mt-[50px] flex text-black text-[40px] font-[600] justify-center">
          <p className="text-[45px]">
            Sell your asset using{" "}
            <small className="text-[45px] text-tradeOrange">
              {offerDetails.service}
            </small>{" "}
            ({offerDetails.
currency
})
          </p>
        </div>
        <OfferCalculator
          offerRate={offerDetails?.offerRate}
          
currency
={offerDetails?.
currency
}
        />
        <div className="gap-[50px] flex">
          <div className="flex-1 h-max flex flex-col gap-[10px]">
            <p className="text-[18px] font-[800]">About this offer</p>
            <div className="p-[20px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[6px] text-neutral-400">
                  <p className="text-[14px] font-[400]">Buyers rate</p>
                  <div>
                    <PiStarBold />
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  {offerDetails?.offerRate?.map((details, index) => (
                    <div id={index}>
                      <p className="text-[15.5px] font-[800] ">
                        {details.range}{" "}
                        <small className="text-[15.5px] font-[800] text-neutral-500">
                          {offerDetails.
currency
}
                        </small>{" "}
                        -{" "}
                        <small className="text-[15.5px] text-black font-[800]">
                          {details.rate}{" "}
                          <small className="text-[15.5px] font-[800] text-neutral-500">
                            NGN / {offerDetails.
currency
}
                          </small>
                        </small>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[4px] text-neutral-400">
                  <p className="font-[400] text-[14px] text-neutral-400">
                    Transaction Limits
                  </p>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="font-[800] text-[15.5px] ">
                    <small className="text-[15.5px]  text-neutral-500 ">
                      Min
                    </small>{" "}
                    20 {offerDetails.
currency
} -{" "}
                    <small className="text-[15.5px] text-neutral-500">Max</small>{" "}
                    {offerDetails?.purchaseLimit} {offerDetails.
currency
}
                  </p>
                </div>
              </div>
              <div className="flex gap-[70px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[14px] font-[400] text-neutral-400">
                      Trade time limit
                    </p>
                    <FaRegQuestionCircle className="text-tradeOrange" />
                  </div>
                  <div>
                    <p className="text-[15.5px] font-[800] ">30 min</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[14px] font-[400] text-neutral-400">
                      Platform Fee
                    </p>
                  </div>
                  <div>
                    <p className="text-[15.5px] font-[800] ">1&#37;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-max flex flex-col gap-[10px]">
            <p className="text-[18px] font-[800]">About this buyer</p>
            <div className="p-[20px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
              <div className="flex items-center gap-[20px]">
                <div>
                  <img
                    className="w-[60px] rounded-full"
                    src={landingImg4}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[5px] leading-[20px]">
                  <p className="font-[600] text-[17px]">
                    {vendorDetails.username}
                  </p>
                  <p className="text-[14px] font-[500]">
                    Location : {vendorDetails.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-[50px]">
                <div>
                  <p className="text-[14px] text-neutral-400 font-[400] ">
                    Positive feedback
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <IoMdThumbsUp className="text-[25px] text-tradeGreen" />
                    <p className="font-[800] text-[15.5px]">
                      {vendorDetails.feedback}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-neutral-400 font-[400] ">
                    Trust score
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <AiOutlineSafety className="text-[25px] text-tradePurple" />
                    <p className="font-[800] text-[15.5px]">
                      {vendorDetails.trustScore}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.idVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {" "}
                    {vendorDetails.idVerified
                      ? "ID verified"
                      : "ID not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.addressVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {" "}
                    {vendorDetails.addressVerified
                      ? "Address verified"
                      : "Address not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.emailVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}
                  <p className="text-[14px] font-[400] ">
                    {vendorDetails.emailVerified
                      ? "Email verified"
                      : "Email not verified"}
                  </p>
                </div>
                <div className="flex gap-[5px] items-center">
                  {vendorDetails.phoneVerified ? (
                    <>
                      <IoMdCheckmark className="text-[20px] text-tradeGreen" />
                    </>
                  ) : (
                    <>
                      <RxCross2 className="text-[20px] text-red-600" />
                    </>
                  )}

                  <p className="text-[14px] font-[400] ">
                    {vendorDetails.phoneVerified
                      ? "Phone verified"
                      : "Phone not verified"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[6px]">
                  <p className="text-[14px] font-[400] text-neutral-400">
                    Average trade speed
                  </p>
                  <FaRegQuestionCircle className="text-tradeOrange" />
                </div>
                <div>
                  <p className="text-[15.5px] font-[800] ">30 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-[18px] font-[800]">Offer terms</p>
          <div className="p-[20px] flex flex-col rounded-[8px] border border-neutral-300">
            {offerDetails.offerTerms?.map((terms, index) => (
              <div key={index}>
                <p className="text-[15.5px]">{terms}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-[30px] flex flex-col gap-[30px] rounded-[8px] border border-neutral-300">
          <div className="flex">
            <p className="text-[18px] font-[800]">Feedback on this offer</p>
          </div>
        </div>
        <div className="flex  justify-center">
          <p className="px-[40px] py-[7px] rounded-[5px] bg-tradePurple text-white hover:text-tradePurple border border-tradePurple hover:bg-white font-[600] cursor-pointer">
            Start Transaction
          </p>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default ViewOfferSell;
