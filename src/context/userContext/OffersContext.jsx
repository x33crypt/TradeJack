import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const userOfferContext = createContext();

// Create the provider
export const UserOfferProvider = ({ children }) => {
  const [offers, setOffers] = useState(null);

  const [filter, setFilter] = useState({
    date: { monthNo: null, monthName: null, year: null },
    asset: null,
    status: "Live",
    search: null,
  });

  const [createOffer, setCreateOffer] = useState({
    step: 1,
    loading: false,
    title: "Basics",
    serviceType: "Online Wallet Transfer",
    service: "",
    serviceId: "",
    currency: { code: "USD", name: " United States dollar", symbol: "$" },
    minimum: "",
    maximum: "",
    margin: 4,
    vendorPaymentWindow: { minutes: 0, hours: 0 },
    tradersPaymentWindow: { minutes: 0, hours: 0 },
    termTags: [],
    instruction: "",
  });

  const [aboutOffer, setAboutOffer] = useState({ id: null, data: null });

  const [editOffer, setEditOffer] = useState({ id: null, data: null });

  const { id: urlId } = useParams();

  useEffect(() => {
    if (urlId && !aboutOffer.id) {
      setAboutOffer((prev) => ({
        ...prev,
        id: urlId,
      }));
    }
  }, [urlId, aboutOffer.id]);

  return (
    <userOfferContext.Provider
      value={{
        offers,
        setOffers,
        filter,
        setFilter,
        createOffer,
        setCreateOffer,
        editOffer,
        setEditOffer,
        aboutOffer,
        setAboutOffer,
      }}
    >
      {children}
    </userOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useUserOffer = () => useContext(userOfferContext);
