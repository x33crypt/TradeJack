import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { TradeAlertProvider } from "./context/TradeAlertContext";
import { SelectElementProvider } from "./context/SelectElementContext";
import { OfferDetailsProvider } from "./context/CreateOfferDetailsContext";
import { OfferFilterProvider } from "./context/OfferFilterContext";
import { UserDetailsProvider } from "./context/UserContext";
import { ToastProvider } from "./context/ToastContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <UserDetailsProvider>
          <OfferFilterProvider>
            <OfferDetailsProvider>
              <SelectElementProvider>
                <TradeAlertProvider>
                  <App />
                </TradeAlertProvider>
              </SelectElementProvider>
            </OfferDetailsProvider>
          </OfferFilterProvider>
        </UserDetailsProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
