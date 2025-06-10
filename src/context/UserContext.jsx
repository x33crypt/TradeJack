import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const userContext = createContext();

// Create the provider
export const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
  });

  console.log(user);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

// Create a hook for easy use
export const useUserContext = () => useContext(userContext);
