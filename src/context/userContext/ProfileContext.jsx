import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ProfileContext = createContext();

// Create the provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a hook for easy use
export const useProfile = () => useContext(ProfileContext);
