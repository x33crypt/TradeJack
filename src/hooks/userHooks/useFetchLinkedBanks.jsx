import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useLinkedAccount } from "@/context/userContext/LinkedAccountContext";

export function useFetchLinkedBanks() {
  const { linkedAccounts, setLinkedAccounts } = useLinkedAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinkedBanks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/payment/bank-accounts");
      if (res?.status === 200 && res?.data?.success) {
        const newAccounts = res.data.data || [];

        // ✅ Only update if data changed
        const isSame =
          JSON.stringify(newAccounts) === JSON.stringify(linkedAccounts);

        if (!isSame) {
          setLinkedAccounts(newAccounts);
        }
      } else {
        setError(res?.data?.message || "Failed to fetch linked accounts.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.errorMessage || err.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }, [linkedAccounts, setLinkedAccounts]);

  const refetchLinkedBanks = useCallback(() => {
    fetchLinkedBanks();
  }, [fetchLinkedBanks]);

  return { loading, error, refetchLinkedBanks };
}
