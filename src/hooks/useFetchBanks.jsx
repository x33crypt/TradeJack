import { useState, useEffect } from "react";
import api from "@/utils/http/api";

export function useFetchBanks() {
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/payment/banks");

        if (res?.status === 200 && res?.data?.success) {
          const bankNames = res.data.data.map((bank) => bank.name);
          setBanks(bankNames); // Send to context
        } else {
          setError("Failed to fetch banks.");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage ||
            err.message ||
            "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, loading, error };
}
