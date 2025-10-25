import { createContext, useContext, useState } from "react";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [levels, setLevels] = useState({
    current: 0,
    data: null,
    upgrade: {
      tier: 3,
      status: "processing",
      comment: "Tier 3 upgrade application is under review",
      data: { dateSubmitted: "2024-06-15", details: null },
    },
  });

  const [tierOne, setTierOne] = useState({
    tier: 1,
    fullname: "",
    dateOfBirth: { day: "", month: "", year: "" },
    gender: "",
    code: "1",
    phone: "",
    loading: false,
    success: false,
  });

  const [tierTwo, setTierTwo] = useState({
    tier: 2,
    bvn: "",
    nin: "",
    loading: false,
    success: false,
  });

  return (
    <KycContext.Provider
      value={{
        levels,
        setLevels,
        tierOne,
        setTierOne,
        tierTwo,
        setTierTwo,
      }}
    >
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
