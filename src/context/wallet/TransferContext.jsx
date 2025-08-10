import React, { createContext, useState, useContext, useEffect } from "react";
const TransferContext = createContext();

// Create the provider
export const TransferProvider = ({ children }) => {
  const [transfer, setTransfer] = useState({
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
    charges: {
      USD: null,
      NGN: null,
    },
    referenceId: null,
    recentTransfer: null,
  });

  console.log(transfer);

  return (
    <TransferContext.Provider value={{ transfer, setTransfer }}>
      {children}
    </TransferContext.Provider>
  );
};

// Create a hook for easy use
export const useTransferContext = () => useContext(TransferContext);
