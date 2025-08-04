import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const CreateOfferContext = createContext();

// Create the provider
export const CreateOfferProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({
    serviceType: "Online Wallet Transfer",
    service: "",
    serviceId: "",
    currency: { code: "USD", name: " United States dollar" },
    minimum: "",
    maximum: "",
    margin: 4,
    vendorPaymentWindow: { minutes: 0, hours: 0 },
    tradersPaymentWindow: { minutes: 0, hours: 0 },
    termTags: [],
    instruction: "",
    loading: false,
    success: false,
  });

  return (
    <CreateOfferContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </CreateOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useCreateOfferDetails = () => useContext(CreateOfferContext);
