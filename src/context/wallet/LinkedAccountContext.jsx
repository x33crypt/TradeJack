import React, { createContext, useState, useContext, useEffect } from "react";
const LinkedAccountContext = createContext();

export const LinkedAccountProvider = ({ children }) => {
  const [linkedAccounts, setLinkedAccounts] = useState(null);
  const [linkAccount, setLinkAccount] = useState({
    proceed: false,
    loading: false,
    verified: false,
    success: true,
    bank: "",
    bankAccount: "",
    holdersName: null,
  });
  const [manageAccount, setManageAccount] = useState({
    state: false,
    isDefault: false,
    isDelete: false,
    accountId: null,
    bank: null,
    last4digits: null,
    loading: false,
    success: false,
  });

  console.log("Link Account Details :", linkAccount);

  return (
    <LinkedAccountContext.Provider
      value={{
        linkedAccounts,
        setLinkedAccounts,
        linkAccount,
        setLinkAccount,
        manageAccount,
        setManageAccount,
      }}
    >
      {children}
    </LinkedAccountContext.Provider>
  );
};

// Create a hook for easy use
export const useLinkedAccount = () => useContext(LinkedAccountContext);
