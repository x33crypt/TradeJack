import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    default_currency: null,
    user_currency: null,
    currencies: null,
  });

  const [current, setCurrent] = useState(null);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, current, setCurrent }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Create a hook for easy use
export const useCurrency = () => useContext(CurrencyContext);
