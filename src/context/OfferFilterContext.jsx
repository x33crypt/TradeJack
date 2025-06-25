import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const OfferFilterContext = createContext();

// Create the provider
export const OfferFilterProvider = ({ children }) => {
  const [offerFilter, setOfferFilter] = useState({
    serviceType: "",
    service: "",
    currency: { code: "", name: "" },
    amount: "",
    allOffers: true,
    onlineOffers: false,
    bestMargin: false,
    topFeedBack: false,
    mostTrusted: false,
    clearFilter: false,
    showFilter: false,
    isFiltering: false,
  });

  // console.log(offerFilter);

  return (
    <OfferFilterContext.Provider value={{ offerFilter, setOfferFilter }}>
      {children}
    </OfferFilterContext.Provider>
  );
};

// Create a hook for easy use
export const useOfferFilter = () => useContext(OfferFilterContext);
