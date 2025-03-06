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
  const [isPriceSort, setIsPriceSort] = useState("");
  const [isTimeSort, setIsTimeSort] = useState("");
  const [isOfferFilter, setIsOfferFilter] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  console.log(serviceType);
  console.log(accountType);
  console.log(walletType);
  console.log(giftCardType);
  console.log(debitCreditCardType);
  console.log(amount);
  console.log(selectedCurrency);
  console.log("Offer Filter:", isOfferFilter);
  console.log("Is Offer Filter Loading:", isFilterLoading);
  console.log("Price Sort:", isPriceSort);
  console.log("Time Sort:", isTimeSort);

  const getSelectedAccountType = () => {
    switch (serviceType) {
      case "Online Wallet Transfer":
        return walletType;
      case "Bank Transfer":
        return accountType;
      case "Gift Card Trade":
        return giftCardType;
      case "Debit & Credit Card Spending":
        return debitCreditCardType;
      default:
        return "";
    }
  };

  const handleFilterOffer = () => {
    setIsFilterLoading(true); // Ensure loading state is set first

    setTimeout(() => {
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
      };

      console.log("Applying filters:", filters);

      setIsFilterLoading(false);
      setIsOfferFilter(false);
    }, 1000); // Short delay ensures loading state updates before running logic
  };

  return (
    <>
      <MarketTopNav />
      <div className="md:pt-[80px] pt-[67px] flex bg-black lg:gap-[0.8%] md:p-[1.5%]">
        <div className="lg:flex hidden w-[320px]">
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
            handleFilterOffer={handleFilterOffer}
            setIsOfferFilter={setIsOfferFilter}
            isOfferFilter={isOfferFilter}
            isFilterLoading={isFilterLoading}
            setIsPriceSort={setIsPriceSort}
            setIsTimeSort={setIsTimeSort}
          />
        </div>
        <div className="flex-1 bg-black">
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
            handleFilterOffer={handleFilterOffer}
            setIsOfferFilter={setIsOfferFilter}
            isOfferFilter={isOfferFilter}
            isFilterLoading={isFilterLoading}
            setIsPriceSort={setIsPriceSort}
            setIsTimeSort={setIsTimeSort}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
