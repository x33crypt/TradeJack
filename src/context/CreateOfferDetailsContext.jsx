import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const OfferDetailsContext = createContext();

// Create the provider
export const OfferDetailsProvider = ({ children }) => {
  const [offerDetails, setOfferDetails] = useState({
    serviceType: "Online Wallet Transfer",
    service: "",
    currency: { code: "", name: "" },
    minimum: "",
    maximum: "",
    margin: 4,
    paymentWindow: 1,
    confirmationTime: 1,
    termTags: [],
    instruction: "",
    isReadyToPublish: false,
  });

  // Auto-check if all required fields are filled
  // Sets isReadyToPublish to true when the offerDetails form is complete
  // ✅ Auto-check required fields and update publish-ready status
  useEffect(() => {
    const {
      serviceType,
      service,
      currency,
      minimum,
      maximum,
      margin,
      paymentWindow,
      confirmationTime,
      termTags,
      instruction,
      isReadyToPublish,
    } = offerDetails;

    const allFilled =
      serviceType &&
      service &&
      currency?.code &&
      currency?.name &&
      minimum &&
      maximum &&
      margin &&
      paymentWindow &&
      confirmationTime &&
      Array.isArray(termTags) &&
      termTags.length > 0 &&
      instruction;

    // ✅ Only update if the readiness state has changed
    if (!!allFilled !== isReadyToPublish) {
      setOfferDetails((prev) => ({
        ...prev,
        isReadyToPublish: !!allFilled,
      }));
    }
  }, [offerDetails]);

  console.log(offerDetails);

  return (
    <OfferDetailsContext.Provider value={{ offerDetails, setOfferDetails }}>
      {children}
    </OfferDetailsContext.Provider>
  );
};

// Create a hook for easy use
export const useCreateOfferDetails = () => useContext(OfferDetailsContext);
