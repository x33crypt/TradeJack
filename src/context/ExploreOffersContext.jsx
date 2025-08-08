import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ExploreOffersContext = createContext();

// Create the provider
export const ExploreOffersProvider = ({ children }) => {
  const [offers, setOffers] = useState(null);
  const [filter, setFilter] = useState({
    state: false,
    loading: false,
    assetType: "",
    asset: "",
    currency: { code: "", name: "" },
    amount: "",
    sortBy: "",
    activeTraders: false,
    verifiedOffers: false,
    topPicks: false,
    clearFilter: false,
  });

  console.log("Explore Offers :", offers);
  console.log("Explore filter :", filter);

  return (
    <ExploreOffersContext.Provider
      value={{ offers, setOffers, filter, setFilter }}
    >
      {children}
    </ExploreOffersContext.Provider>
  );
};

// Create a hook for easy use
export const useExploreOffers = () => useContext(ExploreOffersContext);
