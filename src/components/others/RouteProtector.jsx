import React from "react";
import { Navigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default RouteProtector;
