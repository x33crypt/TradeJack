import { useState, useEffect, useCallback } from "react";
import api from "@/utils/http/api";
import { useTransaction } from "@/context/wallet/TransactionContext";

export function useFetchTransactions(initialPage = 1, limit = 10) {
  const { setTransactions } = useTransaction();

  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(0);

  // ─────────────────────────────────────────────────────────────
  // stable fetch helper (doesn't depend on `page`)
  // ─────────────────────────────────────────────────────────────
  const fetchPage = useCallback(
    async (pageToLoad) => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/payment/wallet-history", {
          params: { page: pageToLoad, limit },
        });

        if (res.status === 200 && res.data?.success) {
          const { data, pagination } = res.data;

          if (pageToLoad === 1) {
            // first page or forced refresh
            setTransactions(res.data);
            setDisplayedCount(data.length);
          } else {
            // append
            setTransactions((prev) => ({
              ...res.data,
              data: [...prev.data, ...data],
            }));
            setDisplayedCount((prev) => prev + data.length);
          }

          setPagination(pagination);
          setPage(pageToLoad);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(
          err?.response?.data?.errorMessage || err?.message || "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    },
    [limit, setTransactions] // `page` removed ⇒ function is stable
  );

  // first load – run once
  useEffect(() => {
    fetchPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ───────────── helper for “Next” (Prev removed) ─────────────
  const next = async () => {
    if (pagination?.hasNextPage) {
      await fetchPage(page + 1);
    }
  };

  return {
    loading,
    error,
    pagination,
    page,
    displayedCount, // how many txs are on screen
    next,
  };
}
