import React, { createContext, useState, useContext, useEffect } from "react";
const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposit, setDeposit] = useState({
    state: true,
    depositAmount: null,
    depositReference: null,
    loading: false,
    depositPending: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trxref = params.get("trxref");
    const reference = params.get("reference");

    if (trxref && reference && !deposit.depositPending) {
      setDeposit((prev) => ({
        ...prev,
        depositPending: true,
        depositReference: reference,
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
