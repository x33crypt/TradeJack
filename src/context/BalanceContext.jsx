import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    available_balance: {
      USD: null,
      NGN: null,
    },
    escrow_balance: {
      USD: null,
      NGN: null,
    },
    pending_balance: null,
  });

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Create a hook for easy use
export const useBalance = () => useContext(BalanceContext);
