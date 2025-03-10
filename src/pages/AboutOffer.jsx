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
import { MdOutlineShowChart } from "react-icons/md";
import ExchangeCalculator from "@/components/ExchangeCalculator";

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

  return (
    <>
      <MarketTopNav />
      <div className=" md:pt-[80px] pt-[67px] flex flex-col bg-black gap-[15.5px] md:p-[1.5%]">
        <div className="flex lg:flex-row flex-col w-full gap-[15.5px] lg:gap-[0.8%]">
          <div className="flex-1 flex  justify-between flex-col bg-tradeAsh md:border border-neutral-800 md:rounded-[12.5px]">
            <div className="flex items-center justify-between  md:p-[20px] px-[20px] py-[16px] border-b border-neutral-800 ">
              <p className="text-[18px] text-white font-[700] cursor-pointer">
                Offer Details
              </p>
            </div>

            <div className="flex flex-col md:gap-[40px] gap-[35px] p-[20px]">
              <div className="flex flex-wrap items-center lg:gap-[40px] gap-[30px]">
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Service
                  </p>
                  <p className="text-tradeOrange text-[15.5px] font-[600]">
                    {offerDetails.service}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Service Type
                  </p>
                  <p className="text-[15.5px] font-[600] text-white">
                    {offerDetails.serviceType}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
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

              <div className="flex flex-wrap items-center lg:gap-[40px] gap-[30px]">
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Maximum Trade Time
                  </p>
                  <p className="text-white text-[15.5px] font-[600]">
                    {offerDetails?.maxTradeTime} Minutes
                  </p>
                </div>
                <div className="flex flex-col gap-[5px] ">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Average Trade Time
                  </p>
                  <p className="text-white text-[15.5px] font-[600]">
                    {offerDetails?.avgTradeTime} Minutes
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Offer Rate Cap
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <p className="flex items-baseline gap-[8px] text-[15.5px] font-[700] text-white">
                      {`${parseInt(offerDetails?.rate).toLocaleString()}  ${
                        offerDetails?.currency
                      }`}
                      <small>&#8226;</small>
                      {offeRateMargin.status && offeRateMargin.percentage ? (
                        offeRateMargin.status === "above" ? (
                          <small className="flex items-center gap-[3px] text-[13px]  text-tradeGreen font-[600]">
                            {`${offeRateMargin.percentage}% ${offeRateMargin.status} market`}
                          </small>
                        ) : (
                          <small className="flex items-center gap-[3px] text-[13px] text-red-500 font-[600]">
                            {`${offeRateMargin.percentage}% ${offeRateMargin.status} market`}
                          </small>
                        )
                      ) : (
                        <small className="text-[13px] text-tradeAshExtraLight font-[600]">
                          Calculating margin...
                        </small>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Network Fee
                  </p>
                  <p className="text-[15.5px] font-[600] text-white">0%</p>
                </div>
              </div>
            </div>

            <div className="flex  flex-col justify-between border-t border-neutral-800">
              <div className="flex md:p-[20px] px-[20px] py-[16px] border-b border-neutral-800 ">
                <p className="text-[18px] text-white font-[600] cursor-pointer">
                  About Vendor
                </p>
                {/* <div className="flex items-center gap-[4px] py-[2px] px-[8px] border border-tradeAshExtraLight rounded-full">
                  <p className="text-[13px] lg:text-[13px] text-tradeGreen">
                    <GoDotFill />
                  </p>
                  <p className="text-[13px] text-white lg:text-[12.5px] flex font-[600] ">
                    Online
                  </p>
                </div> */}
              </div>
              <div className="flex flex-wrap md:justify-between p-[20px] lg:gap-[15.5px] lg:gap-y-[30px] gap-[30px]  items-center">
                <div className=" flex items-center gap-[15.5px]">
                  <div>
                    <img
                      className="w-[40px] rounded-full"
                      src={offerDetails.profileImage}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-[5px] ">
                    <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                      Username
                    </p>

                    <p className="text-white text-[15.5px] font-[600] cursor-pointer">
                      {offerDetails.username}
                    </p>
                  </div>
                </div>

                <div className=" flex md:max-w-max  items-center md:gap-[40px] gap-[25px]">
                  <div className="flex flex-col gap-[5px] ">
                    <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
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
                    <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
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
                  <p className="text-[12.5px] font-[400] text-tradeFadeWhite">
                    Trust Score
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <FaRegStar className="text-[15.5px] text-tradeOrange" />
                    <p className="text-white text-[15.5px] font-[600]">
                      {offerDetails.trustScore}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ExchangeCalculator
            offerDetails={offerDetails}
            handleTradeValueChange={handleTradeValueChange}
            calculatorResult={calculatorResult}
            exchangeError={exchangeError}
            tradeValue={tradeValue}
          />
        </div>

        <div className="flex items-center justify-center px-[15.5px] md:px-0  py-[5px] ">
          <p className="text-[15.5px] text-center  text-black bg-tradeGreen hover:bg-white font-[700]  border border-tradeGreen p-[10px] rounded-[8px] md:rounded-[6px]  w-[100%] transition-all duration-300 cursor-pointer">
            Initiate Trade Now
          </p>
        </div>

        <div className="flex-1 flex flex-col bg-tradeAsh md:border border-neutral-800 md:rounded-[12.5px]">
          <div className="flex items-center justify-between  p-[20px] border-b border-neutral-800 ">
            <p className="text-[18px] text-white font-[700] cursor-pointer">
              Feedback on this Offer
            </p>
          </div>
          <div className="flex items-center justify-between  p-[20px]  border-neutral-800 "></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutOffer;
