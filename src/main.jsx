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
import { ProfileProvider } from "./context/ProfileContext";
import { ToastProvider } from "./context/ToastContext";
import { DashboardProvider } from "./context/DashboardContext";
import { AuthProvider } from "./context/AuthContext";
import { KycProvider } from "./context/KycContext";
import { MyOfferProvider } from "./context/offer/MyOffersContext";
import { AboutOfferProvider } from "./context/offer/AboutOfferContext";
import { TransferProvider } from "./context/wallet/TransferContext";
import { DepositProvider } from "./context/wallet/DepositContext";
import { TransactionProvider } from "./context/wallet/TransactionContext";
import { LinkedAccountProvider } from "./context/wallet/LinkedAccountContext";
import { BalanceProvider } from "./context/BalanceContext";
import { ProfileNavProvider } from "./context/ProfileNavContext";
import { WithdrawProvider } from "./context/wallet/WithdrawContext";
import { AccountProvider } from "./context/AccountContext";
import { ExploreOffersProvider } from "./context/ExploreOffersContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ExploreOffersProvider>
        <AccountProvider>
          <ProfileNavProvider>
            <BalanceProvider>
              <LinkedAccountProvider>
                <TransactionProvider>
                  <WithdrawProvider>
                    <DepositProvider>
                      <TransferProvider>
                        <ProfileProvider>
                          <AboutOfferProvider>
                            <MyOfferProvider>
                              <KycProvider>
                                <AuthProvider>
                                  <DashboardProvider>
                                    <ToastProvider>
                                      <EditOfferProvider>
                                        <CreateOfferProvider>
                                          <SelectElementProvider>
                                            <TradeAlertProvider>
                                              <App />
                                            </TradeAlertProvider>
                                          </SelectElementProvider>
                                        </CreateOfferProvider>
                                      </EditOfferProvider>
                                    </ToastProvider>
                                  </DashboardProvider>
                                </AuthProvider>
                              </KycProvider>
                            </MyOfferProvider>
                          </AboutOfferProvider>
                        </ProfileProvider>
                      </TransferProvider>
                    </DepositProvider>
                  </WithdrawProvider>
                </TransactionProvider>
              </LinkedAccountProvider>
            </BalanceProvider>
          </ProfileNavProvider>
        </AccountProvider>
      </ExploreOffersProvider>
    </BrowserRouter>
  </StrictMode>
);
