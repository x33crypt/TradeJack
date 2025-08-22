import React from "react";
import { Outlet, Navigate } from "react-router-dom";

/**
 * SensitiveRoute:
 * If password confirmed in last 10 mins → allow access.
 * Otherwise → redirect to error page (or show an error component).
 */
const SensitiveRoute = () => {
  const lastConfirm = localStorage.getItem("lastPasswordConfirm");
  const confirmed =
    lastConfirm && Date.now() - parseInt(lastConfirm, 10) < 10 * 60 * 1000;

  // remember to replace with your error component or page
  return confirmed ? <Outlet /> : <Navigate to="/error-no-access" replace />;
};

export default SensitiveRoute;
