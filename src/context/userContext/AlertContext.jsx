import React, { createContext, useState, useContext } from "react";

// Create the context
const AlertContext = createContext();

// Create the provider
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: "Trade" });

  return (
    <AlertProvider.Provider value={{ alert, setAlert }}>
      {children}
    </AlertProvider.Provider>
  );
};

// Create a hook for easy use
export const useAlert = () => useContext(AlertContext);
