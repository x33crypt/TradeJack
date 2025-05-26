import React, { useEffect, useState, useRef } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelectElement } from "@/context/SelectElementContext";
import { useCreateOfferDetails } from "@/context/CreateOfferDetailsContext";
import axios from "axios";
import Info from "@/components/alerts/Info";
import Warning from "@/components/alerts/Warning";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const CreateOffer = () => {
  const { select, setSelect } = useSelectElement();
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const [currencies, setCurrencies] = useState([]);
  const [isOnlineWallet, setIsOnlineWallet] = useState(true);
  const [isAccount, setIsAccount] = useState(false);
  const [isGiftCard, setIsGiftCard] = useState(false);
  const [isDebitOrCreditCard, setIsDebitOrCreditCard] = useState(false);
  const [isCryptoAsset, setIsCryptoAsset] = useState(false);
  const [previewOffer, setPreviewOffer] = useState(false);
  const { createOffer, setCreateOffer } = useState(false);

  const serviceType = [
    "Online Wallet Transfer",
    "Direct Bank Transfer",
    "Gift Card Exchange",
    "Card-Based Spending",
    "Crypto Trading",
  ];

  const onlineWallets = [
    // 🌍 Global Online Wallets
    "PayPal",
    "Google Pay",
    "Apple Pay",
    "Samsung Pay",
    "Venmo",
    "Cash App",
    "Revolut",
    "Wise (formerly TransferWise)",
    "Western Union Digital",
    "MoneyGram Online",
    "Payoneer",
    "Skrill",
    "Neteller",

    // 🌎 North America (USA & Canada)
    "Zelle",
    "Chime",
    "SoFi Money",
    "Interac e-Transfer",
    "Koho",
    "Wealthsimple Cash",

    // 🇬🇧 UK & 🇪🇺 Europe
    "Monzo",
    "Starling Bank",
    "N26",
    "SEPA Instant (EU)",

    // 🇦🇺 Australia & New Zealand
    "Beem It",
    "Osko by BPAY",

    // 🇮🇳 India & South Asia
    "PhonePe",
    "Paytm",
    "Google Pay (Tez)",
    "BHIM UPI",

    // 🇵🇭 Southeast Asia & Philippines
    "GCash",
    "PayMaya",
    "GrabPay",
    "ShopeePay",

    // 🌍 Africa (Nigeria, Kenya, South Africa, Ghana, etc.)
    "Flutterwave Barter",
    "Chipper Cash",
    "Opay",
    "M-Pesa",
    "Airtel Money",
    "MoMo (MTN Mobile Money)",
    "Vodafone Cash",
    "Orange Money",

    // 🌏 Middle East
    "STC Pay",
    "PayTabs",
    "E-Dinar",

    // 🌎 Latin America
    "Mercado Pago",
    "PicPay",
    "PagSeguro",

    // 💰 Cryptocurrency & Blockchain Wallets
    "Coinbase Wallet",
    "Binance Pay",
    "MetaMask",
    "Trust Wallet",
    "Exodus Wallet",
    "Ledger Live",
    "Trezor Suite",
    "BitPay",
    "Wirex",

    // 🏢 Business & Merchant Payments
    "Stripe",
    "Square",
    "Alipay",
    "WeChat Pay",
  ];

  const bankAccounts = [
    // Global Banks
    "JPMorgan Chase",
    "Bank of America",
    "Citibank (Citi)",
    "Wells Fargo",
    "Goldman Sachs",
    "Morgan Stanley",
    "HSBC",
    "Barclays",
    "Lloyds Bank",
    "Royal Bank of Scotland (NatWest Group)",
    "Santander",
    "BBVA",
    "Deutsche Bank",
    "Commerzbank",
    "BNP Paribas",
    "Société Générale",
    "Crédit Agricole",
    "UBS",
    "Credit Suisse",
    "ING Group",
    "ABN AMRO",
    "Rabobank",
    "Nordea",
    "Danske Bank",
    "Swedbank",
    "SEB Bank",
    "Scotiabank",
    "Royal Bank of Canada (RBC)",
    "Toronto-Dominion Bank (TD Bank)",
    "Bank of Montreal (BMO)",
    "Commonwealth Bank",
    "Westpac",
    "ANZ Bank",
    "National Australia Bank (NAB)",
    "China Construction Bank (CCB)",
    "Industrial and Commercial Bank of China (ICBC)",
    "Bank of China",
    "Agricultural Bank of China",
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "DBS Bank",
    "OCBC Bank",
    "United Overseas Bank (UOB)",
    "Maybank",
    "Bank Rakyat Indonesia (BRI)",
    "Standard Bank",
    "First National Bank (FNB)",
    "Nedbank",
    "Absa Group (Barclays Africa)",
    "Al Rajhi Bank",
    "Emirates NBD",
    "Qatar National Bank (QNB)",

    // Credit Union Banks
    "Navy Federal Credit Union",
    "State Employees’ Credit Union",
    "PenFed Credit Union",
    "Alliant Credit Union",
    "Boeing Employees Credit Union (BECU)",
    "Teachers Credit Union",
    "Community First Credit Union",

    // Regional Banks
    "Regions Bank",
    "SunTrust (Now Truist)",
    "BB&T (Now Truist)",
    "Fifth Third Bank",
    "KeyBank",
    "Huntington National Bank",
    "PNC Bank",
    "Citizens Bank",

    // Military Banks
    "USAA",
    "Armed Forces Bank",
    "Wells Fargo Military Banking",
    "Navy Federal Credit Union",
    "Fort Sill National Bank",

    // Microfinance Banks
    "Grameen Bank",
    "SKS Microfinance (Now Bharat Financial Inclusion)",
    "FINCA International",
    "Accion",
    "Kiva Microfunds",
    "Pro Mujer",
    "MicroEnsure",
    "Fundación Paraguaya",
  ];

  const giftCards = [
    "Amazon Gift Card",
    "iTunes / Apple Gift Card",
    "Google Play Gift Card",
    "Visa Gift Card",
    "Mastercard Gift Card",
    "PayPal Gift Card",
    "Steam Gift Card",
    "Netflix Gift Card",
    "Spotify Gift Card",
    "Walmart Gift Card",
    "Starbucks Gift Card",
    "Target Gift Card",
    "eBay Gift Card",
    "Zalando Gift Card",
    "H&M Gift Card",
    "Nike Gift Card",
    "Best Buy Gift Card",
    "Adobe Gift Card",
    "GameStop Gift Card",
    "Airbnb Gift Card",
    "Uber Gift Card",
    "Google Play Store Gift Card",
    "Apple Store Gift Card",
    "Ticketmaster Gift Card",
    "Macy's Gift Card",
    "Chanel Gift Card",
    "Lush Gift Card",
    "ASOS Gift Card",
    "Disney Gift Card",
    "Discord Gift Card",
    "Minecraft Gift Card",
    "Xbox Gift Card",
    "PlayStation Network Gift Card",
    "Xbox Game Pass Gift Card",
    "Spotify Premium Gift Card",
    "Roblox Gift Card",
    "Nintendo eShop Gift Card",
    "Barnes & Noble Gift Card",
    "Sephora Gift Card",
    "Lego Gift Card",
    "Etsy Gift Card",
    "Uber Eats Gift Card",
    "Chipotle Gift Card",
    "Costco Gift Card",
    "Home Depot Gift Card",
    "Kohl's Gift Card",
    "Old Navy Gift Card",
    "Apple Music Gift Card",
    "Twitch Gift Card",
    "Cinemark Gift Card",
    "Fandango Gift Card",
    "GameFly Gift Card",
    "Bed Bath & Beyond Gift Card",
    "Zara Gift Card",
    "Macy's Gift Card",
    "Krispy Kreme Gift Card",
  ];

  const debitandCreditCards = [
    // General Prepaid Cards
    "Green Dot Prepaid Card",
    "Netspend Prepaid Card",
    "Bluebird by American Express",
    "Serve by American Express",
    "PayPal Prepaid Mastercard",
    "Chime Visa Debit",
    "Venmo Mastercard Debit Card",
    "Cash App Visa Debit Card",
    "SoFi Money Debit Card",
    "Varo Bank Visa Debit Card",

    // Retail & Store-Specific Prepaid Cards
    "Walmart MoneyCard",
    "Target RedCard Prepaid Debit Card",
    "Amazon Reloadable Prepaid Card",

    // Gift & Non-Personalized Prepaid Cards
    "Visa Prepaid Gift Card",
    "Mastercard Prepaid Gift Card",
    "American Express Gift Card",
    "Vanilla Visa Prepaid Card",
    "OneVanilla Prepaid Card",

    // Cryptocurrency-Linked Prepaid Cards
    "Coinbase Visa Debit Card",
    "Crypto.com Visa Card",
    "BitPay Prepaid Mastercard",
    "Wirex Visa Card",
  ];

  const cryptoAssets = [
    "Bitcoin (BTC)",
    "Ethereum (ETH)",
    "Tether (USDT)",
    "USD Coin (USDC)",
    "BNB (BNB)",
    "XRP (XRP)",
    "Cardano (ADA)",
    "Solana (SOL)",
    "Dogecoin (DOGE)",
    "Toncoin (TON)",
    "Shiba Inu (SHIB)",
    "Avalanche (AVAX)",
    "Polkadot (DOT)",
    "Chainlink (LINK)",
    "Litecoin (LTC)",
    "Bitcoin Cash (BCH)",
    "Polygon (MATIC)",
    "TRON (TRX)",
    "Stellar (XLM)",
    "Uniswap (UNI)",
    "Wrapped Bitcoin (WBTC)",
    "Dai (DAI)",
    "Ethereum Classic (ETC)",
    "Filecoin (FIL)",
    "Aptos (APT)",
    "Internet Computer (ICP)",
    "Lido DAO (LDO)",
    "Cronos (CRO)",
    "Render (RNDR)",
    "Arbitrum (ARB)",
    "VeChain (VET)",
    "Optimism (OP)",
    "Maker (MKR)",
    "Sui (SUI)",
    "Monero (XMR)",
    "Kaspa (KAS)",
    "THORChain (RUNE)",
    "Algorand (ALGO)",
    "Tezos (XTZ)",
    "EOS (EOS)",
    "Aave (AAVE)",
    "Fantom (FTM)",
    "Zcash (ZEC)",
    "Neo (NEO)",
    "BitTorrent (BTT)",
    "Gala (GALA)",
    "Injective (INJ)",
    "Stacks (STX)",
    "Flow (FLOW)",
  ];

  const getCurrencies = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data;

      const currencyMap = {};

      countries.forEach((country) => {
        if (country.currencies) {
          for (const [code, { name, symbol }] of Object.entries(
            country.currencies
          )) {
            if (!currencyMap[code]) {
              currencyMap[code] = {
                name: name || "Unknown",
                symbol: symbol || "",
              };
            }
          }
        }
      });

      // Convert to array and sort
      const currencyList = Object.entries(currencyMap)
        .map(([code, details]) => ({
          code,
          name: details.name,
          symbol: details.symbol,
        }))
        .sort((a, b) => a.code.localeCompare(b.code));

      console.log(currencyList);

      setCurrencies(currencyList);
    } catch (error) {
      console.error("Error fetching currency data:", error.message);
    }
  };

  const handleServiceTypeChange = () => {
    if (offerDetails.serviceType === "Online Wallet Transfer") {
      setOfferDetails((prev) => ({
        ...prev,
        service: "",
      }));
      setIsOnlineWallet(true);
      setIsAccount(false);
      setIsGiftCard(false);
      setIsDebitOrCreditCard(false);
      setIsCryptoAsset(false);
    } else if (offerDetails.serviceType === "Direct Bank Transfer") {
      setOfferDetails((prev) => ({
        ...prev,
        service: "",
      }));
      setIsAccount(true);
      setIsOnlineWallet(false);
      setIsGiftCard(false);
      setIsDebitOrCreditCard(false);
      setIsCryptoAsset(false);
    } else if (offerDetails.serviceType === "Gift Card Exchange") {
      setOfferDetails((prev) => ({
        ...prev,
        service: "",
      }));
      setIsGiftCard(true);
      setIsAccount(false);
      setIsOnlineWallet(false);
      setIsDebitOrCreditCard(false);
      setIsCryptoAsset(false);
    } else if (offerDetails.serviceType === "Card-Based Spending") {
      setOfferDetails((prev) => ({
        ...prev,
        service: "",
      }));
      setIsDebitOrCreditCard(true);
      setIsGiftCard(false);
      setIsAccount(false);
      setIsOnlineWallet(false);
      setIsCryptoAsset(false);
    } else if (offerDetails.serviceType === "Crypto Trading") {
      setOfferDetails((prev) => ({
        ...prev,
        service: "",
      }));
      setIsCryptoAsset(true);
      setIsDebitOrCreditCard(false);
      setIsGiftCard(false);
      setIsAccount(false);
      setIsOnlineWallet(false);
    }
  };

  useEffect(() => {
    handleServiceTypeChange();
  }, [offerDetails.serviceType]);

  useEffect(() => {
    if (select.element === "service") {
      setOfferDetails((prev) => ({
        ...prev,
        service: select.pick,
      }));
    } else if (select.element === "currency") {
      setOfferDetails((prev) => ({
        ...prev,
        currency: select.pick,
      }));
    } else if (select.element === "terms") {
      const newTag = select.pick?.trim();

      if (newTag) {
        setOfferDetails((prev) => {
          const current = prev.termTags || [];

          if (current.includes(newTag) || current.length >= 5) {
            return prev; // Do not add if already exists or exceeds limit
          }

          return {
            ...prev,
            termTags: [...current, newTag],
          };
        });
      }
    }
  }, [select]);

  useEffect(() => {
    getCurrencies();
  }, []);

  console.log("select details", select);
  console.log("offer details", offerDetails);
  // console.log(currencies);

  const handleMinLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      minimum: rawValue,
    }));
  };

  const handleMaxLimitChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove all non-digit characters

    setOfferDetails((prev) => ({
      ...prev,
      maximum: rawValue,
    }));
  };

  const handleAddMargine = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      margin: Math.min(21, Number(prev.margin || 0) + 1),
    }));
  };

  const handleMinusMargine = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      margin: Math.max(0, Number(prev.margin || 0) - 1),
    }));
  };

  const handleAddTimeLimit = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      timeLimit: Math.min(65, Number(prev.timeLimit || 0) + 5),
    }));
  };

  const handleMinusTimeLimit = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      timeLimit: Math.max(10, Number(prev.timeLimit || 0) - 5),
    }));
  };

  const handleInstruction = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      instruction: e.target.value,
    }));
  };

  const offerTermTags = [
    "Receipt required",
    "No receipt needed",
    "No third-party",
    "Pay exact amount",
    "Fast payment only",
    "Same bank only",
  ];

  const navigateTo = useNavigate();

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%]">
        <div className="flex flex-col  min-h-svh w-full md:border-x md:border-t md:border-b border-neutral-800 md:mt-[80px] mt-[60px]">
          <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-[17px] text-white font-[700]">
              Create Buy Offer
            </p>
          </div>
          <div className="flex flex-col gap-[0px]">
            {/* Service Type field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-[15px] font-[500]">
                  Select Service Type
                </p>
              </div>
              <div className="flex gap-[15px] flex-wrap">
                {serviceType.map((type, index) => (
                  <p
                    key={index}
                    onClick={() =>
                      setOfferDetails((prev) => ({
                        ...prev,
                        serviceType: type,
                      }))
                    }
                    className={`${
                      offerDetails.serviceType === type
                        ? "bg-tradeGreen text-black border-transparent"
                        : "text-tradeFadeWhite  "
                    } text-[14px] font-[500] py-[6px] px-[10px] w-max rounded-[10px] cursor-pointer border border-tradeAshLight hover:border-tradeAshExtraLight transition-all duration-300`}
                  >
                    {type}
                  </p>
                ))}
              </div>
            </div>
            {/* Service field */}
            <div className="flex flex-col border-b border-tradeAshLight">
              {/*Online Wallet Field */}
              <div
                className={`${
                  isOnlineWallet ? "flex" : "hidden"
                } flex-col gap-[30px] p-[15px]`}
              >
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Select Online Wallet
                  </p>
                </div>

                <div className="relative w-full cursor-pointer ">
                  <input
                    className={`${
                      offerDetails?.service
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                    type="text"
                    readOnly
                    placeholder="Choose wallet"
                    value={offerDetails?.service}
                    onClick={() =>
                      setSelect({
                        ...select,
                        state: true,
                        selectOne: true,
                        selectTwo: false,
                        element: "service",
                        options: onlineWallets,
                      })
                    }
                    onChange={(e) => setOfferDetails.service(e.target.value)}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </div>
              {/*Bank 2 Bank Field */}
              <div
                className={`${
                  isAccount ? "flex" : "hidden"
                } flex-col gap-[30px] p-[15px]`}
              >
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Select Bank Account
                  </p>
                </div>

                <div className="relative w-full cursor-pointer ">
                  <input
                    className={`${
                      offerDetails?.service
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                    type="text"
                    readOnly
                    placeholder="Choose account"
                    value={offerDetails?.service}
                    onClick={() =>
                      setSelect({
                        ...select,
                        state: true,
                        selectOne: true,
                        selectTwo: false,
                        element: "service",
                        options: bankAccounts,
                      })
                    }
                    onChange={(e) => setOfferDetails.service(e.target.value)}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </div>
              {/*Gift Card Field */}
              <div
                className={`${
                  isGiftCard ? "flex" : "hidden"
                } flex-col gap-[30px] p-[15px]`}
              >
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Select Gift Card
                  </p>
                </div>

                <div className="relative w-full cursor-pointer ">
                  <input
                    className={`${
                      offerDetails?.service
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                    type="text"
                    readOnly
                    placeholder="Choose gift card"
                    value={offerDetails?.service}
                    onClick={() =>
                      setSelect({
                        ...select,
                        state: true,
                        selectOne: true,
                        selectTwo: false,
                        element: "service",
                        options: giftCards,
                      })
                    }
                    onChange={(e) => setOfferDetails.service(e.target.value)}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </div>
              {/*Debit & Credit Card Spending Field */}
              <div
                className={`${
                  isDebitOrCreditCard ? "flex" : "hidden"
                } flex-col gap-[30px] p-[15px]`}
              >
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Select Debit or Credit Card
                  </p>
                </div>

                <div className="relative w-full cursor-pointer ">
                  <input
                    className={`${
                      offerDetails?.service
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                    type="text"
                    readOnly
                    placeholder="Choose card"
                    value={offerDetails?.service}
                    onClick={() =>
                      setSelect({
                        ...select,
                        state: true,
                        selectOne: true,
                        selectTwo: false,
                        element: "service",
                        options: debitandCreditCards,
                      })
                    }
                    onChange={(e) => setOfferDetails.service(e.target.value)}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </div>
              {/*Crypto Asset Field */}
              <div
                className={`${
                  isCryptoAsset ? "flex" : "hidden"
                } flex-col gap-[30px] p-[15px]`}
              >
                <div>
                  <p className="text-white text-[15px] font-[500]">
                    Select Crypto Asset
                  </p>
                </div>

                <div className="relative w-full cursor-pointer ">
                  <input
                    className={`${
                      offerDetails?.service
                        ? "border-tradeAshExtraLight"
                        : "border-tradeAshLight"
                    } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                    type="text"
                    readOnly
                    placeholder="Choose asset"
                    value={offerDetails?.service}
                    onClick={() =>
                      setSelect({
                        ...select,
                        selectOne: true,
                        selectTwo: false,
                        state: true,
                        element: "service",
                        options: cryptoAssets,
                      })
                    }
                    onChange={(e) => setOfferDetails.service(e.target.value)}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </div>
            </div>
            {/* Currency Field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-[15px] font-[500]">
                  Select Currency
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={`${
                    offerDetails?.currency?.name
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="Choose a currency"
                  value={
                    offerDetails.currency.code && offerDetails.currency.name
                      ? `${offerDetails.currency.code} — ${offerDetails.currency.name}`
                      : ""
                  }
                  onClick={() =>
                    setSelect({
                      ...select,
                      state: true,
                      selectOne: false,
                      selectTwo: true,
                      element: "currency",
                      options: currencies,
                    })
                  }
                  onChange={(e) => setOfferDetails.service(e.target.value)}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            {/* Limit Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Offer Limit Range
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex w-full md:flex-row flex-col gap-[15px]">
                  <div className="w-full">
                    <div>
                      <p className="text-tradeFadeWhite text-[13px] font-[500]">
                        Minimum
                      </p>
                    </div>
                    <div
                      className={`${
                        offerDetails?.minimum
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                    >
                      <input
                        className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                        type="text"
                        placeholder="0.00"
                        value={
                          offerDetails?.minimum
                            ? Number(offerDetails?.minimum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMinLimitChange(e)}
                      />
                      <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                        <p className="text-[14px] text-white font-[700]">
                          {offerDetails.currency.code &&
                          offerDetails.currency.name
                            ? `${offerDetails.currency.code}`
                            : "- -"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div>
                      <p className="text-tradeFadeWhite text-[13px] font-[500]">
                        Maximum
                      </p>
                    </div>
                    <div
                      className={`${
                        offerDetails?.minimum
                          ? "border-tradeAshExtraLight"
                          : "border-tradeAshLight"
                      } flex mt-[5px] bg-tradeAsh border outline-none w-full rounded-[10px] overflow-hidden cursor-pointer`}
                    >
                      <input
                        className="text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh  outline-none w-full p-[12px]  cursor-pointer"
                        type="text"
                        placeholder="0.00"
                        value={
                          offerDetails?.maximum
                            ? Number(offerDetails?.maximum).toLocaleString()
                            : ""
                        }
                        onChange={(e) => handleMaxLimitChange(e)}
                      />
                      <div className="flex items-center justify-center w-[60px] border-l border-tradeAshLight">
                        <p className="text-[14px] text-white font-[700]">
                          {offerDetails.currency.code &&
                          offerDetails.currency.name
                            ? `${offerDetails.currency.code}`
                            : "- -"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Warning
                    text={
                      "To make this offer visible, you must have at least 50% of the minimum amount you've set available in your wallet."
                    }
                  />
                </div>
              </div>
            </div>
            {/* Rate Margine Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Offer Rate Margine
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex w-full flex-row  gap-[15px]">
                  <div
                    onClick={handleMinusMargine}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      {offerDetails?.margin === 0 ? (
                        <span className="text-red-500">No margin applied</span>
                      ) : offerDetails?.margin > 20 ? (
                        <span className="text-red-500">
                          Margin cannot exceed 20%
                        </span>
                      ) : (
                        <>
                          <span className="font-bold">
                            {offerDetails.margin > 0 ? "+" : ""}
                            {offerDetails.margin}%
                          </span>{" "}
                          profit margin per trade
                        </>
                      )}
                    </p>
                  </div>
                  <div
                    onClick={handleAddMargine}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <div className="">
                  <Info
                    text={
                      "Set a fair and competitive rate margin to attract more traders. Pricing your offer too high may drive potential users away. A well-balanced margin, typically between 2% and 5%, can make your offer more appealing and boost trade activity."
                    }
                  />
                </div>

                <div className="">
                  {/* <p className="text-white text-[13px]">
                    To encourage more users to trade with you, set a competitive
                    and reasonable rate margin. Excessively high margins may
                    discourage potential traders, while fair pricing can
                    significantly increase engagement.
                  </p> */}
                </div>
              </div>
            </div>
            {/*  Time Limit Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Offer Time Limit
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex w-full flex-row gap-[15px]">
                  <div
                    onClick={handleMinusTimeLimit}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex  justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      {offerDetails?.timeLimit < 15 ? (
                        <span className="text-red-500">
                          Limit must be at least 15 minutes
                        </span>
                      ) : offerDetails?.timeLimit > 60 ? (
                        <span className="text-red-500">
                          Limit cannot exceed 60 minutes
                        </span>
                      ) : (
                        <>
                          <span className="font-bold">
                            {offerDetails.timeLimit}
                          </span>{" "}
                          minutes
                        </>
                      )}
                    </p>
                  </div>
                  <div
                    onClick={handleAddTimeLimit}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <Info
                  text={
                    " This is the time limit your trade partner has to make the payment and confirm by clicking paid before the trade is automatically canceled"
                  }
                />
              </div>
            </div>
            {/* Offer Terms Tag Field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-[15px] font-[500]">
                  Offer Terms Tag
                </p>
              </div>

              <div className="flex flex-col gap-[15px]">
                <div
                  className="relative w-full cursor-pointer "
                  onClick={() =>
                    setSelect({
                      ...select,
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      element: "terms",
                      pick: "",
                      options: offerTermTags,
                    })
                  }
                >
                  <div className="">
                    <input
                      className={`${
                        offerDetails?.termTags
                          ? "border-tradeAshLight"
                          : "border-tradeAshLight"
                      } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border hover:border-tradeAshExtraLight outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                      type="text"
                      readOnly
                      placeholder="Select terms"
                    />
                  </div>

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <MdKeyboardArrowDown />
                  </div>
                </div>

                <div
                  className={`${
                    offerDetails?.termTags.length == 0 ? "hidden" : "flex"
                  }  gap-[15px] flex-wrap`}
                >
                  {offerDetails?.termTags.map((tag, index) => (
                    <div className="flex items-center gap-[8px] px-[8px] py-[4px] rounded-[8px] bg-tradeAsh">
                      <p
                        key={index}
                        className="text-[14px] font-medium text-tradeGreen"
                      >
                        {tag}
                      </p>
                      <IoClose
                        className="text-white hover:text-tradeAshExtraLight text-[16px] cursor-pointer transition-all duration-300"
                        onClick={() => {
                          setOfferDetails((prev) => ({
                            ...prev,
                            termTags: prev.termTags.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>

                <Info
                  text={
                    "You can select up to 5 terms or requirements to help clearly communicate the terms of your offer to potential traders."
                  }
                />
              </div>
            </div>
            {/* Trade Instruction field Field */}
            <div className="flex flex-col gap-[30px] p-[15px]">
              <div>
                <p className="text-white text-[15px] font-[500]">
                  Trade Instructions
                </p>
              </div>

              <div className="flex flex-col gap-[15px]">
                <textarea
                  onChange={handleInstruction}
                  className="h-[200px] w-full bg-tradeAsh border border-tradeAshLight rounded-[10px] p-[12px] text-white text-[14px] placeholder-tradeFadeWhite focus:outline-none resize-none"
                  placeholder="Write your trade Instructions here."
                ></textarea>

                <Info
                  text={
                    "Use this field to add any extra Instructions or context that can help ensure a smooth and transparent trade. This could include how quickly you'll respond, reminders to be respectful, or steps sellers should follow during communication. Be clear, helpful, and professional."
                  }
                />
              </div>
            </div>
          </div>
          <div className=" bg-black flex lg:hidden flex-col gap-[15px] p-[15px]">
            <button
              onClick={() => navigateTo("/create-offer/summary")}
              className={` ${
                previewOffer
                  ? "bg-tradeAsh text-tradeGreen"
                  : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
              } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
            >
              <p className="text-[14px] font-[700]">View Summary</p>
            </button>
          </div>
        </div>

        <div className="lg:flex hidden min-h-svh md:mt-[80px] mt-[60px]  lg:w-[520px] w-full border-neutral-800 ">
          <div className=" relative w-full  flex flex-col md:border-r md:border-b md:border-t border-neutral-800">
            <div className="flex flex-col justify-between p-[15px]  border-b border-tradeAshLight w-full">
              <p className="text-[17px] text-white font-[700]">Offer Summary</p>
            </div>

            <div className="p-[15px]">
              <p className="text-white text-[14px]">
                Verify your offer information to set clear terms and support a
                transparent, efficient trade.
              </p>
            </div>

            <div className="flex flex-col gap-[25px] p-[15px] ">
              <div className="flex gap-[15px] items-center bg-tradeAsh border border-neutral-800 lg:px-[15px] md:px-[2.5%] p-[15px] rounded-[10px]">
                <div>
                  <CiBank className="text-tradeOrange text-[36px]" />
                </div>
                <div className="flex-1 flex flex-col gap-[2px] ">
                  <p className="text-[12.5px] text-tradeFadeWhite font-[500]">
                    {offerDetails?.serviceType || "Service Type"}
                  </p>
                  <p className="text-[15px] text-tradeLightGreen font-[600]">
                    {offerDetails?.service || "-- --"}
                  </p>
                </div>
                <div></div>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Currency
                </p>
                <p className="text-tradeLightGreen text-[15px] font-[600]">
                  {offerDetails?.currency?.name
                    ? `${offerDetails.currency.name} - ${offerDetails.currency.code}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-[4px]">
                <p className="text-tradeFadeWhite text-[12.5px] font-[500]">
                  Limit Range
                </p>

                <div className="flex flex-row justify-between">
                  <p className="text-white text-[15px]">Minimum Purchase</p>
                  <p className="text-tradeLightGreen text-[15px] font-[600]">
                    {offerDetails?.minimum !== undefined &&
                    offerDetails?.currency?.code
                      ? `${Number(offerDetails.minimum).toLocaleString()} ${
                          offerDetails.currency.code
                        }`
                      : "N/A"}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-white text-[15px]">Maximum Purchase</p>
                  <p className="text-tradeLightGreen text-[15px] font-[600]">
                    {offerDetails?.maximum !== undefined &&
                    offerDetails?.currency?.code
                      ? `${Number(offerDetails.maximum).toLocaleString()} ${
                          offerDetails.currency.code
                        }`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Profit Margin
                </p>
                <p className="text-white text-[15px] ">
                  Estimated return:{" "}
                  <span className="text-tradeLightGreen font-[600]">
                    {offerDetails?.margin !== undefined
                      ? `${offerDetails.margin}%`
                      : "--"}
                  </span>{" "}
                  per trade
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Payment Window
                </p>
                <p className="text-white text-[15px]">
                  Seller has{" "}
                  <span className="font-[600] text-tradeLightGreen">
                    {offerDetails?.timeLimit !== undefined
                      ? `${offerDetails.timeLimit} minutes`
                      : "--"}
                  </span>{" "}
                  to complete payment
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Term Tags
                </p>
                <div className="grid grid-cols-2 gap-y-1">
                  {offerDetails?.termTags?.length ? (
                    offerDetails.termTags.map((tag, index) => (
                      <p
                        key={index}
                        className="text-[15px] font-[500] text-tradeOrange"
                      >
                        {tag}
                        {index < offerDetails.termTags.length - 1 && ","}
                      </p>
                    ))
                  ) : (
                    <p className="text-tradeFadeWhite text-[15px] font-[500]">
                      No terms specified
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-tradeFadeWhite text-[12.5px] font-medium">
                  Trade Instruction
                </p>
                <div className="">
                  {offerDetails?.instruction ? (
                    <p className="text-white text-[15px]">
                      {offerDetails?.instruction}
                    </p>
                  ) : (
                    <p className="text-tradeFadeWhite text-[15px] font-[500]">
                      No Instructions set yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky top-[60px] bottom-0 bg-black flex flex-col gap-[15px] p-[15px]">
              <div className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300">
                <p className="text-[14px] font-[700] ">Save as Draft</p>
              </div>
              <button
                onClick={() => setPreviewOffer(!previewOffer)}
                className={` ${
                  createOffer
                    ? "bg-tradeAsh text-tradeGreen"
                    : "bg-tradeGreen hover:bg-tradeAsh text-black hover:text-tradeGreen"
                } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
              >
                <p className="text-[14px] font-[700]">Create Offer</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateOffer;
