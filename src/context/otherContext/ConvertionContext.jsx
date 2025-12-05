import React, { createContext, useState, useContext } from "react";
// Create the context
const ConvertionContext = createContext();

export const ConvertionProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <ConvertionContext.Provider value={{ data, setData }}>
      {children}
    </ConvertionContext.Provider>
  );
};

export const useConversion = () => useContext(ConvertionContext);
