import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useBalance } from "@/context/userContext/BalanceContext";

export function useFetchBalance() {
  const { balance, setBalance } = useBalance();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/profile/balances");
      if (res?.status === 200 && res?.data?.success) {
        setBalance((prev) => ({
          ...prev,
          ...res.data.data,
        }));
      } else {
        setError(res?.data?.message || "Failed to fetch wallet balance.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errorMessage || err.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, error, refetch: fetchBalance };
}
