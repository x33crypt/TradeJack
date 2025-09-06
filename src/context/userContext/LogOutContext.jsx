import React, { createContext, useState, useContext } from "react";

// Create the context
const LogOutContext = createContext();

// Create the provider
export const LogOutProvider = ({ children }) => {
  const [state, setState] = useState(false);

  return (
    <LogOutContext.Provider value={{ state, setState }}>
      {children}
    </LogOutContext.Provider>
  );
};

// Create a hook for easy use
export const useLogOut = () => useContext(LogOutContext);
