import React from "react";
import { StrictMode } from "react";
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
import { DashboardProvider } from "./context/DashboardContext";
import { AuthProvider } from "./context/AuthContext";
import { KycProvider } from "./context/KycContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <KycProvider>
        <AuthProvider>
          <DashboardProvider>
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
          </DashboardProvider>
        </AuthProvider>
      </KycProvider>
    </BrowserRouter>
  </StrictMode>
);
