import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const PublicOffersContext = createContext();

// Create the provider
export const PublicOffersProvider = ({ children }) => {
  const [offers, setOffers] = useState(null);
  const [filter, setFilter] = useState({
    state: false,
    loading: false,
    assetType: "",
    asset: "",
    currency: { code: "", name: "" },
    amount: "",
    sortBy: null,
    activeTraders: false,
    verifiedOffers: false,
    topPicks: false,
    clearFilter: false,
  });
  

  console.log("Explore Offers :", offers);
  console.log("Explore filter :", filter);

  return (
    <PublicOffersContext.Provider
      value={{ offers, setOffers, filter, setFilter }}
    >
      {children}
    </PublicOffersContext.Provider>
  );
};

// Create a hook for easy use
export const usePublicOffers = () => useContext(PublicOffersContext);
