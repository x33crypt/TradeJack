import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const TradeContext = createContext();

// Create the provider
export const TradeProvider = ({ children }) => {
  const [preTradeCheck, setPreTradeCheck] = useState({
    state: false,
    isLimitVerified: false,
    isEscrowSecured: false,
    isStatusVerified: false,
    success: false,
    countdown: "03:00",
  });

  const [trade, setTrade] = useState({
    preTradeCheck: {
      state: false,
      isLimitVerified: false,
      isEscrowSecured: false,
      isStatusVerified: false,
    },
  });

  return (
    <TradeContext.Provider
      value={{ trade, setTrade, preTradeCheck, setPreTradeCheck }}
    >
      {children}
    </TradeContext.Provider>
  );
};

// Create a hook for easy use
export const useTrade = () => useContext(TradeContext);
