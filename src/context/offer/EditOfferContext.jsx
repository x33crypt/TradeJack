import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const EditOfferContext = createContext();

// Create the provider
export const OfferDetailsProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({});

  console.log(offerDetails);

  return (
    <OfferDetailsContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </OfferDetailsContext.Provider>
  );
};
