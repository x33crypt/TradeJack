import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const TradeAlertContext = createContext();

// Create the provider
export const TradeAlertProvider = ({ children }) => {
  const [tradeAlert, setTradeAlert] = useState(false);

  useEffect(() => {
    console.log("Trade alert is", tradeAlert);
  }, [tradeAlert]);

  return (
    <TradeAlertContext.Provider value={{ tradeAlert, setTradeAlert }}>
      {children}
    </TradeAlertContext.Provider>
  );
};

// Create a hook for easy use
export const useTradeAlert = () => useContext(TradeAlertContext);
