import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";

import axios from "axios";

const OfferFilter = ({
  setServiceType,
  serviceType,
  accountType,
  setAccountType,
  walletType,
  setWaletType,
  giftCardType,
  setGiftCardType,
  debitCreditCardType,
  setDebitCreditCardType,
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  setVerifiedOffer,
  setActiveTraders,
  handleFindOffer,
}) => {
  const [showServiceType, setShowServiceType] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showAccountType, setShowAccounType] = useState(false);
  const [showWallet, setShowWallet] = useState(true);
  const [showWalletType, setShowWalletType] = useState(false);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [showGiftCardType, setShowGiftCardType] = useState(false);
  const [showDebitCreditCard, setShowDebitCreditCard] = useState(false);
  const [showDebitCreditCardType, setShowDebitCreditCardType] = useState(false);
  const [accountSearchInput, setAccountSearchInput] = useState("");
  const [walletSearchInput, setWalletSearchInput] = useState("");
  const [giftCardSearchInput, setGiftCardSearchInput] = useState("");
  const [debitCreditSearchInput, setDebitCreditCardSearchInput] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [currrencySearchInput, setCurrrencySearchInput] = useState("");
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);

  const handleVerifiedOffersChange = (event) => {
    setVerifiedOffer(event.target.checked);
  };

  const handleActiveTraderChange = (event) => {
    setActiveTraders(event.target.checked);
  };

  const services = [
    "Online Wallet Transfer",
    "Bank Transfer",
    "Gift Cards Exchange",
    "Debit/Credit Cards",
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

  const handleServiceTypeChange = (service) => {
    setServiceType(service);
    setShowServiceType(false);
  };

  const handleSeletedWallet = (wallet) => {
    setWaletType(wallet);
    setShowWalletType(false);
    setWalletSearchInput("");
  };

  const handleSeletedAccount = (bank) => {
    setAccountType(bank);
    setShowAccounType(false);
    setAccountSearchInput("");
  };

  const handleSeletedGiftCard = (giftCard) => {
    setGiftCardType(giftCard);
    setShowGiftCardType(false);
    setGiftCardSearchInput("");
  };

  const handleSeletedDebitCreditCard = (debitCreditCard) => {
    setDebitCreditCardType(debitCreditCard);
    setShowDebitCreditCardType(false);
    setDebitCreditCardSearchInput("");
  };

  const handleServiceChange = () => {
    if (serviceType === "Online Wallet Transfer") {
      setShowWallet(true);
      setShowAccount(false);
      setAccountType("");
      setShowGiftCard(false);
      setGiftCardType("");
      setShowDebitCreditCard(false);
      setDebitCreditCardType("");
    } else if (serviceType === "Bank Transfer") {
      setShowAccount(true);
      setShowWallet(false);
      setWaletType("");
      setShowGiftCard(false);
      setGiftCardType("");
      setShowDebitCreditCard(false);
      setDebitCreditCardType("");
    } else if (serviceType === "Gift Cards Exchange") {
      setShowGiftCard(true);
      setShowAccount(false);
      setAccountType("");
      setShowWallet(false);
      setWaletType("");
      setShowDebitCreditCard(false);
      setDebitCreditCardType("");
    } else if (serviceType === "Debit/Credit Cards Spending") {
      setShowDebitCreditCard(true);
      setShowGiftCard(false);
      setGiftCardType("");
      setShowAccount(false);
      setAccountType("");
      setShowWallet(false);
      setWaletType("");
    }
  };

  const handleSelectedCurrency = (code, name) => {
    setSelectedCurrency({ code, name }); // Store both code & name
    setShowCurrencyOptions(false);
    setCurrrencySearchInput("");
  };

  const getCurrencies = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate.host/list?access_key=a5d669ce99aa855e99ab16626cad67b6"
      );
      console.log(" currency line 18", response); // Logs all currencies
      setCurrencies(response.data.currencies);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for processing
    if (!isNaN(rawValue)) {
      setAmount(rawValue);
    }
  };

  useEffect(() => {
    handleServiceChange();
  }, [serviceType]);

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div className="lg:sticky w-full lg:h-[480px] lg:overflow-y-auto justify-between top-[87px] flex flex-col gap-[43px] lg:p-[10px] rounded-[8px] bg-tradeAsh">
      <div className="flex flex-col gap-[14px]">
        <div className="flex flex-col gap-[10px]">
          <div
            onClick={() => setShowServiceType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[44px] gap-[10px]  -neutral-700 rounded-[6px] cursor-pointer"
          >
            <input
              className="w-full h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400 cursor-pointer"
              placeholder="Service type"
              type="text"
              value={serviceType}
              readOnly
            />
            <div className="w-[px] flex justify-between items-center px-[10px] h-[30px] rounded-[3px]">
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showServiceType ? "flex" : "hidden"
            } flex-col gap-[5px] p-[10px] bg-tradeAshLight rounded-[8px]  -neutral-700`}
          >
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceTypeChange(service)}
                className="px-[10px] py-[10px] hover:bg-tradeAshExtraLight rounded-[5px]  cursor-pointer"
              >
                <p className="text-white text-[14px] ">{service}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${showAccount ? "flex" : "hidden"} flex-col gap-[14px]`}
        >
          <div
            onClick={() => setShowAccounType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[43px] gap-[20px]  -neutral-700 rounded-[4px] cursor-pointer"
          >
            <input
              className="w-full  h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400 cursor-pointer"
              placeholder="Select Account"
              type="text"
              value={accountType}
              readOnly
            />
            <div className="w-[px] flex justify-between items-center px-[10px] h-[30px] rounded-[3px]">
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showAccountType ? "flex" : "hidden"
            } flex-col gap-[14px] p-[10px] bg-tradeAshLight rounded-[8px]  -neutral-700`}
          >
            <div className="flex h-[43px] rounded-[5px] px-[14px] py-[5px] gap-[20px] items-center  -neutral-700">
              <input
                className="outline-none -none  h-[30px] text-white text-[14px] placeholder:text-zinc-400 w-full bg-transparent"
                type="text"
                placeholder="Search account..."
                value={accountSearchInput}
                onChange={(e) => setAccountSearchInput(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto ">
              {accountSearchInput ? (
                <div className=" max-h-[243px] flex flex-col gap-[10px]">
                  {globalBanks
                    .filter((bank) =>
                      bank
                        .toLowerCase()
                        .includes(accountSearchInput.toLowerCase())
                    )
                    .map((bank, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedAccount(bank)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{bank}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-[243px] flex flex-col gap-[10px]">
                  {globalBanks
                    .sort((a, b) => a.localeCompare(b)) // Correct sorting logic
                    .map((bank, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedAccount(bank)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{bank}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${showWallet ? "flex" : "hidden"} flex-col gap-[10px]`}
        >
          <div
            onClick={() => setShowWalletType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[43px] gap-[20px]  -neutral-700 rounded-[4px] cursor-pointer"
          >
            <input
              className="w-full  h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400 cursor-pointer"
              placeholder="Select Wallet"
              type="text"
              value={walletType}
              readOnly
            />
            <div className="w-[px] flex justify-between items-center px-[10px] h-[30px] rounded-[3px]">
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showWalletType ? "flex" : "hidden"
            } flex-col gap-[10px] p-[10px] bg-tradeAshLight rounded-[8px]  -neutral-700`}
          >
            <div className="flex h-[43px] rounded-[5px] px-[14px] py-[5px] gap-[20px] items-center  -neutral-700">
              <input
                className="outline-none -none  h-[30px] text-white text-[14px] placeholder:text-zinc-400 w-full bg-transparent"
                type="text"
                placeholder="Search wallet..."
                value={walletSearchInput}
                onChange={(e) => setWalletSearchInput(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto ">
              {walletSearchInput ? (
                <div className=" max-h-[243px] flex flex-col gap-[10px]">
                  {wallets
                    .filter((wallet) =>
                      wallet
                        .toLowerCase()
                        .includes(walletSearchInput.toLowerCase())
                    )
                    .map((wallet, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedWallet(wallet)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{wallet}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-[243px] flex flex-col gap-[10px]">
                  {wallets
                    .sort((a, b) => a.localeCompare(b)) // Correct sorting logic
                    .map((wallet, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedWallet(wallet)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{wallet}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${showGiftCard ? "flex" : "hidden"} flex-col gap-[10px]`}
        >
          <div
            onClick={() => setShowGiftCardType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[43px] gap-[20px]  -neutral-700 rounded-[4px] cursor-pointer"
          >
            <input
              className="w-full h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400 cursor-pointer"
              placeholder="Select Gift Card"
              type="text"
              value={giftCardType}
              readOnly
            />
            <div className="w-[px] flex justify-between items-center px-[10px] h-[30px] rounded-[3px]">
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showGiftCardType ? "flex" : "hidden"
            } flex-col gap-[10px] p-[10px] bg-tradeAshLight rounded-[8px]  -neutral-700`}
          >
            <div className="flex h-[43px] rounded-[5px] px-[14px] py-[5px] gap-[20px] items-center  -neutral-700">
              <input
                className="outline-none -none  h-[30px] text-white text-[14px] placeholder:text-zinc-400 w-full bg-transparent"
                type="text"
                placeholder="Search gift card..."
                value={giftCardSearchInput}
                onChange={(e) => setGiftCardSearchInput(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto ">
              {giftCardSearchInput ? (
                <div className=" max-h-[243px] flex flex-col gap-[10px]">
                  {globalGiftCards
                    .filter((giftCard) =>
                      giftCard
                        .toLowerCase()
                        .includes(walletSearchInput.toLowerCase())
                    )
                    .map((giftCard, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedGiftCard(giftCard)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{giftCard}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-[243px] flex flex-col gap-[10px]">
                  {globalGiftCards
                    .sort((a, b) => a.localeCompare(b)) // Correct sorting logic
                    .map((giftCard, index) => (
                      <div
                        key={index}
                        onClick={() => handleSeletedGiftCard(giftCard)}
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">{giftCard}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            showDebitCreditCard ? "flex" : "hidden"
          } flex-col gap-[10px]`}
        >
          <div
            onClick={() => setShowDebitCreditCardType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[43px] gap-[20px]  -neutral-700 rounded-[4px] cursor-pointer"
          >
            <input
              className="w-full  h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400 cursor-pointer"
              placeholder="Select Credit/Debit Card"
              type="text"
              value={debitCreditCardType}
              readOnly
            />
            <div className="w-[px] flex justify-between items-center px-[10px] h-[30px] rounded-[3px]">
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showDebitCreditCardType ? "flex" : "hidden"
            } flex-col gap-[10px] p-[10px] bg-tradeAshLight rounded-[8px]  -neutral-700`}
          >
            <div className="flex h-[43px] rounded-[5px] px-[14px] py-[5px] gap-[20px] items-center  -neutral-700">
              <input
                className="outline-none -none  h-[30px] text-white text-[14px] placeholder:text-zinc-400 w-full bg-transparent"
                type="text"
                placeholder="Search credit/debit card..."
                value={debitCreditSearchInput}
                onChange={(e) => setDebitCreditCardSearchInput(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto ">
              {debitCreditSearchInput ? (
                <div className=" max-h-[243px] flex flex-col gap-[10px]">
                  {debitandCreditCards
                    .filter((debitCreditCard) =>
                      debitCreditCard
                        .toLowerCase()
                        .includes(debitCreditSearchInput.toLowerCase())
                    )
                    .map((debitCreditCard, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleSeletedDebitCreditCard(debitCreditCard)
                        }
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">
                          {debitCreditCard}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-[243px] flex flex-col gap-[10px]">
                  {debitandCreditCards
                    .sort((a, b) => a.localeCompare(b)) // Correct sorting logic
                    .map((debitCreditCard, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleSeletedDebitCreditCard(debitCreditCard)
                        }
                        className="px-[10px] py-[10px] mr-[10px] hover:bg-tradeAshExtraLight  rounded-[5px] cursor-pointer"
                      >
                        <p className="text-white text-[14px]">
                          {debitCreditCard}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div
            // onClick={() => setShowWalletType((prev) => !prev)}
            className="flex bg-tradeAshLight items-center pl-[10px] pr-[7px] h-[44px] gap-[20px]  -neutral-700 rounded-[6px] cursor-pointer"
          >
            <input
              className="w-full h-[30px] -none outline-none bg-transparent text-white text-[14px] placeholder:text-neutral-400"
              placeholder="Enter amount"
              type="text"
              value={amount ? Number(amount).toLocaleString() : ""}
              onChange={handleAmountChange}
            />
            <div
              className="w-[px] border  border-neutral-700 flex justify-between items-center px-[10px] h-[30px] rounded-[4px]"
              onClick={() => setShowCurrencyOptions((prev) => !prev)}
            >
              <div>
                <input
                  className="w-[43px] text-[14px] text-white placeholder:text-neutral-500 font-[600] bg-transparent outline-none cursor-pointer"
                  type="text"
                  value={selectedCurrency?.code}
                  readOnly
                  placeholder="$€£"
                />
              </div>
              <MdKeyboardArrowDown className="text-[25px] text-neutral-400" />
            </div>
          </div>
          <div
            className={` ${
              showCurrencyOptions ? "flex" : "hidden"
            } flex-col gap-[20px] p-[10px] bg-tradeAshLight rounded-[8px] `}
          >
            <div className="flex h-[43px] px-[10px] py-[4px] gap-[20px] items-center  border border-neutral-700 rounded-[8px]">
              <FaMagnifyingGlass className="text-[20px] text-neutral-400" />
              <input
                className="outline-none -none h-[30px] text-white text-[14px] placeholder:text-zinc-400 w-full bg-transparent"
                type="text"
                placeholder="Search your currency..."
                value={currrencySearchInput}
                onChange={(e) => setCurrrencySearchInput(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto">
              {currrencySearchInput ? (
                <div className="flex flex-col max-h-[230px] gap-[5px] mr-[10px]">
                  {Object.entries(currencies)
                    .filter(([code, name]) =>
                      name
                        .toLowerCase()
                        .includes(currrencySearchInput.toLowerCase())
                    )

                    .map(
                      (
                        [code, name] // Correct map placement
                      ) => (
                        <div
                          className="flex gap-[5px] justify-between px-[10px] py-[10px] hover:bg-tradeAshExtraLight rounded-[5px]"
                          onClick={() => handleSelectedCurrency(code, name)}
                          key={code}
                        >
                          <p className="text-white text-[14px] cursor-pointer ">
                            {name}
                          </p>
                          <p className="text-white text-[14px] cursor-pointer  ">
                            {code}
                          </p>
                        </div>
                      )
                    )}
                </div>
              ) : (
                <div className=" flex flex-col h-[230px] gap-[5px] mr-[10px]">
                  {Object.entries(currencies)
                    .sort((a, b) => a[1].localeCompare(b[1])) // Sort by currency name
                    .map(([code, name]) => (
                      <div
                        className="flex gap-[5px] justify-between px-[10px] py-[10px] hover:bg-tradeAshExtraLight rounded-[5px]"
                        onClick={() => handleSelectedCurrency(code, name)}
                        key={code}
                      >
                        <p className="text-white text-[14px] cursor-pointer ">
                          {name}
                        </p>
                        <p className="text-white text-[14px] cursor-pointer  ">
                          {code}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <p className="font-[600] text-white lg:text-[15px] text-[16px]">
              Recently active traders
            </p>
            <FaRegQuestionCircle className="text-neutral-500 lg:text-[16px] text-[18px]" />
          </div>
          <input
            className="lg:w-[20px] w-[25px] lg:h-[14px] h-[18px]"
            type="checkbox"
            onChange={handleActiveTraderChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <p className="font-[600] text-white lg:text-[15px] text-[16px]">
              Verified offers
            </p>
            <FaRegQuestionCircle className="text-neutral-500 lg:text-[16px] text-[18px]" />
          </div>
          <input
            className=" lg:w-[20px] w-[25px] lg:h-[14px] h-[18px]"
            type="checkbox"
            onChange={handleVerifiedOffersChange}
          />
        </div>
      </div>
      <div
        className="flex items-center justify-between h-[43px] bg-tradeGreen p-[10px] rounded-[6px] cursor-pointer"
        onClick={() => handleFindOffer()}
      >
        <p className="font-[600] text-[15px]">Find Offers</p>
        <TbReload className="text-[20px]" />
      </div>
    </div>
  );
};

export default OfferFilter;
