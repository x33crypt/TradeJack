import React, { useEffect, useState } from "react";
import MarketTopNav from "@/components/MarketTopNav";
import Footer from "@/components/Footer";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import PreferredCurrency from "@/components/createOffer/PreferredCurrency";
import OfferTradeRate from "@/components/createOffer/OfferTradeRate";
import PurchaseLimit from "@/components/createOffer/PurchaseLimit";
import SelectService from "@/components/createOffer/SelectService";
import SelectAccount from "@/components/createOffer/SelectAccount";
import SelectWallet from "@/components/createOffer/SelectWallet";
import SelectGitfCard from "@/components/createOffer/SelectGitfCard";
import DebitCreditCard from "@/components/createOffer/DebitCreditCard";
import OfferTerms from "@/components/createOffer/OfferTerms";
import OfferSummary from "@/components/createOffer/OfferSummary";

const CreateOffer = () => {
  const [offerPageOne, setOfferPageOne] = useState(true);
  const [offerPageTwo, setOfferPageTwo] = useState(false);
  const [offerRates, setOfferRates] = useState([{ from: 0, to: 0, rate: 0 }]);
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [rate, setRate] = useState("");
  const [miniPurchase, setMiniPurchase] = useState("");
  const [maxPurchase, setMaxPurchase] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [showWallet, setShowWallet] = useState(true);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [showDebitCreditCard, setShowDebitCreditCard] = useState(false);
  const [service, setService] = useState("Online Wallet Transfer");
  const [creditOrDebitCard, setCreditOrDebitCard] = useState("");
  const [wallet, setWallet] = useState("");
  const [account, setAccount] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [preferredCurrency, setPreferredCurrency] = useState({
    name: "United States Dollar",
    code: "USD",
  });
  const [offerTerms, setOfferTerms] = useState([]);

  const handleServiceTypeChange = () => {
    if (service === "Online Wallet Transfer") {
      setShowWallet(true);
      setShowAccount(false);
      setAccount("");
      setShowGiftCard(false);
      setGiftCard("");
      setShowDebitCreditCard(false);
      setCreditOrDebitCard("");
      setMiniPurchase("");
      setMaxPurchase("");
      setOfferRates([{ from: 0, to: 0, rate: 0 }]);
      setOfferTerms([]);
    } else if (service === "Bank Transfer") {
      setShowAccount(true);
      setShowWallet(false);
      setWallet("");
      setShowGiftCard(false);
      setGiftCard("");
      setShowDebitCreditCard(false);
      setCreditOrDebitCard("");
      setMiniPurchase("");
      setMaxPurchase("");
      setOfferRates([{ from: 0, to: 0, rate: 0 }]);
      setOfferTerms([]);
    } else if (service === "Gift Cards Exchange") {
      setShowGiftCard(true);
      setShowAccount(false);
      setAccount("");
      setShowWallet(false);
      setWallet("");
      setShowDebitCreditCard(false);
      setCreditOrDebitCard("");
      setMiniPurchase("");
      setMaxPurchase("");
      setOfferRates([{ from: 0, to: 0, rate: 0 }]);
      setOfferTerms([]);
    } else if (service === "Debit/Credit Cards Spending") {
      setShowDebitCreditCard(true);
      setShowGiftCard(false);
      setGiftCard("");
      setShowAccount(false);
      setAccount("");
      setShowWallet(false);
      setWallet("");
      setMiniPurchase("");
      setMaxPurchase("");
      setOfferRates([{ from: 0, to: 0, rate: 0 }]);
      setOfferTerms([]);
    }
  };

  useEffect(() => {
    handleServiceTypeChange();
  }, [service]);

  const handleToOfferPageTwo = () => {
    setOfferPageOne(false);
    setOfferPageTwo(true);
  };

  const handleReturnToOfferPageOne = () => {
    setOfferPageOne(true);
    setOfferPageTwo(false);
  };

  console.log(rangeFrom);
  console.log(rangeTo);
  console.log(rate);
  console.log(offerRates);
  console.log(miniPurchase);
  console.log(maxPurchase);
  console.log(offerTerms);

  return (
    <>
      <MarketTopNav />

      <div className="pt-[80px] bg-black">
        <div className={`p-[14px] flex gap-[14px] `}>
          <div
            className={`${
              offerPageOne ? "flex" : "hidden"
            }  flex-1 flex-col gap-[50px] bg-tradeAsh p-[15px] rounded-[8px]`}
          >
            <div>
              <p className="text-white text-[34px] font-[900]">
                Create a Buy Offer for an Asset
              </p>
            </div>
            <div className="flex gap-[40px] ">
              <SelectService service={service} setService={setService} />

              <SelectAccount
                showAccount={showAccount}
                account={account}
                setAccount={setAccount}
              />
              <SelectWallet
                showWallet={showWallet}
                wallet={wallet}
                setWallet={setWallet}
              />
              <SelectGitfCard
                showGiftCard={showGiftCard}
                giftCard={giftCard}
                setGiftCard={setGiftCard}
              />
              <DebitCreditCard
                showDebitCreditCard={showDebitCreditCard}
                creditOrDebitCard={creditOrDebitCard}
                setCreditOrDebitCard={setCreditOrDebitCard}
              />
            </div>
            <PreferredCurrency
              preferredCurrency={preferredCurrency}
              setPreferredCurrency={setPreferredCurrency}
            />
            <PurchaseLimit
              miniPurchase={miniPurchase}
              setMiniPurchase={setMiniPurchase}
              maxPurchase={maxPurchase}
              setMaxPurchase={setMaxPurchase}
              preferredCurrency={preferredCurrency}
            />
            <OfferTradeRate
              rangeFrom={rangeFrom}
              setRangeFrom={setRangeFrom}
              rangeTo={rangeTo}
              setRangeTo={setRangeTo}
              rate={rate}
              setRate={setRate}
              offerRates={offerRates}
              setOfferRates={setOfferRates}
              preferredCurrency={preferredCurrency}
            />
            <OfferTerms setOfferTerms={setOfferTerms} />
          </div>
          <div
            className={`${
              offerPageTwo ? "flex" : "hidden"
            }  flex-1 flex-col gap-[50px] bg-tradeAsh p-[15px] rounded-[8px]`}
          >
            <div>
              <p className="text-white text-[34px] font-[900]">
                Create a Buy Offer for an Asset
              </p>
            </div>
            <div className="flex gap-[40px]"></div>
          </div>
          <OfferSummary
            service={service}
            wallet={wallet}
            account={account}
            giftCard={giftCard}
            creditOrDebitCard={creditOrDebitCard}
            preferredCurrency={preferredCurrency}
            miniPurchase={miniPurchase}
            maxPurchase={maxPurchase}
            offerRates={offerRates}
            handleToOfferPageTwo={handleToOfferPageTwo}
            handleReturnToOfferPageOne={handleReturnToOfferPageOne}
            offerPageTwo={offerPageTwo}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateOffer;
