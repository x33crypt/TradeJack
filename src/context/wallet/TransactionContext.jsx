import React, { createContext, useState, useContext, useEffect } from "react";
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState({ page: 1 });
  const [Filter, setFilter] = useState({
    date: { month: "", year: "" },
    type: "All types",
    status: "All status",
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
        Filter,
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
