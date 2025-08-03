import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({
    view: "Profile",
  });

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
