import { createContext, useContext, useState } from "react";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [kycDetails, setKycDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: { year: null, month: null, date: null },
    gender: "",
    addressDetails: {
      country: "",
      state: "",
      city: "",
      street: "",
    },
    documentType: "",
    frontImage: null,
    backImage: null,
    // Add more fields as needed
  });

  return (
    <KycContext.Provider value={{ kycDetails, setKycDetails }}>
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
