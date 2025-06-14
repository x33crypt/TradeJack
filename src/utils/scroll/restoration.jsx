// src/utils/useScrollRestoration.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(location.key);
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition);
      window.scrollTo(x, y);
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        location.key,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload(); // Save before navigating away
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);
}
