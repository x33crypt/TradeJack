import React from "react";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { TradeAlertProvider } from "./context/TradeAlertContext";
import { SelectElementProvider } from "./context/SelectElementContext";
import { CreateOfferProvider } from "./context/offer/CreateOfferContext";
import { EditOfferProvider } from "./context/offer/EditOfferContext";
import { OfferFilterProvider } from "./context/OfferFilterContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ToastProvider } from "./context/ToastContext";
import { DashboardProvider } from "./context/DashboardContext";
import { AuthProvider } from "./context/AuthContext";
import { KycProvider } from "./context/KycContext";
import { MyOfferProvider } from "./context/offer/MyOffersContext";
import { AboutOfferProvider } from "./context/offer/AboutOfferContext";
import { TransferProvider } from "./context/wallet/TransferContext";
import { DepositProvider } from "./context/wallet/DepositContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <DepositProvider>
        <TransferProvider>
          <ProfileProvider>
            <AboutOfferProvider>
              <MyOfferProvider>
                <KycProvider>
                  <AuthProvider>
                    <DashboardProvider>
                      <ToastProvider>
                        <OfferFilterProvider>
                          <EditOfferProvider>
                            <CreateOfferProvider>
                              <SelectElementProvider>
                                <TradeAlertProvider>
                                  <App />
                                </TradeAlertProvider>
                              </SelectElementProvider>
                            </CreateOfferProvider>
                          </EditOfferProvider>
                        </OfferFilterProvider>
                      </ToastProvider>
                    </DashboardProvider>
                  </AuthProvider>
                </KycProvider>
              </MyOfferProvider>
            </AboutOfferProvider>
          </ProfileProvider>
        </TransferProvider>
      </DepositProvider>
    </BrowserRouter>
  </StrictMode>
);
