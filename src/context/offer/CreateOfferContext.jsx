import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const CreateOfferContext = createContext();

// Create the provider
export const CreateOfferProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({
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

    // Additional fields for post offer creation
    submitSuccess: false,
    OfferId: "",
  });

  return (
    <CreateOfferContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </CreateOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useCreateOfferDetails = () => useContext(CreateOfferContext);
