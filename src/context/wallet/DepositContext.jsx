import React, { createContext, useState, useContext, useEffect } from "react";
const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposit, setDeposit] = useState({
    error: "",
    loading: false,
    confirm: false,
    success: false,
    currency: "NGN",
    url: null,
    amount: {
      USD: null,
      NGN: null,
    },
    referenceId: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trxref = params.get("trxref");
    const reference = params.get("reference");

    if (trxref && reference && !deposit.loading) {
      setDeposit((prev) => ({
        ...prev,
        success: true,
      }));
    }
  }, []);

  return (
    <DepositContext.Provider value={{ deposit, setDeposit }}>
      {children}
    </DepositContext.Provider>
  );
};

// Create a hook for easy use
export const useDepositContext = () => useContext(DepositContext);
