import React, { useState, useEffect } from "react";
import { useOfferFilter } from "@/context/OfferFilterContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const OfferFilter = ({ handleFilterOffer, select, setSelect }) => {
  const { offerFilter, setOfferFilter } = useOfferFilter();
  const [currencies, setCurrencies] = useState([]);
  const [isOnlineWallet, setIsOnlineWallet] = useState(false);
  const [isDirectBank, setIsDirectBank] = useState(false);
  const [isGiftCard, setIsGiftCard] = useState(false);
  const [isDebitOrCreditCard, setIsDebitOrCreditCard] = useState(false);
  const [isCryptoTrading, setIsCryptoTrading] = useState(false);

  const serviceTypes = [
    "Default",
    "Online Wallet Transfer",
    "Direct Bank Transfer",
    "Gift Card Exchange",
    "Card-Based Spending",
    "Crypto Trading",
  ];

  const wallets = [
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

  const globalBanks = [
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

  const globalGiftCards = [
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

  const handleServiceChange = () => {
    if (offerFilter?.serviceType === "Online Wallet Transfer") {
      setIsOnlineWallet(true);
      setIsDirectBank(false);
      setIsGiftCard(false);
      setIsDebitOrCreditCard(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    } else if (offerFilter?.serviceType === "Direct Bank Transfer") {
      setIsDirectBank(true);
      setIsOnlineWallet(false);
      setIsGiftCard(false);
      setIsDebitOrCreditCard(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    } else if (offerFilter?.serviceType === "Gift Card Exchange") {
      setIsGiftCard(true);
      setIsDirectBank(false);
      setIsOnlineWallet(false);
      setIsDebitOrCreditCard(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    } else if (offerFilter?.serviceType === "Card-Based Spending") {
      setIsDebitOrCreditCard(true);
      setIsGiftCard(false);
      setIsDirectBank(false);
      setIsOnlineWallet(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    } else if (offerFilter?.serviceType === "Crypto Trading") {
      setIsCryptoTrading(true);
      setIsDebitOrCreditCard(false);
      setIsGiftCard(false);
      setIsDirectBank(false);
      setIsOnlineWallet(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    } else if (offerFilter?.serviceType === "Default") {
      setIsCryptoTrading(false);
      setIsDebitOrCreditCard(false);
      setIsGiftCard(false);
      setIsDirectBank(false);
      setIsOnlineWallet(false);
      setOfferFilter((prev) => ({
        ...prev,
        service: "",
      }));
    }
  };

  useEffect(() => {
    handleServiceChange();
  }, [offerFilter?.serviceType]);

  const getCurrencies = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data;

      const currencyMap = {};

      countries.forEach((country) => {
        if (country.currencies) {
          for (const [code, currencyData] of Object.entries(
            country.currencies
          )) {
            if (!currencyMap[code]) {
              currencyMap[code] = {
                name: currencyData.name || "Unknown",
                symbol: currencyData.symbol || "",
              };
            }
          }
        }
      });

      // Convert the map to an array and sort by currency code
      const currencyList = Object.entries(currencyMap)
        .map(([code, { name, symbol }]) => ({
          code,
          name,
          symbol,
        }))
        .sort((a, b) => a.code.localeCompare(b.code)); // <- safe because `code` is a string

      console.log(currencyList); // Optional: view in console
      setCurrencies(currencyList);
    } catch (error) {
      console.error("Error fetching currency data:", error.message);
    }
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (!isNaN(rawValue)) {
      setOfferFilter((prev) => ({
        ...prev,
        amount: rawValue,
      }));
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    if (select?.page === "marketplace" && select?.element === "service type") {
      setOfferFilter((prev) => ({
        ...prev,
        serviceType: select.pick,
      }));
    } else if (
      select?.page === "marketplace" &&
      select?.element === "online wallets"
    ) {
      setOfferFilter((prev) => ({
        ...prev,
        service: select.pick,
      }));
    } else if (
      select?.page === "marketplace" &&
      select?.element === "bank accounts"
    ) {
      setOfferFilter((prev) => ({
        ...prev,
        service: select.pick,
      }));
    } else if (
      select?.page === "marketplace" &&
      select?.element === "gift cards"
    ) {
      setOfferFilter((prev) => ({
        ...prev,
        service: select.pick,
      }));
    } else if (
      select?.page === "marketplace" &&
      select?.element === "debit or credit cards"
    ) {
      setOfferFilter((prev) => ({
        ...prev,
        service: select.pick,
      }));
    } else if (select?.page === "marketplace" && select?.element === "currency")
      setOfferFilter((prev) => ({
        ...prev,
        currency: {
          code: select?.pick?.code,
          name: select?.pick?.name,
        },
      }));
  }, [select]);

  console.log(select);
  console.log(offerFilter);

  const handleCloseFilter = () => {
    setOfferFilter((prev) => ({
      ...prev,
      showFilter: false,
    }));
  };

  const handleClearFilter = () => {
    setOfferFilter({
      serviceType: "Default",
      service: "",
      currency: { code: "", name: "" },
      amount: "",
      allOffers: true,
      onlineOffers: false,
      bestMargin: false,
      topFeedBack: false,
      mostTrusted: false,
      clearFilter: true,
      showFilter: true,
      isFiltering: true,
    });
  };

  useEffect(() => {
    handleFilterOffer();

    setOfferFilter((prev) => ({
      ...prev,
      clearFilter: false,
      isFiltering: false,
    }));
  }, [offerFilter.clearFilter]);

  return (
    <div className="bg-black overflow-hidden w-full h-full flex flex-col md:border md:border-t-0 border-neutral-800">
      <div className="flex  justify-between items-center lg:px-[15px] md:px-[2.5%] p-[15px] border-b border-neutral-800 ">
        <p className="text-lg text-white font-[700] cursor-pointer">
          Filter Offers
        </p>

        <div className="flex items-center gap-[10px]">
          <div
            onClick={handleCloseFilter}
            className=" flex md:hidden items-center gap-1 px-[12px] py-[4px] text-tradeOrange text-[10px] font-[600] rounded-[6.5px] border border-tradeOrange hover:border-tradeOrange cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
          >
            <IoClose className="text-sm" />
          </div>

          <div
            onClick={handleClearFilter}
            className=" md:flex hidden items-center gap-1 px-[12px] py-1  text-red-600 text-xs font-[600] rounded-[6.5px] border border-tradeAshLight hover:border-red-600 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]"
          >
            <p>Clear Filter</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col  h-full overflow-auto custom-scrollbar">
        <div className="flex flex-col justify-between ">
          {/* Service Type field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px] border-b border-tradeAshLight">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Service Type
              </p>
            </div>

            <div className="bg-tra relative w-full cursor-pointer ">
              <input
                className={` ${
                  offerFilter?.serviceType
                    ? "border-tradeAshExtraLight"
                    : "border-tradeAshLight "
                }  bg-tradeAsh mt-[5px] text-sm text-white placeholder:text-tradeFadeWhite font-[500] border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                type="text"
                readOnly
                value={
                  offerFilter?.serviceType === ""
                    ? "Default"
                    : offerFilter?.serviceType
                }
                onClick={() =>
                  setSelect({
                    state: true,
                    selectOne: true,
                    selectTwo: false,
                    page: "marketplace",
                    element: "service type",
                    options: serviceTypes,
                    pick: "",
                  })
                }
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                <MdKeyboardArrowDown />
              </div>
            </div>
          </div>

          {/* Service field */}
          <div>
            <div
              className={`${
                isOnlineWallet ? "flex" : "hidden"
              }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
            >
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  Select Online Wallet
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={` ${
                    offerFilter?.service
                      ? "border-tradeAshExtraLight text-tradeGreen"
                      : "border-tradeAshLight text-white"
                  } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={offerFilter?.service}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "marketplace",
                      element: "online wallets",
                      options: wallets,
                    })
                  }
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div
              className={`${
                isDirectBank ? "flex" : "hidden"
              }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
            >
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  Select Bank Account
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={` ${
                    offerFilter?.service
                      ? "border-tradeAshExtraLight text-tradeGreen"
                      : "border-tradeAshLight text-white"
                  } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={offerFilter?.service}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "marketplace",
                      element: "bank accounts",
                      options: globalBanks,
                    })
                  }
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div
              className={`${
                isGiftCard ? "flex" : "hidden"
              }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
            >
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  Select Gift Card
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={` ${
                    offerFilter?.service
                      ? "border-tradeAshExtraLight text-tradeGreen"
                      : "border-tradeAshLight text-white"
                  } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={offerFilter?.service}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "marketplace",
                      element: "gift cards",
                      options: globalGiftCards,
                    })
                  }
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div
              className={`${
                isDebitOrCreditCard ? "flex" : "hidden"
              }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
            >
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  Select Debit or Credit Card
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={` ${
                    offerFilter?.service
                      ? "border-tradeAshExtraLight text-tradeGreen"
                      : "border-tradeAshLight text-white"
                  } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={offerFilter?.service}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "marketplace",
                      element: "debit or credit cards",
                      options: debitandCreditCards,
                    })
                  }
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            <div
              className={`${
                isCryptoTrading ? "flex" : "hidden"
              }  flex-col lg:px-[15px] md:px-[2.5%] p-[15px] gap-[20px] border-b border-tradeAshLight`}
            >
              <div>
                <p className="text-tradeFadeWhite text-sm font-[500]">
                  Select Crypto Asset
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={` ${
                    offerFilter?.service
                      ? "border-tradeAshExtraLight text-tradeGreen"
                      : "border-tradeAshLight text-white"
                  } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="-- --"
                  value={offerFilter?.service}
                  onClick={() =>
                    setSelect({
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      page: "marketplace",
                      element: "crypto assets",
                      options: debitandCreditCards,
                    })
                  }
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
          </div>

          {/* currency field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px] border-b border-tradeAshLight">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Select Currency
              </p>
            </div>

            <div
              className={` ${
                offerFilter?.currency?.name
                  ? "border-tradeAshExtraLight text-tradeGreen"
                  : "border-tradeAshLight text-white"
              } relative flex mt-[5px] text-sm placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full rounded-[10px] cursor-pointer`}
              onClick={() =>
                setSelect({
                  state: true,
                  selectOne: false,
                  selectTwo: true,
                  page: "marketplace",
                  element: "currency",
                  options: currencies,
                })
              }
            >
              <input
                className="w-full p-[12px] outline-none bg-transparent text-tradeOrange text-sm font-[500] placeholder:text-tradeFadeWhite cursor-pointer"
                placeholder="-- --"
                type="text"
                readOnly
                value={offerFilter?.currency?.name}
              />

              <div className=" absolute right-1.5 top-1/2 -translate-y-1/2  border  border-tradeAshLight flex justify-between items-center px-[10px] lg:h-[30px] h-[35px] rounded-[6px]">
                <div>
                  <input
                    className="w-[43px] text-sm  text-tradeOrange placeholder:text-tradeFadeWhite font-[500] bg-transparent outline-none cursor-pointer"
                    type="text"
                    value={offerFilter?.currency?.code}
                    readOnly
                    placeholder="$€£"
                  />
                </div>
                <MdKeyboardArrowDown className="text-[17px] text-white" />
              </div>
            </div>
          </div>

          {/* amount field */}
          <div className="flex flex-col gap-[20px] lg:px-[15px] md:px-[2.5%] p-[15px]">
            <div>
              <p className="text-tradeFadeWhite text-sm font-[500]">
                Enter Amount
              </p>
            </div>

            <div className="relative w-full cursor-pointer ">
              <input
                className={` ${
                  offerFilter?.amount
                    ? "border-tradeAshExtraLight text-white"
                    : "border-tradeAshLight text-white"
                } mt-[5px] text-sm  placeholder:text-tradeFadeWhite font-[600] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                type="text"
                placeholder="00.00"
                value={
                  offerFilter?.amount
                    ? Number(offerFilter?.amount).toLocaleString()
                    : ""
                }
                onChange={handleAmountChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] border-t border-tradeAshLight  lg:px-[15px] py-[15px] md:px-[2.5%] px-[15px]">
        <div
          onClick={handleFilterOffer}
          className="flex items-center justify-between bg-tradeGreen hover:bg-white md:p-[10px] w-full py-[14px] px-[12px] rounded-[8px] cursor-pointer duration-300 transition-all"
        >
          <p className="font-[700] text-base ">
            {offerFilter?.isFiltering ? "Filtering..." : "Apply Filter"}
          </p>
          <TbReload
            className={`text-[20px] transition-transform ${
              offerFilter?.isFiltering ? "animate-spin" : ""
            }`}
          />
        </div>

        <div
          onClick={handleClearFilter}
          className="flex lg:hidden items-center justify-between bg-transparent border border-tradeAshLight hover:border-red-600 md:p-[10px] w-full py-[14px] px-[12px] rounded-[8px] cursor-pointer duration-300 transition-all"
        >
          <p className="font-[600] text-base text-red-600">Clear Filter</p>
        </div>
      </div>
    </div>
  );
};

export default OfferFilter;
