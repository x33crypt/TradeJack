import React, { createContext, useState, useContext } from "react";

// Create the context
const UserFeedbackContext = createContext();

// Create the provider
export const UserFeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({
    type: "",
    offerId: null,
    sort: "",
    data: null,
  });

  return (
    <UserFeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </UserFeedbackContext.Provider>
  );
};

// Create a hook for easy use
export const useUserFeedback = () => useContext(UserFeedbackContext);
