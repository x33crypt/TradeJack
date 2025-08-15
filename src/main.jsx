import React from "react";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { SelectElementProvider } from "./context/otherContext/SelectElementContext";
import { ProfileProvider } from "./context/userContext/ProfileContext";
import { ToastProvider } from "./context/otherContext/ToastContext";
import { DashboardProvider } from "./context/userContext/DashboardContext";
import { KycProvider } from "./context/userContext/KycContext";
import { UserOfferProvider } from "./context/userContext/OffersContext";
import { TransferProvider } from "./context/userContext/TransferContext";
import { DepositProvider } from "./context/userContext/DepositContext";
import { TransactionProvider } from "./context/userContext/TransactionContext";
import { LinkedAccountProvider } from "./context/userContext/LinkedAccountContext";
import { BalanceProvider } from "./context/userContext/BalanceContext";
import { ProfileNavProvider } from "./context/otherContext/ProfileNavContext";
import { WithdrawProvider } from "./context/userContext/WithdrawContext";
import { PublicOffersProvider } from "./context/publicContext/OffersContext";

// Render MainApp into #root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserOfferProvider>
        <PublicOffersProvider>
          <ProfileNavProvider>
            <BalanceProvider>
              <LinkedAccountProvider>
                <TransactionProvider>
                  <WithdrawProvider>
                    <DepositProvider>
                      <TransferProvider>
                        <ProfileProvider>
                          <KycProvider>
                            <DashboardProvider>
                              <ToastProvider>
                                <SelectElementProvider>
                                  <App />
                                </SelectElementProvider>
                              </ToastProvider>
                            </DashboardProvider>
                          </KycProvider>
                        </ProfileProvider>
                      </TransferProvider>
                    </DepositProvider>
                  </WithdrawProvider>
                </TransactionProvider>
              </LinkedAccountProvider>
            </BalanceProvider>
          </ProfileNavProvider>
        </PublicOffersProvider>
      </UserOfferProvider>
    </BrowserRouter>
  </StrictMode>
);
