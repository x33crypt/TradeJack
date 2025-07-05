import React, { createContext, useState, useContext, useEffect } from "react";
const TransferContext = createContext();

// Create the provider
export const TransferProvider = ({ children }) => {
  const [transfer, setTransfer] = useState({
    confirm: false,
  });
};
