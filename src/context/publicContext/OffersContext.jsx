import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Create the context
const PublicOffersContext = createContext();

// Create the provider
export const PublicOffersProvider = ({ children }) => {
  const [offers, setOffers] = useState({
    top: null,
    recent: null,
  });
  const [stats, setStats] = useState(false);
  const [filter, setFilter] = useState({
    state: false,
    loading: false,
    asset: "",
    currency: "",
    enterAmount: false,
    amount: "",
    amountList: ["50", "100", "200", "500", "1000", "2000", "More"],
    sortBy: "",
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
        stats,
        setStats,
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
