import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useLinkedAccount } from "@/context/wallet/LinkedAccountContext";

export function useFetchLinkedBanks() {
  const { linkedAccounts, setLinkedAccounts } = useLinkedAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinkedAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/payment/bank-accounts");
      if (res?.status === 200 && res?.data?.success) {
        console.log("Server Linked Accounts Data:", res);

        setLinkedAccounts(res.data.data || []);
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
  }, [setLinkedAccounts]);

  useEffect(() => {
    if (!linkedAccounts || linkedAccounts.length === 0) {
      fetchLinkedAccounts();
    }
  }, [linkedAccounts, fetchLinkedAccounts]);

  return { linkedAccounts, loading, error, refetch: fetchLinkedAccounts };
}
