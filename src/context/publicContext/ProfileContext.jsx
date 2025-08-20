import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const TraderProfileContext = createContext();

// Create the provider
export const TraderProfileProvider = ({ children }) => {
  const { username: urlusername } = useParams();
  const [profile, setProfile] = useState({ username: null, data: null });

  useEffect(() => {
    if (urlusername && !profile.username) {
      setProfile((prev) => ({
        ...prev,
        username: urlusername,
      }));
    }
  }, [urlusername, profile.username]);

  return (
    <TraderProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </TraderProfileContext.Provider>
  );
};

// Create a hook for easy use
export const useTraderProfile = () => useContext(TraderProfileContext);
