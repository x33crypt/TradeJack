import { useState, useEffect, useRef, useCallback } from "react";
import api from "@/utils/http/api";
import { useCurrency } from "@/context/userContext/CurrencyContext";

// simple shallow compare to avoid unnecessary re-renders
function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export function useFetchCurrency() {
  const { setCurrency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track last returned currency to avoid resetting same data
  const lastDataRef = useRef(null);

  // Prevent updating state when unmounted
  const mountedRef = useRef(true);
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchCurrency = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/profile/currencies");

      if (res?.status === 200) {
        const newData = res.data?.data ?? null;

        // Avoid continuous re-render if the same data arrives
        const same = shallowEqual(lastDataRef.current, newData);

        if (!same) {
          setCurrency(newData);
          lastDataRef.current = newData;
        }
      } else {
        setError(res?.data?.message || "Failed to fetch profile currencies.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errorMessage || err.message || "Unknown error"
      );
    } finally {
      mountedRef.current && setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  return { loading, error, refetch: fetchCurrency };
}
