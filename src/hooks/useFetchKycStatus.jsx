import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useKyc } from "@/context/KycContext";

export function useFetchKycStatus(autoFetch = true) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setStatus } = useKyc();

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/profile/kyc/status`);

      console.log(res);

      setStatus({
        state: res?.data?.data?.kycStatus,
        data: res?.data?.data?.kycDetails,
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to fetch KYC status.";
      setError(msg);

      if (process.env.NODE_ENV === "development") {
        console.error("KYC status fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [setStatus]);

  // Optional: auto-fetch on mount
  useEffect(() => {
    if (autoFetch) fetchStatus();
  }, [autoFetch, fetchStatus]);

  return {
    loading,
    error,
    refetchKycStatus: fetchStatus,
  };
}
