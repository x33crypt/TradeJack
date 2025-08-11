import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const SelectElementContext = createContext();

// Create the provider
export const SelectElementProvider = ({ children }) => {
  const [select, setSelect] = useState({
    state: false,
    selectOne: false,
    selectTwo: false,
    page: "",
    element: "",
    options: null,
    pick: "",
  });

  console.log(select);

  return (
    <SelectElementContext.Provider value={{ select, setSelect }}>
      {children}
    </SelectElementContext.Provider>
  );
};

// Create a hook for easy use
export const useSelectElement = () => useContext(SelectElementContext);
