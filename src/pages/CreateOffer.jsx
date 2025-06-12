import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { CiBank } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";
import { IoCardOutline } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { useToast } from "@/context/ToastContext";
import { publish } from "@/utils/offer/publish";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const CreateOffer = () => {
  const { select, setSelect } = useSelectElement();
  const { offerDetails, setOfferDetails } = useCreateOfferDetails();
  const { currencies } = useCurrencies();
  const [isOnlineWallet, setIsOnlineWallet] = useState(true);
  const [isAccount, setIsAccount] = useState(false);
  const [isGiftCard, setIsGiftCard] = useState(false);
  const [isDebitOrCreditCard, setIsDebitOrCreditCard] = useState(false);
  const [isCryptoAsset, setIsCryptoAsset] = useState(false);
  const { rateInfo } = useExchangeRate(
    offerDetails.currency.code ? offerDetails.currency.code : "USD",
    "NGN",
    offerDetails?.margin
  );
  const { toast, setToast } = useToast();

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

  console.log(rateInfo);

  //handing service field change when service type changes
  const handleServiceTypeChange = () => {
    if (offerDetails.serviceType === "Online Wallet Transfer") {
      setOfferDetails((prev) => ({
        ...prev,
        serviceTypeIcon: "IoWalletOutline",
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
        serviceTypeIcon: "CiBank",
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
        serviceTypeIcon: "HiOutlineGift",
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
        serviceTypeIcon: "IoCardOutline",
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
        serviceTypeIcon: "GiTwoCoins",
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

  // Updating create offer state
  useEffect(() => {
    if (select?.page !== "create offer" || !select?.element || !select?.pick)
      return;

    const pick = select.pick;

    switch (select.element) {
      case "service type":
      case "service":
        if (typeof pick === "string") {
          setOfferDetails((prev) => ({
            ...prev,
            [select.element === "service type" ? "serviceType" : "service"]:
              pick,
          }));
        }
        break;

      case "currency":
        if (typeof pick === "object" && pick.code && pick.name) {
          setOfferDetails((prev) => ({
            ...prev,
            currency: pick,
          }));
        }
        break;

      case "terms":
        if (typeof pick === "string") {
          const newTag = pick.trim();
          if (newTag) {
            setOfferDetails((prev) => {
              const current = prev.termTags || [];
              if (current.includes(newTag) || current.length >= 5) return prev;
              return {
                ...prev,
                termTags: [...current, newTag],
              };
            });
          }
        }
        break;

      default:
        break;
    }
  }, [select]);

  // Reset offer details on page load unless coming from the summary page
  const location = useLocation();
  const prevLocationRef = useRef(null);

  useEffect(() => {
    const prevPath = prevLocationRef.current;

    // Only reset if the previous page was NOT the summary
    if (prevPath !== "/offers/create/summary") {
      setOfferDetails(offerDetails);
    }

    // Always update the previous path
    prevLocationRef.current = location.pathname;
  }, [location.pathname]);

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

  const handleAddMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.margin || 0);
      const next = current + 1;
      return {
        ...prev,
        margin: next > 80 ? 80 : next,
      };
    });
  };

  const handleMinusMargin = () => {
    setOfferDetails((prev) => {
      const current = Number(prev.margin || 0);
      const next = current - 1;
      return {
        ...prev,
        margin: next < 4 ? 4 : next,
      };
    });
  };

  const handleAddPaymentWindow = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      paymentWindow: Math.min(24, Number(prev.paymentWindow || 0) + 1),
    }));
  };

  const handleMinusPaymentWindow = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      paymentWindow: Math.max(1, Number(prev.paymentWindow || 0) - 1),
    }));
  };

  const handleAddConfirmationTime = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      confirmationTime: Math.min(24, Number(prev.confirmationTime || 0) + 1),
    }));
  };

  const handleMinusConfirmationTime = (e) => {
    setOfferDetails((prev) => ({
      ...prev,
      confirmationTime: Math.max(1, Number(prev.confirmationTime || 0) - 1),
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

  const serviceTypeIcons = {
    "Online Wallet Transfer": IoWalletOutline,
    "Direct Bank Transfer": CiBank,
    "Gift Card Exchange": HiOutlineGift,
    "Card-Based Spending": IoCardOutline,
    "Crypto Trading": GiTwoCoins,
  };

  // Get the icon component based on the full service type
  const IconComponent = serviceTypeIcons[offerDetails?.serviceType];

  const navigateTo = useNavigate();

  const handlepublish = async () => {
    const result = await publish(offerDetails);

    if (result.success) {
      console.log("Offer published:", result.data);
      setToast({
        ...toast,
        success: true,
        errorSuccess: result.data,
      });
    } else {
      console.error("Publish failed:", result.error);
      setToast({
        ...toast,
        error: true,
        errorMessage: result.error,
      });
    }
  };

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col bg-black lg:px-[2%] md:px-[2.5%] pt-[60px] md:pt-[80px]">
        {/* Main Page */}
        <div className="flex flex-col  min-h-svh w-full md:border-x md:border-t md:border-b border-neutral-800 ">
          {/* Heading */}
          <div className="flex flex-col justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-[17px] text-white font-[700]">
              Create Buy Offer
            </p>
          </div>
          {/* Sub Heading */}
          <div className="px-4 py-2">
            <p className="text-tradeFadeWhite text-[14px]">
              Fill in the details to define your offer with service type,
              service, pricing, limits, trade terms and instructions.
            </p>
          </div>
          {/* Offer Creation Field */}
          <div className="flex flex-col gap-[0px]">
            {/* Service Type field */}
            <div className="flex flex-col gap-[30px] p-[15px] border-b border-tradeAshLight">
              <div>
                <p className="text-white text-[15px] font-[500]">
                  Select Service Type
                </p>
              </div>

              <div className="relative w-full cursor-pointer ">
                <input
                  className={`${
                    offerDetails?.serviceType
                      ? "border-tradeAshExtraLight"
                      : "border-tradeAshLight"
                  } mt-[5px] text-[14px] text-white placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="Choose wallet"
                  value={offerDetails?.serviceType}
                  onClick={() =>
                    setSelect({
                      ...select,
                      state: true,
                      selectOne: true,
                      selectTwo: false,
                      element: "service type",
                      options: serviceType,
                      pick: "",
                      page: "create offer",
                    })
                  }
                  onChange={(e) => setOfferDetails.serviceType(e.target.value)}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            {/* Service fields */}
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
                    } mt-[5px] text-[14px] text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                        pick: "",
                        page: "create offer",
                      })
                    }
                    // onChange={(e) => setOfferDetails.service(e.target.value)}
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
                    } mt-[5px] text-[14px] text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                        pick: "",
                        page: "create offer",
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
                    } mt-[5px] text-[14px] text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                        pick: "",
                        page: "create offer",
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
                    } mt-[5px] text-[14px] text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                        pick: "",
                        page: "create offer",
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
                    } mt-[5px] text-[14px] text-tradeGreen placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
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
                        pick: "",
                        page: "create offer",
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
                  } mt-[5px] text-[14px] text-tradeOrange placeholder:text-tradeFadeWhite font-[500] bg-tradeAsh border outline-none w-full p-[12px] rounded-[10px] cursor-pointer`}
                  type="text"
                  readOnly
                  placeholder="Choose a currency"
                  value={
                    offerDetails.currency.code && offerDetails.currency.name
                      ? ` ${offerDetails.currency.name} - ${offerDetails.currency.code} `
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
                      pick: "",
                      page: "create offer",
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
                  Trade Limit Range
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
                      "To make this offer visible, you must have 100% of the minimum amount you’ve set available in your wallet."
                    }
                  />
                </div>
              </div>
            </div>
            {/* Profit Margine Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Profit Margin
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row  gap-[15px]">
                  <div
                    onClick={handleMinusMargin}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>

                  <div className="bg-tradeAsh flex justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      <span className="font-bold">
                        {offerDetails.margin > 0 ? "+" : ""}
                        {offerDetails.margin}%
                      </span>{" "}
                      profit margin per trade
                    </p>
                  </div>

                  <div
                    onClick={handleAddMargin}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <div className="flex p-3 bg-tradeAsh rounded-[10px] border border-tradeAshLight flex-col gap-2 text-[13px] text-white leading-relaxed">
                  {offerDetails?.currency?.code ? (
                    <>
                      {/* Market Price */}
                      <div className="flex gap-1 items-center">
                        <p className="text-tradeFadeWhite font-medium">
                          Current Exchange Rate:
                        </p>
                        <p className="text-tradeGreen font-bold">
                          1 <span>{offerDetails.currency.code}</span> ={" "}
                          <span>
                            {rateInfo.baseRate === 0
                              ? "0.00"
                              : rateInfo.baseRate}
                          </span>{" "}
                          <span>NGN</span>
                        </p>
                      </div>

                      {/* Margin Breakdown */}
                      <p className="text-tradeFadeWhite font-medium">
                        Your offering at{" "}
                        <span className="text-tradeOrange font-bold">
                          {offerDetails?.margin}% profit margin
                        </span>{" "}
                        sets your trade rate at{" "}
                        <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                          {rateInfo.finalRate} NGN
                        </span>{" "}
                        per{" "}
                        <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                          1 {offerDetails.currency.code}
                        </span>
                        . You'll earn about{" "}
                        <span className="text-tradeGreen font-bold">
                          {rateInfo.profit} NGN
                        </span>{" "}
                        per{" "}
                        <span className="text-tradeGreen font-bold inline-flex items-center gap-1">
                          1 {offerDetails.currency.code}
                        </span>{" "}
                        traded.
                      </p>

                      {/* Service Charge Note */}
                      <p className="text-tradeFadeWhite font-medium">
                        <span className="text-white font-semibold">Note:</span>{" "}
                        Service charge applies at trade.
                      </p>
                    </>
                  ) : (
                    <p className="text-tradeFadeWhite text-center py-6 font-medium">
                      Your rate breakdown will appear here once you select a
                      currency.
                    </p>
                  )}
                </div>

                <div className="">
                  <Info
                    text={
                      "Set a competitive profit margin that secures your earnings. Note that a service charge typically between 0.5% to 2% applies per trade. To ensure healthy returns, consider starting your margin at 4% or higher."
                    }
                  />
                </div>
              </div>
            </div>
            {/* Payment Window Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Payment Window
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row gap-[15px]">
                  <div
                    onClick={handleMinusPaymentWindow}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex  justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      <span className="font-bold">
                        {offerDetails?.paymentWindow}
                      </span>{" "}
                      hour&#40;s&#41;
                    </p>
                  </div>
                  <div
                    onClick={handleAddPaymentWindow}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <Info
                  text={
                    "Set how long the seller’s has to make payment after the trade begins. If no payment is made within this period, the trade will be cancelled automatically."
                  }
                />
              </div>
            </div>
            {/* Confirmation Time Field */}
            <div className="flex w-full flex-col md:flex-row border-b border-tradeAshLight">
              <div className="w-[50%] p-[15px] bg-tradeOrang md:border-r border-tradeAshLight">
                <p className="text-white text-[15px] font-[500]">
                  Confirmation Time
                </p>
              </div>

              <div className="w-full flex flex-col gap-[15px] p-[15px]">
                <div className="flex items-center w-full flex-row gap-[15px]">
                  <div
                    onClick={handleMinusConfirmationTime}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaMinus />
                  </div>
                  <div className="bg-tradeAsh flex  justify-center p-[12px] w-full rounded-[10px] border border-tradeAshLight">
                    <p className="text-white text-[14px]">
                      <span className="font-bold">
                        {offerDetails?.confirmationTime}
                      </span>{" "}
                      hour&#40;s&#41;
                    </p>
                  </div>
                  <div
                    onClick={handleAddConfirmationTime}
                    className="text-tradeFadeWhite text-[18px] bg-tradeAsh p-[12px] rounded-[10px] border border-tradeAshLight"
                  >
                    <FaPlus />
                  </div>
                </div>

                <Info
                  text={
                    "Set how long you’ll have to confirm the seller’s payment and release their asset. This helps avoid delays and disputes."
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
                      page: "create offer",
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
                  } gap-[10px] flex-wrap`}
                >
                  {offerDetails?.termTags.map((tag, index) => (
                    <div className="flex w-max items-center gap-[8px] px-[10px] py-[6px] rounded-[8px] bg-tradeAshLight">
                      <p
                        key={index}
                        className="text-[14px] font-medium text-tradeOrange"
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
                  value={offerDetails?.instruction}
                  className="h-[150px] w-full bg-tradeAsh border border-tradeAshLight rounded-[10px] p-[12px] text-white text-[14px] placeholder-tradeFadeWhite focus:outline-none resize-none"
                  placeholder="Write your trade Instructions here."
                ></textarea>

                <Info
                  text={
                    "Use this field to share any extra instructions or context that help ensure a smooth, respectful trade. Be clear, helpful, and professional."
                  }
                />
              </div>
            </div>
          </div>
          {/* Navigate to Offer Summary Mobile & Tablet */}
          <div className=" bg-black flex md:hidden  flex-col gap-[15px] p-[15px]">
            <button
              onClick={() => {
                if (offerDetails.isReadyToPublish) {
                  navigateTo("/offers/create/summary");
                }
              }}
              className={` ${
                offerDetails?.isReadyToPublish
                  ? "bg-tradeGreen  text-black"
                  : "bg-tradeAsh text-tradeGreen"
              } w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300`}
            >
              <p className="text-[14px] font-[700]">Continue to Summary</p>
            </button>
          </div>
        </div>
        {/* Offer Summary Desktop */}
        <div className="lg:flex hidden min-h-svh  lg:w-[520px] w-full border-neutral-800 ">
          <div className=" relative w-full  flex flex-col md:border-r md:border-b md:border-t border-neutral-800">
            <div className="flex flex-col justify-between p-[15px]  border-b border-tradeAshLight w-full">
              <p className="text-[17px] text-white font-[700]">Offer Summary</p>
            </div>

            <div className="px-4 py-2">
              <p className="text-tradeFadeWhite text-[14px]">
                Verify your offer information to set clear terms and support a
                transparent, efficient trade.
              </p>
            </div>

            <div className="flex flex-col p-[15px]">
              <div className="flex gap-4 items-center bg-tradeAshLight border border-neutral-800 p-[15px]">
                <div>
                  {IconComponent && (
                    <IconComponent className="text-tradeFadeWhite text-[36px]" />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-tradeOrange text-base font-bold">
                    {offerDetails?.service || "-- --"}
                  </p>
                  <p className="text-white text-xs font-medium">
                    {offerDetails?.serviceType || "Service Type"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-[500]">
                  Accepted Currency
                </p>
                <p className="text-tradeOrange text-[15px] font-[600]">
                  {offerDetails?.currency?.name
                    ? `${offerDetails.currency.name} - ${offerDetails.currency.code}`
                    : "-- --"}
                </p>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-[500]">
                  Trade Range Limit
                </p>

                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-2 ">
                    <p className="text-tradeFadeWhite text-[14px]">
                      Minimum Purchase
                    </p>
                    <p className="text-tradeLightGreen text-[14px] font-[600]">
                      {offerDetails?.minimum !== undefined &&
                      offerDetails?.currency?.code
                        ? `${Number(offerDetails.minimum).toLocaleString()} ${
                            offerDetails.currency.code
                          }`
                        : "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 ">
                    <p className="text-tradeFadeWhite text-[14px]">
                      Maximum Purchase
                    </p>
                    <p className="text-tradeLightGreen text-[14px] font-[600]">
                      {offerDetails?.maximum !== undefined &&
                      offerDetails?.currency?.code
                        ? `${Number(offerDetails.maximum).toLocaleString()} ${
                            offerDetails.currency.code
                          }`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Profit Margin
                </p>

                <p className="text-white text-[14px]">
                  You’ve set a profit margin of{" "}
                  <span className="text-tradeGreen text-[14px] font-[600]">
                    {offerDetails?.margin !== undefined
                      ? `${offerDetails.margin} percent`
                      : "--"}
                  </span>
                  , which represents your expected earnings per successful
                  transaction.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Payment Window
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-[14px]">
                    You’ve set a payment window of{" "}
                    <span className="font-[600] text-[14px] text-tradeGreen">
                      {offerDetails?.paymentWindow !== undefined
                        ? `${offerDetails.paymentWindow} hour(s)`
                        : "--"}
                    </span>{" "}
                    for sellers to complete their payment.
                  </p>

                  <p className="text-tradeFadeWhite text-[14px]">
                    <span className="text-tradeOrange font-bold">Note: </span>{" "}
                    If the payment is not made within this timeframe, the trade
                    will be automatically canceled. If funds were sent but not
                    confirmed, sellers may initiate a dispute.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Confirmation Time
                </p>

                <div className="flex flex-col gap-2">
                  <p className="text-white text-[14px]">
                    You’ve agreed to confirm receipt of payment and release
                    funds within{" "}
                    <span className="font-[600] text-[14px] text-tradeGreen">
                      {offerDetails?.confirmationTime !== undefined
                        ? `${offerDetails.confirmationTime} hour(s)`
                        : "--"}
                    </span>{" "}
                    after seller's marks the trade as paid.
                  </p>

                  <p className="text-tradeFadeWhite text-[14px]">
                    <span className="text-tradeOrange font-bold">Note: </span>
                    Failure to respond within this window may result in the
                    buyer escalating the trade through a dispute.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Trade Terms Tag
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {offerDetails?.termTags?.length ? (
                    offerDetails.termTags.map((tag, index) => (
                      <div className="flex w-max items-center gap-[8px] px-[10px] py-[4px] rounded-[8px] bg-tradeAshLight border border-tradeAshLight">
                        <p
                          key={index}
                          className="text-[14px] font-medium text-tradeOrange"
                        >
                          {tag}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-tradeFadeWhite text-[14px] font-[500]">
                      No terms specified
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Trade Instruction
                </p>
                <div className="">
                  {offerDetails?.instruction ? (
                    <p className="text-white text-[14px]">
                      {offerDetails?.instruction}
                    </p>
                  ) : (
                    <p className="text-tradeFadeWhite text-[14px] font-[500]">
                      No Instructions set yet
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 p-[15px] bg-tradeAsh border border-t-0 border-tradeAshLight">
                <p className="text-tradeFadeWhite text-[13px] font-medium">
                  Service Charge
                </p>
                <div>
                  <p className="text-white text-[14px]">
                    <span className="font-semibold text-tradeOrange">
                      Applied at time of trade
                    </span>{" "}
                    (typically ranges between 0.5% – 2%)
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-black flex flex-col gap-[15px] p-[15px]">
              <div className=" w-full bg-transparent text-tradeFadeWhite hover:text-white border border-tradeAshLight hover:border-tradeAshExtraLight p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300">
                <p className="text-[14px] font-[700] ">Save Offer to Draft</p>
              </div>
              <button
                onClick={() => {
                  handlepublish();
                }}
                className="bg-tradeGreen text-black w-full p-[12px] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300 active:bg-opacity-55"
              >
                <p className="text-[14px] font-[700]">Publish Offer</p>
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
