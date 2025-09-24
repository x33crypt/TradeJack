// utils/navigation.js
import { useConfirmPassword } from "@/context/otherContext/PasswordContext";
import { useNavigate } from "react-router-dom";

export const useSensitiveNavigation = () => {
  const { password, setPassword } = useConfirmPassword();
  const navigate = useNavigate();

  const navigateSensitive = (url) => {
    console.log("password", password);

    const lastConfirm = password?.lastConfirmed;
    const confirmed =
      lastConfirm && Date.now() - Number(lastConfirm) < 2 * 60 * 1000; // 2 minutes

    if (confirmed) {
      // ✅ Already confirmed within last 2 mins → navigate directly
      navigate(url, { replace: true });
    } else {
      // 🔒 Ask for confirmation
      setPassword((prev) => ({
        ...prev,
        state: true, // open modal
        redirectTo: url,
      }));
    }
  };

  return navigateSensitive;
};
