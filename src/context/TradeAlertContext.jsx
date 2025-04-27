import React, { createContext, useState, useContext } from "react";

// Create the context
const TradeAlertContext = createContext();

// Create the provider
export const TradeAlertProvider = ({ children }) => {
  const [tradeAlert, setTradeAlert] = useState(true);

  return (
    <TradeAlertContext.Provider value={{ tradeAlert, setTradeAlert }}>
      {children}
    </TradeAlertContext.Provider>
  );
};

// Create a hook for easy use
export const useTradeAlert = () => useContext(TradeAlertContext);
