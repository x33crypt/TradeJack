import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ViewOfferSell from "./pages/ViewOfferSell";
import ScrollToTop from "./components/ScrollToTop";
import CreateOffer from "./pages/CreateOffer";
import UserProfile from "./pages/UserProfile";
import axios from "axios";

export const bitcoinCapContext = createContext();
const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  const getBitcoinPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      setBitcoinPrice(response.data.bitcoin.usd);
    } catch (err) {
      console.error("Error fetching BTC price:", err);
    }
  };

  setInterval(() => {
    getBitcoinPrice();
  }, 10000);

  console.log(bitcoinPrice);

  return (
    <>
      <ScrollToTop />
      <bitcoinCapContext.Provider value={{ bitcoinPrice, setBitcoinPrice }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create-offer" element={<CreateOffer />} />
          <Route path="/offer/:id" element={<ViewOfferSell />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </bitcoinCapContext.Provider>
    </>
  );
};

export default App;
