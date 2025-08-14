import React, { createContext, useState, useContext, useEffect } from "react";

const MyOfferContext = createContext();

// Create the provider
export const MyOfferProvider = ({ children }) => {
  const [myOffers, setMyOffers] = useState(null);

  const [filter, setFilter] = useState({
    date: { monthNo: null, monthName: null, year: null },
    asset: null,
    status: null,
    search: null,
  });

  return (
    <MyOfferContext.Provider
      value={{ myOffers, setMyOffers, filter, setFilter }}
    >
      {children}
    </MyOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useMyOffer = () => useContext(MyOfferContext);
