import React, { useEffect, useState } from "react";
import MarketTopNav from "@/components/MarketTopNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/Footer";
import OfferFilter from "@/components/marketplace/OfferFilter";
import axios from "axios";

const Marketplace = () => {
  const [offers, setOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
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

  const baseUrl = import.meta.env.BASE_URL;

  const getOffers = async () => {
    try {
      const response = await axios.get(`/fakeData.json`);
      // console.log(response.data); // Log the actual data from the response
      setOffers(response.data.offers);
    } catch (error) {
      console.error("Error fetching the offers:", error);
    }
  };

  const getPromotedOffers = async () => {
    try {
      const response = await offers?.filter(
        (offer) => offer.isPromoted === true
      );
      // console.log(response);
      setPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching promoted offers:", error);
    }
  };

  const getUnPromotedOffers = async () => {
    try {
      const response = await offers?.filter(
        (offer) => offer.isPromoted === false
      );
      // console.log(response);
      setUnPromotedOffers(response);
    } catch (error) {
      console.error("Error fetching unpromoted offers:", error);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    if (offers?.length > 0) {
      getPromotedOffers();
      getUnPromotedOffers();
    }
  }, [offers]);

  const getSelectedService = () => {
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

  const handleFilterOffer = async () => {
    setIsFilterLoading(true);

    console.log(`Service Type: ${serviceType} `);
    console.log(`Service: ${getSelectedService()} `);
    console.log(`Amount: ${amount} `);
    console.log(`Currency: ${selectedCurrency.code} `);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

      // Fetch offers
      const response = await axios.get(`/fakeData.json`);
      let filteredOffers = response.data.offers;

      // Apply filters individually
      if (serviceType) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.serviceType === serviceType
        );
      }

      const service = getSelectedService();

      if (service) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.service === service
        );
      }

      if (amount) {
        filteredOffers = filteredOffers.filter(
          (offer) => amount >= offer.miniPurchase && amount <= offer.maxPurchase
        );
      }

      if (selectedCurrency) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.currency === selectedCurrency?.code
        );
      }

      console.log("Filtered Offers:", filteredOffers);
      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching or filtering offers:", error);
    } finally {
      setIsFilterLoading(false);
      setIsOfferFilter(false);
    }
  };

  // console.log(offers);
  // console.log(promotedOffers);
  // console.log(unPromotedOffers);
  // console.log(serviceType);
  // console.log(`selected Service: ${getSelectedService()} `);
  // console.log(amount);
  // console.log(selectedCurrency);
  // console.log("Offer Filter:", isOfferFilter);
  // console.log("Is Offer Filter Loading:", isFilterLoading);
  // console.log("Price Sort:", isPriceSort);
  // console.log("Time Sort:", isTimeSort);

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
            promotedOffers={promotedOffers}
            unPromotedOffers={unPromotedOffers}
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
