import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const EditOfferContext = createContext();

// Create the provider
export const EditOfferProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({
    offerId: "",
    serviceType: "Online Wallet Transfer",
    service: "",
    serviceId: "",
    currency: { code: "", name: "" },
    minimum: "",
    maximum: "",
    margin: 4,
    paymentWindow: 1,
    confirmationTime: 1,
    termTags: [],
    instruction: "",
  });

  console.log(offerDetails);

  return (
    <EditOfferContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </EditOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useEditOfferDetails = () => useContext(EditOfferContext);
