import React, { createContext, useState, useContext, useEffect } from "react";
// Create the context
const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState({
    state: true,
    loading: false,
    Password: "",
  });

  return (
    <PasswordContext.Provider value={{ password, setPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const useConfirmPassword = () => useContext(PasswordContext);
