import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useConfirmPassword } from "@/context/otherContext/PasswordContext";

/**
 * SensitiveRoute - protects sensitive pages
 * If password was confirmed in the last 10 minutes, allows access.
 * Otherwise, redirects to /confirm-password and saves intended route.
 */

const SensitiveRoute = () => {
  const { setPassword } = useConfirmPassword();

  const lastConfirm = localStorage.getItem("lastPasswordConfirm");
  const confirmed =
    lastConfirm && Date.now() - parseInt(lastConfirm, 10) < 10 * 60 * 1000;

  if (confirmed) {
    return <Outlet />; // render the nested route
  } else {
    // Save intended sensitive route
    localStorage.setItem("sensitiveRedirect", window.location.pathname);
    return setPassword((prev) => ({
      ...prev,
      state: true,
    }));
  }
};

export default SensitiveRoute;
