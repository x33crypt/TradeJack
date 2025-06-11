import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ToastContext = createContext();

// Create the provider
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    success: true,
    successMessage: "Your offer has been published successfully",
    error: false,
    errorMessage: "hjhj",
    duration: 300000,
  });

  // Independent timer for success
  useEffect(() => {
    let successTimer;
    if (toast.success) {
      successTimer = setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          success: false,
          successMessage: "",
        }));
      }, toast.duration || 3000);
    }
    return () => clearTimeout(successTimer);
  }, [toast.success, toast.duration]);

  // Independent timer for error
  useEffect(() => {
    let errorTimer;
    if (toast.error) {
      errorTimer = setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          error: false,
          errorMessage: "",
        }));
      }, toast.duration || 3000);
    }
    return () => clearTimeout(errorTimer);
  }, [toast.error, toast.duration]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Create a hook for easy use
export const useToast = () => useContext(ToastContext);
