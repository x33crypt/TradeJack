import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <AuthContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
