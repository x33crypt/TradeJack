import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ViewOfferSell from "./pages/ViewOfferSell";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/offer/:id" element={<ViewOfferSell />} />
      </Routes>
    </>
  );
};

export default App;
