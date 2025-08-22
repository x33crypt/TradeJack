// utils/navigation.js
import { useConfirmPassword } from "@/context/otherContext/PasswordContext";
import { useNavigate } from "react-router-dom";

export const useSensitiveNavigation = () => {
  const { setPassword } = useConfirmPassword();
  const navigate = useNavigate();

  const navigateSensitive = (url) => {
    const lastConfirm = localStorage.getItem("lastPasswordConfirm");
    const confirmed =
      lastConfirm && Date.now() - parseInt(lastConfirm, 10) < 10 * 60 * 1000;

    if (confirmed) {
      // ✅ Already confirmed password in the last 10 mins → navigate directly
      navigate(url);
    } else {
      // ✅ Show modal for password confirmation
      localStorage.setItem("sensitiveRedirect", url);

      // Open confirm password modal
      setPassword((prev) => ({
        ...prev,
        state: true,
      }));
    }
  };

  return navigateSensitive;
};
