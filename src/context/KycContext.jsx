import { createContext, useContext, useState } from "react";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [kycDetails, setKycDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: { year: null, month: null, day: null },
    gender: "",
    address: {
      country: "",
      state: "",
      city: "",
      street: "",
    },
    documentType: "",
    frontIdImage: null,
    backIdImage: null,
    // Add more fields as needed
  });

  return (
    <KycContext.Provider value={{ kycDetails, setKycDetails }}>
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
