import React, { createContext, useState, useContext, useMemo } from "react";

// Create the context
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    current: "user_currency",
    default_currency: null,
    user_currency: null,
    currencies: null,
  });

  // Memoize the context value so it doesn't get recreated every render.
  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Create a hook for easy use
export const useCurrency = () => useContext(CurrencyContext);
