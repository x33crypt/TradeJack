import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TradeAlert from "./components/TradeAlert";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { TradeAlertProvider } from "./context/TradeAlertContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <TradeAlertProvider>
        <App />
      </TradeAlertProvider>
    </BrowserRouter>
  </StrictMode>
);

// Render PromoContent into #rootTwo
const rootTwo = ReactDOM.createRoot(document.getElementById("rootTwo"));
rootTwo.render(
  <React.StrictMode>
    <TradeAlertProvider>
      <TradeAlert />
    </TradeAlertProvider>
  </React.StrictMode>
);
