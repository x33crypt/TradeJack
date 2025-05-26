import React, { useEffect, useState } from "react";
import InAppNav from "@/components/InAppNav";
import MarketMain from "@/components/marketplace/MarketMain";
import Footer from "@/components/Footer";
import OfferFilter from "@/components/marketplace/OfferFilter";
import axios from "axios";
import { useSelectElement } from "@/context/SelectElementContext";

const Marketplace = () => {
  const [offers, setOffers] = useState();
  const [promotedOffers, setPromotedOffers] = useState();
  const [unPromotedOffers, setUnPromotedOffers] = useState();
  const [offerFilter, setOfferFilter] = useState({
    serviceType: "Default",
    service: "",
    currency: { code: "", name: "" },
    amount: "",
    priceSort: "",
    timeSort: "",
    allOffers: true,
    onlineOffers: false,
    clearFilter: false,
    loading: false,
  });

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
  const [isOfferSortBy, setIsOfferSortBy] = useState(false);
  const [isAllOffer, setIsAllOffer] = useState(true);
  const [isOnlineOffer, setIsOnlineOffer] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const { select, setSelect } = useSelectElement();

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
    setOfferFilter((prev) => ({
      ...prev,
      loading: true,
    }));

    // console.log(`Service Type: ${serviceType} `);
    // console.log(`Service: ${getSelectedService()} `);
    // console.log(`Amount: ${amount} `);
    // console.log(`Currency: ${selectedCurrency.code} `);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

      // Fetch offers
      const response = await axios.get(`/fakeData.json`);
      let filteredOffers = response.data.offers;

      if (offerFilter?.timeSort === "fastToSlow") {
        filteredOffers = [...filteredOffers].sort(
          (a, b) => a.avgTradeTime - b.avgTradeTime
        );
      }

      if (offerFilter?.timeSort === "slowToFast") {
        filteredOffers = [...filteredOffers].sort(
          (a, b) => b.avgTradeTime - a.avgTradeTime
        );
      }

      if (offerFilter?.priceSort === "highToLow") {
        filteredOffers = filteredOffers.sort((a, b) => a.price - b.price);
      }

      if (offerFilter?.priceSort === "lowToHigh") {
        filteredOffers = filteredOffers.sort((a, b) => b.price - a.price);
      }

      // Reset to full list if 'Default' is selected and 'isAllOffer' is true
      if (offerFilter?.serviceType === "Default" && offerFilter?.allOffers) {
        setOffers(filteredOffers);
        return;
      }

      // Apply other filters
      if (offerFilter?.serviceType && offerFilter?.serviceType !== "Default") {
        filteredOffers = filteredOffers.filter(
          (offer) => offer?.serviceType === offerFilter?.serviceType
        );
      }

      if (offerFilter?.service) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.service === offerFilter?.service
        );
      }

      if (offerFilter?.amount) {
        filteredOffers = filteredOffers.filter(
          (offer) =>
            offerFilter?.amount >= offer.miniPurchase &&
            offerFilter?.amount <= offer.maxPurchase
        );
      }

      if (offerFilter?.currency?.code) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.currency === offerFilter?.currency?.code
        );
      }

      if (offerFilter?.allOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.lastSeen === "online"
        );
      }

      if (offerFilter?.onlineOffers) {
        filteredOffers = filteredOffers.filter(
          (offer) => offer.lastSeen === "online"
        );
      }

      setOffers(filteredOffers);
    } catch (error) {
      console.error("Error fetching or filtering offers:", error);
    } finally {
      setOfferFilter((prev) => ({
        ...prev,
        loading: false,
      }));
      setIsOfferFilter(false);
    }
  };

  const handleResetFilter = () => {
    setIsPriceSort("");
    setIsTimeSort("");
    setIsOnlineOffer(false);
    setIsAllOffer(true);
    setServiceType("Default");
    handleFilterOffer();
    setClearFilter(false);
    setIsOfferFilter(false);
  };

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    getPromotedOffers();
    getUnPromotedOffers();
  }, [offers]);

  useEffect(() => {
    handleResetFilter();
  }, [clearFilter === true]);

  useEffect(() => {
    handleFilterOffer();
  }, [offerFilter?.allOffers, offerFilter?.onlineOffers]);

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
  // console.log("Display all Offer:", isAllOffer);
  // console.log("Display Online Vendor:", isOnlineOffer);

  return (
    <>
      <InAppNav />
      <div className="flex lg:flex-row flex-col min-h-svh bg-black lg:px-[2%] md:px-[2.5%]">
        <div className="lg:flex lg:sticky top-[-16px] max-h-svh pt-[80px] hidden w-[290px]">
          <OfferFilter
            offerFilter={offerFilter}
            setOfferFilter={setOfferFilter}
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
            isPriceSort={isPriceSort}
            setIsTimeSort={setIsTimeSort}
            isTimeSort={isTimeSort}
            isAllOffer={isAllOffer}
            setIsAllOffer={setIsAllOffer}
            isOnlineOffer={isOnlineOffer}
            setIsOnlineOffer={setIsOnlineOffer}
            handleResetFilter={handleResetFilter}
            setClearFilter={setClearFilter}
            setSelect={setSelect}
            select={select}
          />
        </div>

        <div className="flex-1 min-h-svh md:pt-[80px] pt-[60px]">
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
            isPriceSort={isPriceSort}
            setIsTimeSort={setIsTimeSort}
            isTimeSort={isTimeSort}
            isOfferSortBy={isOfferSortBy}
            setIsOfferSortBy={setIsOfferSortBy}
            isAllOffer={isAllOffer}
            setIsAllOffer={setIsAllOffer}
            isOnlineOffer={isOnlineOffer}
            setIsOnlineOffer={setIsOnlineOffer}
            handleResetFilter={handleResetFilter}
            setClearFilter={setClearFilter}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
