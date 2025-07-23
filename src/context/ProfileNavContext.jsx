import { createContext, useContext, useState } from "react";

const ProfileNavContext = createContext();

export const ProfileNavProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <ProfileNavContext.Provider value={{ show, setShow }}>
      {children}
    </ProfileNavContext.Provider>
  );
};

export const useProfileNav = () => useContext(ProfileNavContext);
