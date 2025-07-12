import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useTransaction } from "@/context/wallet/TransactionContext";

export function useFetchTransactionsDetails() {
  const { details, setDetails } = useTransaction();
  const { state, transactionId } = details;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!transactionId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/payment/wallet/transaction/${transactionId}`);

      setDetails((prev) => ({ ...prev, data: res.data }));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch transaction details."
      );
      if (process.env.NODE_ENV === "development") {
        console.error("Transaction fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [transactionId, setDetails]);

  useEffect(() => {
    console.log("on details change", details);

    if (transactionId && state === true) {
      fetchDetails();
    }
  }, [transactionId, state, fetchDetails]);

  return {
    loading,
    error,
    refetch: fetchDetails,
  };
}
