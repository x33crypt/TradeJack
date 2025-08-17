// components/SafeNavigate.jsx
import { useNavigate, useLocation } from "react-router-dom";

const useSafeNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, options = {}) => {
    if (typeof to === "number") {
      navigate(to);
    } else if (location.pathname !== to) {
      navigate(to, options);
    }
  };
};

export default useSafeNavigate;
