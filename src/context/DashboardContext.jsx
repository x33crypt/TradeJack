import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const DashboardContext = createContext();

// Create the provider
export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState("");

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Create a hook for easy use
export const useDashboard = () => useContext(DashboardContext);
