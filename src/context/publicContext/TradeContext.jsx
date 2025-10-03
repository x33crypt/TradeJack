import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const TradeContext = createContext();

// Create the provider
export const TradeProvider = ({ children }) => {
  const [preTradeCheck, setPreTradeCheck] = useState({
    time: 120,
    isCounting: false,
    checking: false,
    result: {
      limitEligible: null,
      activeNow: null,
      collacteralSecured: null,
      kycCompliant: null,
    },
    success: false,
    failed: false,
    waiting: false,
    cancelled: false,
    declined: false,
    details: false,
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
