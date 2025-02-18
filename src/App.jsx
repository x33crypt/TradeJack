import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ViewOfferSell from "./pages/ViewOfferSell";
import ScrollToTop from "./components/ScrollToTop";
import CreateOffer from "./pages/CreateOffer";
import UserProfile from "./pages/userProfile";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/offer/:id" element={<ViewOfferSell />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;
