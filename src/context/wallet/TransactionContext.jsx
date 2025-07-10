import React, { createContext, useState, useContext, useEffect } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState({ page: 1 });
  const [Filter, setFilter] = useState({
    date: { month: "", year: "" },
    type: "All types",
    status: "All status",
  });

  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions, Filter, setFilter }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Create a hook for easy use
export const useTransaction = () => useContext(TransactionContext);
