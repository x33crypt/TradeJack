import React, { createContext, useState, useContext, useEffect } from "react";
const LinkedAccountContext = createContext();

export const LinkedAccountProvider = ({ children }) => {
  const [linkedAccounts, setLinkedAccounts] = useState({});
  const [linkAccount, setLinkAccount] = useState({
    state: false,
    bank: "",
    bankAccount: "",
    holdersName: null,
  });

  console.log("Link Account Details :", linkAccount);

  return (
    <LinkedAccountContext.Provider
      value={{
        linkedAccounts,
        setLinkedAccounts,
        linkAccount,
        setLinkAccount,
      }}
    >
      {children}
    </LinkedAccountContext.Provider>
  );
};

// Create a hook for easy use
export const useLinkedAccount = () => useContext(LinkedAccountContext);
