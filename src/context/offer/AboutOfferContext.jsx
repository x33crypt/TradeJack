import React, { createContext, useState, useContext, useEffect } from "react";

const AboutOfferContext = createContext();

// Create the provider
export const AboutOfferProvider = ({ children }) => {
  const [aboutOffer, setAboutOffer] = useState("");

  return (
    <AboutOfferContext.Provider value={{ aboutOffer, setAboutOffer }}>
      {children}
    </AboutOfferContext.Provider>
  );
};

// Create a hook for easy use
export const useAboutOffer = () => useContext(AboutOfferContext);
