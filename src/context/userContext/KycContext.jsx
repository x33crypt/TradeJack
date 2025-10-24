import { createContext, useContext, useState } from "react";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [levels, setLevels] = useState(null);

  return (
    <KycContext.Provider
      value={{
        levels,
        setLevels,
      }}
    >
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
