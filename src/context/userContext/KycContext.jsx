import { createContext, useContext, useState } from "react";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [kycDetails, setKycDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: { year: null, month: null, day: null },
    gender: "male",
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

  const [verification, setVerification] = useState({
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    loading: false,
    success: false,
  });

  const [status, setStatus] = useState({ state: null, data: null });

  return (
    <KycContext.Provider
      value={{
        kycDetails,
        setKycDetails,
        verification,
        setVerification,
        status,
        setStatus,
      }}
    >
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
