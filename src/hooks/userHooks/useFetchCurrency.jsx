import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useCurrency } from "@/context/userContext/CurrencyContext";

export function useFetchCurrency() {
  const { setCurrency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrency = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/profile/currencies");
      console.log("Currency fetch response:", res);

      if (res?.status === 200) {
        console.log("Fetched currency data:", res.data.data);
        // setCurrency(res.data.data);
        setAboutOffer((prev) => ({
          ...prev,
          ...res.data.data, // merge API response
          current: "user_currency", // overwrite / set current
        }));
      } else {
        setError(res?.data?.message || "Failed to fetch profile currencies.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errorMessage || err.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }, [setCurrency]);

  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  return { loading, error, refetch: fetchCurrency };
}
