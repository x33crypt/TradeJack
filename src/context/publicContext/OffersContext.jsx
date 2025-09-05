import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const PublicOffersContext = createContext();

// Create the provider
export const PublicOffersProvider = ({ children }) => {
  const [offers, setOffers] = useState(null);
  const [filter, setFilter] = useState({
    state: false,
    loading: false,
    asset: "",
    currency: { code: "", name: "" },
    amount: "",
    sortBy: null,
    clearFilter: false,
  });

  const [aboutOffer, setAboutOffer] = useState({ id: null, data: null });
  const { id: urlId } = useParams();

  useEffect(() => {
    if (urlId && !aboutOffer.id) {
      setAboutOffer((prev) => ({
        ...prev,
        id: urlId,
      }));
    }
  }, [urlId, aboutOffer.id]);

  console.log("Explore Offers :", offers);
  console.log("Explore filter :", filter);

  return (
    <PublicOffersContext.Provider
      value={{
        offers,
        setOffers,
        filter,
        setFilter,
        aboutOffer,
        setAboutOffer,
      }}
    >
      {children}
    </PublicOffersContext.Provider>
  );
};

// Create a hook for easy use
export const usePublicOffers = () => useContext(PublicOffersContext);
