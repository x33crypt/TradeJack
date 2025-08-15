import React, { createContext, useState, useContext, useEffect } from "react";
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);

  const [filter, setFilter] = useState({
    date: { monthNo: null, monthName: null, year: null },
    type: null,
    status: null,
    search: null,
  });

  const [details, setDetails] = useState({
    state: false,
    reference: "",
    data: {},
    user: {},
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
