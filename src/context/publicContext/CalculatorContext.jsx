import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const CalculatorContext = createContext();

// Create the provider
export const CalculatorProvider = ({ children }) => {
  const [calculator, setCalculator] = useState({
    state: false,
    loading: false,
    amount: "",
    receive: "",
  });

  return (
    <CalculatorContext.Provider value={{ calculator, setCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
};

// Create a hook for easy use
export const useCalculator = () => useContext(CalculatorContext);
