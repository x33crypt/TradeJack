import React, { createContext, useState, useContext, useEffect } from "react";
const WithdrawContext = createContext();

// Create the provider
export const WithdrawProvider = ({ children }) => {
  const [withdraw, setWithdraw] = useState({
    error: "",
    proceed: false,
    confirm: false,
    success: false,
    loading: false,
    username: "",
    currency: "NGN",
    amount: {
      USD: null,
      NGN: null,
    },
    balance: {
      USD: null,
      NGN: null,
    },
    charges: {
      USD: null,
      NGN: null,
    },
    referenceId: null,
    date: null,
  });

  console.log(withdraw);

  return (
    <WithdrawContext.Provider value={{ withdraw, setWithdraw }}>
      {children}
    </WithdrawContext.Provider>
  );
};

// Create a hook for easy use
export const useWithdrawContext = () => useContext(WithdrawContext);
