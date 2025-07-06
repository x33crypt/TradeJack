import React, { createContext, useState, useContext, useEffect } from "react";
const TransferContext = createContext();

// Create the provider
export const TransferProvider = ({ children }) => {
  const [transfer, setTransfer] = useState({
    confirm: {
      state: false,
      receiverImage: null,
      receiverUsername: null,
      amount: null,
      currency: null,
      walletBalance: null,
      chargePercent: null,
      chargeAmount: null,
      transferTrigger: null,
      cancelTransfer: null,
      transferError: null,
      loading: false,
    },
    success: {
      state: false,
      date: null,
      transferReferenceNo: null,
      viewBalance: null,
      closeSuccess: null,
    },
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
