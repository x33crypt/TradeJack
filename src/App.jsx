import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AboutOffer from "./pages/AboutOffer";
import ScrollToTop from "./components/ScrollToTop";
import CreateOffer from "./pages/CreateOffer";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/offer/:id" element={<AboutOffer />} />
        <Route path="/profile" element={<AboutOffer />} />
      </Routes>
    </>
  );
};

export default App;
