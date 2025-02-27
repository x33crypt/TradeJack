import React, { useEffect, useState } from "react";
import MarketTopNav from "@/components/MarketTopNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/Footer";
import OfferFilter from "@/components/marketplace/OfferFilter";

const Marketplace = () => {
  const [serviceType, setServiceType] = useState("Default");
  const [accountType, setAccountType] = useState("");
  const [walletType, setWaletType] = useState("");
  const [giftCardType, setGiftCardType] = useState("");
  const [debitCreditCardType, setDebitCreditCardType] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState({
    name: "",
    code: "",
  });
  const [verifiedOffer, setVerifiedOffer] = useState(false);
  const [activeTraders, setActiveTraders] = useState(false);

  console.log(serviceType);
  console.log(accountType);
  console.log(walletType);
  console.log(giftCardType);
  console.log(debitCreditCardType);
  console.log(amount);
  console.log(selectedCurrency);
  console.log("Active Traders:", activeTraders);
  console.log("Verified Offers:", verifiedOffer);

  const getSelectedAccountType = () => {
    switch (serviceType) {
      case "Online Wallet Transfer":
        return walletType;
      case "Bank Transfer":
        return accountType;
      case "Gift Cards Exchange":
        return giftCardType;
      case "Debit & Credit Cards Spending":
        return debitCreditCardType;
      default:
        return "";
    }
  };

  const handleFindOffer = () => {
    const selectedKey = () => {
      switch (serviceType) {
        case "Online Wallet Transfer":
          return "wallet";
        case "Bank Transfer":
          return "bank";
        case "Gift Cards Exchange":
          return "giftCard";
        case "Debit/Credit Cards Spending":
          return "cardType";
        default:
          return "service"; // Fallback key
      }
    };

    const filters = {
      serviceType,
      [selectedKey()]: getSelectedAccountType(), // Dynamic key assignment
      amount,
      selectedCurrency,
      verifiedOffer,
      activeTraders,
    };

    console.log("Applying filters:", filters);
  };

  return (
    <>
      <MarketTopNav />
      <div className="md:pt-[80px] pt-[70px] flex bg-black lg:gap-[0.8%] md:p-[1%]">
        <div className="lg:flex hidden w-[310px]">
          <OfferFilter
            serviceType={serviceType}
            setServiceType={setServiceType}
            accountType={accountType}
            setAccountType={setAccountType}
            walletType={walletType}
            setWaletType={setWaletType}
            giftCardType={giftCardType}
            setGiftCardType={setGiftCardType}
            debitCreditCardType={debitCreditCardType}
            setDebitCreditCardType={setDebitCreditCardType}
            amount={amount}
            setAmount={setAmount}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            verifiedOffer={verifiedOffer}
            setVerifiedOffer={setVerifiedOffer}
            activeTraders={activeTraders}
            setActiveTraders={setActiveTraders}
            handleFindOffer={handleFindOffer}
          />
        </div>
        <div className="flex-1">
          <MarketMain
            serviceType={serviceType}
            setServiceType={setServiceType}
            accountType={accountType}
            setAccountType={setAccountType}
            walletType={walletType}
            setWaletType={setWaletType}
            giftCardType={giftCardType}
            setGiftCardType={setGiftCardType}
            debitCreditCardType={debitCreditCardType}
            setDebitCreditCardType={setDebitCreditCardType}
            amount={amount}
            setAmount={setAmount}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            verifiedOffer={verifiedOffer}
            setVerifiedOffer={setVerifiedOffer}
            activeTraders={activeTraders}
            setActiveTraders={setActiveTraders}
            handleFindOffer={handleFindOffer}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
