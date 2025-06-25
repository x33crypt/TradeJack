import { useEffect } from "react";

const useAutoReloadOnReconnect = () => {
  useEffect(() => {
    const handleOnline = () => {
      console.log("✅ Network reconnected. Reloading...");
      window.location.reload();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};

export default useAutoReloadOnReconnect;
