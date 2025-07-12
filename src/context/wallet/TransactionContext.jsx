import React, { createContext, useState, useContext, useEffect } from "react";
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState({ page: 1 });
  const [filter, setFilter] = useState({
    date: { month: null, year: null },
    type: null,
    status: null,
  });
  const [details, setDetails] = useState({
    state: false,
    transactionId: "",
    data: {},
  });

  console.log("transactions Details :", details);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        filter,
        setFilter,
        details,
        setDetails,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Create a hook for easy use
export const useTransaction = () => useContext(TransactionContext);
