import React, { createContext, useState, useContext, useEffect } from "react";

const MyOfferContext = createContext();

// Create the provider
export const MyOfferProvider = ({ children }) => {
  const [myOffers, setMyOffers] = useState(null);

  return (
    <MyOfferContext.Provider value={{ myOffers, setMyOffers }}>
      {children}
    </MyOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useMyOffer = () => useContext(MyOfferContext);
