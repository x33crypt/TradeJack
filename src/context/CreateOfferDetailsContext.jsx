import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const OfferDetailsContext = createContext();

// Create the provider
export const OfferDetailsProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({
    serviceType: "Online Wallet Transfer",
    serviceTypeIcon: "",
    service: "",
    currency: { code: "", name: "" },
    minimum: "",
    maximum: "",
    margin: 5,
    timeLimit: 15,
    termTags: [],
    instruction: "",
  });

  console.log(offerDetails);

  return (
    <OfferDetailsContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </OfferDetailsContext.Provider>
  );
};

// Create a hook for easy use
export const useCreateOfferDetails = () => useContext(OfferDetailsContext);
