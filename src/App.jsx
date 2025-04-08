import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/AboutOffer";
import ScrollToTop from "./components/ScrollToTop";
import CreateOffer from "./pages/CreateOffer";
import TradeChat from "./pages/TradeChat";
import UserProfile from "./pages/UserProfile";
import DepositAndWithdraw from "./pages/DepositAndWithdraw";
import AccountInfo from "./pages/AccountInfo";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account/profile" element={<UserProfile />} />
        <Route path="/account/info" element={<AccountInfo />} />

        <Route
          path="/account/deposit&withdraw"
          element={<DepositAndWithdraw />}
        />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/offer/:id" element={<AboutOffer />} />
        <Route path="/trade" element={<TradeChat />} />
      </Routes>
    </>
  );
};

export default App;
